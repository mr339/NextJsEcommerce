import React from "react";
import { styled } from "styled-components";

const StyledInput = styled.input`
  padding: 5px;
  width: 100%;
  margin-bottom: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
`;

const Input = (props: any) => {
  return (
    <>
      <StyledInput {...props} />
    </>
  );
};

export default Input;
