import type { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware } from "lib/middlewares";
import { User } from "models/user";
async function handler(req: NextApiRequest, res: NextApiResponse, token) {
  const userId = token.userId;
  const user = new User(userId);
  await user.pull();
  res.status(200).send({ user: user.data });
}

export default authMiddleware(handler);
