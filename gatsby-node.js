const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const blogPost = path.resolve(`./src/templates/blog-post.js`);
  const sentenzaPost = path.resolve(`./src/templates/sentenza-post.js`);

  const blogResult = await graphql(
    `
      {
        allMdx(
          filter: { fileAbsolutePath: { regex: "/blog/" } }
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  );

  if (blogResult.errors) {
    throw blogResult.errors;
  }

  const sentenzeResult = await graphql(
    `
      {
        allMdx(
          filter: { fileAbsolutePath: { regex: "/sentenze/" } }
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  );

  if (sentenzeResult.errors) {
    throw sentenzeResult.errors;
  }

  // Create blog posts pages.
  const posts = blogResult.data.allMdx.edges;
  const sentenze = sentenzeResult.data.allMdx.edges;

  posts.forEach(post => {
    createPage({
      path: `blog${post.node.fields.slug}`,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
      },
    });
  });

  sentenze.forEach(sentenza => {
    createPage({
      path: `sentenze${sentenza.node.fields.slug}`,
      component: sentenzaPost,
      context: {
        slug: sentenza.node.fields.slug,
      },
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};
