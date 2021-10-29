import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { postFilePaths, POSTS_PATH } from "../utils/mdx";
import path from "path";
import fs from "fs";

import matter from "gray-matter";
import { serialize as serializeMdx } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

interface Props {
  frontmatter: any;
  source: MDXRemoteSerializeResult;
}

const PostPage: NextPage<Props> = ({ frontmatter, source }) => (
  <div>
    post uwu
    <main>
      <MDXRemote {...source} />
    </main>
  </div>
);

export default PostPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = postFilePaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ""))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postFilePath = path.join(POSTS_PATH, `${params!.slug}.mdx`);
  const source = fs.readFileSync(postFilePath);

  const { content, data } = matter(source);

  const mdxSource = await serializeMdx(content, {
    scope: data,
  });

  return {
    props: {
      frontMatter: data,
      source: mdxSource,
    },
  };
};
