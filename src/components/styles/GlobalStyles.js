import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, *:before, *:after {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }
  html {
    box-sizing: border-box;
    font-size: 10px;
  }
  body {
    font-family: "Open Sans", sans-serif;
    font-size: 1.6rem;
    line-height: 1.5;
    font-weight: 400;
    letter-spacing: 1px;
    @media (max-width: 520px) {
    font-size: 1.5rem;
    }
  }
  h1,h2,h3,h4,h5,h6 {
    font-weight: 800;
    letter-spacing: 1px;
  }
  h1 {
    font-size: 4rem;
  }
  h2 {
    font-size: 3.2rem;
  }
  h3 {
    font-size: 2.6rem;
  }
  h4 {
    font-size: 2rem;
  }
  p {
    &:not(:nth-child(1)) {
    margin-top: 1.5rem;
    }
    color: ${props => props.theme.black};
  }
  ul {
    list-style-type: none;
  }
  a {
    text-decoration: none;
    color: ${props => props.theme.primaryColor};
    font-weight: 700;
  }
  strong, b {
    color: ${props => props.theme.primaryColor};
  }

`;

export default GlobalStyle;
