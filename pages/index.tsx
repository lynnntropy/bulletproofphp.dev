import type { NextPage } from "next";
import { postFilePaths, POSTS_PATH } from "../utils/mdx";
import path from "path";
import fs from "fs";
import matter from "gray-matter";
import Link from "next/link";
import { postPath } from "../utils/path";

type Props = ReturnType<typeof getStaticProps>["props"];

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <div className="max-w-2xl w-full mx-auto flex flex-col gap-4">
      {posts.map((post) => (
        <Link key={post.slug} href={postPath(post.slug)}>
          <a>
            <div className="bg-white shadow rounded px-4 py-3">
              {post.data.title}
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default Home;

export function getStaticProps() {
  // const posts = postFilePaths.map((filePath) => {
  //   const source = fs.readFileSync(path.join(POSTS_PATH, filePath));
  //   const { content, data } = matter(source);
  //   const slug = filePath.replace(/\.mdx?$/, "");

  //   return {
  //     content,
  //     data,
  //     slug,
  //   };
  // });

  const posts = [
    {
      slug: "test",
      data: { title: "Lorem Ipsum Dolor Sit Amet uwu" },
    },
    {
      slug: "test",
      data: { title: "Lorem Ipsum Dolor Sit Amet uwu" },
    },
    {
      slug: "test",
      data: { title: "Lorem Ipsum Dolor Sit Amet uwu" },
    },
    {
      slug: "test",
      data: { title: "Lorem Ipsum Dolor Sit Amet uwu" },
    },
    {
      slug: "test",
      data: { title: "Lorem Ipsum Dolor Sit Amet uwu" },
    },
    {
      slug: "test",
      data: { title: "Lorem Ipsum Dolor Sit Amet uwu" },
    },
    {
      slug: "test",
      data: { title: "Lorem Ipsum Dolor Sit Amet uwu" },
    },
    {
      slug: "test",
      data: { title: "Lorem Ipsum Dolor Sit Amet uwu" },
    },
    {
      slug: "test",
      data: { title: "Lorem Ipsum Dolor Sit Amet uwu" },
    },
    {
      slug: "test",
      data: { title: "Lorem Ipsum Dolor Sit Amet uwu" },
    },
  ];

  return { props: { posts } };
}
