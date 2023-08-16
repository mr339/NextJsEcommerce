import React, { useContext } from "react";
import { styled } from "styled-components";
import Button from "./Button";
import Link from "next/link";
import { CartContext } from "./CartContext";

const ProductWrapper = styled.div``;

const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 20px;
  height: 120px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 100%;
    max-height: 80px;
  }
`;

const Title = styled(Link)`
  font-weight: normal;
  font-size: 0.9rem;
  text-decoration: none;
  color: inherit;
  margin: 0px;
`;

const ProductInfoBox = styled.div`
  margin-top: 5px;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;
`;

const Price = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
`;

const ProductBox = ({ _id, title, description, price, images }: any) => {
  let url = "/product/" + _id;

  let { addProduct } = useContext(CartContext) as any;
  const addNewArrivalsToCart = () => {
    addProduct(_id);
  };

  return (
    <>
      <ProductWrapper>
        <WhiteBox key={_id} href={url}>
          <div>
            <img src={images[0]} />
          </div>
        </WhiteBox>
        <ProductInfoBox>
          <Title href={url}>{title}</Title>
          <PriceRow>
            <Price>${price}</Price>
            <Button primarybtn={1} outline={1} onClick={addNewArrivalsToCart}>
              Add to cart
            </Button>
          </PriceRow>
        </ProductInfoBox>
      </ProductWrapper>
    </>
  );
};

export default ProductBox;
