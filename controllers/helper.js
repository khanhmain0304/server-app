const crypto = require("crypto");
const { resourceLimits } = require("worker_threads");
const Types = require("../config/types");


//////////////////////////////////////////////////////////////////
// generate signature to communicate with blockchain services
// let generateSignature = (data) => {
//   const  accessKey = process.env.GS_ACCESS_KEY;
//   const  secretKey = process.env.GS_SECRET_KEY;

//   const strData =  new URLSearchParams(data);

//   const signData = `accessKey=${accessKey}&${strData}`;
//   const hmac = crypto.createHmac('sha512', secretKey);

//   const result = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
//   // console.log(result);
//   return result;
// }

let generateSignature =  (data) => {
  console.log(data);
  const accessKey = process.env.GS_ACCESS_KEY;
  const secretKey = process.env.GS_SECRET_KEY;

  const signData = JSON.stringify({
    accessKey,
    ...data,
  });
  const hmac = crypto.createHmac("sha512", secretKey);

  return hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
};

let getGSAccessKey = () => {
  return process.env.GS_ACCESS_KEY;
};

let getGSSecretKey = () => {
  return process.env.GS_SECRET_KEY;
};

module.exports = {
  generateSignature,
  getGSAccessKey,
  getGSSecretKey,
};
