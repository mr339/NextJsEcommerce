// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/product";
import { Order } from "@/models/order";
const stripe = require("stripe")(process.env.STRIPE_SK);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  await mongooseConnect();

  if (method !== "POST") {
    res.json("Should be a post method");
    return;
  }
  const {
    name,
    email,
    city,
    postalCode,
    country,
    streetAddress,
    cartProducts,
  } = req.body;

  const productsIds = cartProducts;
  const uniqueIds = [...new Set(productsIds)];
  const productInfos = await Product.find({ _id: uniqueIds });

  const line_items = [];

  for (const productId of uniqueIds) {
    const productInfo = productInfos.find(
      (p) => p._id.toString() === productId
    );
    const quantity =
      productsIds.filter((id: any) => id === productId)?.length || 0;
    if (quantity > 0 && productInfo) {
      line_items.push({
        quantity,
        price_data: {
          currency: "USD",
          product_data: { name: productInfo.title },
          unit_amount: quantity * productInfo.price * 100,
        },
      });
    }
  }

  const orderDoc = await Order.create({
    line_items,
    name,
    email,
    city,
    postalCode,
    country,
    streetAddress,
    paid: false,
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    customer_email: email,
    success_url: "http://localhost:3000/cart?success=1",
    cancel_url: "http://localhost:3000/cart?cancelled=1",
    metadata: { orderId: orderDoc._id.toString() },
  });

  res.json({
    url: session.url,
  });
}
