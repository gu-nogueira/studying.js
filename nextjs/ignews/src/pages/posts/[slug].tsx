import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { useRouter } from 'next/router';

import * as prismicH from '@prismicio/helpers';

// ** Services
import { createClient } from '@/pages/services/prismic';

import Head from 'next/head';

// ** Styles
import commonStyles from '@/styles/common.module.scss';
import styles from './post.module.scss';

interface PostProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  };
}

export default function Post({ post }: PostProps) {
  const { isFallback } = useRouter();

  if (isFallback) {
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
            className={`${styles.postContent} ${commonStyles.content}`}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  // const session = await getServerSession(req);
  const { slug } = params;

  // ** We can use this to redirect to home page if user is not authenticated

  // if (!session?.activeSubscription) {
  //   return {
  //     redirect: {
  //       destination: '/',
  //       permanent: false,
  //     },
  //   };
  // }

  const prismic = createClient(req);

  const response = await prismic.getByUID('post', String(slug), {});

  const post = {
    slug,
    title: response.data.title,
    content: prismicH.asHTML(response.data.content),
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
  };
};
