import crypto from "crypto";

const key1 = crypto.randomBytes(32).toString("hex");
const key2 = crypto.randomBytes(32).toString("hex");
console.log(
  `***replace keys for ACCESS_TOKEN_SECRET and REFRESH_TOKEN_SECRET variables in .env file***`
);
console.table({ key1, key2 });

//node ./helpers/generate_keys.js
