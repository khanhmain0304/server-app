const configs = {
    jwt_configs: {
        secretKey: process.env.SV_JWT_TOKEN_KEY,
        expiresIn: "24h",//process.env.SV_JWT_EXPIRES_IN,
    },
    google_configs: {
        google_client_id: process.env.GOOGLE_CLIENT_ID,
        google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
    },
    facebook_configs: {
        facebook_client_id: process.env.FACEBOOK_CLIENT_ID,
        facebook_client_secret: process.env.FACEBOOK_CLIENT_SECRET,
    }
}

const jwt_config = Object.assign(configs.jwt_configs);
const google_config = Object.assign(configs.google_configs);
const facebook_config = Object.assign(configs.facebook_configs);

module.exports = { jwt_config, google_config, facebook_config };
