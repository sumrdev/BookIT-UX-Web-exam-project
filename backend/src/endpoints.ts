import { Express } from "express";
import { rootHandler, loginHandler, signupHandler } from "./handlers";

module.exports = function (app: Express) {
    //for user
    //root
    app.get("/", rootHandler);
    //login, returns a jwt token
    app.post("/login", loginHandler);
    //create a user, returns a jwt token
    app.post("/signup", signupHandler);
    //get all rooms
    app.get("/rooms");
    //get a room by id
    app.get("/rooms/:id");
    //get all bookings of a user
    app.get("/booking");
    //get a booking of a user by id
    app.get("/booking/:id");
    //create a booking
    app.post("/booking");
    //update a booking by id
    app.put("/booking/:id");
    //delete a booking by id
    app.delete("/booking/:id");

    //for admin 
    //get all users
    app.get("/user");
    //get a user by id
    app.get("/user/:id");
    //create a user
    app.post("/user/:id");
    //update a user by id
    app.put("/user/:id");
    //delete a user by id
    app.delete("/users/:id");
    //create a room
    app.post("/rooms");
    //update a room by id
    app.put("/room/:id");
    //delete a room by id
    app.delete("/room/:id");
};
