import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { expressjwt, Request as JWTRequest } from "express-jwt";
var jwt = require("jsonwebtoken");
import argon2 from "argon2";
const prisma = new PrismaClient();

export const rootHandler = (_req: Request, res: Response) => {
  /* #swagger.security = [{
          "bearerAuth": []
  }] */
  try {
    return res.json({message: "aPI is working 🤓"});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const signupHandler = async (req: Request, res: Response) => {
  /*	#swagger.requestBody = {
            required: true,
            schema: { $ref: "#/definitions/CreateUser" }
    } */
  try {
    const { body } = req;
    const { email, name, password } = body;
    const token = jwt.sign({ email, name }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });
    const user = await prisma.user.create({
      data: {
        email: email,
        name: name,
        password: await argon2.hash(password),
      },
    });
    return res.json({token: token, user: user});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const loginHandler = async (req: Request, res: Response) => {
  /*	#swagger.requestBody = {
            required: true,
            schema: { $ref: "#/definitions/LoginUser" }
    } */
  try {
    const { body } = req;
    const { email, password } = body;
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { email, name: user.name },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      }
    );
    return res.json({token: token, user: user});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const createRoom = async (req: Request, res: Response) => {
  /*	#swagger.requestBody = {
            required: true,
            schema: { $ref: "#/definitions/CreateRoom" }
      } 
      #swagger.security = [{
          "bearerAuth": []
      }]
  */
  try {
    const { body } = req;
    const {
      name,
      type,
      capacity,
      powerOutlets,
      ethernetPorts,
      externalMonitor,
      whiteboard,
      eatingAllowed,
      bookings,
    } = body;

    const room = await prisma.room.create({
      data: {
        name: name,
        type: type,
        capacity: capacity,
        powerOutlets: powerOutlets,
        ethernetPorts: ethernetPorts,
        externalMonitor: externalMonitor,
        whiteboard: whiteboard,
        eatingAllowed: eatingAllowed,
        bookings: bookings,
      },
    });
    return res.json(room);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getRoom = async (req: Request, res: Response) => {
  /* #swagger.security = [{
          "bearerAuth": []
  }] */
  try {
    const { id } = req.params;
    const room = await prisma.room.findFirst({
      where: {
        id: parseInt(id),
      },
    });
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    return res.json(room);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getRooms = async (req: Request, res: Response) => {
  /* #swagger.security = [{
          "bearerAuth": []
  }] */
  try {
    const rooms = await prisma.room.findMany();
    return res.json(rooms);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const createBooking = async (req: Request, res: Response) => {
  /*	#swagger.requestBody = {
            required: true,
            schema: { $ref: "#/definitions/CreateBooking" }
      } 
      #swagger.security = [{
          "bearerAuth": []
      }]
  */
  try {
    const { body } = req;
    const { roomId, userId, startTime, endTime } = body;

    const newRoom = await prisma.room.update({
      where: {
        id: roomId,
      },
      data: {
        bookings: {
          create: [
            {
              startTime: new Date(startTime),
              endTime: new Date(endTime),
              user: {
                connect: {
                  id: userId,
                },
              },
            },
          ],
        },
      },
    });
    return res.json(newRoom);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  /*	#swagger.requestBody = {
            required: true,
            schema: { $ref: "#/definitions/CreateUser" }
      }
      #swagger.security = [{
          "bearerAuth": []
      }]
  */
  try {
    const { body } = req;
    const { email, name, password, isAdmin } = body;
    const user = await prisma.user.create({
      data: {
        email: email,
        name: name,
        password: await argon2.hash(password),
        admin: isAdmin,
      },
    });
    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  /* #swagger.security = [{
          "bearerAuth": []
  }] */
  try {
    const { id } = req.params;
    const user = await prisma.user.delete({
      where: {
        id: parseInt(id),
      },
    });
    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  /* #swagger.security = [{
          "bearerAuth": []
  }] */
  try {
    const users = await prisma.user.findMany();
    return res.json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getUser = async (req: Request, res: Response) => {
  /* #swagger.security = [{
          "bearerAuth": []
  }] */
  try {
    const { id } = req.params;
    const user = await prisma.user.findFirst({
      where: {
        id: parseInt(id),
      },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  /*	#swagger.requestBody = {
            required: true,
            schema: { $ref: "#/definitions/UpdateUser" }
      } 
      #swagger.security = [{
          "bearerAuth": []
      }]
  */
  try {
    const { body } = req;
    const { id } = req.params;
    let { email, name, password } = body;
    let dontHash;

    const user = await prisma.user.findFirst({
      where: {
        id: parseInt(id),
      },
    });

    if (!email) email = user?.email;
    if (!name) name = user?.name;
    if (!password) {
      password = user?.password;
      dontHash = true;
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: parseInt(id),
      },
      data: {
        email: email,
        name: name,
        password: dontHash ? password : await argon2.hash(password),
      },
    });
    return res.json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateRoom = async (req: Request, res: Response) => {
  /*	#swagger.requestBody = {
            required: true,
            schema: { $ref: "#/definitions/UpdateRoom" }
      } 
      #swagger.security = [{
          "bearerAuth": []
      }]
  */
  try {
    const { body } = req;
    const { id } = req.params;
    let allowedKeys = [
      "name",
      "type",
      "capacity",
      "powerOutlets",
      "ethernetPorts",
      "externalMonitor",
      "whiteboard",
      "eatingAllowed",
      "bookings",
    ];

    const updatedRoom = await prisma.room.update({
      where: {
        id: parseInt(id),
      },
      // Create a new object with only the allowed keys, filter out null values
      data: Object.fromEntries(
        allowedKeys.map((k) => [k, body[k]]).filter(([k, v]) => v != null)
      ),
    });
    return res.json(updatedRoom);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
export const updateBooking = async (req: Request, res: Response) => {
  /*	#swagger.requestBody = {
            required: true,
            schema: { $ref: "#/definitions/UpdateBooking" }
      } 
      #swagger.security = [{
          "bearerAuth": []
      }]
  */
  try {
    const { body } = req;
    const { id } = req.params;
    let allowedKeys = ["startTime", "endTime", "roomId", "userId"];

    const updatedRoom = await prisma.booking.update({
      where: {
        id: parseInt(id),
      },
      // Create a new object with only the allowed keys, filter out null values
      data: {
        ...Object.fromEntries(
          allowedKeys.map((k) => [k, body[k]]).filter(([k, v]) => v != null)
        ),
        startTime: new Date(body.startTime),
        endTime: new Date(body.endTime),
      },
    });
    return res.json(updatedRoom);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteRoom = async (req: Request, res: Response) => {
  /* #swagger.security = [{
          "bearerAuth": []
  }] */
  try {
    const { id } = req.params;
    const room = await prisma.room.delete({
      where: {
        id: parseInt(id),
      },
    });
    return res.json(room);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteBooking = async (req: Request, res: Response) => {
  /* #swagger.security = [{
          "bearerAuth": []
  }] */
  try {
    const { id } = req.params;
    const booking = await prisma.booking.delete({
      where: {
        id: parseInt(id),
      },
    });
    return res.json(booking);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};