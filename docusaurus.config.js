// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const {themes} = require('prism-react-renderer');
const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;
const commandPlugin = require('./src/remarkplugins/command')

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'NotQuests',
  tagline: 'The best, most flexible & powerful Minecraft Quest & Conversation Plugin for Paper and Spigot servers',
  url: 'https://www.notquests.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  future: {
    v4: true,
    faster: true,
  },
  clientModules: [require.resolve('./src/clientModules/commandCopy.ts')],
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

  plugins: ['docusaurus-markdown-source-plugin'],

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

        // Keep the UI focused on docs search and expose a shareable full-page search route.
        placeholder: 'Search NotQuests docs',
        searchPagePath: 'search',
        askAi: {
          assistantId: '8eaecbd4-465e-4175-85b9-579388fb2ebc',
          indexName: 'notquests_markdown',
          suggestedQuestions: true,
        },
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
            to: '/docs/documentation/docs',
            position: 'left',
            label: '📝 Documentation',
            activeBaseRegex: '^/docs/documentation/',
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
            title: 'Start',
            items: [
              {
                label: 'Getting Started',
                to: '/docs/tutorials/getting-started',
              },
              {
                label: 'Documentation Overview',
                to: '/docs/documentation/docs',
              },
              {
                label: 'Command Reference',
                to: '/docs/documentation/command-reference',
              },
            ],
          },
          {
            title: 'Features',
            items: [
              {
                label: 'Objectives',
                to: '/docs/documentation/types/objectives',
              },
              {
                label: 'Actions & Rewards',
                to: '/docs/documentation/types/actions',
              },
              {
                label: 'Conversations',
                to: '/docs/documentation/conversation-system',
              },
              {
                label: 'NPC Quest Givers',
                to: '/docs/tutorials/npc-quest-givers',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                href: 'https://modrinth.com/plugin/notquests/versions',
                label: 'Download on Modrinth',
                className: 'footer__link-item modrinthicon',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/AlessioGr/NotQuests',
              },
              {
                label: 'Discord',
                href: 'https://discord.gg/7br638S5Ex',
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
