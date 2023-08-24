import Link from "next/link";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import Center from "./Center";
import { CartContext } from "./CartContext";
import BarsIcon from "./icons/BarsIcon";

const StyledHeader = styled.header`
  background-color: #222;
`;

const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
  position: relative;
  z-index: 3;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0px;
`;

interface MenuButtonProps {
  mobilenavactive: boolean;
}

const StyledNav = styled.nav<MenuButtonProps>`
  ${(props: any) =>
    props.mobilenavactive ? `display: block;` : `display: none;`}
  gap: 15px;
  position: fixed;
  top: 0px;
  right: 0;
  left: 0;
  bottom: 0px;
  padding: 70px 20px;
  background-color: #222;
  @media screen and (min-width: 768px) {
    display: flex;
    padding: 0;
    position: static;
  }
`;

const StyledLink = styled(Link)`
  display: block;
  color: #aaa;
  text-decoration: none;
  padding: 10px 0;
  @media screen and (min-width: 768px) {
    padding: 0;
  }
`;

const NavButton = styled.button`
  background-color: transparent;
  height: 39px;
  width: 39px;
  border: none;
  cursor: pointer;
  color: white;
  position: relative;
  z-index: 3;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const Header = () => {
  let { cartProducts } = useContext(CartContext) as any;
  const [mobileNavActive, setMobileNavActive] = useState<boolean>(false);

  return (
    <>
      <StyledHeader>
        <Center>
          <Wrapper>
            <Logo href={"/"}>Ecommerce</Logo>
            <StyledNav mobilenavactive={mobileNavActive}>
              <StyledLink href={"/"}>Home</StyledLink>
              <StyledLink href={"/products"}>All products</StyledLink>
              <StyledLink href={"/categories"}>Categories</StyledLink>
              <StyledLink href={"/account"}>Account</StyledLink>
              <StyledLink href={"/cart"}>
                Cart ({cartProducts.length})
              </StyledLink>
            </StyledNav>
            <NavButton onClick={() => setMobileNavActive((prev) => !prev)}>
              <BarsIcon />
            </NavButton>
          </Wrapper>
        </Center>
      </StyledHeader>
    </>
  );
};

export default Header;
