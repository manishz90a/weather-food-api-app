const dotenv = require("dotenv");

dotenv.config();

const audience = process.env.AUTH0_AUDIENCE || 'https://weather-food-api-app';
const domain = process.env.AUTH0_DOMAIN || 'dev-anv39zst.us.auth0.com';
const serverPort = process.env.SERVER_PORT || 6060;

if (!audience) {
  throw new Error(
    ".env is missing the definition of an AUTH0_AUDIENCE environmental variable",
  );
}

if (!domain) {
  throw new Error(
    ".env is missing the definition of an AUTH0_DOMAIN environmental variable",
  );
}

if (!serverPort) {
  throw new Error(
    ".env is missing the definition of a API_PORT environmental variable",
  );
}

module.exports = {
  audience,
  domain,
  serverPort
};
