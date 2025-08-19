import { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { authMiddleware } from "lib/middlewares";
import { generateOrder, getOrderById } from "controllers/orders";

const handler = methods({
  async post(req: NextApiRequest, res: NextApiResponse, token) {
    try {
      const { id } = req.query;
      const userId = token.userId;
      const response = await generateOrder(id, userId);
      res.status(200);
      res.send({ res: response });
    } catch (err) {
      res.status(400).send({ error_message: err });
    }
  },
  async get(req: NextApiRequest, res: NextApiResponse, token) {
    try {
      const orderId: any = req.query.orderId;

      const response = await getOrderById(orderId);
      res.status(200);
      res.send({ res: response });
    } catch (err) {
      res.status(400).send({ error_message: err });
    }
  },
});

export default authMiddleware(handler);
