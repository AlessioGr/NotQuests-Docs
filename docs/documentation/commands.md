---
title: ⌨️ Commands
sidebar_position: 2
description: The full list of NotQuests commands for players and admins
keywords: [notquests, commands, command list, qa, nq, admin commands]
---

Every NotQuests command lives under one of two roots:

- **`/q`** — the **player** command (needs the `notquests.use` permission, which everyone has by default). Aliases: `/nq`, `/quest`, `/quests`, `/notquests`.
- **`/qa`** — the **admin** command for building and managing quests (needs `notquests.admin`, OP by default). Aliases: `/nqa`, `/questadmin`, `/notquestsadmin`.

:::tip
You don't have to memorise any of this — just start typing and the **tab-completion** will guide you the whole way. This page is here for when you want the big picture.
:::

In the lists below: `<required>` is a required argument, `[optional]` is optional, and `(flags)` are optional `--flags`.

## 🎮 Player commands (`/q`)

- **`/q`** - Opens the quest GUI (or shows clickable text, depending on your config).
- **`/q take <quest>`** - Accept/start a quest.
- **`/q activeQuests`** - List your active quests.
- **`/q progress <active quest>`** - Show your progress on an active quest.
- **`/q preview <quest>`** - Preview a quest (description, requirements, rewards) before taking it.
- **`/q abort`** - List the quests you can abort.
- **`/q abort <active quest>`** - Abort (give up) an active quest.
- **`/q questPoints`** - Show how many Quest Points you have.
- **`/q category <category>`** - Open the quest view for a category.
- **`/q continueConversation <optionID>`** - Pick an answer in an open conversation. (You normally just click the option instead.)
- **`/q profiles`** - Show your current profile and list the others.
- **`/q profiles create <name>`** - Create a new profile (a separate, fresh save of your quest progress).
- **`/q profiles change <name>`** - Switch to another profile.

:::info Profiles
A profile is a self-contained save of a player's quest progress (active/completed quests, Quest Points, tags, cooldowns). Switching profiles is like having multiple save files. Managing profiles needs the `notquests.user.profiles` permission.
:::

## 🛠️ Admin commands (`/qa`)

### Creating & managing quests

- **`/qa create <quest> [--category <category>]`** - Create a new quest.
- **`/qa delete <quest>`** - Delete a quest.
- **`/qa list AllQuests`** - List every quest you've made.
- **`/qa list ObjectiveTypes`** / **`RequirementTypes`** / **`ActionTypes`** / **`TriggerTypes`** / **`Placeholders`** - List the available building blocks.
- **`/qa reload`** - Reload all config and quest files.
- **`/qa save`** - Save everything to disk.
- **`/qa version`** - Show the plugin version.

### Editing a quest — `/qa edit <quest>`

Everything about a single quest lives under `/qa edit <quest>` (alias `/qa e <quest>`).

**Basics**
- **`description set <text>`** / **`show`** / **`remove`** - The quest's description (supports MiniMessage).
- **`displayName set <text>`** / **`show`** / **`remove`** - The quest's display name.
- **`guiItem <material> [--glow]`** - The item shown for this quest in GUIs.
- **`category set <category>`** / **`show`** - Move the quest to a category.

**Limits & cooldowns**
- **`limits accepts <amount>`** - Max times a player can accept this quest (`-1` = unlimited).
- **`limits completions <amount>`** - Max times a player can complete it (`-1` = unlimited).
- **`limits fails <amount>`** - Max times a player can fail it (`-1` = unlimited).
- **`acceptCooldown complete set <duration>`** / **`disable`** - Cooldown before a player can re-accept after completing.
- **`takeEnabled <yes/no>`** - Whether players can take the quest via `/q take`.
- **`abortEnabled <yes/no>`** - Whether players can abort it.

**Objectives** — the steps of the quest. See the [Objectives reference](./types/objectives).
- **`objectives add <type> (flags)`** - Add an objective.
- **`objectives list`** - List the objectives.
- **`objectives clear`** - Remove all objectives.
- **`objectives edit <id> ...`** - Edit one objective (see below).

Inside `objectives edit <id>` you can set a `description`, `displayName`, `taskDescription`, a `location` (`set`/`enable`/`disable`), a `completionNPC`, add `rewards`, and add **objective conditions** in three slots:
- **`conditions unlock add <type>`** - must be met for the objective to unlock.
- **`conditions progress add <type>`** - must be met for progress to count.
- **`conditions complete add <type>`** - must be met for the objective to finish.

