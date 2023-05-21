import { Express } from "express";
import { rootHandler, loginHandler, signupHandler, createRoom, getRoom, getRooms, getUser, getUsers, updateUser } from "./handlers";

function wrapTryCatch(fn: Function) {
    return async function (req: any, res: any) {
        try {
            await fn(req, res);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Something went wrong" });
        }
    };
}

module.exports = function (app: Express) {
    //for user
    //root
    app.get("/", rootHandler);
    //login, returns a jwt token
    app.post("/login", loginHandler);
    //create a user, returns a jwt token
    app.post("/signup", signupHandler);
    //get all rooms
    app.get("/rooms", getRooms);
    //get a room by id
    app.get("/rooms/:id", getRoom);
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
    app.get("/user", getUsers);
    //get a user by id
    app.get("/user/:id", getUser);
    //create a user
    app.post("/user/:id");
    //update a user by id
    app.put("/user/:id", updateUser);
    //delete a user by id
    app.delete("/users/:id");
    //create a room
    app.post("/rooms", createRoom);
    //update a room by id
    app.put("/room/:id");
    //delete a room by id
    app.delete("/room/:id");
};
