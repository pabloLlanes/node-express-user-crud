const mongoose = require("mongoose");
const { configEnv } = require("../utils/config");

const connMongoDb = async () => {
  const connectionOptions = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  };

  try {
    await mongoose.connect(configEnv.mongoLocal, connectionOptions);
    console.log("db connected ok");
  } catch (e) {
    console.error(e);
    throw new Error("db connection failed");
  }
};

module.exports = { connMongoDb };
