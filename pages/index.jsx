import Head from 'next/head';
import { useTheme } from 'next-themes';
import { getAllPostData } from '../lib/mdx';

export default function Home({ posts }) {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="noindex, nofollow" />
        <title>Next.js Style Blog</title>
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to <span className="text-blue-600">Next.js Style Blog</span>
        </h1>

        <article className="prose mt-6 dark:prose-dark">
          <p>
            {posts.length} {posts.length > 1 ? 'articles' : 'article'} is
            abailable.
          </p>
        </article>

        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
          {posts?.length > 0 &&
            posts.map((post) => (
              <a
                key={post.id}
                href={`/articles/${post.id}`}
                className="p-6 mt-6 text-left border w-96  rounded-xl hover:text-blue-600 focus:text-blue-600"
              >
                <h3 className="text-2xl font-bold">{[post.title]} &rarr;</h3>
                <p className="mt-4 text-xl">{post.description}</p>
                <p>
                  <small></small>
                  <small># {post.tag}</small>
                </p>
              </a>
            ))}
        </div>

        <button
          className="mt-6 pointer px-3 py-1 bg-gray-600 rounded-md text-white dark:bg-gray-100 dark:text-gray-800"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          Toggle Dark mode
        </button>
      </main>
    </div>
  );
}

export const getServerSideProps = async () => {
  const posts = await getAllPostData('posts');

  return {
    props: {
      posts,
    },
  };
};
