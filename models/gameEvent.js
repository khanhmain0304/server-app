const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConditionSchema = new Schema(
  {
    condition_type: { type: Number, default: 0 },
    condition_value: { type: Number, default: 0 },
  },
  { _id: false }
);
const EventRecordSchema = new Schema(
  {
    condition_type: { type: Number, default: 0 },
    condition_value: { type: Number, default: 0 },
  },
  { _id: false }
);

const TaskConditionSchema = new Schema(
  {
    condition_type: { type: Number, default: 0 },
    condition_value: { type: Number, default: 0 },
    current_value: { type: Number, default: 0 },
  },
  { _id: false }
);

const TaskReward = new Schema({
  content: { type: String, default: "" },
  item_id: { type: Number, default: 0 },
  item_name: { type: String, default: "" },
  item_type: { type: String, default: "" },
  item_description: { type: String, default: "" },
  item_current_rarity: { type: Number, default: 0 },
  value: { type: Number, default: 0 },
});

TaskReward.methods.getInfo = function getInfo() {
  return {
    content: this.content,
    item_id: this.item_id,
    item_name: this.item_name,
    item_type: this.item_type,
    item_description: this.item_description,
    item_current_rarity: this.item_current_rarity,
    value: this.value,
  };
};

const MileStoneSchema = new Schema({
  task_name: { type: String, default: "" },
  conditions: { type: [ConditionSchema], default: [] },
  status: { type: Number, default: 0 },
  show_item_icon: { type: Boolean, default: false },
  item_list: { type: [TaskReward], default: [] },
});

MileStoneSchema.methods.getInfo = function getInfo() {
  return {
    task_name: this.task_name,
    conditions: this.conditions,
    status: this.status,
    show_item_icon: this.show_item_icon,
    item_list: this.item_list,
  };
};

const TaskSchema = new Schema({
  task_name: { type: String, default: "" },
  conditions: { type: [TaskConditionSchema], default: [] },
  status: { type: Number, default: 0 },
  item_list: { type: [TaskReward], default: [] },
});

TaskSchema.methods.getInfo = function getInfo() {
  return {
    task_name: this.task_name,
    conditions: this.conditions,
    status: this.status,
    item_list: this.item_list,
  };
};

const TabSchema = new Schema({
  tab_name: { type: String, default: "" },
  conditions: { type: [ConditionSchema], default: [] },
  status: { type: Number, default: 0 },
  tasks: { type: [TaskSchema], default: [] },
});

TabSchema.methods.getInfo = function getInfo() {
  return {
    tab_name: this.tab_name,
    conditions: this.conditions,
    status: this.status,
    tasks: this.tasks,
  };
};

const EventSchema = new Schema(
  {
    event_id: { type: Number, default: 0 },
    event_type: { type: String, default: "" },
    event_title: { type: String, default: "" },
    event_description: { type: String, default: "" },
    event_start_condition: { type: Number, default: 0 },
    event_start_date: { type: Number, default: 0 },
    event_end_date: { type: Number, default: 0 },

    
    event_start_condition_value: { type: Number, default: 0 },
    event_expiry_value: { type: Number, default: -1 },
    event_special_condition: { type: [ConditionSchema], default: [] },
    task_point: { type: Number, default: 0 },

    event_restart: { type: Number, default: 0 },
    event_next_restart: { type: Number, default: 0 },
    new_claimable: { type: Boolean, default: false },

    status: { type: Number, default: 0 },
    milestone: { type: [MileStoneSchema], default: [] },
    tabs: { type: [TabSchema], default: [] },
    // event_record: { type: [EventRecordSchema], default: [] },
  },
  { timestamps: true }
);

EventSchema.methods.getInfo = function getInfo() {
  return {
    event_id: this.event_id,
    event_type: this.event_type,
    event_title: this.event_title,
    event_description: this.event_description,
    event_start_condition: this.event_start_condition,
    event_start_date: this.event_start_date,
    event_end_date: this.event_end_date,
    event_restart: this.event_restart,
    event_next_restart: this.event_next_restart,
    new_claimable: this.new_claimable,

    event_start_condition_value: this.event_start_condition_value,
    event_expiry_value: this.event_expiry_value,
    event_special_condition: this.event_special_condition,
    task_point: this.task_point,
    milestone: this.milestone,
    tabs: this.tabs,
  };
};

const GameEvent = mongoose.model("GameEvent", EventSchema);

module.exports = { TaskReward, TaskSchema, TabSchema, EventSchema, EventRecordSchema, GameEvent };
