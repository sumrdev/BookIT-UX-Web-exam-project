import { Express } from "express";
import { rootHandler, helloHandler, loginHandler, signupHandler } from "./handlers";

module.exports = function (app: Express) {
    app.get("/", rootHandler);
    app.get("/hello/:name", helloHandler);
    app.post("/login", loginHandler);
    app.post("/signup", signupHandler);
    app.get("/rooms");
    app.get("/rooms/:id");
    app.get("/booking");
    app.get("/booking/:id");
    app.post("/booking");
    app.put("/booking/:id");
    app.delete("/booking/:id");

    //for admin 
    app.get("/user");
    app.get("/user/:id");
    app.post("/user/:id");
    app.put("/user/:id");
    app.delete("/users/:id");
    
    app.post("/room/:id");
    app.put("/room/:id");
    app.delete("/room/:id");
};
