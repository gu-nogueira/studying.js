import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';

// ** Services
import { createClient } from '@/services/prismic';

import styles from './styles.module.scss';
import { RTTextNode } from '@prismicio/types';

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
};

interface PostsProps {
  posts: Post[];
}

export default function Posts({ posts }: PostsProps) {
  return (
    <>
      <Head>Posts | Ignews</Head>
      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.length > 0 &&
            posts.map((post) => (
              <Link key={post.slug} href={`/posts/${post.slug}`}>
                <time>{post.updatedAt}</time>
                <strong>{post.title}</strong>
                <p>{post.excerpt}</p>
              </Link>
            ))}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ previewData }) => {
  const prismic = createClient();

  const response = await prismic.getAllByType('post', {
    fetch: ['post.title', 'post.content'],
    pageSize: 100,
  });

  // ** A good practice about static site generation is to format all the data if possible in the server side. This improves SEO and performance, because the browser will not have to format the data.

  const posts = response.map((post) => {
    const firstParagraph = post.data.content.find(
      (content) => content.type === 'paragraph'
    ) as RTTextNode;
    const rawExcerpt = firstParagraph?.text ? firstParagraph.text : '';
    const trimmedExcerpt = rawExcerpt.split(' ').slice(0, 24).join(' ') + '...';

    return {
      slug: post.uid,
      title: post.data.title,
      excerpt: trimmedExcerpt,
      updatedAt: new Date(post.last_publication_date).toLocaleDateString(
        'pt-BR',
        {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }
      ),
    };
  });

  return {
    props: {
      posts,
    },
  };
};
