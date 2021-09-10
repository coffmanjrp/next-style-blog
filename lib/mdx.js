import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import mdxPrism from 'mdx-prism';
import remarkCodeTitle from 'remark-code-titles';
import rehypeSlug from 'rehype-slug';

export const getPosts = async (type) => {
  return fs.readdirSync(path.join(process.cwd(), 'pages', type));
};

export const getPostById = async (type, id) => {
  const source = id
    ? fs.readFileSync(
        path.join(process.cwd(), 'pages', type, `${id}.mdx`),
        'utf8'
      )
    : fs.readFileSync(path.join(process.cwd(), 'pages', `${type}.mdx`), 'utf8');

  const { data, content } = matter(source);
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkCodeTitle],
      rehypePlugins: [mdxPrism, rehypeSlug],
    },
  });

  return {
    mdxSource,
    frontMatter: {
      id,
      ...data,
    },
  };
};

export const getAllPostData = async (type) => {
  const files = fs.readdirSync(path.join(process.cwd(), 'pages', type));

  return files.reduce((posts, id) => {
    const source = fs.readFileSync(
      path.join(process.cwd(), 'pages', type, id),
      'utf8'
    );
    const { data } = matter(source);

    return [
      {
        ...data,
        id: id.replace('.mdx', ''),
      },
      ...posts,
    ];
  }, []);
};
