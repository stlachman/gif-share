import React from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/core";
import Layout from "./Layout";

const spin = keyframes`
  0% {
    transform: rotate(0deg)
  }
  100% {
    transform: rotate(360deg)
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
`;

const Spinner = styled.div`
  width: 3em;
  height: 3em;
  border-radius: 50%;
  position: relative;
  transform: translateZ(0);
  border-top: 0.5em solid rgba(0, 0, 0, 0.2);
  border-right: 0.5em solid rgba(0, 0, 0, 0.2);
  border-bottom: 0.5em solid rgba(0, 0, 0, 0.2);
  border-left: 0.5em solid #333;
  animation: ${spin} 1s infinite linear;

  &::after {
    width: 5em;
    height: 5em;
    border-radius: 50%;
  }
`;

const Loader = () => {
  return (
    <Layout>
      <Container>
        <Spinner />
      </Container>
    </Layout>
  );
};

export default Loader;
