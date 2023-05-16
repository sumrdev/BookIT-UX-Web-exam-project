import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'
import { expressjwt, Request as JWTRequest } from "express-jwt";

const prisma = new PrismaClient()

interface HelloResponse {
  hello: string;
}

type HelloBuilder = (name: string) => HelloResponse;

const helloBuilder: HelloBuilder = name => ({ hello: name });

export const rootHandler = (_req: Request, res: Response) => {
  return res.send('API is working 🤓');
};

export const helloHandler = (req: Request, res: Response) => {
  const { params } = req;
  const { name = 'World' } = params;
  const response = helloBuilder(name);

  return res.json(response);
};

export const signupHandler = async (req: Request, res: Response) => {
  const { body } = req;
  const { email, username, password } = body;
  const user = await prisma.user.create({
    data: {
        email: email,
        name: username,
        password: "weee",
        bookings: [],
    },
  })
  return res.json(user);
}  