import type { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware } from "lib/middlewares";
import { User } from "models/user";
import methods from "micro-method-router";

const handler = methods({
  async patch(req: NextApiRequest, res: NextApiResponse, token) {
    const userId = token.userId;
    const user = new User(userId);
    await user.pull();
    user.data = { ...user.data, address: req.body.address };
    await user.push();
    res.status(200).send({ user: user.data });
  },
});

export default authMiddleware(handler);
