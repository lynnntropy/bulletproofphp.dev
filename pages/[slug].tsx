import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { postFilePaths, POSTS_PATH } from "../utils/mdx";
import path from "path";
import fs from "fs";

import matter from "gray-matter";
import { serialize as serializeMdx } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import Image from "next/image";
import { format as formatDate, parseISO as parseISODate } from "date-fns";
import NewsletterBanner from "../components/NewsletterBanner";

const mdxComponents = {
  // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
  img: (props: any) => <img className="w-full rounded-lg" {...props} />,
};

interface Props {
  frontmatter: any;
  source: MDXRemoteSerializeResult;
}

const PostPage: NextPage<Props> = ({ frontmatter, source }) => (
  <>
    <div className="relative overflow-hidden mb-24">
      <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:h-full lg:w-full">
        <div
          className="relative h-full text-lg max-w-prose mx-auto"
          aria-hidden="true"
        >
          <svg
            className="absolute top-12 left-full transform translate-x-32"
            width={404}
            height={384}
            fill="none"
            viewBox="0 0 404 384"
          >
            <defs>
              <pattern
                id="74b3fd99-0a6f-4271-bef2-e80eeafdf357"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={4}
                  className="text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width={404}
              height={384}
              fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)"
            />
          </svg>
          <svg
            className="absolute top-1/2 right-full transform -translate-y-1/2 -translate-x-32"
            width={404}
            height={384}
            fill="none"
            viewBox="0 0 404 384"
          >
            <defs>
              <pattern
                id="f210dbf6-a58d-4871-961e-36d5016a0f49"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={4}
                  className="text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width={404}
              height={384}
              fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)"
            />
          </svg>
          {/* TODO maybe we could conditionally enable this if the post is long enough? */}
          {/* <svg
            className="absolute bottom-12 left-full transform translate-x-32"
            width={404}
            height={384}
            fill="none"
            viewBox="0 0 404 384"
          >
            <defs>
              <pattern
                id="d3eb07ae-5182-43e6-857d-35c643af9034"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={4}
                  className="text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width={404}
              height={384}
              fill="url(#d3eb07ae-5182-43e6-857d-35c643af9034)"
            />
          </svg> */}
        </div>
      </div>
      <div className="relative px-4 sm:px-6 lg:px-8">
        <div className="text-lg max-w-prose mx-auto">
          <h1 className="mb-1 block text-3xl font-title font-black text-center leading-8 tracking-tight text-gray-900 sm:text-4xl">
            {frontmatter.title}
          </h1>
          <span className="block text-center text-base text-gray-500">
            Posted on{" "}
            {formatDate(parseISODate(frontmatter.date), "MMM do, yyyy")} by{" "}
            {frontmatter.author.avatar && (
              <>
                <span className="relative top-1 ">
                  <Image
                    src={frontmatter.author.avatar}
                    alt=""
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                </span>{" "}
              </>
            )}
            {frontmatter.author.link ? (
              <a
                href={frontmatter.author.link}
                target="_blank"
                className="underline font-medium text-indigo-500"
                rel="noreferrer"
              >
                {frontmatter.author.name}
              </a>
            ) : (
              frontmatter.author.name
            )}
          </span>
        </div>
        <div className="mt-6 prose prose-indigo prose-lg text-gray-700 mx-auto">
          <MDXRemote components={mdxComponents} {...source} />
        </div>
      </div>
    </div>
    <NewsletterBanner />
  </>
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
      frontmatter: data,
      source: mdxSource,
    },
  };
};
