---
title: ⚙️ Configuration
sidebar_position: 3
description: A friendly tour of general.yml — the main NotQuests config file.
keywords:
  [notquests, config, configuration, general.yml, mysql, database, settings]
---

import Admonition from '@theme/Admonition';

NotQuests' main settings live in `general.yml` inside its data folder:

| Platform | Data folder         |
| -------- | ------------------- |
| Paper    | `plugins/NotQuests` |
| NeoForge | `<world>/notquests` |

All paths on this page are relative to that folder. After editing `general.yml`, run `/qa reload` (or restart the server) to apply your changes.

Good news: **you don't have to touch most of this.** The defaults are sensible and the plugin runs great out of the box. This page is here for when you _do_ want to tweak something — so feel free to skim and jump to the section you care about.

## 💾 Storage & database

By default NotQuests uses **SQLite** — the single `database_sqlite.db` file in the data folder, with no setup required. That's fine for most servers.

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
    host: ""
    port: 3306
    database: ""
    username: ""
    password: ""
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
    unsafe-disregard-version: false
    conversations:
      delete-previous: true
      history-size: 20
  update-checker:
    notify-ops-in-chat: true
```

- **`max-active-quests-per-player`** - How many quests a player can have going at once. `-1` means unlimited.
- **`enable-move-event`** - Needed for the `ReachLocation` objective and objective location markers. If you don't use location objectives or guiding markers, setting this to `false` is a tiny performance win.
- **`journal-item`** - Optionally turn a slot of the player's inventory into a clickable quest journal book. Set `enabled-worlds` to the worlds you want it in (or `'*'` for all), and pick the `inventory-slot`.
- **`packet-magic`** - Lets conversations clear their previous lines and replay recent chat.
  - **`enabled`** - Enables chat recording for conversation replay.
  - **`unsafe-disregard-version`** - Leave this `false`. It bypasses the version safety check for native packet handling.
  - **`conversations.delete-previous`** - Clears previous conversation lines so the chat stays tidy.
  - **`conversations.history-size`** - Maximum number of recent chat messages to keep for replay when conversation lines are cleared. History is cleared when the player leaves

- **`update-checker.notify-ops-in-chat`** - Pings ops in chat when a new NotQuests version is out.

Set `conversations.delete-previous` to `false` if you want conversation lines to stay in normal chat instead. See [chat restoration](./conversation-system#chat-restoration-packet-magic) for details.

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
    location-compass:
      enabled: false
```

