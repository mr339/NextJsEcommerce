import Button from "@/components/Button";
import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductImages from "@/components/ProductImages";
import Title from "@/components/Title";
import CartIcon from "@/components/icons/CartIcon";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/product";
import React, { useContext } from "react";
import { styled } from "styled-components";
import { CartContext } from "@/components/CartContext";

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin: 40px 0;
  @media screen and (min-width: 768px) {
    grid-template-columns: 0.8fr 1.2fr;
  }
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;

const PriceRow = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const PriceSpan = styled.span`
  font-size: 1.5rem;
`;

const ProductPage = ({ product }: any) => {
  let { addProduct } = useContext(CartContext) as any;
  return (
    <>
      <Header />
      <Center>
        <ColWrapper>
          <Box>
            <ProductImages images={product.images} />
          </Box>
          <div>
            <Title>{product.title}</Title>
            <p>{product.description}</p>
            <PriceRow>
              <div>
                <PriceSpan>${product.price}</PriceSpan>
              </div>
              <div>
                <Button primarybtn={1} onClick={() => addProduct(product._id)}>
                  <CartIcon />
                  Add to cart
                </Button>
              </div>
            </PriceRow>
          </div>
        </ColWrapper>
      </Center>
    </>
  );
};

export default ProductPage;

export async function getServerSideProps(context: any) {
  await mongooseConnect();
  const { _id } = context.query;
  const product = await Product.findById(_id);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}
