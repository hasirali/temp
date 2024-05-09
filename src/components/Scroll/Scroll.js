import React, { useState } from "react";
import styled from "styled-components";
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
export default function ScrollToTop() {
  const [scrollState, setScrollState] = useState(false);
  const toTop = () => {
    window.scrollTo({ top: 0 });
  };
  window.addEventListener("scroll", () => {
    window.pageYOffset > 200 ? setScrollState(true) : setScrollState(false);
  });
  return (
    <ToTop onClick={toTop} scrollState={scrollState}>
      <KeyboardDoubleArrowUpIcon />
    </ToTop>
  );
}

const ToTop = styled.div`
  display: ${({ scrollState }) => (scrollState ? "block" : "none")};
  position: fixed;
  cursor: pointer;
  z-index: 10;
  bottom: 1rem;
  right: 2rem;
  border-radius: 2rem;
  background: linear-gradient(to right, rgb(0, 24, 85), rgb(0, 24, 85));
  padding: 0.8rem 1rem;
  svg {
    transition: 0.6s ease-in-out;
    color: white;
    font-size: 1.9rem;
  }
  &:hover {
    svg {
      transform: scale(1.5);
    }
  }
`;
