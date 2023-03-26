import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

import { SignInButton } from '../SignInButton';

import styles from './styles.module.scss';

const routes = [
  {
    path: '/',
    name: 'Home',
  },
  {
    path: '/posts',
    name: 'Posts',
    prefetch: false,
  },
];

// ** We can optionally use default only if it's needed
export function Header() {
  const { asPath } = useRouter();

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        {/* All images on next.js always be in public folder. It's directory will always start with '/' */}
        <Image src="/images/logo.svg" alt="ig.news" width={100} height={100} />
        <nav>
          {routes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              className={asPath === route.path ? styles.active : ''}
              {...(route.prefetch === false ? { prefetch: false } : {})}
            >
              {route.name}
            </Link>
          ))}
        </nav>
        <SignInButton />
      </div>
    </header>
  );
}
