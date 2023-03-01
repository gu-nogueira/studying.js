import { GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import { SubscribeButton } from '@/components/SubscribeButton';

import { stripe } from '@/services/stripe';
import styles from '@/styles/home.module.scss';

// 3 ways to populate a page with data:
// 1. Client-side <dynamic no indexed data> (JS)
// 2. Server-side <dynamic data> (Node)
// 3. Static Site Generation <static generic data> (SSG)

interface HomeProps {
  product: {
    priceId: string;
    amount: string;
  };
}

export default function Home({ product }: HomeProps) {

  return (
    <>
      <Head>
        <title>Home | ig.news</title>
        {/* Here we can input metas for SEO like description, keywords, canonical, etc */}
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>
            News about the <span>React</span> world.
          </h1>
          <p>
            Get access to all the publications <br />
            <span>for {product.amount}</span> month
          </p>
          <SubscribeButton />
        </section>

        <Image
          src="/images/avatar.svg"
          alt="Girl coding"
          height={500}
          width={450}
        />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1McSeLI3UlqWg0mQObIeCdma', {
    // expand is used to include the product object in the response
    expand: ['product'],
  });

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),
  };

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};
