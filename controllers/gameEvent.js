const bcrypt = require("bcrypt");
const HTTP_STATUS_CODE = require("../config/http_status_code");
const ERROR_CODE = require("../config/error_code");
const { SuccessResponse, ErrorResponse } = require("../config/response");
const Message = require("../config/message");
const User = require("../models/user");
const { GameEvent } = require("../models/gameEvent");
var moment = require("moment"); // require
const Types = require("../config/types");

const server_launch_challenge = require("../data/event/server_launch_challenge.json");
const weeklies = require("../data/event/weeklies.json");
const { getABSegmentFunc } = require("./abSegment");
const {
  redisAddUserEventId,
  redisRemoveUserEventRecords,
  redisIncrUserEventRecord,
  redisGetAllUserRecords,
  redisGetTrackingCommonColumns,
  redisGetTrackingTotalSpt,
  redisGetAllUserEventRecords,
  redisGetCurrentTime,
  redisSetTrackingTotalSpt,
  redisGetLastTracking,
  redisSetUserEventRecords,
  redisSetUserRecords,
} = require("../config/redisClient");

const {
  addEventReward,
  refreshTaskCondition,
  checkEventSpecialCondition,
  refreshMilestonCondition,
  resetMilestonCondition,
  resetTaskCondition,
} = require("../controllers/gameEventLogic");

const { recordEquip28XRare, recordEquip29TotalXEquipment, recordTotalXGadget, record47CompleteXDailyTask, record69ClaimDailyMileStone } = require("../controllers/gameEventRecord");
const {
  trackingServerClaimChallenge,
  trackingServerRewardEvents,
  trackingServerDailyReward,
  trackingServerEarnGem,
  trackingServerEarnKeyEvents,
  trackingServer,
} = require("./tracking");

