const axios = require("axios");
const { signRequest } = require("./signRequestBagel");
// require("dotenv").config();

// const { TRACKING_API_URL, TRACKING_AWS_KEY_ID, TRACKING_AWS_SECRET } = process.env;

const sendTracking = async (body) => {
  var options = await signRequest(body);

  // console.log(options);

  try {
    const { data } = await axios({
      method: options.method,
      url: options.url,
      headers: options.headers,
      data: options.data,
    });

    // console.log("Successfully received data: ", data);
    return data;
  } catch (error) {
    console.log("An error occurred", error);
    throw error;
  }
};

const trackingServerRegistration = async (user_id, device_id, register_ts, os, os_version, client_version, login_count, locale, timezone_offset) => {
  let body = [
    {
      event_id: "server_registration",
      user_id,
      device_id,
      register_ts,
      os,
      os_version,
      client_version,
      login_count,
      locale,
      timezone_offset,
    },
  ];

  await sendTracking(body);
};

const trackingServerLogin = async (
  user_id,
  device_id,
  register_ts,
  os,
  os_version,
  client_version,
  login_count,
  total_spt,
  ab_test_segment,
  level,
  exp,
  lifetime_spend,
  purchase_count,
  paid_gold,
  free_gold,
  gold,
  paid_gem,
  free_gem,
  gem,
  locale,
  timezone_offset,
  ip_address,
  country,
  state,
  city,
  device_name,
  language,
  login_type,
  context_id
) => {
  let body = [
    {
      event_id: "server_login",
      user_id,
      device_id,
      register_ts,
      os,
      os_version,
      client_version,
      login_count,
      total_spt,
      ab_test_segment,
      level,
      exp,
      lifetime_spend,
      purchase_count,
      paid_gold,
      free_gold,
      gold,
      paid_gem,
      free_gem,
      gem,
      locale,
      timezone_offset,
      ip_address,
      country,
      state,
      city,
      device_name,
      language,
      login_type,
      context_id,
    },
  ];

  await sendTracking(body);
};

const trackingServer = async (common_tracking, body_tracking) => {
  let body = [];

  for (const data_body of body_tracking) {
    body.push({
      ...common_tracking,
      ...data_body,
    });
  }

  await sendTracking(body);
};

module.exports = {
  // =========== Tech Launch ===========
  trackingServerRegistration,
  trackingServerLogin,
  trackingServer,
};
