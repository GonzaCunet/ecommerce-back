import { NextApiRequest, NextApiResponse } from "next";
import parseToken from "parse-bearer-token";
import { decode } from "lib/jwt";

export function authMiddleware(callback) {
  return function (req: NextApiRequest, res: NextApiResponse) {
    console.log("soy el middleware de auth");
    const token = parseToken(req);
    if (!token) {
      res.status(401).send({ message: "no hay token" });
    }
    const decodedToken = decode(token);
    if (decodedToken) {
      callback(req, res, decodedToken);
    } else {
      res.status(401).send({ message: "token incorrecto" });
    }
  };
}
