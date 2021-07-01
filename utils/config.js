require("dotenv").config();

const configEnv = {
  srvPort: process.env.PORT,

  mongoLocal: process.env.MONGODBLOCAL,

  
};

module.exports = { configEnv };
