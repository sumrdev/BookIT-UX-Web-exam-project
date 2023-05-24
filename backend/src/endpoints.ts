import { Express } from "express";
import { getBookings, getBooking, updateBooking, deleteBooking, createBooking, rootHandler, loginHandler, signupHandler, createRoom, getRoom, getRooms, getUser, getUsers, updateUser, createUser, deleteUser, updateRoom, deleteRoom } from "./handlers";

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
    app.get("/booking", getBookings);
    //get a booking of a user by id
    app.get("/booking/:id", getBooking);
    //create a booking
    app.post("/booking", createBooking);
    //update a booking by id
    app.put("/booking/:id", updateBooking);
    //delete a booking by id
    app.delete("/booking/:id", deleteBooking);

    //for admin 
    //get all users
    app.get("/user", getUsers);
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