const getGameEvent = async (req, res, next) => {
  try {
    console.log("----------------------------------");

    let today_0h_00 = moment(new Date()).startOf("day").unix();

    // Validate if user exist in our database, get user ref
    const user = await User.findById(req.user_jwt.user_id);

    if (!user) {
      return new ErrorResponse(res, HTTP_STATUS_CODE.NOT_FOUND, ERROR_CODE.INVALID_USER, Message.USER_NOT_FOUND);
    }

    // check equipment

    let max_equipment_rare = 0;
    let total_equipment = 0;
    let total_equipment_outfit = 0;
    let total_gadget = user.equipment.gadgets.length;
    // let total_equipment_normal = 0;
    // let total_equipment_good = 0;
    // let total_equipment_better = 0;
    // let total_equipment_excellent = 0;
    // let total_equipment_epic = 0;

    for (let equip of user.equipment.items) {
      if (equip.item_current_rarity > max_equipment_rare) {
        max_equipment_rare = equip.item_current_rarity;
      }

      total_equipment++;
    }

    // console.log("max_equipment_rare", { max_equipment_rare });
    // console.log("total_equipment", { total_equipment });

    // Record
    recordEquip28XRare(user._id, max_equipment_rare);
    recordEquip29TotalXEquipment(user._id, total_equipment);
    recordTotalXGadget(user._id, total_gadget);

    let moment_now = moment().unix();

    // FAKE TIME
    // const isTEST = process.env.TRACKING_SERVICE === "dev" ? true : false;
    // if (isTEST) {
    //   moment_now = await redisGetCurrentTime(req.user_jwt.user_id);
    // }

    //  Get running events
    let runningGameEvents = await GameEvent.find({
      $or: [
        { event_start_condition: 0 },
        { event_start_condition: 1, event_start_condition_value: { $lt: moment_now }, event_expiry_value: -1 },
        {
          event_start_condition: 1,
          event_start_condition_value: { $lt: moment_now },
          event_expiry_value: { $ne: -1 },
          event_end_date: { $gt: moment_now },
        },
      ],
    });

    ///console.log("Total Event:", runningGameEvents.length);

    let isNeedToSave = false;

    // ABTEST
    let ab_test_segment = user.game_segment ? user.game_segment : "default";
    let game_version = user.game_version ? user.game_version : "default";
    let ab_config = await getABSegmentFunc(ab_test_segment, game_version);

    for (let runningEvent of runningGameEvents) {
      if (runningEvent.event_id == Types.EventID.WEEKLIES_9MIN || runningEvent.event_id == Types.EventID.SERVER_LAUNCH_9MIN) {
        continue;
      }

      // TODO: check main quest
      // force update rem
      // if (runningEvent.event_id == Types.EventID.MAIN_QUEST && user.game_version !== "199" && user.game_version !== "1999" && user.game_version !== "1.0.57" && user.game_version !== "1.0.58" && user.game_version !== "1.0.59"  && user.game_version !== "1.0.60") {
      //   continue;
      // }

      let result = user.events?.filter((element) => element.event_id == runningEvent.event_id);

      // Add event to profile
      if (result.length <= 0) {
        console.log("-- Check ab_config?.chapter_9_min ", ab_config?.chapter_9_min);

        // ABTEST override
        if (ab_config && ab_config.chapter_9_min) {
          if (runningEvent.event_id == Types.EventID.WEEKLIES) {
            let weekly_9_min = runningGameEvents.filter((element) => element.event_id == Types.EventID.WEEKLIES_9MIN);

            if (weekly_9_min && weekly_9_min.length > 0) {
              runningEvent = weekly_9_min[0];
              runningEvent.event_id = Types.EventID.WEEKLIES;
              console.log("OVERRIDE WEEKLIES_9MIN");
            }
          } else if (runningEvent.event_id == Types.EventID.SERVER_LAUNCH) {
            let server_launch_9_min = runningGameEvents.filter((element) => element.event_id == Types.EventID.SERVER_LAUNCH_9MIN);

            if (server_launch_9_min && server_launch_9_min.length > 0) {
              runningEvent = server_launch_9_min[0];
              runningEvent.event_id = Types.EventID.SERVER_LAUNCH;
              console.log("OVERRIDE SERVER_LAUNCH_9MIN");
            }
          }
        }

        ///////////////

        // check special condition
        let qualifySpecialCondition = false;

        qualifySpecialCondition = await checkEventSpecialCondition(user, runningEvent.event_special_condition);

        if (qualifySpecialCondition) {
          // add start time
          runningEvent.event_start_date = today_0h_00;

          // add expiry time
          if (runningEvent.event_expiry_value !== -1) {
            runningEvent.event_end_date = today_0h_00 + runningEvent.event_expiry_value;
          }

          // add restart time
          if (runningEvent.event_restart !== 0) {
            runningEvent.event_next_restart = today_0h_00 + runningEvent.event_restart;

            // console.log("- event", runningEvent.event_id);
            // console.log("- moment_now", moment_now);
            // console.log(typeof moment_now);
            // console.log("- event_restart", runningEvent.event_restart);
            // console.log(typeof runningEvent.event_restart);
            // console.log("- event_next_restart", runningEvent.event_next_restart);
            // console.log("");
          }

          console.log({ today_0h_00, start: runningEvent.event_start_date, restart: runningEvent.event_next_restart });

          runningEvent.status = 1;

          user.events.push(runningEvent.getInfo());
          // redis
          await redisAddUserEventId(user._id, runningEvent.event_id);
          ///console.log("===> Add:", runningEvent.event_id);

          await redisIncrUserEventRecord(user._id, runningEvent.event_id, Types.EventTaskCondition.TASK_CONDITION_3_LOGIN_X_DAY, 1);

          isNeedToSave = true;
        } else {
          ///console.log("===> Not qualify:", runningEvent.event_id);
        }
      }
    }
    // === END Add new events ======================

    // check expiry/reset, update condition

    let userRecord = await redisGetAllUserRecords(user._id);

    // sort
    // user.events.sort((a, b) => {
    //   a.event_id - b.event_id;
    // })

    for (let event of user.events) {
      let new_claimable = false;
      ///console.log("#User Event: ", event.event_type);
      ///console.log(" --milestone: ", event.milestone.length);

      // ========= EXPIRED =====================
      if (event.event_expiry_value !== -1 && event.event_end_date < moment_now) {
        console.log(event.event_id, "expired!");

        event.status = Types.EventStatus.COMPLETED;
        isNeedToSave = true;

        // +1 day for SERVER LAUNCH
        if (event.event_id === Types.EventID.SERVER_LAUNCH) {
          if (event.event_end_date + 86400 < moment_now) {
            // user.events.pull({ _id: event._id });
            event.status = Types.EventStatus.EXPIRED;
          }
        } else {
          // user.events.pull({ _id: event._id });
          event.status = Types.EventStatus.EXPIRED;
        }
        continue; // no need to check anymore.
      }

      // ============= RESET ============================
      if (event.event_next_restart !== 0 && event.event_next_restart < moment_now) {
        await redisRemoveUserEventRecords(user._id, event.event_id);

        // Re add login after reset
        await redisIncrUserEventRecord(user._id, event.event_id, Types.EventTaskCondition.TASK_CONDITION_3_LOGIN_X_DAY, 1);

        // do {
        //   event.event_next_restart = event.event_next_restart + event.event_restart;

        // } while (event.event_next_restart < moment_now);

        event.event_next_restart = today_0h_00 + event.event_restart;

        event.task_point = 0;
        isNeedToSave = true;

        console.log("redisRemoveUserEventRecords");

        await resetMilestonCondition(event);
        await resetTaskCondition(event);

        // continue; // no need to check anymore.
      }

      // == RESET DAILY-REWARD
      if (event.event_id === Types.EventID.DAILY_REWARDS) {
        let isMilestoneDone = true;
        let isTaskDone = true;
        let milestone_max_date = 0;
        let task_max_date = 0;
        for (let milestone of event.milestone) {
          // console.log("isMilestoneDone", milestone.status);
          milestone_max_date = milestone.conditions[0].condition_value;
          if (milestone.status !== Types.TaskStatus.CLAIMED) {
            isMilestoneDone = false;
          }
        }

        // task

        for (let tab of event.tabs) {
          // ===== TASK CHECK ===========
          for (let task of tab.tasks) {
            // console.log("isTaskDone", task.status);
            task_max_date = task.conditions[0].condition_value;
            if (task.status !== Types.TaskStatus.CLAIMED) {
              isTaskDone = false;
            }
          }
        }

        // console.log("milestone_max_date", milestone_max_date);
        // console.log("task_max_date", task_max_date);

        if (isMilestoneDone && milestone_max_date > 0) {
          for (let milestone of event.milestone) {
            milestone_max_date += 2;
            milestone.conditions[0].condition_value = milestone_max_date;
            milestone.task_name = milestone_max_date.toString();
            milestone.status = Types.TaskStatus.INPROGRESS;
          }

          if (event.milestone[4].item_list[0].item_id == Types.ItemID.EXCELLENT_WEAPON_CHEST) {
            event.milestone[4].item_list[0] = {
              content: "Equipment",
              item_id: 2400020,
              item_name: "Excellent Armor Chest",
              item_type: "All",
              item_description: "Get 1 random Armor (excluding S Grade)",
              item_current_rarity: 4,
              value: 1,
            };
          } else if (event.milestone[4].item_list[0].item_id == Types.ItemID.EXCELLENT_ARMOR_CHEST) {
            event.milestone[4].item_list[0] = {
              content: "Equipment",
              item_id: 2400021,
              item_name: "Excellent Necklace Chest",
              item_type: "All",
              item_description: "Get 1 random Necklace (excluding S Grade)",
              item_current_rarity: 4,
              value: 1,
            };
          } else if (event.milestone[4].item_list[0].item_id == Types.ItemID.EXCELLENT_NECKLACE_CHEST) {
            event.milestone[4].item_list[0] = {
              content: "Equipment",
              item_id: 2400022,
              item_name: "Excellent Belt Chest",
              item_type: "All",
              item_description: "Get 1 random Belt (excluding S Grade)",
              item_current_rarity: 4,
              value: 1,
            };
          } else if (event.milestone[4].item_list[0].item_id == Types.ItemID.EXCELLENT_BELT_CHEST) {
            event.milestone[4].item_list[0] = {
              content: "Equipment",
              item_id: 2400023,
              item_name: "Excellent Gloves Chest",
              item_type: "All",
              item_description: "Get 1 random Gloves (excluding S Grade)",
              item_current_rarity: 4,
              value: 1,
            };
          } else if (event.milestone[4].item_list[0].item_id == Types.ItemID.EXCELLENT_GLOVES_CHEST) {
            event.milestone[4].item_list[0] = {
              content: "Equipment",
              item_id: 2400024,
              item_name: "Excellent Shoes Chest",
              item_type: "All",
              item_description: "Get 1 random Boots (excluding S Grade)",
              item_current_rarity: 4,
              value: 1,
            };
          } else if (event.milestone[4].item_list[0].item_id == Types.ItemID.EXCELLENT_SHOES_CHEST) {
            event.milestone[4].item_list[0] = {
              content: "Equipment",
              item_id: 2400019,
              item_name: "Excellent Weapon Chest",
              item_type: "All",
              item_description: "Get 1 random Excellent weapon (excluding S Grade)",
              item_current_rarity: 4,
              value: 1,
            };
          }

          console.log("reset Milestonr DAILY_REWARDS");
        }

        if (isTaskDone) {
          for (let tab of event.tabs) {
            // ===== TASK CHECK ===========
            for (let task of tab.tasks) {
              task_max_date += 1;
              task.conditions[0].condition_value = task_max_date;
              task.task_name = task_max_date.toString();
              task.status = Types.TaskStatus.INPROGRESS;
            }
          }
          console.log("reset Task DAILY_REWARDS");
        }
      }

      ////////////////////////////////////

      // == RESET ARCHIVEMENT
      if (event.event_id === Types.EventID.ACHIEVEMENT) {
        let NextArchivementArray = [
          {
            condition_name: "Get total of -condition- Excellent equipment",
            condition_type: 18,
            condition_value_0: 1,
            gem_reward_0: 10,
            condition_value_1: 5,
            gem_reward_1: 20,
            condition_value_2: 10,
            gem_reward_2: 20,
            condition_value_3: 50,
            gem_reward_3: 20,
            condition_value_4: 100,
            gem_reward_4: 20,
          },
          {
            condition_name: "Merge equipment -condition- time(s)",
            condition_type: 13,
            condition_value_0: 10,
            gem_reward_0: 10,
            condition_value_1: 20,
            gem_reward_1: 20,
            condition_value_2: 50,
            gem_reward_2: 20,
            condition_value_3: 100,
            gem_reward_3: 20,
            condition_value_4: 200,
            gem_reward_4: 20,
          },
          {
            condition_name: "Get -condition- Gadget",
            condition_type: 19,
            condition_value_0: 1,
            gem_reward_0: 10,
            condition_value_1: 2,
            gem_reward_1: 20,
            condition_value_2: 3,
            gem_reward_2: 30,
            condition_value_3: 4,
            gem_reward_3: 50,
            condition_value_4: 7,
            gem_reward_4: 100,
          },
          {
            condition_name: "Spend total of -condition- gems",
            condition_type: 20,
            condition_value_0: 1000,
            gem_reward_0: 10,
            condition_value_1: 2000,
            gem_reward_1: 20,
            condition_value_2: 5000,
            gem_reward_2: 30,
            condition_value_3: 10000,
            gem_reward_3: 50,
            condition_value_4: 20000,
            gem_reward_4: 100,
          },
          {
            condition_name: "Reach Lv.-condition-  for 1 equipment piece",
            condition_type: 21,
            condition_value_0: 10,
            gem_reward_0: 10,
            condition_value_1: 20,
            gem_reward_1: 20,
            condition_value_2: 30,
            gem_reward_2: 20,
            condition_value_3: 40,
            gem_reward_3: 20,
            condition_value_4: 50,
            gem_reward_4: 20,
          },
          {
            condition_name: "Get total of -condition- gold from Patrol",
            condition_type: 22,
            condition_value_0: 50000,
            gem_reward_0: 10,
            condition_value_1: 100000,
            gem_reward_1: 20,
            condition_value_2: 200000,
            gem_reward_2: 20,
            condition_value_3: 500000,
            gem_reward_3: 20,
            condition_value_4: 1000000,
            gem_reward_4: 20,
          },
          {
            condition_name: "Reach player Lv.-condition- ",
            condition_type: 2,
            condition_value_0: 5,
            gem_reward_0: 10,
            condition_value_1: 10,
            gem_reward_1: 20,
            condition_value_2: 15,
            gem_reward_2: 20,
            condition_value_3: 20,
            gem_reward_3: 20,
            condition_value_4: 25,
            gem_reward_4: 20,
          },
          {
            condition_name: "Purchase Energy -condition- time(s)",
            condition_type: 23,
            condition_value_0: 5,
            gem_reward_0: 10,
            condition_value_1: 10,
            gem_reward_1: 20,
            condition_value_2: 20,
            gem_reward_2: 20,
            condition_value_3: 100,
            gem_reward_3: 20,
            condition_value_4: 200,
            gem_reward_4: 20,
          },
          {
            condition_name: "Clear Main Stage Chapter -condition- ",
            condition_type: 1,
            condition_value_0: 1,
            gem_reward_0: 10,
            condition_value_1: 2,
            gem_reward_1: 20,
            condition_value_2: 3,
            gem_reward_2: 20,
            condition_value_3: 4,
            gem_reward_3: 20,
            condition_value_4: 5,
            gem_reward_4: 20,
          },
          {
            condition_name: "Reach Lv.-condition- for all equipment",
            condition_type: 24,
            condition_value_0: 10,
            gem_reward_0: 10,
            condition_value_1: 20,
            gem_reward_1: 20,
            condition_value_2: 30,
            gem_reward_2: 20,
            condition_value_3: 40,
            gem_reward_3: 20,
            condition_value_4: 50,
            gem_reward_4: 20,
          },
          {
            condition_name: "Get total of -condition- Gadget(s)",
            condition_type: 25,
            condition_value_0: 10,
            gem_reward_0: 10,
            condition_value_1: 20,
            gem_reward_1: 20,
            condition_value_2: 50,
            gem_reward_2: 20,
            condition_value_3: 100,
            gem_reward_3: 20,
            condition_value_4: 200,
            gem_reward_4: 20,
          },
          {
            condition_name: "Join -condition- Daily Challenge(s)",
            condition_type: 26,
            condition_value_0: 5,
            gem_reward_0: 10,
            condition_value_1: 10,
            gem_reward_1: 20,
            condition_value_2: 20,
            gem_reward_2: 20,
            condition_value_3: 50,
            gem_reward_3: 20,
            condition_value_4: 100,
            gem_reward_4: 20,
          },
          {
            condition_name: "Make -condition- purchase(s)",
            condition_type: 12,
            condition_value_0: 1,
            gem_reward_0: 10,
            condition_value_1: 2,
            gem_reward_1: 20,
            condition_value_2: 10,
            gem_reward_2: 20,
            condition_value_3: 20,
            gem_reward_3: 20,
            condition_value_4: 100,
            gem_reward_4: 30,
          },
          {
            condition_name: "Unlock Talents",
            condition_type: 27,
            condition_value_0: 10,
            gem_reward_0: 10,
            condition_value_1: 20,
            gem_reward_1: 20,
            condition_value_2: 40,
            gem_reward_2: 20,
            condition_value_3: 60,
            gem_reward_3: 20,
            condition_value_4: 80,
            gem_reward_4: 20,
          },
          {
            condition_name: "Get -condition- equipment",
            condition_type: 28,
            condition_value_0: 1,
            gem_reward_0: 10,
            condition_value_1: 2,
            gem_reward_1: 20,
            condition_value_2: 3,
            gem_reward_2: 30,
            condition_value_3: 4,
            gem_reward_3: 50,
            condition_value_4: 7,
            gem_reward_4: 100,
          },
          {
            condition_name: "Defeat total of -condition- boss(es)",
            condition_type: 15,
            condition_value_0: 10,
            gem_reward_0: 10,
            condition_value_1: 20,
            gem_reward_1: 20,
            condition_value_2: 50,
            gem_reward_2: 20,
            condition_value_3: 100,
            gem_reward_3: 20,
            condition_value_4: 200,
            gem_reward_4: 20,
          },
          {
            condition_name: "Open total of -condition- chests",
            condition_type: 8,
            condition_value_0: 5,
            gem_reward_0: 10,
            condition_value_1: 10,
            gem_reward_1: 20,
            condition_value_2: 20,
            gem_reward_2: 20,
            condition_value_3: 50,
            gem_reward_3: 30,
            condition_value_4: 100,
            gem_reward_4: 50,
          },
          {
            condition_name: "Get total of -condition-  equipment pieces",
            condition_type: 29,
            condition_value_0: 10,
            gem_reward_0: 10,
            condition_value_1: 20,
            gem_reward_1: 20,
            condition_value_2: 50,
            gem_reward_2: 20,
            condition_value_3: 100,
            gem_reward_3: 20,
            condition_value_4: 200,
            gem_reward_4: 20,
          },
          {
            condition_name: "Get -condition- outfits",
            condition_type: 30,
            condition_value_0: 1,
            gem_reward_0: 10,
            condition_value_1: 5,
            gem_reward_1: 20,
            condition_value_2: 10,
            gem_reward_2: 20,
            condition_value_3: 50,
            gem_reward_3: 20,
            condition_value_4: 100,
            gem_reward_4: 20,
          },
          {
            condition_name: "Challenge total of -condition- Main Stages",
            condition_type: 4,
            condition_value_0: 10,
            gem_reward_0: 10,
            condition_value_1: 20,
            gem_reward_1: 20,
            condition_value_2: 50,
            gem_reward_2: 20,
            condition_value_3: 100,
            gem_reward_3: 20,
            condition_value_4: 200,
            gem_reward_4: 20,
          },
          {
            condition_name: "Defeat total of -condition- monster(s)",
            condition_type: 14,
            condition_value_0: 100000,
            gem_reward_0: 10,
            condition_value_1: 200000,
            gem_reward_1: 20,
            condition_value_2: 500000,
            gem_reward_2: 20,
            condition_value_3: 1000000,
            gem_reward_3: 20,
            condition_value_4: 2000000,
            gem_reward_4: 20,
          },
          {
            condition_name: "Login for total of -condition- days",
            condition_type: 3,
            condition_value_0: 3,
            gem_reward_0: 10,
            condition_value_1: 5,
            gem_reward_1: 20,
            condition_value_2: 7,
            gem_reward_2: 20,
            condition_value_3: 14,
            gem_reward_3: 20,
            condition_value_4: 30,
            gem_reward_4: 30,
          },
        ];
        for (let tab of event.tabs) {
          // ===== TASK CHECK ===========
          for (let task of tab.tasks) {
            // console.log("isTaskDone", task.status);
            task_max_date = task.conditions[0].condition_value;
            if (task.status == Types.TaskStatus.CLAIMED) {
              for (const nextArchivement of NextArchivementArray) {
                if (task.conditions[0].condition_type === nextArchivement.condition_type) {
                  if (task.conditions[0].condition_value < nextArchivement.condition_value_1) {
                    task.conditions[0].condition_value = nextArchivement.condition_value_1;
                    task.item_list[0].value = nextArchivement.gem_reward_1;

                    task.task_name = nextArchivement.condition_name.replace("-condition-", task.conditions[0].condition_value);
                    task.status = Types.TaskStatus.INPROGRESS;
                  } else if (task.conditions[0].condition_value < nextArchivement.condition_value_2) {
                    task.conditions[0].condition_value = nextArchivement.condition_value_2;
                    task.item_list[0].value = nextArchivement.gem_reward_2;
                    task.task_name = nextArchivement.condition_name.replace("-condition-", task.conditions[0].condition_value);
                    task.status = Types.TaskStatus.INPROGRESS;
                  } else if (task.conditions[0].condition_value < nextArchivement.condition_value_3) {
                    task.conditions[0].condition_value = nextArchivement.condition_value_3;
                    task.item_list[0].value = nextArchivement.gem_reward_3;
                    task.task_name = nextArchivement.condition_name.replace("-condition-", task.conditions[0].condition_value);
                    task.status = Types.TaskStatus.INPROGRESS;
                  } else if (task.conditions[0].condition_value < nextArchivement.condition_value_4) {
                    task.conditions[0].condition_value = nextArchivement.condition_value_4;
                    task.item_list[0].value = nextArchivement.gem_reward_4;
                    task.task_name = nextArchivement.condition_name.replace("-condition-", task.conditions[0].condition_value);
                    task.status = Types.TaskStatus.INPROGRESS;
                  }
                }
              }
            }
          }
        }

        // if (isTaskDone) {
        //   for (let tab of event.tabs) {
        //     // ===== TASK CHECK ===========
        //     for (let task of tab.tasks) {
        //       task_max_date += 1;
        //       task.conditions[0].condition_value = task_max_date;
        //       task.task_name = task_max_date.toString();
        //       task.status = Types.TaskStatus.INPROGRESS;
        //     }
        //   }
        //   console.log("reset Task DAILY_REWARDS");
        // }
      }
      ////////////////////////////////////

      // refresh milestone status
      if (await refreshMilestonCondition(user._id, event)) {
        isNeedToSave = true;
      }

      ///console.log(" --tabs: ", event.tabs.length);

      // refresh task status
      if (await refreshTaskCondition(user, event, userRecord)) {
        isNeedToSave = true;
      }
    }

    // SAVE EVENT
    if (isNeedToSave) {
      isNeedToSave = false;
      ///console.log("Save Event");
      // user.markModified("events");
      // await user.save();

      let new_user = await User.findByIdAndUpdate(user._id, { events: user.events });
    }

    // TODO:
    // let finalEvents = [...user.getEvents()];

    const finalEvents = JSON.parse(JSON.stringify(user.getEvents()));

    // return;

    for (let finalEvent of finalEvents) {
      if (finalEvent.event_id == Types.EventID.SERVER_LAUNCH) {
        for (const key in finalEvent.milestone) {
          let element = finalEvent.milestone[key];
          // console.log(element);

          if (element.task_name == "1500") {
            element.item_list = [];
            element.item_list.push({
              content: "Equipment",
              item_id: 1110003,
              item_name: "Light Savior",
              item_type: "Weapon",
              item_description: "Was crafted on May 4th.",
              item_mainstats: "+75 ATK",
              item_starting_rarity: 4,
              item_effect: ["ATK +15%", "All skill cooldown -15%", "Triggers a backward slash every 5 attacks", "ATK +25%", "Leaves behind a sword array every 10 attacks"],
              item_current_rarity: 4,
              item_super: true,
              isDesign: false,
              isItem: true,
              isMaterial: false,
              isEquipped: false,
              base_stats: [
                {
                  type: "Atk",
                  value: 75,
                },
              ],
              effect_bonus: [
                {
                  type: "Atk",
                  value: 15,
                },
              ],
              level_up_price: [
                {
                  type: "Gold",
                  value: 1000,
                },
                {
                  type: "Design",
                  value: 1,
                },
              ],
              level_down_reward: [],
              level_bonus: [],
              min_level: 1,
              max_level: 50,
              level: 1,
              value: 1,
            });
          } else if (element.task_name == "700") {
            element.item_list = [];
            element.item_list.push({
              content: "Equipment",
              item_id: 2130002,
              item_name: "Immortal Suit",
              item_type: "Armor",
              item_description: "Mysterious technology of a higher life form.",
              item_mainstats: "+300 HP",
              item_starting_rarity: 4,
              item_effect: ["Revives with full HP once", "HP +15%", "After revival, ATK +15%, Movement speed +15%", "HP +25%", "+1 Revival"],
              item_current_rarity: 4,
              item_super: true,
              isDesign: false,
              isItem: true,
              isMaterial: false,
              isEquipped: false,
              base_stats: [
                {
                  type: "Hp",
                  value: 300,
                },
              ],
              effect_bonus: [
                {
                  type: "Hp",
                  value: 15,
                },
              ],
              level_up_price: [
                {
                  type: "Gold",
                  value: 1000,
                },
                {
                  type: "Design",
                  value: 1,
                },
              ],
              level_down_reward: [],
              level_bonus: [],
              min_level: 1,
              max_level: 50,
              level: 1,
              value: 1,
            });
          }

          // console.log(element);
        }
      }
    }

    return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, {
      events: finalEvents,
    });
  } catch (err) {
    console.log(err);
    return new ErrorResponse(res, HTTP_STATUS_CODE.NOT_FOUND, ERROR_CODE.INVALID_USER, Message.USER_NOT_FOUND);
  }
};

