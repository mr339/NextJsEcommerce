import React, { useContext } from "react";
import Center from "./Center";
import { styled } from "styled-components";
import Button from "./Button";
import CartIcon from "./icons/CartIcon";
import ButtonLink from "./ButtonLink";
import { CartContext } from "./CartContext";
const Bg = styled.div`
  background: #222;
  color: #fff;
  padding: 50px 0px;
`;

const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 3rem;
`;

const Desc = styled.p`
  color: #aaa;
  font-size: 0.8rem;
`;

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 40px;
  img {
    max-width: 100%;
  }
`;

const Column = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px;
`;

const Featured = ({ product }: any) => {
  let { addProduct } = useContext(CartContext) as any;
  const addFeaturedToCart = () => {
    addProduct(product._id);
  };
  return (
    <>
      <Bg>
        <Center>
          <ColumnsWrapper>
            <Column>
              <div>
                <Title>{product.title}</Title>
                <Desc>{product.description}</Desc>
                <ButtonWrapper>
                  <ButtonLink
                    href={"/products/" + product._id}
                    outline={1}
                    white={1}
                  >
                    Read more
                  </ButtonLink>
                  {/* Added 1 to fix warning */}
                  <Button white={1} onClick={addFeaturedToCart}>
                    <CartIcon />
                    Add to cart
                  </Button>
                </ButtonWrapper>
              </div>
            </Column>
            <Column>
              <img src="https://ganeshdai-testing.s3.amazonaws.com/1690972219350.jpeg" />
            </Column>
          </ColumnsWrapper>
        </Center>
      </Bg>
    </>
  );
};

export default Featured;
