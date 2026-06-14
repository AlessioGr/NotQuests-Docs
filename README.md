## How to edit the docs
Simply edit the relevant markdown files at https://github.com/AlessioGr/NotQuests-Docs/tree/main/docs or create a new one.

# Website

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ pnpm install
```

Tool versions are pinned for local development through `mise.toml`. For asdf-compatible tools, `.tool-versions` pins Node.js. Cloudflare Pages does not install pnpm from `.tool-versions`; set `PNPM_VERSION=11.6.0` in the Pages build environment so Cloudflare uses the same pnpm version as local builds.

### Local Development

```
$ pnpm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ pnpm build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Command examples

Inline code and command code blocks that start with `/q`, `/qa`, `/notquests`, or `/notquestsadmin` are enriched at build time from NotQuests' exported Brigadier command schema. Run this after exporting a fresh schema from the plugin:

```
$ pnpm update-commands
```

For partial examples, write the full command first, then the shorter display form:

```
`/qa edit questname objectives add Interact 2 world 1453 71 -2451 --rightClick --maxDistance 2 --cancelInteraction --taskDescription "Find Trents fishing rod" => /qa edit questname objectives add Interact ...`
```

Only the right side is displayed. The rendered chip includes a small `full` marker that shows the complete command on hover. The command schema is used during the Docusaurus build only; it is not shipped as browser JSON.
