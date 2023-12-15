require("../config/database")();

const {GameEvent} = require("../models/gameEvent");

var crypto = require('crypto');

// meta
const event_rookie_login = require("../data/event/event_rookie_login.json");
const server_launch_challenge = require("../data/event/server_launch_challenge.json");
const dailies = require("../data/event/dailies.json");
const weeklies = require("../data/event/weeklies.json");
const achievement = require("../data/event/achievement.json");
const main_quest = require("../data/event/main_quest.json");
const daily_rewards = require("../data/event/daily_rewards.json");

const server_launch_challenge_9min = require("../data/event/server_launch_challenge_9min.json");
const weeklies_9min = require("../data/event/weeklies_9min.json");


const deleteAllGameEvent = async () => {
  await GameEvent.deleteMany({});
  console.log("Done! deleteAllGameEvent");
};

const addGameEvent = async () => {

        await GameEvent.create({...event_rookie_login});
        await GameEvent.create({...server_launch_challenge});
        await GameEvent.create({...dailies});
        await GameEvent.create({...weeklies});
        await GameEvent.create({...achievement});
        await GameEvent.create({...main_quest});
        await GameEvent.create({...daily_rewards});
        
        await GameEvent.create({...server_launch_challenge_9min});
        await GameEvent.create({...weeklies_9min});

// console.log(JSON.parse(event_rookie_login))
    

};

const main = async () => {
  await deleteAllGameEvent();
  await addGameEvent();


  console.log("Done!");
  process.exit(0);
};

main();
