import methods from "micro-method-router";
import { NextApiRequest, NextApiResponse } from "next";
import { client } from "lib/algolia";
import { getProductById } from "controllers/products";

export default methods({
  async get(req: NextApiRequest, res: NextApiResponse) {
    const productId = req.query.productId as string;
    if (!productId) {
      return res.status(400).json({ error: "Missing productId" });
    }
    try {
      const response = await getProductById(productId);
      res.status(200).send({ res: response });
    } catch (e) {
      console.log(e);
      res.status(404).json({ error: "Product not found" });
    }
  },
});
