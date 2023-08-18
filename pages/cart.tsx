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
  grid-template-columns: 1.3fr 0.7fr;
  gap: 40px;
  margin-top: 40px;
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
  width: 100px;
  height: 100px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 10px;
  img {
    max-width: 80px;
    max-height: 80px;
  }
`;

const QuantityLabel = styled.span`
  padding: 0 10px;
`;

const CityHolder = styled.div`
  display: flex;
  gap: 10px;
`;

const CartPage = () => {
  let total = 0;
  let { cartProducts, addProduct, removeProduct } = useContext(
    CartContext
  ) as any;
  const [products, setProducts] = useState<any>([]);
  const [name, setName] = useState<any>("");
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

  const increaseProduct = (id: any) => {
    addProduct(id);
  };

  const decreaseProduct = (id: any) => {
    removeProduct(id);
  };

  for (const productId of cartProducts) {
    const price = products.find((p: any) => p._id === productId)?.price;
    total += price;
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
              <form method="POST" action="/api/checkout">
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
                <Button black={1} block={1} type="submit">
                  Continue to payment
                </Button>
              </form>
            </Box>
          )}
        </ColumnsWrapper>
      </Center>
    </>
  );
};

export default CartPage;
