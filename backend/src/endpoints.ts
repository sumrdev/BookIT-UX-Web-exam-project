import { Express } from "express";
import { rootHandler } from "./handlers/others";
import { loginHandler, signupHandler, createUser,deleteUser,getUser,getUsers,updateUser } from "./handlers/users";
import { getRooms, getRoom, createRoom, deleteRoom, updateRoom } from "./handlers/rooms";
import { createBooking, updateBooking, deleteBooking } from "./handlers/bookings";


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
    app.post("/booking", createBooking);
    //update a booking by id
    app.put("/booking/:id", updateBooking);
    //delete a booking by id
    app.delete("/booking/:id", deleteBooking);

    //for admin 
    //get all users
    app.get("/users", getUsers);
    //get a user by id
    app.get("/user/:id", getUser);
    //create a user
    app.post("/user/:id", createUser);
    //update a user by id
    app.put("/user/:id", updateUser);
    //delete a user by id
    app.delete("/users/:id", deleteUser);
    //create a room
    app.post("/rooms", createRoom);
    //update a room by id
    app.put("/room/:id", updateRoom);
    //delete a room by id
    app.delete("/room/:id", deleteRoom);
};
