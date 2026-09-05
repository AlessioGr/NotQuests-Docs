---
title: ⌨️ Commands
sidebar_position: 2
description: The full list of NotQuests commands for players and admins
keywords: [notquests, commands, command list, qa, nq, admin commands]
---

import Admonition from '@theme/Admonition';

Every NotQuests command lives under one of two roots:

- **`/q`** — the **player** command (needs the `notquests.use` permission, which everyone has by default). Aliases: `/nq`, `/notquests`, `/nquests`, `/nquest`, `/notquest`, `/quest`, `/quests`, `/qg`.
- **`/qa`** — the **admin** command for building and managing quests (needs `notquests.admin`, OP by default). Aliases: `/nqa`, `/nquestsadmin`, `/nquestadmin`, `/notquestadmin`, `/qadmin`, `/questadmin`, `/qag`, `/notquestsadmin`.

<Admonition type="tip">

You don't have to memorise any of this — just start typing and the **tab-completion** will guide you the whole way. This page is here for when you want the big picture.

</Admonition>

For every generated command shape, including nested objective/action/condition commands and flag
details, see the [Generated Command Reference](./command-reference).

In the lists below: `<required>` is a required argument, `[optional]` is optional, and `(flags)` are optional `--flags`.

Duration arguments accept short and readable formats. For example, `500ms`, `1s`, `5m`, `2h`, and `1d` all work. A bare number is treated as milliseconds.

## 🎮 Player commands (`/q`)

- **`/q`** - Opens the quest GUI (or shows clickable text, depending on your config).
- **`/q take <quest>`** - Accept/start a quest.
- **`/q activeQuests`** - List your active quests.
- **`/q progress TheVirus => /q progress <activeQuest>`** - Show your progress on an active quest.
- **`/q preview <quest>`** - Preview a quest (description, requirements, rewards) before taking it.
- **`/q abort`** - List the quests you can abort.
- **`/q abort TheVirus => /q abort <activeQuest>`** - Abort (give up) an active quest.
- **`/q questPoints`** - Show how many Quest Points you have.
- **`/q category <category>`** - Open the quest view for a category.
- **`/q continueConversation <optionID>`** - Pick an answer in an open conversation. (You normally just click the option instead.)
- **`/q profiles`** - Show your current profile and list the others.
- **`/q profiles create <name>`** - Create a new profile (a separate, fresh save of your quest progress).
- **`/q profiles change <name>`** - Switch to another profile.

<Admonition type="info" title="Profiles">

A profile is a self-contained save of a player's quest progress (active/completed quests, Quest Points, tags, cooldowns). Switching profiles is like having multiple save files. Managing profiles needs the `notquests.user.profiles` permission.

</Admonition>

## 🛠️ Admin commands (`/qa`)

### Creating & managing quests

- **`/qa create TheVirus --category default => /qa create <quest> --category <category>`** - Create a new quest, optionally in a category.
- **`/qa delete <quest>`** - Delete a quest.
- **`/qa clone TheVirus TheVirusHard => /qa clone <sourceQuest> <newQuestName>`** - Copy an existing quest under a new, unused name.
- **`/qa list AllQuests`** - List every quest you've made.
- **`/qa list ObjectiveTypes`** / **`RequirementTypes`** / **`ActionTypes`** / **`TriggerTypes`** / **`Placeholders`** - List the available building blocks.
- **`/qa reload`** - Reload all config and quest files.
- **`/qa save`** - Save everything to disk.
- **`/qa version`** - Show the plugin version.

Cloning keeps the source quest's category, display name, settings, objectives (including sub-objectives),
requirements, rewards, triggers and configured NPC links. You can edit the copy without changing the
original. Player progress and completion history are **not** copied. References to saved items, actions
and other quests still point to the same things; cloning doesn't duplicate those or place new NPCs or
armor stands in the world.

### Editing a quest — `/qa edit <quest>`

Everything about a single quest lives under `/qa edit <quest>`.

**Basics**

- **`/qa edit TheVirus description set Quest text => description set <text>`** / **`/qa edit TheVirus description show => show`** / **`/qa edit TheVirus description remove => remove`** - The quest's description (supports MiniMessage).
- **`/qa edit TheVirus displayName set A Deadly Virus => displayName set <text>`** / **`/qa edit TheVirus displayName show => show`** / **`/qa edit TheVirus displayName remove => remove`** - The quest's display name.
- **`/qa edit TheVirus guiItem hand --glow => guiItem <material> --glow`** - The item shown for this quest in GUIs.
- **`/qa edit TheVirus category set default => category set <category>`** / **`/qa edit TheVirus category show => show`** - Move the quest to a category.

**Limits & cooldowns**

