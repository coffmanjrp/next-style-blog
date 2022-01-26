import Head from 'next/head';
import { MDXRemote } from 'next-mdx-remote';
import { getPosts, getPostById } from '../../lib/mdx';

const Article = ({ mdxSource }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="noindex, nofollow" />
        <title>Next.js Style Blog</title>
      </Head>

      <article className="prose dark:prose-dark">
        <MDXRemote {...mdxSource} />
      </article>
    </div>
  );
};

export const getStaticPaths = async () => {
  const posts = await getPosts('posts');
  const post = posts.map((post) => ({
    params: {
      id: post.replace(/\.mdx/, ''),
    },
  }));

  return {
    paths: post,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const { id } = params;
  const post = await getPostById('posts', id);

  return {
    props: post,
  };
};

export default Article;
