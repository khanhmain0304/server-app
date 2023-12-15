require("./config/database")();
const jwt = require("jsonwebtoken");
const HTTP_STATUS_CODE = require("./config/http_status_code");
const ERROR_CODE = require("./config/error_code");
const crypto = require('crypto');

const Counter = require("./models/counter");
const Item = require("./models/item");
const Set = require("./models/set");

let itemsArr = [];
  

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const addItem = async () => {
try {
  for (let i = 1; i <= 100; i++) {

    let name = "Item " + i;
    let description = "Description for item number " + i;
    let image = "https://via.placeholder.com/256";
    let strength= getRandomInt(10);
    let agility= getRandomInt(10);
    let intelligence= getRandomInt(10);


    //getNext ID
    const seq_id = await Counter.getNextValue("items_count");
    // Create item in our database
    const newItem = await Item.create({
        seq_id,
        description,
        name,
        image,
        strength,
        agility,
        intelligence
    });

    itemsArr.push({
      id: seq_id,
      description,
      name,
      image,
      strength,
      agility,
      intelligence
    });
    console.log("add item:",seq_id);
    
  }

  // console.log(itemsArr);
} catch (err) {
  console.log(err);
}
}


const addSet = async () => {
  try {

    for (let i = 1; i <= 100; i++) {
  
      let name = "Set " + i;
      let description = "Description for Set number " + i;
      let image = "https://via.placeholder.com/256";
      let items = [];
      let items_id_string = "";


      for (let j = 0; j < 6; j++) {
        let rand_index = getRandomInt(itemsArr.length );
        items.push(itemsArr[rand_index])
        items_id_string += String(itemsArr[rand_index].id);
      }

      console.log(items_id_string)


      const set_id = crypto.createHash('sha1', "")
                   .update(items_id_string)
                   .digest('hex');
  
  
      //getNext ID
      const seq_id = await Counter.getNextValue("sets_count");
      // Create item in our database
      const newSet = await Set.create({
          set_id,
          seq_id,
          description,
          name,
          image,
          items
      });
      console.log("add set:",seq_id);
    }
  } catch (err) {
    console.log(err);
  }
  }

const insert = async () => {
  await addItem()
  await addSet();
}

insert();





