import { firestore } from "../lib/firestore";
const collection = firestore.collection("orders");

export class Order {
  ref: FirebaseFirestore.DocumentReference;
  title: string;
  productId: string;
  amount: number;
  status: string;
  userId: number;
  data: any;
  id: string;
  constructor(id) {
    this.id = id;
    this.ref = collection.doc(id);
  }

  async pull() {
    const snap = await this.ref.get();
    this.data = snap.data();
  }

  async push() {
    this.ref.update(this.data);
  }

  static async createOrder(data) {
    const newOrderSnap = await collection.add(data);
    const newOrder = new Order(newOrderSnap.id);
    newOrder.data = data;
    return newOrder;
  }
  static async getAllOrders(userId) {
    const orderSnap = await collection.where("userId", "==", userId).get();
    const orders: Order[] = [];
    orderSnap.forEach((doc) => {
      const order = new Order(doc.id);
      order.data = doc.data();
      orders.push(order);
    });
    return orders;
  }

  static async getSingleOrder(orderId: string): Promise<Order> {
    const docSnap = await collection.doc(orderId).get();
    if (!docSnap.exists) {
      throw new Error("order not found");
    }
    const order = new Order(docSnap.id);
    order.data = docSnap.data();
    return order;
  }
}