const claimEventTask = async (req, res, next) => {
  let respondSend = false;
  try {
    const { event_id, tab_id, task_id } = req.body;

    // Validate if user exist in our database
    const user = await User.findById(req.user_jwt.user_id);

    const current_gold = user.gold;
    const current_gem = user.gem;

    if (!user) {
      return new ErrorResponse(res, HTTP_STATUS_CODE.NOT_FOUND, ERROR_CODE.INVALID_USER, Message.USER_NOT_FOUND);
    }

    // ABTEST
    let ab_test_segment = user.game_segment ? user.game_segment : "default";
    let game_version = user.game_version ? user.game_version : "default";
    let ab_config = await getABSegmentFunc(ab_test_segment, game_version);

    // check task valid
    let eventInfo = user.events.id(event_id);

    if (ab_config && ab_config.claim_all && eventInfo.event_id != Types.EventID.MAIN_QUEST) {
      console.log("Claim ALL REDIRECT");
      return claimAllEventTask(req, res, next);
    }

    console.log("Claim ONEEEEEEEEE REDIRECT");

    let taskInfo = eventInfo.tabs.id(tab_id).tasks.id(task_id);
    if (!taskInfo) {
      return new ErrorResponse(res, HTTP_STATUS_CODE.NOT_FOUND, ERROR_CODE.EVENT_ERROR_TASK_NOT_FOUND, Message.EVENT_ERROR_TASK_NOT_FOUND);
    }

    // check task status
    if (taskInfo.status === 3) {
      return new ErrorResponse(res, HTTP_STATUS_CODE.NOT_FOUND, ERROR_CODE.EVENT_ERROR_TASK_CLAIMED, Message.EVENT_ERROR_TASK_CLAIMED);
    }

    if (taskInfo.status !== 2) {
      return new ErrorResponse(res, HTTP_STATUS_CODE.NOT_FOUND, ERROR_CODE.EVENT_ERROR_TASK_NOT_COMPLETED, Message.EVENT_ERROR_TASK_NOT_COMPLETED);
    }

    // add reward
    let result_reward = await addEventReward(user, taskInfo.item_list, eventInfo, req.user_jwt.version);

    // update staus
    eventInfo.tabs.id(tab_id).tasks.id(task_id).status = 3;

    if (eventInfo.event_id === Types.EventID.DAILIES) {
      record47CompleteXDailyTask(user._id, 1);
    }

    if (eventInfo.event_id === Types.EventID.MAIN_QUEST) {
      let list_quest_reset = [
        Types.EventTaskCondition.TASK_CONDITION_52_EVOLVE_X_SKILLS,
        Types.EventTaskCondition.TASK_CONDITION_63_UPGRADE_EQUIPMENT_X_TIME,
        Types.EventTaskCondition.TASK_CONDITION_66_DEFEAT_X_ELITE,
        Types.EventTaskCondition.TASK_CONDITION_67_DEFEAT_X_BOSS,
        Types.EventTaskCondition.TASK_CONDITION_68_OPEN_S_CRATE_X_TIME,
        Types.EventTaskCondition.TASK_CONDITION_70_USE_POWER_UP_BOMB_X_TIME,
        Types.EventTaskCondition.TASK_CONDITION_71_DEFEAT_X_ELITE_BY_CROSSBOW,
        Types.EventTaskCondition.TASK_CONDITION_72_DEFEAT_X_MOB_BY_REVOLVER,
        Types.EventTaskCondition.TASK_CONDITION_73_DEFEAT_X_MOB_BY_CROSSBOW,
        Types.EventTaskCondition.TASK_CONDITION_75_MERGE_GADGET_X_TIME,
        Types.EventTaskCondition.TASK_CONDITION_77_USE_S_EQUIPMENT_IN_BATTLE,
        Types.EventTaskCondition.TASK_CONDITION_79_USE_X_ACTIVE_SKILL_IN_BATTLE,
      ];

      if (list_quest_reset.includes(eventInfo.tabs.id(tab_id).tasks.id(task_id).conditions[0].condition_type)) {
        await redisSetUserEventRecords(user._id, Types.EventID.MAIN_QUEST, eventInfo.tabs.id(tab_id).tasks.id(task_id).conditions[0].condition_type, 0);
      }
    }

    // refresh milestone status
    await refreshMilestonCondition(user._id, eventInfo);

    let userRecord = await redisGetAllUserRecords(user._id);

    for (let refresh_event of user.events) {
      await refreshTaskCondition(user, refresh_event, userRecord);
    }
    // refresh task status

    // getInfoSmall
    if (!respondSend) {
      respondSend = true;

      let temp = new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, {
        user: user.getInfo(),
        events: [...user.getEvents()],
        // events: [user.events.id(event_id)],
        // events: [],
        item_list: result_reward,
      });
    }

    // FIXME: temp fix claim time to slow
    user.markModified("events");
    await user.save();

    // Tracking
    const common_column = await redisGetTrackingCommonColumns(user._id);
    let last_tracking = await redisGetLastTracking(user.gaia.id);
    const total_spt = await redisSetTrackingTotalSpt(user.gaia.id, Date.now() - last_tracking);
    // const total_spt = await redisGetTrackingTotalSpt(user.gaia.id);
    let tracking_user = await User.findByIdAndUpdate(user._id, { total_spt });
    // user.total_spt = total_spt;

    const earn_task_point = taskInfo.item_list.find((item) => item.item_name == "Task Point");

    let common_tracking = {
      user_id: user.gaia.id ? user.gaia.id : user._id,
      device_id: common_column.device_id,
      adid: common_column.adid,
      login_count: user.login_count,
      register_ts: user.register_ts,
      os: common_column.os,
      client_version: common_column.client_version,
      // login_time: common_column.login_time,
      total_spt,
      ab_test_segment: common_column.ab_test_segment,
      level: user.level,
      exp: user.exp,
      os_version: common_column.os_version,
      lifetime_spend: user.lifetime_spend,
      purchase_count: user.purchase_count,
      paid_gold: user.paid_gold,
      free_gold: user.free_gold,
      gold: current_gold,
      paid_gem: user.paid_gem,
      free_gem: user.free_gem,
      gem: current_gem,
      tracker_name: common_column.tracker_name,
      network: common_column.network,
      campaign: common_column.campaign,
      adgroup: common_column.adgroup,
      creative: common_column.creative,
      locale: common_column.locale,
      timezone_offset: common_column.timezone_offset,
    };

    let body_tracking = [
      {
        event_id: "server_claim_challenge",
        type: eventInfo.event_type.toUpperCase() + "_" + String(taskInfo.task_name).replaceAll(" ", "_"),
        task_id,
        task_point: eventInfo.task_point,
        earn_task_point: earn_task_point ? earn_task_point.value : 0,
        reward: taskInfo.item_list,
      },
      {
        event_id: "server_reward",
        operation_event_id: eventInfo.event_title.toLowerCase(),
        reward_cause_type: eventInfo.event_type.toUpperCase() + "_" + taskInfo.task_name.replaceAll(" ", "_"),
        reward: taskInfo.item_list,
      },
    ];

    if (eventInfo.event_id == Types.EventID.ROOKIE_LOGIN || eventInfo.event_id == Types.EventID.SERVER_LAUNCH || eventInfo.event_id == Types.EventID.DAILY_REWARDS) {
      let type_tracking_daily_reward;
      switch (eventInfo.event_id) {
        case Types.EventID.ROOKIE_LOGIN:
          type_tracking_daily_reward = "rookie_login_gifts";
          break;
        case Types.EventID.SERVER_LAUNCH:
          type_tracking_daily_reward = "server_launch_challenge";
          break;
        case Types.EventID.DAILY_REWARDS:
          type_tracking_daily_reward = "seven_day";
          break;
        default:
          break;
      }

      recordSource = await redisGetAllUserEventRecords(user._id, eventInfo.event_id);
      let nth_day = recordSource[Types.EventTaskCondition.TASK_CONDITION_3_LOGIN_X_DAY];

      body_tracking.push({
        event_id: "server_daily_reward",
        type: type_tracking_daily_reward,
        nth_day,
        reward: taskInfo.item_list,
      });
    }

    for (const item of taskInfo.item_list) {
      if (item.item_type == Types.Content.KEY) {
        let type;
        if (item.item_id == 2400005) {
          type = "silver";
        } else if (item.item_id == 2400006) {
          type = "gold";
        } else {
          type = "S";
        }

        body_tracking.push({
          event_id: "server_earn_key",
          type,
          category: "META",
          sub_category: eventInfo.event_type.toUpperCase() + "_" + taskInfo.task_name.replaceAll(" ", "_"),
          earned_amount: item.value,
        });
      } else if (item.item_type == Types.Content.GEM) {
        body_tracking.push({
          event_id: "server_earn_gem",
          earned_gem: item.value,
          category: "CHALLENGE",
          sub_category: eventInfo.event_type.toUpperCase() + "_" + taskInfo.task_name.replaceAll(" ", "_"),
        });
      }
    }
    trackingServer(common_tracking, body_tracking);
  } catch (err) {
    console.log(err);
    if (!respondSend) {
      return new ErrorResponse(res, HTTP_STATUS_CODE.NOT_FOUND, ERROR_CODE.INVALID_USER, Message.USER_NOT_FOUND);
    }
  }
};

