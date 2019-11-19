const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const blogPost = path.resolve(`./src/templates/blog-post.js`);
  const eventPost = path.resolve(`./src/templates/event-post.js`);

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

  const eventsResult = await graphql(
    `
      {
        allMdx(
          filter: { fileAbsolutePath: { regex: "/events/" } }
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

  if (eventsResult.errors) {
    throw eventsResult.errors;
  }

  // Create blog posts pages.
  const posts = blogResult.data.allMdx.edges;
  const events = eventsResult.data.allMdx.edges;

  posts.forEach(post => {
    createPage({
      path: `blog${post.node.fields.slug}`,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
      },
    });
  });

  events.forEach(event => {
    createPage({
      path: `events${event.node.fields.slug}`,
      component: eventPost,
      context: {
        slug: event.node.fields.slug,
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
