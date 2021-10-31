import type { NextPage } from "next";
import { postFilePaths, POSTS_PATH } from "../utils/mdx";
import path from "path";
import fs from "fs";
import matter from "gray-matter";
import Link from "next/link";
import { postPath } from "../utils/path";
import {
  format as formatDate,
  parseISO as parseISODate,
  compareDesc as compareDatesDesc,
} from "date-fns";
import NewsletterBanner from "../components/NewsletterBanner";

type Props = ReturnType<typeof getStaticProps>["props"];

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <>
      <div className="flex-1 flex flex-col">
        <div className="flex-1 mb-8 max-w-2xl w-full mx-auto flex flex-col gap-4 px-3 md:px-0 sm:mb-24">
          {posts
            .sort((a, b) =>
              compareDatesDesc(
                parseISODate(a.data.date),
                parseISODate(b.data.date)
              )
            )
            .map((post) => (
              <Link key={post.slug} href={postPath(post.slug)}>
                <a>
                  <div className="flex flex-col items-start bg-white shadow rounded px-5 py-3 md:flex-row md:items-center">
                    <span className="flex-1 font-medium">
                      {post.data.title}
                    </span>
                    <span className="text-sm text-gray-500">
                      {formatDate(parseISODate(post.data.date), "MMM do, yyyy")}
                    </span>
                  </div>
                </a>
              </Link>
            ))}
        </div>
        <NewsletterBanner />
      </div>
    </>
  );
};

export default Home;

export function getStaticProps() {
  const posts = postFilePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(POSTS_PATH, filePath));
    const { data } = matter(source);
    const slug = filePath.replace(/\.mdx?$/, "");

    return {
      data,
      slug,
    };
  });

  return { props: { posts } };
}
