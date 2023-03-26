import { useEffect } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

import * as prismicH from '@prismicio/helpers';

// ** Types
import { RTNode } from '@prismicio/types';

// ** Services
import { createClient } from '@/services/prismic';

// ** Styles
import commonStyles from '@/styles/common.module.scss';
import styles from '../post.module.scss';

interface PostPreviewProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  };
}

export default function PostPreview({ post }: PostPreviewProps) {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.activeSubscription) {
      router.push(`/posts/${post.slug}`);
    }
  }, [session]);

  if (router.isFallback) {
    return <h1>Carregando...</h1>;
  }

  return (
    <>
      <Head>
        <title>{post.title} | Ignews</title>
      </Head>
      <main className={commonStyles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          {/* To set html content we need to use dangerouslySetInnerHTML. It's only recommended to use it when we are sure that the content is safe. */}
          <div
            className={`${styles.postContent} ${styles.previewContent}`}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className={styles.continueReading}>
            Wanna continue reading?
            <Link href={`/posts/${post.slug}`}>Subscribe now 🤗</Link>
          </div>
        </article>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    // Inside paths, we can use a strategy to cache strategically posts (like the 30 hot ones). If doesn't, it will be cached when the user access the page.
    paths: [
      // {
      //   params: {
      //     slug: 'um-breve-arquivo-sobre-a-origem-da-ferramenta-que-facilitou',
      //   },
      // },
    ],
    // ** If fallback is false, the page will be 404 if the user access a page that is not cached. If fallback is true, the page will be cached when the user access it. If fallback is blocking, the page will be cached when the build is done.
    fallback: 'blocking',
  };
};

// ** Preview page will be a public page. All public pages can be cached / static. So we can use getStaticProps instead of getServerSideProps

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params!; // ** We can use ! to tell TS that we are sure that params is not null

  // ** We can use this to redirect to home page if user is not authenticated

  const prismic = createClient();

  const response = await prismic.getByUID('post', String(slug), {});

  const partialContent = response.data.content.slice(0, 3) as [RTNode];

  const post = {
    slug,
    title: response.data.title,
    content: prismicH.asHTML(partialContent),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString(
      'pt-BR',
      {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }
    ),
  };

  return {
    props: {
      post,
    },
    revalidate: 60 * 30, // 30 minutes
  };
};
