require("../config/database")();
const fs = require("fs");
const event_rookie = require("../data/event/event_rookie_login_from_excell.json");
const item_config = require("../data/meta/item_config.json");
const Types = require("../config/types");

const main = async () => {
  let event = {};

  event.event_id = 3000001;
  event.event_type = "RookieLoginGifts";
  event.event_title = "Rookie Login Gifts";
  event.event_description = "Log in daily to claim your 7-Days limited-time Rookie gifts!";
  event.event_start_condition = 0;
  event.event_start_condition_value = 0;
  event.event_expiry_value = 604800;

  event.event_end_date = 0;

  if(event.event_start_condition === 1 && event.event_expiry_value !== -1){
    event.event_end_date = event.event_start_condition_value + event.event_expiry_value;
  }

  event.event_special_condition = [
    {
      condition_type: 1,
      condition_value: 2,
    },
  ];
  event.task_point = 0;
  event.milestone = [];

  //   console.log(equipments[1]);

  let tabs = [];

  // for(let element of event_rookie)
  // {
  //   console.log(element);
  // }

  let rewards = [];

  for (let index = 1; index <= 7; index++) {
    let tab = {};
    tab.tab_name = "RookieLoginGifts";
    tab.status = 0;
    tab.conditions = [
      {
        condition_type: 3,
        condition_value: index,
      },
    ];

    tab.tasks = [];
    let task = {};
    task.task_name = `Login for ${index}d`;
    task.status = 0;
    task.conditions = [
      {
        condition_type: 3,
        condition_value: index,
      },
    ];

    const days = event_rookie.filter((elm) => elm.day === index);
    let reward = [];

    for (let day of days) {
      let itemInfo = item_config.filter((item) => item.item_id == day.reward_id);

      reward.push({ ...itemInfo[0], value: day.values });
    }
    task.item_list = reward;

    tab.tasks.push(task);

    tabs.push(tab);
  }

  event.tabs = tabs;
  console.log(tabs);

  fs.writeFileSync("./data/event/event_rookie_login.json", JSON.stringify(event, null, 2));

  console.log("Done!");
  process.exit(0);
};

main();
