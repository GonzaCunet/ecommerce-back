import { firestore } from "./firestore";
const collection = firestore.collection("purchases");
type Purchase = {
  id: string;
  from: string;
  amount: number;
  message: string;
  date: Date;
  status: string;
};
export async function getConfirmedPayments(): Promise<Purchase[]> {
  // Mock data
  const snapshot = await collection.where("status", "==", "confirmed").get();
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Purchase[];
}

export async function createPurchase(
  newPurchInput: Pick<Purchase, "from" | "amount" | "message">
): Promise<string> {
  const purchase = {
    ...newPurchInput,
    date: new Date(),
    status: "pending",
  };

  const newPurchaseRef = await collection.add(purchase);
  // guardamos esta nueva purchase en la db y devolvemos el id
  console.log(`New purchase created with ID: ${newPurchaseRef.id}`);
  return newPurchaseRef.id;
}

export async function confirmPurchase(purchaseId: string) {
  // confirmamos la compra en la DB
  await collection.doc(purchaseId).update({ status: "confirmed" });
  console.log(`Purchase ${purchaseId} confirmed`);
  return true;
}
