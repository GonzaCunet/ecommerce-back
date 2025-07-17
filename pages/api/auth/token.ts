import type { NextApiRequest, NextApiResponse } from "next";
import { generate } from "lib/jwt";
import { Auth } from "models/auth";
import { isAfter } from "date-fns";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const respuesta = await Auth.findByEmailAndCode(
    req.body.email,
    req.body.code
  );
  if (!respuesta) {
    res.status(401).send({ error: "Invalid email or code" });
    return;
  }
  const expires = respuesta.isCodeExpired();
  if (expires) {
    res.status(401).send({ error: "Code expired" });
  }
  const token = generate({ userId: respuesta.data.userId });
  res.send({ token });
}
