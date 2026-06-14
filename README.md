## How to edit the docs
Simply edit the relevant markdown files at https://github.com/AlessioGr/NotQuests-Docs/tree/main/docs or create a new one.

# Website

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ npm install
```

### Local Development

```
$ npm run start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Command examples

Inline code and command code blocks that start with `/q`, `/qa`, `/notquests`, or `/notquestsadmin` are enriched at build time from NotQuests' exported Brigadier command schema. Run this after exporting a fresh schema from the plugin:

```
$ npm run update-commands
```

For partial examples, write the full command first, then the shorter display form:

```
`/qa edit questname objectives add Interact 2 world 1453 71 -2451 --rightClick --maxDistance 2 --cancelInteraction --taskDescription "Find Trents fishing rod" => /qa edit questname objectives add Interact ...`
```

Only the right side is displayed. The rendered chip includes a small `full` marker that shows the complete command on hover. The command schema is used during the Docusaurus build only; it is not shipped as browser JSON.
