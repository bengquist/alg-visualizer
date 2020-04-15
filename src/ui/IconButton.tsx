import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import React, { ComponentPropsWithoutRef } from "react";
import styled from "styled-components";

type Props = FontAwesomeIconProps & ComponentPropsWithoutRef<"button">;

function IconButton({ icon, ...props }: Props) {
  return (
    <Container {...props}>
      <FontAwesomeIcon icon={icon} />
    </Container>
  );
}

export default IconButton;

const Container = styled.button`
  padding: 0.5rem 0.75rem;

  :focus {
    outline: 2px solid #5c6778;
  }
`;
