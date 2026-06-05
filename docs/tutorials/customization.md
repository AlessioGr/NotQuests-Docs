---
title: 🎨 Customization
sidebar_position: 6
description: This tutorial helps you customize notquests
keywords: [notquests, tutorial, customization, customize, guide]
---

## GUI items

You can customize the items displayed in the GUI for both categories (default: Chest) and quests (default: book). For Quests, you can use the command `/qa edit questName guiItem ...` and for categories `/qa categories edit categoryName guiItem ...`

### Advanced items (e.g. custom model data)

NotQuests supports any items - even the most complex one. This includes special items from other plugins! Internally, notquests uses the Bukkit Item Serialization API, so notquests supports anything that supports that.

Do you have any item which is complex like that (so not just a material)? Then hold the item in your hand and use 'hand' as material name. E.g. if you want your super fancy enchanted custom model data item to be displayed in the GUI for a category, hold it in your hand and use `/qa categories edit categoryName guiItem hand`. That easy!

## Translations

You can edit most strings and translations in notquests (currently not all of them, but the most important ones). This can be done in the "languages" folder of notquests

## Customize the entire GUI

Every GUI lives as its own editable `.yml` file in the `plugins/NotQuests/guis/` folder. In there you can rearrange the whole layout, swap materials and move buttons around — the `structure:` lines are a little visual map of the slots, and the `icons:` / `items:` sections define what goes in them.

The *text* shown in a GUI (titles, button names and lore) comes from your language file in the `languages/` folder instead. So: layout lives in `guis/`, wording lives in `languages/`. Which GUI files get used is set by `gui.main-gui-name` and `gui.npc-gui-name` in [general.yml](/docs/documentation/configuration).

## Color codes

Colors are supported basically everywhere in notquests - but not the legacy ones you used to know. Stuff like &6 or &c won't bring you far - it has long been abandoned by Mojang & kept alive by Spigot - as NotQuests thrives to be as modern and innovating as possible, it abandoned those too.

Instead, we are now using MiniMessage, which allows you to do even more advanced stuff easier, like RGB colors, gradients, and even click commands & hover messages! You can find the MiniMessage docs [here](https://docs.advntr.dev/minimessage/format.html).

Let's start by giving our quest a colorful display name:

`/qa edit TheVirus displayName set <red>A <bold>Deadly</bold> <#eb34a1>Virus`

![Cool display name](/img/getting-started/displayname-1.png)

Or even:

`/qa edit TheVirus displayName set <rainbow>A <bold>Deadly</bold></rainbow> <gradient:#eb34a1:#ffffff>Virus</gradient>`

![Another display name](/img/getting-started/displayname-2.png)

Pretty cool, right? You even have auto-completions for all MiniMessage color tags for many commands. At the same time, NotQuests has added some internal colors which you can use to achieve a consistent look. For example `<highlight>`, `<highlight2>` or `<main>`. Those can be customize inside of the config, to change NotQuests entire color scheme.

**Example:** clickable link in the description of your first objective of a quest:

`/qa edit yourquestname objectives edit 1 description set <click:OPEN_URL:yoururllink>Click here</click>`