**Requirements** — conditions to *accept* the quest. See the [Conditions reference](./types/conditions).
- **`requirements add <type> (flags)`** · **`list`** · **`clear`** · **`edit <id> delete`**

**Rewards** — actions that run when the quest is completed. See the [Actions reference](./types/actions).
- **`rewards add <type> (flags)`** · **`list`** · **`clear`** · **`edit <id> delete`**

**Triggers** — run actions on quest events (begin/complete/fail/death/etc.). See the [Triggers reference](./types/triggers).
- **`triggers add <action> [--applyOn <0|O1|O2…>] [--world_name <world|ALL>] [--waitTimeAfterCompletion <ticks>]`**
- **`triggers list`** · **`clear`** · **`edit <id> ...`**

**Quest givers**
- **`npcs add <citizens:ID | fancynpcs:ID | rightclick> [--hideInNPC]`** - Attach the quest to a Citizens or FancyNPCs NPC. Use `rightclick` to get an item you can click an NPC with.
- **`npcs list`** · **`npcs clear`**
- **`armorstands add <rightclick>`** - Get an item, then right-click an armor stand to attach the quest to it.
- **`armorstands list`** · **`armorstands clear`**

### Conversations — `/qa conversations` (alias `c`)

See the [Conversation System](./conversation-system) for the full picture.

- **`conversations create <name> [--demo] [--category <category>]`** - Create a conversation. `--demo` fills it with a working example to learn from.
- **`conversations list`** - List conversations.
- **`conversations analyze <conversation> [--printToConsole]`** - Sanity-check a conversation's structure.
- **`conversations start <conversation> <player>`** - Start a conversation for a player.
- **`conversations edit <conversation> ...`** - Edit lines, speakers, and attached NPCs/armor stands.

### Global actions & conditions

Reusable actions and conditions you can refer to by name from anywhere.

- **`/qa actions add <name> <type> (flags)`** - Create a named action.
- **`/qa actions list`** · **`/qa actions execute <name> [player] [--ignoreConditions] [--silent]`** · **`/qa actions edit <name> ...`**
- **`/qa conditions add <name> <type> (flags)`** - Create a named condition.
- **`/qa conditions list`** · **`/qa conditions edit <name> check [player]`** · **`/qa conditions edit <name> ...`**

### Categories, Tags & Items

- **`/qa categories create <name>`** · **`list`** · **`edit <category> ...`** - Organise quests into (nestable) categories.
- **`/qa tags create <PLAYER_TAG|QUEST_TAG> <name>`** · **`list`** · **`delete <name>`** - Custom per-player data you can read/write with conditions, actions and placeholders. See the [reputation tutorial](../tutorials/creating-a-reputation-system-with-tags).
- **`/qa items create <name> <material>`** · **`list`** · **`give <player> <name> <amount>`** · **`edit <name> ...`** · **`remove <name>`** - Reusable custom items.

### Managing players

- **`/qa give <player> <quest>`** - Give a player a quest (skips requirements).
- **`/qa complete <player> <active quest>`** / **`fail`** / **`reset`** - Force-complete, fail, or reset a player's quest.
- **`/qa resetAndRemove <player> <quest>`** / **`resetAndFail`** - Reset and remove/fail.
- **`/qa progress <player> <active quest>`** · **`showActive <player>`** · **`showCompleted <player>`** - Inspect a player.
- **`/qa questpoints <player> show|add|remove|set <amount>`** - Manage a player's Quest Points.

### Debug & maintenance

- **`/qa debug`** - Toggle debug mode (lots of extra info in chat).
- **`/qa debug showErrorsAndWarnings [--printToConsole]`** - Show collected errors/warnings.
- **`/qa debug worldInfo`** · **`clearOwnChat`** · **`beaconBeam <player> <name> <location>`** - Misc debug helpers.
- **`/qa debug loadDataManagerUnsafe`** · **`disablePluginAndSaving <reason>`** · **`enablePluginAndSaving <reason>`** - Advanced/risky (used for things like database migrations). Back up first!

:::tip Lost? Use the in-game help
`/qa help` and `/qa help <search>` open a searchable, clickable help menu — handy when you can't remember the exact path.
:::
