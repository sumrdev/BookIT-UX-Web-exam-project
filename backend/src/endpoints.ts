import { Express } from "express";
import { rootHandler, helloHandler } from "./handlers";
var { expressjwt: jwt } = require("express-jwt");
require("dotenv").config(
    {path: __dirname + '/.env'}
);

const secret = process.env.JWT_SECRET;

module.exports = function (app: Express) {
    app.use(
      jwt({
        secret: secret,
        algorithms: ["HS256"],
      }).unless({ path: ["/login"] })
    );
    app.get("/", rootHandler);
    app.get("/hello/:name", helloHandler);
};
