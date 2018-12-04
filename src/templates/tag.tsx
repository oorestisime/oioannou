import React from "react";
import { Box, ResponsiveContext, Grid } from "grommet";
import Layout from "../components/Layout";
import Header from "../components/Header";
import Post from "../components/Post";
type TagProps = {
  pageContext: {
    title: string,
    posts: {
      title: string
    }[]
  }
};
const Tag: React.SFC<TagProps> = ({ pageContext: { title, posts } }) => (
  <Layout>
    <Header right title={`Tag: ${title}`} />
    <Box margin={{ horizontal: "large" }}>
      <ResponsiveContext.Consumer>
        {size => (
          <Grid
            align="start"
            columns={size !== "small" && { count: "fill", size: "large" }}
            gap="medium"
          >
            {posts.map(post => (
              <Post key={post.frontmatter.path} post={post} />
            ))}
          </Grid>
        )}
      </ResponsiveContext.Consumer>
    </Box>
  </Layout>
);
export default Tag;
