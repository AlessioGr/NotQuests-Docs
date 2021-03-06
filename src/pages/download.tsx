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
            href="https://github.com/AlessioGr/NotQuests/releases/download/v5.0.0/notquests-5.0.0.jar">
              ⏬ 5.0.0 <span style={{fontWeight: '400'}}>for Minecraft 1.19 ⭐</span>
          </a>
            <p style={{backgroundColor: 'white', borderRadius: '15px', color: '#0039b4', fontSize: '1em', fontWeight: 'bold', padding: '5px'}}>The 1.19 version probably also works on 1.18.2 as well, but it's not guaranteed, and the packet magic conversation will be disabled.</p>

            <a
            className="button button--secondary button--lg"
            style={{backgroundColor: '#cbcbcb', borderColor: '#cbcbcb'}}
            href="https://github.com/AlessioGr/NotQuests/releases/download/v4.21.0/notquests-4.21.0.jar">
                ⏬ 4.21.0 <span style={{fontWeight: '400'}}>for Minecraft 1.18.2</span>
          </a>
          <a
            className="button button--secondary button--lg"
            style={{backgroundColor: '#a8a8a8', borderColor: '#a8a8a8'}}
            href="https://github.com/AlessioGr/NotQuests/releases/download/v4.18.3/notquests-4.18.3.jar">
              ⏬ 4.18.3 <span style={{fontWeight: '400'}}>for Minecraft 1.17 - 1.18.1</span>
          </a>
        </div>
          <p style={{backgroundColor: 'white', borderRadius: '15px', color: '#ff0000', fontSize: '1.5em', fontWeight: 'bold', padding: '5px'}}>Note: Spigot Servers are supported, but NotQuests on Spigot servers has less and different features than on Paper servers. Please keep in mind that most Quests created on the Spigot versions will not work on Paper servers, and vice-versa. 🙂</p>
          <span>If your server runs an older version of Minecraft, you can also use an older version of NotQuests which is compatible with your version.</span>
          <p>Sadly I'm not updating or supporting older versions of Minecraft as I have no time for that, though. So keep your server updated! 😊</p>

      </div>


    </header>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="NotQuests download page - download the best Minecraft Spigot Quest Plugin or Paper Quest Plugin here.">
      <HomepageHeader />
      <main>
      <p className="hero__subtitle center">Helpful Links</p>
      <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg bbb"
            to="/docs/tutorials/getting-started">
            Getting Started Tutorial - 10min ⏱️
          </Link>

          <Link
              className="button button--secondary button--lg bbb"
              to="/docs/documentation/docs">
              More detailed documentation️
          </Link>
        </div>
      </main>
    </Layout>
  );
}
