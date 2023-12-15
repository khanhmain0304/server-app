// const user = await User.findById(req.user_jwt.user_id);

// user.data_trials.push(
//     {
//       stage_id: selected_stage,
//       difficulty_level: 1,
//       status: 1,
//     },
//     {
//       stage_id: selected_stage,
//       difficulty_level: 2,
//       status: 0,
//     },
//     {
//       stage_id: selected_stage,
//       difficulty_level: 3,
//       status: 0,
//     }
//   );

// require("../../config/database")();

require("../../config/database")();

const User = require("../../models/user");

const main = async () => {
  const params = process.argv;
  

  if(Number.isNaN(params[3]))
  {
    console.log("Error: seq_id isNaN!!");
    return;
  }

  
  let seq_id = params[3];
  console.log(seq_id);
  const user = await User.findOne({ seq_id});
  const MAX_STATE = 1000009;

  //   console.log(user.data_trials);
  user.data_trials = [];

  for (let i = 1000000; i <= MAX_STATE; i++) {
    let selected_stage = i;
    user.data_trials.push(
      {
        stage_id: selected_stage,
        difficulty_level: 1,
        status: 1,
      },
      {
        stage_id: selected_stage,
        difficulty_level: 2,
        status: 1,
      },
      {
        stage_id: selected_stage,
        difficulty_level: 3,
        status: 1,
      }
    );
  }

  user.data_stage.id_stage_current = MAX_STATE;
  user.data_stage.id_stage_select = MAX_STATE;

  user.markModified("data_trials");
  user.markModified("data_stage");
    await user.save();

    console.log(user.data_trials);

  console.log("Done!");
  process.exit(0);
};

main();