- **`/qa edit TheVirus limits accepts 3 => limits accepts <amount>`** - Max times a player can accept this quest (`-1` = unlimited).
- **`/qa edit TheVirus limits completions 3 => limits completions <amount>`** - Max times a player can complete it (`-1` = unlimited).
- **`/qa edit TheVirus limits fails 3 => limits fails <amount>`** - Max times a player can fail it (`-1` = unlimited).
- **`/qa edit TheVirus acceptCooldown complete set 1d => acceptCooldown complete set <duration>`** / **`/qa edit TheVirus acceptCooldown complete disable => disable`** - Cooldown before a player can re-accept after completing.
- **`/qa edit TheVirus takeEnabled true => takeEnabled <true|false>`** - Whether players can take the quest via `/q take`.
- **`/qa edit TheVirus abortEnabled true => abortEnabled <true|false>`** - Whether players can abort it.

**Objectives** — the steps of the quest. See the [Objectives reference](./types/objectives).

- **`/qa edit TheVirus objectives add BreakBlocks dirt 1 => objectives add <type> ...`** - Add an objective.
- **`/qa edit TheVirus objectives list => objectives list`** - List the objectives.
- **`/qa edit TheVirus objectives clear => objectives clear`** - Remove all objectives.
- **`/qa edit TheVirus objectives edit 1 description show => objectives edit <id> ...`** - Edit one objective (see below).

Inside `objectives edit <id>` you can set a `description`, `displayName`, `taskDescription`, a `location` (`set`/`enable`/`disable`), a `completionNPC`, add `rewards`, and add **objective conditions** in three slots:

- **`/qa edit TheVirus objectives edit 1 conditions unlock add Flying equals true => conditions unlock add <type> ...`** - must be met for the objective to unlock.
- **`/qa edit TheVirus objectives edit 1 conditions progress add Flying equals true => conditions progress add <type> ...`** - must be met for progress to count.
- **`/qa edit TheVirus objectives edit 1 conditions complete add Flying equals true => conditions complete add <type> ...`** - must be met for the objective to finish.

**Requirements** — conditions to _accept_ the quest. See the [Conditions reference](./types/conditions).

- **`/qa edit TheVirus requirements add Flying equals true => requirements add <type> ...`** · **`/qa edit TheVirus requirements list => list`** · **`/qa edit TheVirus requirements clear => clear`** · **`/qa edit TheVirus requirements edit 1 delete => edit <id> delete`**

**Rewards** — actions that run when the quest is completed. See the [Actions reference](./types/actions).

- **`/qa edit TheVirus rewards add GiveItem stone 1 => rewards add <type> ...`** · **`/qa edit TheVirus rewards list => list`** · **`/qa edit TheVirus rewards clear => clear`** · **`/qa edit TheVirus rewards edit 1 remove => edit <id> remove`**

**Triggers** — run actions on quest events (begin/complete/fail/death/etc.). See the [Triggers reference](./types/triggers).

- **`/qa edit TheVirus triggers add MyAction BEGIN --applyOn O1 --world_name ALL => triggers add <action> <event> ...`**
- **`/qa edit TheVirus triggers list => triggers list`** · **`/qa edit TheVirus triggers clear => clear`** · **`/qa edit TheVirus triggers remove 1 => remove <id>`**

**Quest givers**

- **`/qa edit TheVirus npcs add rightClickSelect --hideInNPC => npcs add <npc> --hideInNPC`** - Attach the quest to an NPC. Citizens and FancyNPCs selectors are available on Paper; armor stands are available on both platforms. `rightClickSelect` gives you a selector item.
- **`/qa edit TheVirus npcs list => npcs list`** · **`/qa edit TheVirus npcs clear => npcs clear`**
- **`/qa edit TheVirus armorstands add => armorstands add`** - Get an item, then right-click an armor stand to attach the quest to it.
- **`/qa edit TheVirus armorstands list => armorstands list`** · **`/qa edit TheVirus armorstands clear => armorstands clear`**

### Conversations — `/qa conversations`

See the [Conversation System](./conversation-system) for the full picture.

- **`/qa conversations create Intro --demo --category default => conversations create <name> --demo --category <category>`** - Create a conversation. `--demo` fills it with a working example to learn from.
- **`/qa conversations list => conversations list`** - List conversations.
- **`/qa conversations analyze Intro --printToConsole => conversations analyze <conversation> --printToConsole`** - Sanity-check a conversation's structure.
- **`/qa conversations start Intro => conversations start <conversation>`** - Start a conversation.
- **`/qa conversations edit Intro npcs add rightClickSelect => conversations edit <conversation> ...`** - Attach NPCs/armor stands and manage speakers/categories. Conversation lines are edited in the `.yml` file.

### Global actions & conditions

Reusable actions and conditions you can refer to by name from anywhere.

