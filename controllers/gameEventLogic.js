const {
  redisAddUserEventId,
  redisGetAllUserEventIds,
  redisGetAllUserRecords,
  redisGetAllUserEventRecords,
  redisGetTrackingCommonColumns,
  redisGetTrackingTotalSpt,
  redisSetTrackingTotalSpt,
  redisGetLastTracking,
} = require("../config/redisClient");
const Types = require("../config/types");
const { addReward } = require("./reward");
const { trackingServerCompleteChallenge } = require("./tracking");
var moment = require("moment"); // require
const { recordClaimTotalGem, recordClaimTotalGold, record47CompleteXDailyTask } = require("./gameEventRecord");

//--- EVENT -------

const checkEventSpecialCondition = async (user, conditionArray) => {
  // console.log(conditionArray);
  let isQualify = true;

  for (let condition of conditionArray) {
    // condition_value
    switch (condition.condition_type) {
      case Types.EventSpecialCondition.SPECIAL_CONDITION_0_NONE:
        break;
      case Types.EventSpecialCondition.SPECIAL_CONDITION_1_CLEAR_STAGE:
        if (user.data_stage.id_stage_current < condition.condition_value) {
          isQualify = false;
        }
        break;
      case Types.EventSpecialCondition.SPECIAL_CONDITION_2_LEVEL:
        if (user.level < condition.condition_value) {
          isQualify = false;
        }
        break;
      case Types.EventSpecialCondition.SPECIAL_CONDITION_4_DAILY_REWARD:
        if (user.data_stage.id_stage_current < condition.condition_value || (user.data_stage.id_stage_current == condition.condition_value && user.data_stage.time_survived <= 0)) {
          isQualify = false;
        }
        break;

      default:
        break;
    }
  }

  return isQualify;
};

// const checkTaskCondition = (user, conditionArray) => {
//   console.log(conditionArray);
//   let isQualify = true;

//   for (let condition of conditionArray) {
//     // condition_value
//     switch (condition.condition_type) {
//       case Types.EventSpecialCondition.SPECIAL_CONDITION_0_NONE:
//         break;
//       case Types.EventSpecialCondition.SPECIAL_CONDITION_1_CLEAR_STAGE:
//         if (user.data_stage.id_stage_current < condition.condition_value) {
//           isQualify = false;
//         }
//         break;
//       case Types.EventSpecialCondition.SPECIAL_CONDITION_2_LEVEL:
//         if (user.level < condition.condition_value) {
//           isQualify = false;
//         }
//         break;

//       default:
//         break;
//     }
//   }

//   return isQualify;
// };

const refreshMilestonCondition = async (userId, event) => {
  let isNeedToSave = false;
  let temp_claimable = event.new_claimable;
  let new_claimable = false;

  // console.log(event.milestone);

  // if(!event.milestone || event.milestone.length === 0) {
  //   return isNeedToSave;
  // }
  let eventId = event.event_id;
  let recordSource = await redisGetAllUserEventRecords(userId, eventId);
  // let recordSource = userRecord;

  // taskpoint for DAILY_REWARDS
  if (eventId === Types.EventID.DAILY_REWARDS && recordSource.hasOwnProperty(Types.EventTaskCondition.TASK_CONDITION_3_LOGIN_X_DAY)) {
    event.task_point = recordSource[Types.EventTaskCondition.TASK_CONDITION_3_LOGIN_X_DAY];
  }

  for (let milestone of event.milestone) {
    for (let condition of milestone.conditions) {
      if (condition.condition_type === Types.EventTaskCondition.TASK_CONDITION_0_NONE) {
        if (condition.condition_value <= event.task_point && milestone.status !== 3) {
          milestone.status = 2;
          isNeedToSave = true;
        }
      } else {
        if (recordSource.hasOwnProperty(condition.condition_type)) {
          if (condition.condition_value <= recordSource[condition.condition_type] && milestone.status !== 3) {
            milestone.status = 2;
            isNeedToSave = true;
          }
        }
      }
    }

    if (milestone.status == 2) {
      new_claimable = true;
    }
  }

  if (temp_claimable !== new_claimable) {
    isNeedToSave = true;
  }

  event.new_claimable = new_claimable;
  return isNeedToSave;
};

