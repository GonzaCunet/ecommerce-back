import type { NextApiRequest, NextApiResponse } from "next";
import { findOrCreateAuth } from "controllers/auth";
import { sendCode } from "controllers/auth";
import { sendMail } from "controllers/mail";
export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.body;
  try {
    const auth = await findOrCreateAuth(email);
    await sendCode(email);
    await auth.pull();
    const code = auth.data.code;
    console.log(code, "soy el code");
    await sendMail(email, code);
    res.status(200).send({ auth });
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
}
