import Link from "next/link";
import React, { useContext } from "react";
import styled from "styled-components";
import Center from "./Center";
import { CartContext } from "./CartContext";

const StyledHeader = styled.header`
  background-color: #222;
`;

const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0px;
`;

const StyledNav = styled.nav`
  display: flex;
  gap: 15px;
`;

const StyledLink = styled(Link)`
  color: #aaa;
  text-decoration: none;
`;

const Header = () => {
  let { cartProducts } = useContext(CartContext) as any;

  return (
    <>
      <StyledHeader>
        <Center>
          <Wrapper>
            <Logo href={"/"}>Ecommerce</Logo>
            <StyledNav>
              <StyledLink href={"/"}>Home</StyledLink>
              <StyledLink href={"/products"}>All products</StyledLink>
              <StyledLink href={"/categories"}>Categories</StyledLink>
              <StyledLink href={"/account"}>Account</StyledLink>
              <StyledLink href={"/cart"}>
                Cart ({cartProducts.length})
              </StyledLink>
            </StyledNav>
          </Wrapper>
        </Center>
      </StyledHeader>
    </>
  );
};

export default Header;