const refreshTaskCondition = async (user, event, userRecord) => {
  let temp_claimable = event.new_claimable;
  let new_claimable = false;

  // let userId = user._id;
  let eventId = event.event_id;
  // let user_event = await redisGetAllUserEventIds(userId);
  // console.log(user_event);

  let isNeedToSave = false;

  // TODO: check event type : server open, archivement
  let recordSource = {};

  // let userRecord = await redisGetAllUserRecords(userId);

  if (event.status == Types.EventStatus.EXPIRED || event.status == Types.EventStatus.COMPLETED) {
    return isNeedToSave;
  }

  if (
    // event.event_type === "Dailies" ||
    // event.event_type === "Weeklies" ||
    event.event_type === "Achievement" ||
    event.event_type === "ServerLaunchChallenge"
  ) {
    recordSource = userRecord;
  } else {
    recordSource = await redisGetAllUserEventRecords(user._id, eventId);
    // stage, level user
    recordSource[Types.EventTaskCondition.TASK_CONDITION_1_CLEAR_STAGE_X] = userRecord[Types.EventTaskCondition.TASK_CONDITION_1_CLEAR_STAGE_X]
      ? userRecord[Types.EventTaskCondition.TASK_CONDITION_1_CLEAR_STAGE_X]
      : 0;
    recordSource[Types.EventTaskCondition.TASK_CONDITION_2_REACH_LEVEL_X] = userRecord[Types.EventTaskCondition.TASK_CONDITION_2_REACH_LEVEL_X];

    // console.log("TASK_CONDITION_1_CLEAR_STAGE_X", recordSource[Types.EventTaskCondition.TASK_CONDITION_1_CLEAR_STAGE_X]);
    // console.log("TASK_CONDITION_2_REACH_LEVEL_X", recordSource[Types.EventTaskCondition.TASK_CONDITION_2_REACH_LEVEL_X]);
  }

  // console.log(recordSource);

  //========= TAB CHECK =================
  for (let tab of event.tabs) {
    ///console.log(" ---tab:", tab.tab_name, " length:", tab.tasks.length);

    // TODO: tab condition
    let isTabOpen = true;
    for (let tabCondition of tab.conditions) {
      // console.log(tabCondition);

      // skip type 0
      if (tabCondition.condition_type === 0) {
        continue;
      }

      // TODO:
      if (event.event_id === Types.EventID.SERVER_LAUNCH) {
        var a = moment(new Date()).startOf("day");
        var b = moment.unix(event.event_start_date).startOf("day");

        let x = a.diff(b, "days") + 1;

        // console.log(x);

        if (tabCondition.condition_value > x) {
          isTabOpen = false;
        }
        continue;
      }

      if (recordSource.hasOwnProperty(tabCondition.condition_type)) {
        ///console.log("\t\t", recordSource[tabCondition.condition_type], " >= ", tabCondition.condition_value, "?");

        if (recordSource[tabCondition.condition_type] < tabCondition.condition_value) {
          isTabOpen = false;
        }
      } else {
        ///console.log("\t\t", recordSource[tabCondition.condition_type], " >= ", tabCondition.condition_value, "?");
        isTabOpen = false;
      }
      //////////
    }

    if (isTabOpen) {
      if (tab.status !== 2) {
        tab.status = 1;
        isNeedToSave = true;
      }
    }

    ///console.logs("           #TabOpen", isTabOpen);

    // ===== TASK CHECK ===========
    for (let task of tab.tasks) {
      let canClaim = true;
      ///console.log(" -----task:", task.task_name);

      for (let taskCondition of task.conditions) {
        // skip type 0
        if (taskCondition.condition_type === 0) {
          continue;
        }

        if (recordSource.hasOwnProperty(taskCondition.condition_type)) {
          ///console.log("\t\t", recordSource[taskCondition.condition_type], " >= ", taskCondition.condition_value, "?");

          if (taskCondition.condition_type == Types.EventTaskCondition.TASK_CONDITION_53_EVOLVE_SKILL_X) {
            if (!JSON.parse(recordSource[taskCondition.condition_type]).includes(String(taskCondition.condition_value))) {
              canClaim = false;
            }
          } else if (taskCondition.condition_type == Types.EventTaskCondition.TASK_CONDITION_64_GET_5_STAR_SKILL_X) {
            if (!JSON.parse(recordSource[taskCondition.condition_type]).includes(String(taskCondition.condition_value))) {
              canClaim = false;
            }
          } else {
            if (taskCondition.current_value !== recordSource[taskCondition.condition_type]) {
              taskCondition.current_value = recordSource[taskCondition.condition_type];

              if (
                taskCondition.condition_type == Types.EventTaskCondition.TASK_CONDITION_62_PLAY_CHAPTER_X_1_TIME ||
                taskCondition.condition_type == Types.EventTaskCondition.TASK_CONDITION_74_USE_EXCELLENT_EQUIPMENT_PLAY_CHAPTER_X
              ) {
                if (taskCondition.current_value != taskCondition.condition_value) {
                  canClaim = false;
                }
              } else {
                // Fix current value > condition
                if (taskCondition.current_value > taskCondition.condition_value) {
                  taskCondition.current_value = taskCondition.condition_value;
                }
              }

              isNeedToSave = true;
            }

            if (recordSource[taskCondition.condition_type] < taskCondition.condition_value) {
              canClaim = false;
            }
          }
        } else {
          ///console.log("\t\t", recordSource[taskCondition.condition_type], " >= ", taskCondition.condition_value, "?");
          taskCondition.current_value = 0;
          canClaim = false;
        }
      }

      if (canClaim) {
        if (task.status !== 2 && task.status !== 3) {
          task.status = 2;

          isNeedToSave = true;
          console.log(task.task_name);
          // Tracking
          const common_column = await redisGetTrackingCommonColumns(user._id);
          let last_tracking = await redisGetLastTracking(user.gaia.id);
          const total_spt = await redisSetTrackingTotalSpt(user.gaia.id, Date.now() - last_tracking);
          // const total_spt = await redisGetTrackingTotalSpt(user.gaia.id);

          user.total_spt = total_spt;

          const task_point_before = user.events.find((item) => item.event_id == event.event_id).task_point;

          trackingServerCompleteChallenge(
            user.gaia.id,
            common_column.device_id,
            common_column.adid,
            user.login_count,
            user.register_ts,
            common_column.os,
            common_column.client_version,
            total_spt,
            common_column.ab_test_segment,
            user.level,
            user.exp,
            common_column.os_version,
            user.lifetime_spend,
            user.purchase_count,
            user.paid_gold,
            user.free_gold,
            user.gold,
            user.paid_gem,
            user.free_gem,
            user.gem,
            common_column.tracker_name,
            common_column.network,
            common_column.campaign,
            common_column.adgroup,
            common_column.creative,
            common_column.locale,
            common_column.timezone_offset,
            event.event_type,
            task._id,
            task_point_before,
            JSON.stringify(task.item_list)
          );
        }
      }

      if (task.status == 2) {
        new_claimable = true;
      }
    }
  }

  if (temp_claimable !== new_claimable) {
    isNeedToSave = true;
  }

  event.new_claimable = new_claimable;

  return isNeedToSave;
};

