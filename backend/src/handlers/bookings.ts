import { Response } from "express";
import { PrismaClient } from "@prisma/client";
import { Request } from "express-jwt";
const prisma = new PrismaClient();

const bookingPermissions = {
  "Student": ["Skybox"],
  "TA": ["Skybox", "Classroom"],
  "Professor": ["Skybox", "Classroom", "Auditorium"],
} as {[key: string]: string[]}

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
      if(!req.auth.id && req.auth.isAdmin===false){{
        return res.status(401).json({ message: "Unauthorized" }
      )}}; 

      // Check if user is allowed to book this room

      const room = await prisma.room.findUnique({
        where: {
          id: roomId,
        },
      });
      if(bookingPermissions[req.auth.role] && !bookingPermissions[req.auth.role].includes(room.type)) return res.status(401).json({ message: "You are not allowed to book this room" } );

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

  export const createMultipleSegmentBooking = async (req: Request, res: Response) => {
    /*	#swagger.requestBody = {
              required: true,
              schema: { $ref: "#/definitions/CreateMultipleBookings" }
        }
        #swagger.security = [{
            "bearerAuth": []
        }]
    */
    try {
      const { body } = req;
      const { bookings } = body;
      const validateRoomID = bookings[0].roomId;

      if(!req.auth.id && req.auth.isAdmin===false){{
        return res.status(401).json({ message: "Unauthorized" }
      )}}; 

      if(bookings.length < 2) return res.status(400).json({ message: "You must provide at least 2 bookings" });

      bookings.forEach((booking: { roomId: any; }) => {
        if(booking.roomId !== validateRoomID ) return res.status(400).json({ message: "All bookings must be for the same room" })
      });

      const newBookings = bookings.map((booking: any) => {
        return {
          startTime: new Date(booking.startTime),
          endTime: new Date(booking.endTime),
          user: {
            connect: {
              id: req.auth.id,
            },
          },
        };
      });


      const newRoom = await prisma.room.update({
        where: {
          id: validateRoomID,
        },
        data: {
          bookings: {
            create: newBookings,
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