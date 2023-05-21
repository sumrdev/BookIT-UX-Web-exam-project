import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { expressjwt, Request as JWTRequest } from "express-jwt";
var jwt = require("jsonwebtoken");
import argon2 from "argon2";
import { execArgv } from "process";

const prisma = new PrismaClient();

export const rootHandler = (_req: Request, res: Response) => {
  /* #swagger.security = [{
          "bearerAuth": []
  }] */
  return res.send("API is working 🤓");
};

export const signupHandler = async (req: Request, res: Response) => {
  /*	#swagger.requestBody = {
            required: true,
            schema: { $ref: "#/definitions/CreateUser" }
    } */
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
  return res.json(token);
};

export const loginHandler = async (req: Request, res: Response) => {
  /*	#swagger.requestBody = {
            required: true,
            schema: { $ref: "#/definitions/LoginUser" }
    } */
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
  return res.json(token);
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
  const { body } = req;
  const { name, type, capacity, powerOutlets, ethernetPorts, externalMonitor, whiteboard, eatingAllowed, bookings } = body;
  
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
}

export const getRoom = async (req: Request, res: Response) => {
  /* #swagger.security = [{
          "bearerAuth": []
  }] */
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
}

export const getRooms = async (req: Request, res: Response) => {
  /* #swagger.security = [{
          "bearerAuth": []
  }] */
  const rooms = await prisma.room.findMany();
  return res.json(rooms);
}

export const createBooking = async (req: Request, res: Response) => {
  /*	#swagger.requestBody = {
            required: true,
            schema: { $ref: "#/definitions/CreateBooking" }
      } 
      #swagger.security = [{
          "bearerAuth": []
      }]
  */
  // const { body } = req;
  // const { room, startTime, endTime } = body;

  // const booking = await prisma.booking.create({
  //   data: {
  //     room: room,
  //     user: user,
  //     startTime: startTime,
  //     endTime: endTime,
  //   },
  // });
  // return res.json(booking);
}

export const getUsers = async (req: Request, res: Response) => {
  /* #swagger.security = [{
          "bearerAuth": []
  }] */
  const users = await prisma.user.findMany();
  return res.json(users);
}

export const getUser = async (req: Request, res: Response) => {
  /* #swagger.security = [{
          "bearerAuth": []
  }] */
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
}
export const updateUser = async (req: Request, res: Response) => {
  /*	#swagger.requestBody = {
            required: true,
            schema: { $ref: "#/definitions/UpdateUser" }
      } 
      #swagger.security = [{
          "bearerAuth": []
      }]
  */
  const { body } = req;
  const { id } = req.params;
  let { email, name, password } = body;
  let dontHash 

  const user = await prisma.user.findFirst({
    where: {
      id: parseInt(id),
    },
  });

  if(!email) email = user?.email;
  if(!name)  name = user?.name;
  if(!password) {
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
}