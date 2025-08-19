import type { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware } from "lib/middlewares";
import { User } from "models/user";
import methods from "micro-method-router";
import { getOrdersByUserId } from "controllers/orders";

const handler = methods({
  async get(req: NextApiRequest, res: NextApiResponse, token) {
    try {
      const userId = token.userId;
      const orders = await getOrdersByUserId(userId);
      res.status(200).send({ res: orders });
    } catch (err) {
      res.status(400).send({ error: err });
    }
  },
});

export default authMiddleware(handler);
