// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const commandPlugin = require('./src/remarkplugins/command')

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'NotQuests',
  tagline: 'The best, most flexible & powerful Minecraft Quest & Conversation Plugin for Paper and Spigot servers',
  url: 'https://www.notquests.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'alessiogr', // Usually your GitHub org/user name.
  projectName: 'notquests', // Usually your repo name.

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/AlessioGr/notquests-docs/tree/main/',
          remarkPlugins: [commandPlugin],
        },
        /*blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/AlessioGr/notquests-docs/tree/main/blog/',
        },*/
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      metadata: [{name: 'keywords', content: 'notquests, notquest, minecraft, quest, quests, quest plugin, paper, spigot'}],
      algolia: {
        // The application ID provided by Algolia
        appId: 'ILVXA82547',

        // Public API key: it is safe to commit it
        apiKey: '11a48fc15b8a38e14d0dca780c6cd2ab',

        indexName: 'notquests',

        // Optional: see doc section below
        contextualSearch: true,

        // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
        externalUrlRegex: 'external\\.com|domain\\.com',

        // Optional: Algolia search parameters
        searchParameters: {},

        //... other Algolia params
      },
      navbar: {
        title: 'NotQuests',
        logo: {
          alt: 'NotQuests Logo',
          src: 'img/notquests-logo.png',
          width: '32px',
          height: '32px',
        },
        items: [
          {
            type: 'doc',
            docId: 'tutorials/getting-started',
            label: '🏫 Tutorials',
            position: 'left',
          },
          {
            type: 'doc',
            docId: 'documentation/docs',
            position: 'left',
            label: '📝 Documentation',
          },
          {
            href: 'https://modrinth.com/plugin/notquests/versions',
            label: 'Download',
            className: "modrinthicon",
            position: 'left',
          },
          {
            href: 'https://discord.gg/7br638S5Ex',
            label: 'Discord',
            position: 'right',
          },
          {
            href: 'https://github.com/AlessioGr/NotQuests',
            label: 'GitHub',
            position: 'right',
          },
          /*{to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://github.com/AlessioGr/NotQuests',
            label: 'GitHub',
            position: 'right',
          },*/
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Getting Started',
                to: '/docs/tutorials/getting-started',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://discord.gg/7br638S5Ex',
              },
            ],
          },
          {
            title: 'More',
            items: [
              /*{
                label: 'Blog',
                to: '/blog',
              },*/
              {
                href: 'https://modrinth.com/plugin/notquests/versions',
                label: 'Modrinth',
                className: "footer__link-item modrinthicon",
              },
              {
                label: 'Hangar',
                href: 'https://hangar.papermc.io/Alessio/NotQuests',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/AlessioGr/NotQuests',
              },
              {
                label: 'Polymart',
                href: 'https://polymart.org/resource/1484',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Alessio Gravili.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['groovy', 'java'],
      },
    }),
};

module.exports = config;
