import { client } from "lib/algolia";

interface Product {
  Name: string;
  Orders: string[];
  Images: {
    id: string;
    width: number;
    height: number;
    url: string;
    filename: string;
    size: number;
    type: string;
    thumbnails: {
      small: {
        url: string;
        width: number;
        height: number;
      };
      large: {
        url: string;
        width: number;
        height: number;
      };
      full: {
        url: string;
        width: number;
        height: number;
      };
    };
  }[];
  Description: string;
  Link: string;
  Type: string;
  "Unit cost": number;
  Materials: string[];
  Settings: string[];
  "Size (WxLxH)": string;
  Vendor: string[];
  Designer: string[];
  "In stock": boolean;
  "Total units sold": number;
  "Gross sales": number;
  Color: string[];
  objectID: string;
}

export async function getProductById(productId) {
  try {
    const index = client.initIndex("products");
    const product = (await index.getObject(productId)) as Product;
    const response = {
      title: product.Name,
      description: product.Description,
      images: product.Images[0].url,
      price: product["Unit cost"],
      productId: product.objectID,
    };

    return response;
  } catch (error) {
    console.log(error);
    throw new Error(
      error.message ? error.message : "falló al encontrar el producto"
    );
  }
}
