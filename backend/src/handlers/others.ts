import { Response } from "express";
import { expressjwt, Request } from "express-jwt";

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
  