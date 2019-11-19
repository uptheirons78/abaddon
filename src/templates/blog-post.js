import React from "react";
import { graphql, Link } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";

import Layout from "../components/layout";
import SEO from "../components/seo";

const BlogPostTemplate = ({ data }) => {
  const post = data.mdx;

  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <h1>{post.frontmatter.title}</h1>
      <p
        style={{
          display: `block`,
          marginBottom: "1rem",
          marginTop: "1rem",
        }}
      >
        {post.frontmatter.date}
      </p>
      <MDXRenderer>{post.body}</MDXRenderer>
      <hr
        style={{
          marginBottom: "1rem",
        }}
      />
      <Link to="/">Home</Link>
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`;
