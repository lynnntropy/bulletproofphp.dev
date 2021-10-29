import type { NextPage } from "next";
import { postFilePaths, POSTS_PATH } from "../utils/mdx";
import path from "path";
import fs from "fs";
import matter from "gray-matter";
import Link from "next/link";
import { postPath } from "../utils/path";
import { format as formatDate, parseISO as parseISODate } from "date-fns";

type Props = ReturnType<typeof getStaticProps>["props"];

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <div className="max-w-2xl w-full mx-auto flex flex-col gap-4">
      {posts.map((post) => (
        <Link key={post.slug} href={postPath(post.slug)}>
          <a>
            <div className="flex items-center bg-white shadow rounded px-5 py-3">
              <span className="flex-1">{post.data.title}</span>
              <span className="text-sm text-gray-500">
                {formatDate(parseISODate(post.data.date), "MMM do, yyyy")}
              </span>
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default Home;

export function getStaticProps() {
  const posts = postFilePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(POSTS_PATH, filePath));
    const { content, data } = matter(source);
    const slug = filePath.replace(/\.mdx?$/, "");

    return {
      content,
      data,
      slug,
    };
  });

  return { props: { posts } };
}
