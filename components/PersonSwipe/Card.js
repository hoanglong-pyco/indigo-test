import React from "react";
import styled from "styled-components/native";

export function Card({ children, ...props }) {
  return (
    <Wrapper {...props}>
      <BackgroudTop />
      <Container>{children}</Container>
    </Wrapper>
  );
}

const styles = {
  rarius: 8,
  width: 280,
  borderColor: "#ddd"
};

const Wrapper = styled.View`
  width: ${styles.width};
  height: 300;
  background-color: #fff;
  border-width: 1;
  border-color: ${styles.borderColor};
  border-radius: ${styles.rarius};
`;
const BackgroudTop = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 105;
  background-color: #f9f9f9;
  border-bottom-width: 1;
  border-color: ${styles.borderColor};
  border-top-left-radius: ${styles.rarius - 1};
  border-top-right-radius: ${styles.rarius - 1};
`;

const Container = styled.View`
  width: ${styles.width};
  flex: 1;
  height: 400;
  align-items: center;
`;
