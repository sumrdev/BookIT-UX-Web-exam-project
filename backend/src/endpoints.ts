import { Express } from "express";
import { rootHandler, helloHandler, loginHandler, signupHandler } from "./handlers";

module.exports = function (app: Express) {
    app.get("/", rootHandler);
    app.get("/hello/:name", helloHandler);
    app.post("/login", loginHandler);
    app.post("/signup", signupHandler);
};