const claimAllEventTask = async (req, res, next) => {
  let respondSend = false;
  try {
    const { event_id, tab_id, task_id } = req.body;

    // Validate if user exist in our database
    const user = await User.findById(req.user_jwt.user_id);

    const current_gold = user.gold;
    const current_gem = user.gem;

    if (!user) {
      return new ErrorResponse(res, HTTP_STATUS_CODE.NOT_FOUND, ERROR_CODE.INVALID_USER, Message.USER_NOT_FOUND);
    }

    // check task valid
    let eventInfo = user.events.id(event_id);
    let taskInfo = eventInfo.tabs.id(tab_id).tasks.id(task_id);
    if (!taskInfo) {
      return new ErrorResponse(res, HTTP_STATUS_CODE.NOT_FOUND, ERROR_CODE.EVENT_ERROR_TASK_NOT_FOUND, Message.EVENT_ERROR_TASK_NOT_FOUND);
    }

    // check task status
    if (taskInfo.status === 3) {
      return new ErrorResponse(res, HTTP_STATUS_CODE.NOT_FOUND, ERROR_CODE.EVENT_ERROR_TASK_CLAIMED, Message.EVENT_ERROR_TASK_CLAIMED);
    }

    if (taskInfo.status !== 2) {
      return new ErrorResponse(res, HTTP_STATUS_CODE.NOT_FOUND, ERROR_CODE.EVENT_ERROR_TASK_NOT_COMPLETED, Message.EVENT_ERROR_TASK_NOT_COMPLETED);
    }

    //TODO:
    console.log("---------------");

    // let isNeedRecheck = false;
    let result_reward = [];

    if (eventInfo.event_id == Types.EventID.ROOKIE_LOGIN) {
      let tempTab = user.events.id(event_id);

      // do {
      console.log("LOOPPPPPPPPPPP! ROOKIE_LOGIN");
      // isNeedRecheck = false;
      let rewards_list = [];

      for (const tab of tempTab.tabs) {
        for (const iterator of tab.tasks) {
          if (iterator.status == 2) {
            // console.log(iterator.task_name);
            // console.log(iterator.item_list);
            rewards_list.push(...iterator.item_list);
            // update staus
            iterator.status = 3;
            // isNeedRecheck = true;
            // console.log("STATUS: 33333");
          }
        }
      }

      // if (!isNeedRecheck) {
      //   break;
      // }

      let temp_result_reward = await addEventReward(user, rewards_list, eventInfo, req.user_jwt.version);

      result_reward.push(...temp_result_reward);

      // refresh milestone status
      await refreshMilestonCondition(user._id, user.events.id(event_id));

      let userRecord = await redisGetAllUserRecords(user._id);

      for (let refresh_event of user.events) {
        await refreshTaskCondition(user, refresh_event, userRecord);
      }
      // } while (isNeedRecheck);
    } else {
      let tempTask = user.events.id(event_id).tabs.id(tab_id).tasks;

      // do {
      console.log("LOOPPPPPPPPPPP!");
      // isNeedRecheck = false;
      let rewards_list = [];

      for (const iterator of tempTask) {
        if (iterator.status == 2) {
          // console.log(iterator.task_name);
          // console.log(iterator.item_list);
          rewards_list.push(...iterator.item_list);
          // update staus
          iterator.status = 3;
          // isNeedRecheck = true;

          if (user.events.id(event_id).event_id === Types.EventID.DAILIES) {
            record47CompleteXDailyTask(user._id, 1);
          }
        }
      }

      // if (!isNeedRecheck) {
      //   break;
      // }

      let temp_result_reward = await addEventReward(user, rewards_list, eventInfo, req.user_jwt.version);

      result_reward.push(...temp_result_reward);

      // refresh milestone status
      await refreshMilestonCondition(user._id, user.events.id(event_id));

      let userRecord = await redisGetAllUserRecords(user._id);

      for (let refresh_event of user.events) {
        await refreshTaskCondition(user, refresh_event, userRecord);
      }
      // } while (isNeedRecheck);
    }

    // console.log("---------------");

    // console.log(result_reward);

    // return new ErrorResponse(res, HTTP_STATUS_CODE.NOT_FOUND, ERROR_CODE.INVALID_USER, Message.USER_NOT_FOUND);

    // refresh task status

    // getInfoSmall
    if (!respondSend) {
      respondSend = true;

      let temp = new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, {
        user: user.getInfo(),
        events: [...user.getEvents()],
        // events: [user.events.id(event_id)],
        // events: [],
        item_list: result_reward,
      });
    }

    // FIXME: temp fix claim time to slow
    user.markModified("events");
    await user.save();

    // Tracking
    const common_column = await redisGetTrackingCommonColumns(user._id);
    let last_tracking = await redisGetLastTracking(user.gaia.id);
    const total_spt = await redisSetTrackingTotalSpt(user.gaia.id, Date.now() - last_tracking);
    // const total_spt = await redisGetTrackingTotalSpt(user.gaia.id);
    let tracking_user = await User.findByIdAndUpdate(user._id, { total_spt });
    // user.total_spt = total_spt;

    const earn_task_point = result_reward.find((item) => item.item_name == "Task Point");

    let common_tracking = {
      user_id: user.gaia.id ? user.gaia.id : user._id,
      device_id: common_column.device_id,
      adid: common_column.adid,
      login_count: user.login_count,
      register_ts: user.register_ts,
      os: common_column.os,
      client_version: common_column.client_version,
      // login_time: common_column.login_time,
      total_spt,
      ab_test_segment: common_column.ab_test_segment,
      level: user.level,
      exp: user.exp,
      os_version: common_column.os_version,
      lifetime_spend: user.lifetime_spend,
      purchase_count: user.purchase_count,
      paid_gold: user.paid_gold,
      free_gold: user.free_gold,
      gold: current_gold,
      paid_gem: user.paid_gem,
      free_gem: user.free_gem,
      gem: current_gem,
      tracker_name: common_column.tracker_name,
      network: common_column.network,
      campaign: common_column.campaign,
      adgroup: common_column.adgroup,
      creative: common_column.creative,
      locale: common_column.locale,
      timezone_offset: common_column.timezone_offset,
    };

    let body_tracking = [
      {
        event_id: "server_claim_challenge",
        type: eventInfo.event_type.toUpperCase() + "_" + String(taskInfo.task_name).replaceAll(" ", "_"),
        task_id,
        task_point: eventInfo.task_point,
        earn_task_point: earn_task_point ? earn_task_point.value : 0,
        reward: taskInfo.item_list,
      },
      {
        event_id: "server_reward",
        operation_event_id: eventInfo.event_title.toLowerCase(),
        reward_cause_type: eventInfo.event_type.toUpperCase() + "_" + taskInfo.task_name.replaceAll(" ", "_"),
        reward: taskInfo.item_list,
      },
    ];

    if (eventInfo.event_id == Types.EventID.ROOKIE_LOGIN || eventInfo.event_id == Types.EventID.SERVER_LAUNCH || eventInfo.event_id == Types.EventID.DAILY_REWARDS) {
      let type_tracking_daily_reward;
      switch (eventInfo.event_id) {
        case Types.EventID.ROOKIE_LOGIN:
          type_tracking_daily_reward = "rookie_login_gifts";
          break;
        case Types.EventID.SERVER_LAUNCH:
          type_tracking_daily_reward = "server_launch_challenge";
          break;
        case Types.EventID.DAILY_REWARDS:
          type_tracking_daily_reward = "seven_day";
          break;
        default:
          break;
      }

      recordSource = await redisGetAllUserEventRecords(user._id, eventInfo.event_id);
      let nth_day = recordSource[Types.EventTaskCondition.TASK_CONDITION_3_LOGIN_X_DAY];

      body_tracking.push({
        event_id: "server_daily_reward",
        type: type_tracking_daily_reward,
        nth_day,
        reward: result_reward,
      });
    }

    for (const item of result_reward) {
      if (item.item_type == Types.Content.KEY) {
        let type;
        if (item.item_id == 2400005) {
          type = "silver";
        } else if (item.item_id == 2400006) {
          type = "gold";
        } else {
          type = "S";
        }

        body_tracking.push({
          event_id: "server_earn_key",
          type,
          category: "META",
          sub_category: eventInfo.event_type.toUpperCase() + "_" + taskInfo.task_name.replaceAll(" ", "_"),
          earned_amount: item.value,
        });
      } else if (item.item_type == Types.Content.GEM) {
        body_tracking.push({
          event_id: "server_earn_gem",
          earned_gem: item.value,
          category: "CHALLENGE",
          sub_category: eventInfo.event_type.toUpperCase() + "_" + taskInfo.task_name.replaceAll(" ", "_"),
        });
      }
    }
    trackingServer(common_tracking, body_tracking);
  } catch (err) {
    console.log(err);
    if (!respondSend) {
      return new ErrorResponse(res, HTTP_STATUS_CODE.NOT_FOUND, ERROR_CODE.INVALID_USER, Message.USER_NOT_FOUND);
    }
  }
};

