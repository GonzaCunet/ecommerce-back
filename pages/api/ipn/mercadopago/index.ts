import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { getPaymentById, WebhokPayload } from "lib/mercadopago";
import { authMiddleware } from "lib/middlewares";
import { confirmPurchase } from "lib/purchases";

const handler = methods({
  async post(req: any, res: NextApiResponse) {
    const body: WebhokPayload = await req.json();
    console.log("Webhook received", body);

    if (body.type === "payment") {
      const mpPayment = await getPaymentById(body.data.id);
      if (mpPayment.status === "approved") {
        const orderId: string = mpPayment.external_reference;
        // confirmar la compra con el order id
        try {
          const purchaseConfirmation = await confirmPurchase(orderId);
          res.send({ purchaseConfirmation });
        } catch (err) {
          res.status(400).send({ error_message: err });
        }
      }
    }
  },
});

export default authMiddleware(handler);
