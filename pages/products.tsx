import React from "react";
import Header from "@/components/Header";
import { styled } from "styled-components";
import Center from "@/components/Center";
import { Product } from "@/models/product";
import { mongooseConnect } from "@/lib/mongoose";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";

const ProductsPage = ({ products }: any) => {
  return (
    <>
      <Header />
      <Center>
        <Title>All products</Title>
        <ProductsGrid products={products}></ProductsGrid>
      </Center>
    </>
  );
};

export default ProductsPage;

export async function getServerSideProps() {
  await mongooseConnect();
  const products = await Product.find({}, null, { _id: -1 });

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
