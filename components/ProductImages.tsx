import React, { useState } from "react";
import { styled } from "styled-components";

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const BigImage = styled.img`
  max-width: 100%;
  min-height: 200px;
  max-height: 200px;
  object-fit: contain;
`;

const BigImageWrapper = styled.div`
  text-align: center;
`;

const ImageButtons = styled.div`
  display: flex;
  gap: 10px;
  flex-grow: 0;
  margin-top: 10px;
`;

interface ImageButtonProps {
  active: boolean;
}

const ImageButton = styled.div<ImageButtonProps>`
  border: 2px solid #ccc;
  ${(props: any) =>
    props.active
      ? `border-color: #ccc;`
      : `border-color: transparent; opacity: 0.6;`}
  height: 60px;
  padding: 5px;
  cursor: pointer;
  border-radius: 5px;
`;

const ProductImages = ({ images }: any) => {
  const [activeImage, setActiveImage] = useState(images?.[0]);
  return (
    <>
      <BigImageWrapper>
        <BigImage src={activeImage} alt="" />
      </BigImageWrapper>
      <ImageButtons>
        {images.map((image: any) => (
          <ImageButton
            key={image}
            active={image === activeImage}
            onClick={() => setActiveImage(image)}
          >
            <Image src={image} alt="" />
          </ImageButton>
        ))}
      </ImageButtons>
    </>
  );
};

export default ProductImages;
