---
title: ⚙️ Configuration
sidebar_position: 3
description: A friendly tour of general.yml — the main NotQuests config file.
keywords: [notquests, config, configuration, general.yml, mysql, database, settings]
---

NotQuests' main settings live in **`plugins/NotQuests/general.yml`**. After editing it, run `/qa reload` (or just restart the server) to apply your changes.

Good news: **you don't have to touch most of this.** The defaults are sensible and the plugin runs great out of the box. This page is here for when you *do* want to tweak something — so feel free to skim and jump to the section you care about.

## 💾 Storage & database

By default NotQuests uses **SQLite** — a single file in your `plugins/NotQuests` folder, zero setup. That's totally fine for most servers.

If you want **MySQL** (faster, and the queries were designed with it in mind), set `database.enabled` to `true` and fill in your credentials:

```yaml
storage:
  load-playerdata: true
  save-playerdata: true
  load-playerdata-on-join: true
  save-playerdata-on-quit: true
  backups:
    create-when-server-shuts-down: true
  database:
    # false = SQLite (no setup needed). true = use the MySQL details below.
    enabled: false
    host: ''
    port: 3306
    database: ''
    username: ''
    password: ''
```

- **`load-playerdata` / `save-playerdata`** - Master switches for reading/writing player progress. Leave these on.
- **`load-playerdata-on-join` / `save-playerdata-on-quit`** - When player data is loaded and saved. (These come in handy if you ever migrate between SQLite and MySQL — see the [FAQ](/docs/documentation/faq).)
- **`backups.create-when-server-shuts-down`** - Writes a backup of your quest data on shutdown.

## 🎛️ General

```yaml
general:
  max-active-quests-per-player: -1
  enable-move-event: true
  packet-magic:
    enabled: true
    mode: "internal"
    conversations:
      delete-previous: true
      history-size: 20
  update-checker:
    notify-ops-in-chat: true
```

- **`max-active-quests-per-player`** - How many quests a player can have going at once. `-1` means unlimited.
- **`enable-move-event`** - Needed for the `ReachLocation` objective. If you don't use location objectives, setting this to `false` is a tiny performance win.
- **`journal-item`** - Optionally turn a slot of the player's inventory into a clickable quest journal book. Set `enabled-worlds` to the worlds you want it in (or `'*'` for all), and pick the `inventory-slot`.
- **`packet-magic`** - Powers the smooth conversation experience.
  - **`mode`** - `internal` or `packetevents`. Leave it on `internal` unless you have a reason not to.
  - **`conversations.delete-previous`** - Clears previous conversation lines so the chat stays tidy.
  - **`conversations.history-size`** - How many old chat lines to restore after a conversation ends.
- **`update-checker.notify-ops-in-chat`** - Pings ops in chat when a new NotQuests version is out.

## ✨ Visual & effects

This section controls language, particles, titles and the little quality-of-life touches.

```yaml
visual:
  language: en-US
  fancy-command-completion:
    actionbar-enabled: true
    title-enabled: false
    bossbar-enabled: false
  citizensnpc:
    focusing:
      enabled: true
    quest-giver-indicator-particle:
      enabled: true
      type: ANGRY_VILLAGER
  armorstands:
    prevent-editing: true
    quest-giver-indicator-particle:
      enabled: true
      type: ANGRY_VILLAGER
  titles:
    quest-successfully-accepted:
      enabled: true
    quest-failed:
      enabled: true
    quest-completed:
      enabled: true
  hide-rewards-without-name: true
  objective-tracking:
    actionbar:
      enabled: true
    bossbar:
      enabled: true
```