const claimEventMilestone = async (req, res, next) => {
  let respondSend = false;
  try {
    const { event_id, task_id } = req.body;

    // Validate if user exist in our database
    const user = await User.findById(req.user_jwt.user_id);

    // // : Test
    // user.events.id(event_id).tabs.id(tab_id).tasks.id(task_id).status = 2;
    // user.markModified("events");
    // await user.save();
    // console.log(user)

    if (!user) {
      return new ErrorResponse(res, HTTP_STATUS_CODE.NOT_FOUND, ERROR_CODE.INVALID_USER, Message.USER_NOT_FOUND);
    }

    // check task valid
    let eventInfo = user.events.id(event_id);

    // ABTEST
    let ab_test_segment = user.game_segment ? user.game_segment : "default";
    let game_version = user.game_version ? user.game_version : "default";
    let ab_config = await getABSegmentFunc(ab_test_segment, game_version);

    if (ab_config && ab_config.claim_all) {
      console.log("Claim ALL Mile REDIRECT");
      return claimAllEventMilestone(req, res, next);
    }

    console.log("Claim ONE Mile REDIRECT");

    // console.log(eventInfo);
    let milestoneInfo = user.events.id(event_id).milestone.id(task_id);

    if (!milestoneInfo) {
      return new ErrorResponse(res, HTTP_STATUS_CODE.NOT_FOUND, ERROR_CODE.EVENT_ERROR_TASK_NOT_FOUND, Message.EVENT_ERROR_TASK_NOT_FOUND);
    }

    // check task status
    if (milestoneInfo.status === 3) {
      return new ErrorResponse(res, HTTP_STATUS_CODE.NOT_FOUND, ERROR_CODE.EVENT_ERROR_TASK_CLAIMED, Message.EVENT_ERROR_TASK_CLAIMED);
    }

    if (milestoneInfo.status !== 2) {
      return new ErrorResponse(res, HTTP_STATUS_CODE.NOT_FOUND, ERROR_CODE.EVENT_ERROR_TASK_NOT_COMPLETED, Message.EVENT_ERROR_TASK_NOT_COMPLETED);
    }
    // add reward
    // console.log(eventInfo.task_point);
    let result_reward = await addEventReward(user, milestoneInfo.item_list, eventInfo, req.user_jwt.version);

    // console.log(taskInfo)

    // update staus
    user.events.id(event_id).milestone.id(task_id).status = 3;

    // Tracking
    const common_column = await redisGetTrackingCommonColumns(user._id);
    let last_tracking = await redisGetLastTracking(user.gaia.id);
    const total_spt = await redisSetTrackingTotalSpt(user.gaia.id, Date.now() - last_tracking);
    // const total_spt = await redisGetTrackingTotalSpt(user.gaia.id);

    user.total_spt = total_spt;

    if (!respondSend) {
      respondSend = true;

      let temp = new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, {
        user: user.getInfo(),
        events: [...user.getEvents()],
        // events: [user.events.id(event_id)],
        // events: [],
        item_list: result_reward,
      });
    }

    // FIXME: temp fix claim time to slow
    user.markModified("events");
    await user.save();

    let common_tracking = {
      user_id: user.gaia.id ? user.gaia.id : user._id,
      device_id: common_column.device_id,
      adid: common_column.adid,
      login_count: user.login_count,
      register_ts: user.register_ts,
      os: common_column.os,
      client_version: common_column.client_version,
      // login_time: common_column.login_time,
      total_spt,
      ab_test_segment: common_column.ab_test_segment,
      level: user.level,
      exp: user.exp,
      os_version: common_column.os_version,
      lifetime_spend: user.lifetime_spend,
      purchase_count: user.purchase_count,
      paid_gold: user.paid_gold,
      free_gold: user.free_gold,
      gold: user.gold,
      paid_gem: user.paid_gem,
      free_gem: user.free_gem,
      gem: user.gem,
      tracker_name: common_column.tracker_name,
      network: common_column.network,
      campaign: common_column.campaign,
      adgroup: common_column.adgroup,
      creative: common_column.creative,
      locale: common_column.locale,
      timezone_offset: common_column.timezone_offset,
    };

    let body_tracking = [
      {
        event_id: "server_reward",
        operation_event_id: eventInfo.event_title.toLowerCase(),
        reward_cause_type: eventInfo.event_type.toUpperCase() + "_" + milestoneInfo.task_name.replaceAll(" ", "_"),
        reward: result_reward,
      },
    ];

    for (const item of result_reward) {
      switch (item.content) {
        case Types.Content.GEM:
          body_tracking.push({
            event_id: "server_earn_gem",
            earned_gem: item.value,
            category: "META",
            sub_category: "DAILY_MILESTONE",
          });
          break;
        case Types.Content.GOLD:
          body_tracking.push({
            event_id: "server_earn_gold",
            earned_gold: item.value,
            category: "META",
            sub_category: "DAILY_MILESTONE",
          });
          break;
        case Types.Content.REVIVE_TOKEN:
          body_tracking.push({
            event_id: "server_earn_consumable",
            consumable_content: "revive_token",
            consumable_id: item.item_id,
            consumable_type: item.item_type,
            consumable_name: item.item_name,
            category: "META",
            sub_category: "DAILY_MILESTONE",
            earned_amount: item.value,
          });
          break;
        case Types.Content.DESIGN:
          body_tracking.push({
            event_id: "server_earn_consumable",
            consumable_content: "design",
            consumable_id: item.item_id,
            consumable_type: item.item_type,
            consumable_name: item.item_name,
            category: "META",
            sub_category: "DAILY_MILESTONE",
            earned_amount: item.value,
          });
          break;
        case Types.Content.KEY:
          body_tracking.push({
            event_id: "server_earn_consumable",
            consumable_content: "key",
            consumable_id: item.item_id,
            consumable_type: item.item_type,
            consumable_name: item.item_name,
            category: "META",
            sub_category: "DAILY_MILESTONE",
            earned_amount: item.value,
          });
          break;
        default:
          break;
      }
    }

    trackingServer(common_tracking, body_tracking);

    // const hasEquipment = result_reward.find((item) => {
    //   return item.content == "Equipment" || item.content == "Design";
    // });

    // if (hasEquipment) {
    // } else {
    //   return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, {
    //     user: user.getInfoSmall(),
    //     events: [...user.getEvents()],
    //     // events: [user.events.id(event_id)],
    //     // events: [],
    //     item_list: result_reward,
    //   });
    // }

    // return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, {
    //   user: user.getInfo(),
    //   events: [...user.getEvents()],
    //   // events: [user.events.id(event_id)],
    //   // events: [],
    //   item_list: result_reward,
    // });
  } catch (err) {
    console.log(err);
    return new ErrorResponse(res, HTTP_STATUS_CODE.NOT_FOUND, ERROR_CODE.INVALID_USER, Message.USER_NOT_FOUND);
  }
};

