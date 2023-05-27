import { Response } from "express";
import { PrismaClient } from "@prisma/client";
import { Request } from "express-jwt";
const prisma = new PrismaClient();

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
      const { roomId, startTime, endTime } = body;
  
      if(req.auth.id && req.auth.isAdmin===false){{
        return res.status(401).json({ message: "Unauthorized" }
      )}}; 

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
                    id: req.auth.id,
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

      const updatedBooking = await prisma.booking.update({
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
      if(req.auth.id!==updatedBooking.userId && req.auth.isAdmin===false){{
        return res.status(401).json({ message: "Unauthorized" }
      )}};
      return res.json(updatedBooking);
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
      if(req.auth.id!==booking.userId && req.auth.isAdmin===false){{
        return res.status(401).json({ message: "Unauthorized" }
      )}};
      return res.json(booking);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Something went wrong" });
    }
  };