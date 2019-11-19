import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import styled, { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/GlobalStyles";

// Our Theme with Styled Components
const theme = {
  primaryColor: "#03AFC2",
  black: "#393939",
  lightBlack: "#5a5a5a",
  grey: "#f7f7f7",
  meta: "#a7a7a7",
  white: "#edf0f1",
  maxWidth: "1400px",
};

const Layout = props => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  console.log(props);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Wrapper>
        <header>
          <StyledTitle>{data.site.siteMetadata.title}</StyledTitle>
        </header>
        <main>{props.children}</main>
      </Wrapper>
    </ThemeProvider>
  );
};

const Wrapper = styled.div`
  min-height: 100vh;
`;

const StyledTitle = styled.h1`
  color: ${props => props.theme.primaryColor};
  text-transform: uppercase;
`;

export default Layout;
