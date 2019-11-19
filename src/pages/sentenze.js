import React from "react";
import { Link, graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

const Sentenze = ({ data }) => {
  const posts = data.allMdx.edges;

  return (
    <Layout>
      <SEO title="Elenco delle sentenze e decisioni rilevanti" />
      <div style={{ margin: "20px 0 40px" }}>
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug;
          return (
            <div style={{ marginBottom: "3rem" }} key={node.fields.slug}>
              <h3
                style={{
                  marginBottom: "2rem",
                }}
              >
                <Link
                  style={{ boxShadow: `none` }}
                  to={`sentenze${node.fields.slug}`}
                >
                  {title}
                </Link>
              </h3>
              <small>{node.frontmatter.date}</small>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </div>
          );
        })}
      </div>
      <Link to="/">Home</Link>
    </Layout>
  );
};

export default Sentenze;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      filter: { fileAbsolutePath: { regex: "/sentenze/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`;