const claimAllEventMilestone = async (req, res, next) => {
  let respondSend = false;
  try {
    const { event_id, task_id } = req.body;

    // Validate if user exist in our database
    const user = await User.findById(req.user_jwt.user_id);

    // // : Test
    // user.events.id(event_id).tabs.id(tab_id).tasks.id(task_id).status = 2;
    // user.markModified("events");
    // await user.save();
    // console.log(user)

    if (!user) {
      return new ErrorResponse(res, HTTP_STATUS_CODE.NOT_FOUND, ERROR_CODE.INVALID_USER, Message.USER_NOT_FOUND);
    }

    // check task valid
    let eventInfo = user.events.id(event_id);

    // console.log(eventInfo);
    let milestoneInfo = user.events.id(event_id).milestone.id(task_id);

    if (!milestoneInfo) {
      return new ErrorResponse(res, HTTP_STATUS_CODE.NOT_FOUND, ERROR_CODE.EVENT_ERROR_TASK_NOT_FOUND, Message.EVENT_ERROR_TASK_NOT_FOUND);
    }

    // check task status
    if (milestoneInfo.status === 3) {
      return new ErrorResponse(res, HTTP_STATUS_CODE.NOT_FOUND, ERROR_CODE.EVENT_ERROR_TASK_CLAIMED, Message.EVENT_ERROR_TASK_CLAIMED);
    }

    if (milestoneInfo.status !== 2) {
      return new ErrorResponse(res, HTTP_STATUS_CODE.NOT_FOUND, ERROR_CODE.EVENT_ERROR_TASK_NOT_COMPLETED, Message.EVENT_ERROR_TASK_NOT_COMPLETED);
    }
    // add reward
    // console.log(eventInfo.task_point);

    // TODO: check all milestone

    let rewards_list = [];

    for (const milestoneElement of user.events.id(event_id).milestone) {
      if (milestoneElement.status == 2) {
        console.log(milestoneElement.task_name);
        rewards_list.push(...milestoneInfo.item_list);
        milestoneElement.status = 3;

        if (user.events.id(event_id).event_id == 3100001) {
          record69ClaimDailyMileStone(user._id, 1);
        }
      }
    }

    // console.log(rewards_list);

    let result_reward = await addEventReward(user, rewards_list, eventInfo, req.user_jwt.version);

    // console.log(taskInfo)

    // update staus
    // user.events.id(event_id).milestone.id(task_id).status = 3;

    // return new ErrorResponse(res, HTTP_STATUS_CODE.NOT_FOUND, ERROR_CODE.INVALID_USER, Message.USER_NOT_FOUND);

    // Tracking
    const common_column = await redisGetTrackingCommonColumns(user._id);
    let last_tracking = await redisGetLastTracking(user.gaia.id);
    const total_spt = await redisSetTrackingTotalSpt(user.gaia.id, Date.now() - last_tracking);
    // const total_spt = await redisGetTrackingTotalSpt(user.gaia.id);

    user.total_spt = total_spt;

    if (!respondSend) {
      respondSend = true;

      let temp = new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, {
        user: user.getInfo(),
        events: [...user.getEvents()],
        // events: [user.events.id(event_id)],
        // events: [],
        item_list: result_reward,
      });
    }

    // FIXME: temp fix claim time to slow
    user.markModified("events");
    await user.save();

    let common_tracking = {
      user_id: user.gaia.id ? user.gaia.id : user._id,
      device_id: common_column.device_id,
      adid: common_column.adid,
      login_count: user.login_count,
      register_ts: user.register_ts,
      os: common_column.os,
      client_version: common_column.client_version,
      // login_time: common_column.login_time,
      total_spt,
      ab_test_segment: common_column.ab_test_segment,
      level: user.level,
      exp: user.exp,
      os_version: common_column.os_version,
      lifetime_spend: user.lifetime_spend,
      purchase_count: user.purchase_count,
      paid_gold: user.paid_gold,
      free_gold: user.free_gold,
      gold: user.gold,
      paid_gem: user.paid_gem,
      free_gem: user.free_gem,
      gem: user.gem,
      tracker_name: common_column.tracker_name,
      network: common_column.network,
      campaign: common_column.campaign,
      adgroup: common_column.adgroup,
      creative: common_column.creative,
      locale: common_column.locale,
      timezone_offset: common_column.timezone_offset,
    };

    let body_tracking = [
      {
        event_id: "server_reward",
        operation_event_id: eventInfo.event_title.toLowerCase(),
        reward_cause_type: eventInfo.event_type.toUpperCase() + "_" + milestoneInfo.task_name.replaceAll(" ", "_"),
        reward: result_reward,
      },
    ];

    for (const item of result_reward) {
      switch (item.content) {
        case Types.Content.GEM:
          body_tracking.push({
            event_id: "server_earn_gem",
            earned_gem: item.value,
            category: "META",
            sub_category: "DAILY_MILESTONE",
          });
          break;
        case Types.Content.GOLD:
          body_tracking.push({
            event_id: "server_earn_gold",
            earned_gold: item.value,
            category: "META",
            sub_category: "DAILY_MILESTONE",
          });
          break;
        case Types.Content.REVIVE_TOKEN:
          body_tracking.push({
            event_id: "server_earn_consumable",
            consumable_content: "revive_token",
            consumable_id: item.item_id,
            consumable_type: item.item_type,
            consumable_name: item.item_name,
            category: "META",
            sub_category: "DAILY_MILESTONE",
            earned_amount: item.value,
          });
          break;
        case Types.Content.DESIGN:
          body_tracking.push({
            event_id: "server_earn_consumable",
            consumable_content: "design",
            consumable_id: item.item_id,
            consumable_type: item.item_type,
            consumable_name: item.item_name,
            category: "META",
            sub_category: "DAILY_MILESTONE",
            earned_amount: item.value,
          });
          break;
        case Types.Content.KEY:
          body_tracking.push({
            event_id: "server_earn_consumable",
            consumable_content: "key",
            consumable_id: item.item_id,
            consumable_type: item.item_type,
            consumable_name: item.item_name,
            category: "META",
            sub_category: "DAILY_MILESTONE",
            earned_amount: item.value,
          });
          break;
        default:
          break;
      }
    }

    trackingServer(common_tracking, body_tracking);

    // const hasEquipment = result_reward.find((item) => {
    //   return item.content == "Equipment" || item.content == "Design";
    // });

    // if (hasEquipment) {
    // } else {
    //   return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, {
    //     user: user.getInfoSmall(),
    //     events: [...user.getEvents()],
    //     // events: [user.events.id(event_id)],
    //     // events: [],
    //     item_list: result_reward,
    //   });
    // }

    // return new SuccessResponse(res, HTTP_STATUS_CODE.OK, ERROR_CODE.NONE, {
    //   user: user.getInfo(),
    //   events: [...user.getEvents()],
    //   // events: [user.events.id(event_id)],
    //   // events: [],
    //   item_list: result_reward,
    // });
  } catch (err) {
    console.log(err);
    return new ErrorResponse(res, HTTP_STATUS_CODE.NOT_FOUND, ERROR_CODE.INVALID_USER, Message.USER_NOT_FOUND);
  }
};

module.exports = {
  getGameEvent,
  claimEventTask,
  claimEventMilestone,
  claimAllEventTask,
  claimAllEventMilestone,
};
