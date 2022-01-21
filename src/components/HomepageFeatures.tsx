import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

type FeatureItem = {
  title: string;
  image: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Feature-packed and flexible',
    image: '/img/undraw_docusaurus_tree.svg',
    description: (
      <>
        From simple mine-20-stone farming Quests, to complex storylines with
        conversations, complex conditions, actions and reputation systems.
        NotQuests can do a lot!
      </>
    ),
  },
  {
    title: 'Easy to Use',
    image: '/img/undraw_docusaurus_mountain.svg',
    description: (
      <>
        Being able to do a lot doesn't mean it has to be complicated! I designed
        NotQuests to be opinionated and easy-to-use, while also enabling very
        complex Quests if you want it to.
      </>
    ),
  },
  {
    title: 'Open-Source',
    image: '/img/undraw_docusaurus_react.svg',
    description: (
      <>
        NotQuests is fully open-source! There are no hidden charges and anyone can
        contribute to NotQuests on our GitHub.
      </>
    ),
  },
];

function Feature({title, image, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img className={styles.featureSvg} alt={title} src={image} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
