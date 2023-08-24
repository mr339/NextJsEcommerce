import Button from "@/components/Button";
import Center from "@/components/Center";
import Header from "@/components/Header";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { CartContext } from "@/components/CartContext";
import axios from "axios";
import Table from "@/components/table";
import Input from "@/components/Input";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin-top: 40px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.3fr 0.7fr;
  }
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;

const ProductInfoCell = styled.td`
  padding: 10px 0px;
`;

const ProductImageBox = styled.div`
  width: 70px;
  height: 100px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  border-radius: 10px;
  img {
    max-width: 60px;
    max-height: 60px;
  }
  @media screen and (min-width: 768px) {
    padding: 10px;
    img {
      max-width: 80px;
      max-height: 80px;
    }
    width: 100px;
    height: 100px;
  }
`;

const QuantityLabel = styled.span`
  padding: 0 15px;
  display: block @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 0 10px;
  }
`;

const CityHolder = styled.div`
  display: flex;
  gap: 10px;
`;

const CartPage = () => {
  let total = 0;
  let { cartProducts, addProduct, removeProduct, clearCart } = useContext(
    CartContext
  ) as any;
  const [products, setProducts] = useState<any>([]);
  const [name, setName] = useState<any>("");
  const [isSuccess, setIsSuccess] = useState<any>(false);
  const [city, setCity] = useState<any>("");
  const [streetAddress, setStreetAddress] = useState<any>("");
  const [country, setCountry] = useState<any>("");
  const [postalCode, setPostalCode] = useState<any>("");
  const [email, setEmail] = useState<any>("");

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data);
      });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window?.location.href.includes("success")
    ) {
      setIsSuccess(true);
      clearCart();
    }
  }, []);

  const increaseProduct = (id: any) => {
    addProduct(id);
  };

  const decreaseProduct = (id: any) => {
    removeProduct(id);
  };

  const goToPayment = async () => {
    const response = await axios.post("/api/checkout", {
      name,
      city,
      email,
      streetAddress,
      country,
      postalCode,
      cartProducts,
    });

    if (response.data.url) {
      window.location = response.data.url;
    }
  };

  for (const productId of cartProducts) {
    const price = products.find((p: any) => p._id === productId)?.price;
    total += price;
  }

  if (isSuccess) {
    return (
      <>
        <Header />
        <Center>
          <ColumnsWrapper>
            <Box>
              <h1>Thank you for your purchase</h1>
              <p>We will email you when your order will be sent</p>
            </Box>
          </ColumnsWrapper>
        </Center>
      </>
    );
  }
  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <Box>
            <h2>Cart</h2>
            {!cartProducts?.length && <div>Your cart is empty</div>}
            {products?.length > 0 && (
              <Table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product: any) => (
                    <tr key={product._id}>
                      <ProductInfoCell>
                        <ProductImageBox>
                          <img src={product.images[0]} alt=""></img>
                        </ProductImageBox>
                        {product.title}
                      </ProductInfoCell>
                      <td>
                        <Button onClick={() => decreaseProduct(product._id)}>
                          -
                        </Button>
                        <QuantityLabel>
                          {
                            cartProducts.filter((id: any) => id === product._id)
                              .length
                          }
                        </QuantityLabel>
                        <Button onClick={() => increaseProduct(product._id)}>
                          +
                        </Button>
                      </td>
                      <td>
                        ${" "}
                        {cartProducts.filter((id: any) => id === product._id)
                          .length * product.price}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td></td>
                    <td></td>
                    <td>${total}</td>
                  </tr>
                </tbody>
              </Table>
            )}
          </Box>

          {!!cartProducts?.length && (
            <Box>
              <h2>Payment Information</h2>
              <Input
                type="text"
                placeholder="Name"
                value={name}
                name="name"
                onChange={(e: any) => setName(e.target.value)}
              ></Input>
              <Input
                type="text"
                placeholder="Email"
                value={email}
                name="email"
                onChange={(e: any) => setEmail(e.target.value)}
              ></Input>
              <CityHolder>
                <Input
                  type="text"
                  placeholder="City"
                  value={city}
                  name="city"
                  onChange={(e: any) => setCity(e.target.value)}
                ></Input>
                <Input
                  type="text"
                  placeholder="Postal Code"
                  value={postalCode}
                  name="postalCode"
                  onChange={(e: any) => setPostalCode(e.target.value)}
                ></Input>
              </CityHolder>
              <Input
                type="text"
                placeholder="Country"
                value={country}
                name="country"
                onChange={(e: any) => setCountry(e.target.value)}
              ></Input>
              <Input
                type="text"
                placeholder="Street Address"
                value={streetAddress}
                name="streetAddress"
                onChange={(e: any) => setStreetAddress(e.target.value)}
              ></Input>
              <Button black={1} block={1} onClick={goToPayment}>
                Continue to payment
              </Button>
            </Box>
          )}
        </ColumnsWrapper>
      </Center>
    </>
  );
};

export default CartPage;
