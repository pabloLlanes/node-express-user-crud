const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const { connMongoDb } = require("./db");
const { configEnv } = require("../utils/config");

class Server {
  //constructor
  constructor() {
    this.app = express();

    this.port = configEnv.srvPort;

    this.usersPath = "/api/users";

    //db connection
    this.dbConnection();
    //middlewares
    this.middlewares();
    //routes
    this.routes();
  }

  //middlewares
  middlewares() {
    //cors
    this.app.use(cors());

    //log
    this.app.use(logger("tiny"));

    //parse json
    this.app.use(express.json());
    //public folder
    //this.app.use(express.static("public"));
  }

  //routes
  routes() {
    this.app.use(this.usersPath, require("../api/users/users.routes"));
    //The 404 Route (ALWAYS Keep this as the last route)
    this.app.get("*", (_, res) => {
      res.status(404).json({ msg: "error: route not encountered" });
    });
  }

  //db mongo
  async dbConnection() {
    await connMongoDb();
  }

  //initial server
  listen() {
    this.app.listen(this.port, () => {
      console.log("server is running on port ", this.port);
    });
  }
}

module.exports = Server;
