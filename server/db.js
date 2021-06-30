require("dotenv").config();
const mongoose = require("mongoose");

const connectionMongoDb = async () => {
  const connectionOptions = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  };

  try {
    await mongoose.connect(process.env.MONGODBLOCAL, connectionOptions);
    console.log("db connected ok");
  } catch (e) {
    console.error(e);
    throw new Error("db connection failed");
  }
};

module.exports = { connectionMongoDb };