// TODO: reset event

const resetMilestonCondition = async (event) => {
  for (let milestone of event.milestone) {
    milestone.status = 1;
  }
};

const resetTaskCondition = async (event) => {
  //========= TAB CHECK =================
  for (let tab of event.tabs) {
    tab.status = 0;

    // ===== TASK CHECK ===========
    for (let task of tab.tasks) {
      task.status = 1;
    }
  }
};

const updateRecord = async (user, recordArray) => {
  let isNeedToSave = false;

  for (let event of user.event) {
  }

  // if (event.event_type === "Achievement" || event.event_type === "ServerLaunchChallenge") {
  //   recordSource = user.event_record;
  // }

  // for (let tabs of event.tabs) {
  //   for (let task of tabs.tasks) {
  //     let canClaim = true;
  //     for (let condition of task.conditions) {
  //       var record = recordSource?.find((element) => element.condition_type == condition.condition_type);
  //       if (conditions.current_value !== record.condition_value) {
  //         conditions.current_value = record.condition_value;
  //         isNeedToSave = true;
  //       }
  //       if (condition.condition_value > record.condition_value) {
  //         canClaim = false;
  //       }
  //     }

  //     if (canClaim) {
  //       task.status = 2;
  //       isNeedToSave = true;
  //     }
  //   }
  // }
  return isNeedToSave;
};

const addEventReward = async (user, rewardArray, event, version) => {
  let item_list = [];

  let total_taskpoint = 0;
  let total_gold = 0;
  let total_gem = 0;
  for (let reward of rewardArray) {
    switch (reward.content) {
      case Types.Content.TASK_POINT:
        total_taskpoint += reward.value;
        break;
      case Types.Content.GOLD:
        total_gold += reward.value;
        break;
      case Types.Content.GEM:
        total_gem += reward.value;
        break;
    }
  }

  // TODO: record
  // console.log({total_gem, total_gold })
  // await recordClaimTotalGem(user._id, total_gem);
  // await recordClaimTotalGold(user._id, total_gold);

  if (total_taskpoint > 0) {
    event.task_point += total_taskpoint;
    item_list.push({
      content: "TaskPoint",
      item_id: 2400017,
      item_name: "Task Point",
      item_type: "TaskPoint",
      item_description: "Task Point",
      item_current_rarity: 1,
      is_supper: false,
      display_in_bag: false,
      value: total_taskpoint,
    });
  }

  let item_list_2 = await addReward(user, rewardArray, version);
  item_list.push(...item_list_2);
  return item_list;
};

module.exports = {
  addEventReward,
  refreshTaskCondition,
  checkEventSpecialCondition,
  refreshMilestonCondition,
  resetMilestonCondition,
  resetTaskCondition,
};