- **`/qa actions add MyAction SendMessage Hello --category default => /qa actions add <name> <type> ...`** - Create a named action.
- **`/qa actions list`** · **`/qa actions edit MyAction execute Steve --ignoreConditions --silent => /qa actions edit <name> execute [player] ...`** · **`/qa actions edit MyAction category show => /qa actions edit <name> ...`**
- **`/qa conditions add MyCondition Flying equals true --category default => /qa conditions add <name> <type> ...`** - Create a named condition.
- **`/qa conditions list`** · **`/qa conditions edit MyCondition check Steve => /qa conditions edit <name> check [player]`** · **`/qa conditions edit MyCondition category show => /qa conditions edit <name> ...`**

### Categories & Tags

- **`/qa categories create ExampleCategory => /qa categories create <name>`** · **`/qa categories list => list`** · **`/qa categories edit ExampleCategory displayName show => edit <category> ...`** - Organise quests into (nestable) categories.
- **`/qa tags create INTEGER ExampleTag => /qa tags create <type> <name>`** · **`/qa tags list => list`** · **`/qa tags delete ExampleTag => delete <name>`** - Custom per-player data you can read/write with conditions, actions and placeholders. See the [reputation tutorial](../tutorials/creating-a-reputation-system-with-tags).

### Saved items — `/qa items`

Save an item once, then use its name in quest rewards, item objectives and actions such as `GiveItem`.
The saved name (for example, `quest_token`) is its ID in commands. Its **display name** is the name
players see on the actual item, not just an internal label.

| Command                                                                                                                     | What it does                                                                                                                  |
| --------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `/qa items create quest_token gold_nugget --category default => /qa items create <name> <material> [--category <category>]` | Saves an item from a material. Use `hand` instead of the material to save the item you're holding, including its custom data. |
| `/qa items list`                                                                                                            | Lists saved items.                                                                                                            |
| `/qa items edit quest_token give Steve 4 => /qa items edit <item> give <player> <amount>`                                   | Gives an online player the saved item, including its display name.                                                            |
| `/qa items edit quest_token displayName set Super => /qa items edit <item> displayName set <text>`                          | Sets the actual item's display name. Spaces and MiniMessage formatting work here.                                             |
| `/qa items edit quest_token displayName show => /qa items edit <item> displayName show`                                     | Shows the configured display name.                                                                                            |
| `/qa items edit quest_token displayName remove => /qa items edit <item> displayName remove`                                 | Removes the display-name override.                                                                                            |
| `/qa items edit quest_token remove => /qa items edit <item> remove`                                                         | Deletes the saved item definition. Update any quests or actions that reference it first.                                      |

For example:

```text
/qa items create quest_token gold_nugget
/qa items edit quest_token displayName set <gold>Quest Token
/qa items edit quest_token give Steve 4
```

You can also give that same item with `/qa actions execute GiveItem quest_token 4`.
Both routes use the saved display name. Choose a unique saved name, not a vanilla material name such
as `stone`. The command is `/qa items`, with **items only once**.

### Managing players

- **`/qa give <player> <quest>`** - Give a player a quest (skips requirements).
- **`/qa completeQuest Steve TheVirus => /qa completeQuest <player> <activeQuest>`** / **`/qa failQuest Steve TheVirus => failQuest <player> <activeQuest>`** - Force-complete or fail a player's active quest.
- **`/qa resetAndRemoveQuest Steve TheVirus => /qa resetAndRemoveQuest <player> <quest>`** / **`/qa resetAndFailQuestForAllPlayers TheVirus => resetAndFailQuestForAllPlayers <quest>`** - Reset and remove/fail.
- **`/qa progress Steve TheVirus => /qa progress <player> <activeQuest>`** · **`/qa activeQuests Steve => activeQuests <player>`** · **`/qa completedQuests Steve => completedQuests <player>`** - Inspect a player.
- **`/qa questpoints Steve add 10 => /qa questpoints <player> add <amount>`** / **`/qa questpoints Steve remove 10 => remove <amount>`** / **`/qa questpoints Steve set 10 => set <amount>`** / **`/qa questpoints Steve show => show`** - Manage a player's Quest Points.

### Debug & maintenance

- **`/qa debug`** - Toggle debug mode (lots of extra info in chat).
- **`/qa debug showErrorsAndWarnings --printToConsole => /qa debug showErrorsAndWarnings --printToConsole`** - Show collected errors/warnings.
- **`/qa debug worldInfo`** · **`/qa debug clearOwnChat => clearOwnChat`** · **`/qa debug beaconBeam Steve spawn world,0,64,0 => beaconBeam <player> <name> <location>`** - Misc debug helpers.
- **`/qa debug loadDataUnsafe`** · **`/qa debug disablePluginAndSaving maintenance => disablePluginAndSaving <reason>`** · **`/qa debug enablePluginAndSaving maintenance => enablePluginAndSaving <reason>`** - Advanced/risky (used for things like database migrations). Back up first!

<Admonition type="tip" title="Lost? Use the in-game help">

`/qa help` and `/qa help <search>` open a searchable, clickable help menu — handy when you can't remember the exact path.

</Admonition>
