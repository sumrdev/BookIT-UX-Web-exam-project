import { Response } from "express";
import { PrismaClient } from "@prisma/client";
import { Request } from "express-jwt";
var jwt = require("jsonwebtoken");
import argon2 from "argon2";
const prisma = new PrismaClient();

export const signupHandler = async (req: Request, res: Response) => {
    /*	#swagger.requestBody = {
              required: true,
              schema: { $ref: "#/definitions/CreateUser" }
      } */
    try {
      const { body } = req;
      const { email, name, password } = body;
      const user = await prisma.user.create({
        data: {
          email: email,
          name: name,
          password: await argon2.hash(password),
        },
      });
      const token = jwt.sign({ email, name, id:user.id, role: user.role, isAdmin: user.admin }, process.env.JWT_SECRET as string, {
        expiresIn: "1h",
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
        { email, name: user.name, id: user.id, role: user.role, isAdmin: user.admin  },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "10h",
        }
      );
      return res.json({token: token, user: user});
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
      const { email, name, password } = body;
      const user = await prisma.user.create({
        data: {
          email: email,
          name: name,
          password: await argon2.hash(password),
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
      if (req.auth.id !== parseInt(id) && !req.auth.isAdmin == true) return res.status(401).json({ message: "Unauthorized" });
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
      if (req.auth.isAdmin===false) return res.status(401).json({ message: "Unauthorized" });
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
      //include bookings
      const { id } = req.params;
      if (req.auth.id !== parseInt(id) && req.auth.isAdmin===false) return res.status(401).json({ message: "Unauthorized" });
      const user = await prisma.user.findFirst({
        where: {
          id: parseInt(id), 
        },
        include: {
          bookings: {
            include: {
              room: true,
          },
        }, 
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
      if (req.auth.id !== parseInt(id) && !req.auth.isAdmin == true) return res.status(401).json({ message: "Unauthorized" });

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
  