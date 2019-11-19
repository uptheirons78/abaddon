import React from "react";
import { Link } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Home" keywords={[`blog`, `gatsby`, `javascript`, `react`]} />
      <p>Welcome to your new Gatsby website. You are on your home page.</p>
      <p>
        This starter comes out of the box with styled components and Gatsby's
        default starter blog running on Netlify CMS.
      </p>
      <p>
        Global Styles, CSS Reset and Theme Provider are already there for you!{" "}
      </p>
      <ul style={{ marginTop: "5rem" }}>
        <Link style={{ marginRight: "2rem" }} to="/blog/">
          Blog
        </Link>
        <Link style={{ marginRight: "2rem" }} to="/sentenze/">
          Sentenze
        </Link>
      </ul>
    </Layout>
  );
};

export default IndexPage;
