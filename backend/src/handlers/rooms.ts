import { Response } from "express";
import { PrismaClient } from "@prisma/client";
import { Request } from "express-jwt";
const prisma = new PrismaClient();

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
      if(req.auth.isAdmin===false){
        return res.status(401).json({ message: "Admin access needed for this action" });
      }
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
        include: {
            bookings: true,
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
      const rooms = await prisma.room.findMany({
        include: {
            bookings: true,
        },
      });
      return res.json(rooms);
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
      if(req.auth.isAdmin===false){
        return res.status(401).json({ message: "Admin access needed for this action" });
      }
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

  
export const deleteRoom = async (req: Request, res: Response) => {
    /* #swagger.security = [{
            "bearerAuth": []
    }] */
    try {
      if(req.auth.isAdmin===false){
        return res.status(401).json({ message: "Admin access needed for this action" });
      }
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