- **`language`** - Which language file to use, from `plugins/NotQuests/languages/`. Ships with 31 languages. Default is `en-US`.
- **`fancy-command-completion`** - The helpful argument hints that pop up while you type commands. Show them in the `actionbar` (default), as a `title`, and/or in a `bossbar`.
- **`citizensnpc` / `armorstands`** - The floating particle above quest-giver NPCs and armor stands. Change the particle with `type`, or turn it off. `focusing` makes Citizens NPCs turn to face the player during a conversation. `armorstands.prevent-editing` stops you from accidentally editing the gear of an armor stand that has quests attached.
- **`titles`** - The big on-screen titles when a quest is accepted, failed or completed. Toggle each independently.
- **`hide-rewards-without-name`** - Rewards show as `[HIDDEN]` unless you give them a display name (see the [FAQ](/docs/documentation/faq)). This is what makes that happen.
- **`objective-tracking`** - Live progress shown in the `actionbar` and/or a `bossbar` while an objective is active.

:::tip Colors
The `visual.colors` block lets you re-theme every message NotQuests sends, using [MiniMessage](https://docs.advntr.dev/minimessage/format.html) gradients (`main`, `highlight`, `error`, `success`, ...). The defaults look great, but it's all yours to recolor.
:::

## 🖼️ GUI

```yaml
gui:
  main-gui-name: 'main-base'
  npc-gui-name: 'npc-available-quests'
  quest-visibility-evaluations:
    already-accepted:
      enabled: true
    max-accepts:
      enabled: true
    accept-cooldown:
      enabled: false
    conditions:
      enabled: false
  questpreview:
    enabled: true
  usercommands:
    enabled: true
```

- **`main-gui-name` / `npc-gui-name`** - Which GUI layout files to use. You can fully customize these — every GUI lives in `plugins/NotQuests/guis/` as its own editable `.yml`.
- **`quest-visibility-evaluations`** - Controls which quests show up in the menus. For example, hide quests the player has `already-accepted`, reached the `max-accepts` for, are still on `accept-cooldown` for, or don't meet the `conditions` of.
- **`questpreview.enabled`** - `true` opens a proper GUI preview before accepting a quest; `false` falls back to clickable chat text.
- **`usercommands.enabled`** - `true` uses GUIs for the player-facing `/q` commands; `false` uses clickable chat text instead.

## 📄 Placeholders

```yaml
placeholders:
  support_placeholderapi_in_translation_strings: false
  player_active_quests_list_horizontal:
    separator: '|'
    limit: -1
    use-displayname-if-available: true
```

- **`support_placeholderapi_in_translation_strings`** - Let PlaceholderAPI placeholders work inside NotQuests' language strings. Off by default for performance.
- **`player_active_quests_list_*`** - Formatting for the active-quests list placeholders — the separator, a `limit` (`-1` = unlimited), and whether to use quest display names. See the [Placeholders page](/docs/documentation/placeholders) for the full list.

## 🔌 Integrations

These are all `true` by default and only ever kick in **if you actually have that plugin installed** — so you can safely leave the whole section alone. They're here only in case you want to force one off.

```yaml
integrations:
  citizens:
    enabled: true
  # ...and the rest below
```

| Integration | What it adds |
| --- | --- |
| `citizens` | Citizens NPCs as quest givers, plus NPC-based objectives |
| `floodgate` | Bedrock player support (Floodgate / Geyser) |
| `vault` | Economy support |
| `placeholderapi` | Use PlaceholderAPI placeholders in NotQuests (and expose NotQuests ones) |
| `mythicmobs` | MythicMobs as kill targets |
| `elitemobs` | The `KillEliteMobs` objective |
| `worldedit` | WorldEdit support |
| `slimefun` | The `SlimefunResearch` objective |
| `luckperms` | LuckPerms-based conditions |
| `ultimateclans` | UltimateClans support |
| `towny` | The `TownyNationReachTownCount` & `TownyReachResidentCount` objectives |
| `jobs-reborn` | The `JobsRebornReachJobLevel` objective |
| `ecoMobs` | eco / EcoMobs spawn actions and kill detection |

:::info
Every supported integration is bundled with NotQuests at its latest tested version — you don't install anything extra on the NotQuests side. The plugin you run on your server is what NotQuests talks to.
:::
