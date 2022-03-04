import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './download.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">NotQuests Downloads</h1>
        <p className="hero__subtitle">Choose your Minecraft version:</p>
        <div className={styles.buttons}>
          <a
            className="button button--secondary button--lg"
            href="https://github.com/AlessioGr/NotQuests/releases/download/v4.19.0/notquests-4.19.0.jar">
            NotQuests v4.19.0 for Minecraft 1.18.2 
          </a>
          <a
            className="button button--secondary button--lg"
            href="https://github.com/AlessioGr/NotQuests/releases/download/v4.18.2/notquests-4.18.2.jar">
            NotQuests v4.18.2 for Minecraft 1.17 - 1.18.1
          </a>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
      <p className="hero__subtitle center">Helpful Links</p>
      <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg bbb"
            to="/docs/tutorials/getting-started">
            Getting Started Tutorial - 10min ⏱️
          </Link>
        </div>
      </main>
    </Layout>
  );
}
