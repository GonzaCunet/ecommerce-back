import methods from "micro-method-router";
import { NextApiRequest, NextApiResponse } from "next";
import { client } from "lib/algolia";

export default methods({
  async get(req: NextApiRequest, res: NextApiResponse) {
    const productId = req.query.productId as string;
    if (!productId) {
      return res.status(400).json({ error: "Missing productId" });
    }
    try {
      const index = client.initIndex("products");
      const product = await index.getObject(productId);
      res.status(200).json(product);
    } catch (e) {
      res.status(404).json({ error: "Product not found" });
    }
  },
});
