// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'NotQuests',
  tagline: 'Flexible & powerful Quest & Conversation Plugin',
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
          editUrl: 'https://github.com/AlessioGr/notquests-docs/tree/main/docs/',
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
        sitemap: true,
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'NotQuests',
        logo: {
          alt: 'NotQuests Logo',
          src: 'img/notquests-logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'tutorials/getting-started',
            label: 'Tutorials',
            position: 'left',
          },
          {
            type: 'doc',
            docId: 'documentation/docs',
            position: 'left',
            label: 'Documentation',
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
                label: 'GitHub',
                href: 'https://github.com/AlessioGr/NotQuests',
              },
              {
                label: 'Spigot',
                href: 'https://www.spigotmc.org/resources/95872/',
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
      },
    }),
};

module.exports = config;
