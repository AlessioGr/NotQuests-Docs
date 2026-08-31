import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';

const features = [
  {
    title: 'Create real quests',
    text: 'Use objectives, requirements, categories, triggers, rewards, and ordered progression to build quests players can follow.',
    to: '/docs/tutorials/getting-started',
  },
  {
    title: 'Use NPC quest givers',
    text: 'Use armor stands on Paper and NeoForge, plus Citizens and FancyNPCs integrations on Paper, with preview GUIs before players accept.',
    to: '/docs/tutorials/npc-quest-givers',
  },
  {
    title: 'Build progression systems',
    text: 'Track reputation, quest points, player tags, variables, conditions, and rewards that unlock more content over time.',
    to: '/docs/tutorials/creating-a-reputation-system-with-tags',
  },
];

function HomepageHeader() {
  return (
    <header className={styles.hero}>
      <div className="container">
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>Minecraft quests for Paper and NeoForge</p>
          <h1 className={styles.heroTitle}>NotQuests</h1>
          <p className={styles.heroText}>
            Build quests, NPC stories, daily tasks, rewards, conversations, and
            reputation systems for your Minecraft server.
          </p>
          <div className={styles.buttons}>
            <Link className={styles.primaryButton} to="/docs/tutorials/getting-started">
              Getting Started
            </Link>
            <Link className={styles.secondaryButton} to="/docs/documentation/docs">
              Documentation
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.featureGrid}>
          {features.map((feature) => (
            <Link className={styles.featureCard} to={feature.to} key={feature.title}>
              <h2>{feature.title}</h2>
              <p>{feature.text}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function StartSection() {
  return (
    <section className={styles.startSection}>
      <div className="container">
        <h2>Start with a complete quest in a few minutes.</h2>
        <p>
          The tutorial walks through display names, requirements, objectives,
          triggers, rewards, NPC setup, categories, and more.
        </p>
        <Link className={styles.inlineButton} to="/docs/tutorials/getting-started">
          Open the beginner tutorial
        </Link>
      </div>
    </section>
  );
}

export default function Home(): React.JSX.Element {
  const {siteConfig} = useDocusaurusContext();

  return (
    <Layout
      title={siteConfig.title}
      description="NotQuests is a Minecraft quest system for Paper and NeoForge with quests, NPCs, conversations, rewards, tags, reputation, and progression systems.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <StartSection />
      </main>
    </Layout>
  );
}
