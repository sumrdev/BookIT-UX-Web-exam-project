import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { expressjwt, Request as JWTRequest } from "express-jwt";
var jwt = require("jsonwebtoken");
import argon2 from "argon2";

const prisma = new PrismaClient();

interface HelloResponse {
  hello: string;
}

type HelloBuilder = (name: string) => HelloResponse;

const helloBuilder: HelloBuilder = (name) => ({ hello: name });

export const rootHandler = (_req: Request, res: Response) => {
    /* #swagger.security = [{
          "bearerAuth": []
  }] */
  return res.send("API is working 🤓");
};

export const helloHandler = (req: Request, res: Response) => {
  /* #swagger.security = [{
          "bearerAuth": []
  }] */
  const { params } = req;
  const { name = "World" } = params;
  const response = helloBuilder(name);

  return res.json(response);
};

export const signupHandler = async (req: Request, res: Response) => {
    /*	#swagger.requestBody = {
            required: true,
            schema: { $ref: "#/definitions/User" }
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
    /*    #swagger.parameters['obj'] = {
          in: 'body',
          description: 'Adding new user.',
          schema: {
              $email: 'admin@gamer.com',
              $password: '123123',
          }
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
