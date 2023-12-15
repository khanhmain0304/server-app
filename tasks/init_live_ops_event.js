require("../config/database")();
const { LiveOpsEvent } = require("../models/liveOpsEvent");

let live_ops_event = require("../data/event/live_ops.json");

const deleteAllGameEvent = async () => {
  await LiveOpsEvent.deleteMany({});
  console.log("Done! deleteAllLiveOpsEvent");
};

const addLiveOpsEvent = async () => {
  for (const event of live_ops_event.live_ops_event) {
    await LiveOpsEvent.create({ ...event });
  }
};

const main = async () => {
  await deleteAllGameEvent();
  await addLiveOpsEvent();

  console.log("Done!");
  process.exit(0);
};

main();
