var crypto = require("crypto");
var utf8 = require("utf8");
var formatter = require("sprintf-js");
const { v4: uuidv4 } = require("uuid");
const { redisSetTrackingTotalSpt, redisSetLastTracking, redisGetLastTracking } = require("../config/redisClient");

function sign(key, msg) {
  return crypto.createHmac("sha256", key).update(msg).digest();
}

function signhex(key, msg) {
  return crypto.createHmac("sha256", key).update(msg).digest("hex");
}

function getSignatureKey(key, dateStamp, regionName, serviceName) {
  kDate = sign(utf8.encode("BAGEL1" + key), dateStamp);
  kRegion = sign(kDate, regionName);
  kService = sign(kRegion, serviceName);
  kSigning = sign(kService, "bagel1_request");
  return kSigning;
}

const signRequest = async (data) => {
  var access_key = process.env.TRACKING_AWS_KEY_ID;
  var secret_key = process.env.TRACKING_AWS_SECRET;
  var url = process.env.TRACKING_API_URL;
  var method = "POST";

  var service = process.env.TRACKING_SERVICE;
  var region = process.env.TRACKING_REGION;

  const apiUrl = new URL(url);
  var host = apiUrl.hostname;

  var date = new Date();
  var datestamp = formatter.sprintf("%04d%02d%02d", date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate());
  var amzdate = formatter.sprintf("%sT%02d%02d%02dZ", datestamp, date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());

  // add body ts, day
  for (var key in data) {
    var obj = data[key];

    // get last tracking
    // let last_tracking = await redisGetLastTracking(obj.user_id);
    obj.spt = Date.now() - obj.login_time;
    obj.ts = Date.now();
    obj.day = parseInt(formatter.sprintf("%04d%02d%02d", date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate()));
    obj.id = uuidv4();

    await redisSetLastTracking(obj.user_id, obj.ts);
  }

  var canonical_uri = apiUrl.pathname;
  var canonical_querystring = "";

  var canonical_headers = "content-type:application/json" + "\n" + "host:" + host + "\n" + "x-bagel-date:" + amzdate + "\n";
  var signed_headers = "content-type;host;x-bagel-date";
  var payload_hash = crypto.createHash("sha256").update(JSON.stringify(data)).digest("hex");
  var canonical_request = method + "\n" + canonical_uri + "\n" + canonical_querystring + "\n" + canonical_headers + "\n" + signed_headers + "\n" + payload_hash;
  var algorithm = "BAGEL1-HMAC-SHA256";
  var credential_scope = datestamp + "/" + region + "/" + service + "/" + "bagel1_request";
  var string_to_sign = algorithm + "\n" + amzdate + "\n" + credential_scope + "\n" + crypto.createHash("sha256").update(canonical_request).digest("hex");
  var signing_key = getSignatureKey(secret_key, datestamp, region, service);
  var signature = signhex(signing_key, utf8.encode(string_to_sign));
  var authorization_header = algorithm + " " + "Credential=" + access_key + "/" + credential_scope + ", " + "SignedHeaders=" + signed_headers + ", " + "Signature=" + signature;
  var headers = { "content-type": "application/json", "x-bagel-date": amzdate, Authorization: authorization_header };
  // var request_url = endpoint + canonical_querystring;
  var request_url = url;
  var options = { url: request_url, headers, method, data };
  return options;
};

module.exports = {
  signRequest,
};
