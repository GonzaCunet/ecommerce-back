import type { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware } from "lib/middlewares";
import { User } from "models/user";
import methods from "micro-method-router";

const handler = methods({
  async get(req: NextApiRequest, res: NextApiResponse, token) {
    const userId = token.userId;
    const user = new User(userId);
    await user.pull();
    res.status(200).send({ user: user.data });
  },
  async patch(req: NextApiRequest, res: NextApiResponse, token) {
    const userId = token.userId;
    const user = new User(userId);
    user.data = { ...user.data, ...req.body };
    await user.push();
    res.status(200).send({ user: user.data });
  },
});

export default authMiddleware(handler);