- **`language`** - Which language file to use from `languages/`. Ships with 31 languages. Default is `en-US`.
- **`fancy-command-completion`** - The helpful argument hints that pop up while you type commands. Show them in the `actionbar` (default), as a `title`, and/or in a `bossbar`.
- **`citizensnpc` / `armorstands`** - The floating particle above quest-giver NPCs and armor stands. Change the particle with `type`, or turn it off. Citizens settings apply only on Paper when Citizens is installed. Armor stands work on both platforms. `armorstands.prevent-editing` stops accidental equipment changes on quest armor stands.
- **`titles`** - The big on-screen titles when a quest is accepted, failed or completed. Toggle each independently.
- **`hide-rewards-without-name`** - Rewards show as `[HIDDEN]` unless you give them a display name (see the [FAQ](/docs/documentation/faq)). This is what makes that happen.
- **`objective-tracking`** - Live progress shown in the `actionbar` and/or a `bossbar` while an objective is active. `location-compass.enabled` adds an optional bossbar compass for objectives with a saved guiding marker. Objective location markers are configured per objective; see the [Objectives page](./types/objectives#objective-locations-and-guiding-beams).

<Admonition type="tip" title="Colors">

The `visual.colors` block lets you re-theme every message NotQuests sends, using [MiniMessage](https://docs.advntr.dev/minimessage/format.html) gradients (`main`, `highlight`, `error`, `success`, ...). The defaults look great, but it's all yours to recolor.

</Admonition>

## 🖼️ GUI

```yaml
gui:
  main-gui-name: "main-base"
  npc-gui-name: "npc-available-quests"
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

- **`main-gui-name` / `npc-gui-name`** - Which GUI layout files to use. Every GUI lives in `guis/` as its own editable `.yml`.
- **`quest-visibility-evaluations`** - Controls which quests show up in the menus. For example, hide quests the player has `already-accepted`, reached the `max-accepts` for, are still on `accept-cooldown` for, or don't meet the `conditions` of.
- **`questpreview.enabled`** - `true` opens a proper GUI preview before accepting a quest; `false` falls back to clickable chat text.
- **`usercommands.enabled`** - `true` uses GUIs for the player-facing `/q` commands; `false` uses clickable chat text instead.

## 📄 Placeholders

```yaml
placeholders:
  support_placeholderapi_in_translation_strings: false
  player_active_quests_list_horizontal:
    separator: "|"
    limit: -1
    use-displayname-if-available: true
```

- **`support_placeholderapi_in_translation_strings`** - Let PlaceholderAPI placeholders work inside NotQuests' language strings. Off by default for performance.
- **`player_active_quests_list_*`** - Formatting for the active-quests list placeholders — the separator, a `limit` (`-1` = unlimited), and whether to use quest display names. See the [Placeholders page](/docs/documentation/placeholders) for the full list.

## 🔌 Integrations

These integrations are **Paper-only**. They are enabled by default but activate only when the matching Paper plugin is installed, so you can normally leave this section alone. NeoForge ignores Paper plugin integrations and still supports the shared quest, armor-stand, GUI, command, and objective features.

```yaml
integrations:
  citizens:
    enabled: true
  # ...and the rest below
```

| Integration      | What it adds                                                                                                          |
| ---------------- | --------------------------------------------------------------------------------------------------------------------- |
| `citizens`       | Citizens NPCs as quest givers, plus NPC-based objectives                                                              |
| `fancynpcs`      | FancyNPCs NPCs as quest givers and conversation starters (automatically detected; no config toggle is needed)         |
| `floodgate`      | Bedrock player support (Floodgate / Geyser)                                                                           |
| `vault`          | Economy support                                                                                                       |
| `placeholderapi` | Use PlaceholderAPI placeholders in NotQuests (and expose NotQuests ones)                                              |
| `mythicmobs`     | MythicMobs as kill targets                                                                                            |
| `elitemobs`      | The `KillEliteMobs` objective                                                                                         |
| `worldedit`      | WorldEdit support                                                                                                     |
| `slimefun`       | The `SlimefunResearch` objective                                                                                      |
| `luckperms`      | LuckPerms-based conditions                                                                                            |
| `towny`          | The `TownyNationReachTownCount` & `TownyReachResidentCount` objectives                                                |
| `jobs-reborn`    | The `JobsRebornReachJobLevel` objective                                                                               |
| `ecoMobs`        | eco / EcoMobs spawn actions and kill detection                                                                        |
| `betonQuest`     | BetonQuest 3 actions, conditions, objective-state objectives, variables, and the `notquests` conversation interceptor |

<Admonition type="info">

Every supported integration is bundled with NotQuests at its latest tested version — you don't install anything extra on the NotQuests side. The plugin you run on your server is what NotQuests talks to.

</Admonition>

### BetonQuest 3

NotQuests supports **BetonQuest 3.0.0 and newer**. Older BetonQuest 1.x/2.x versions are detected and skipped with a clean console warning, because their API is not compatible with the modern integration.

When BetonQuest 3 is installed, NotQuests adds:

- NotQuests actions and conditions usable inside BetonQuest packages.
- NotQuests actions that run BetonQuest actions.
- A NotQuests objective that advances when a BetonQuest objective reaches a chosen state.
- A `BetonQuestCondition` variable for checking BetonQuest conditions from NotQuests.
- A `notquests` BetonQuest conversation interceptor.

See the [Actions](./types/actions#betonquest-3-integration-actions), [Objectives](./types/objectives#betonquest-3-integration-objectives), and [Variables](./types/variables#betonquest-3-integration-variables) pages for examples.

Inside a BetonQuest package, these NotQuests hooks are available:

```yaml
actions:
  sendNotQuestsMessage: "nq_action SendMessage Hello from NotQuests"
  startNotQuestsQuest: "nq_startquest questname -force -silent -notriggers"
  failNotQuestsQuest: "nq_failquest questname"
  abortNotQuestsQuest: "nq_abortquest questname"
  triggerNotQuestsObjective: "nq_triggerobjective triggerName"
  addQuestPoints: "nq_questpoints add 10 -silent"
conditions:
  hasNotQuestsCondition: "nq_condition Flying equals true"
```

- **`nq_action <NotQuests action line>`** - Runs any inline NotQuests action.
- **`nq_condition <NotQuests condition line>`** - Checks any inline NotQuests condition.
- **`nq_startquest <quest> [-force] [-silent] [-notriggers]`** - Starts a NotQuests quest for the BetonQuest player.
- **`nq_failquest <quest>`** / **`nq_abortquest <quest>`** - Fails or aborts a NotQuests quest.
- **`nq_triggerobjective <triggerName>`** - Adds progress to matching NotQuests `TriggerCommand` objectives.
- **`nq_questpoints set|add|remove <amount> [-silent]`** - Changes the player's NotQuests Quest Points.
