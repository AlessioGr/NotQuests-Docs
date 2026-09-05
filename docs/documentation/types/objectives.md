---
title: 🗡️ Objectives
sidebar_position: 1
description: This lists and explains all objectives (= tasks) in NotQuests, as well as how you can use them.
keywords: [notquests, objectives, quest objectives, tasks, quest tasks]
---

import Admonition from '@theme/Admonition';

Objectives are tasks the player has to complete in order to finish the Quest. Some objectives are integrations with other plugins and are only available if you have that plugin installed.

Armor-stand targets work on Paper and NeoForge. Citizens and FancyNPCs targets, including Citizens integration objectives, are available only on Paper with the matching plugin installed.

## Objective locations and guiding beams

NotQuests can show a Wynncraft-style guiding marker for an objective. This is useful for objectives where the player should go to a certain place, click a certain block, find an NPC, or return to a quest area.

This is not a separate objective type. It is an extra setting you can add to almost any objective:

1. Add the objective.
2. Find its objective ID with `/qa edit questname objectives list`.
3. Stand where the marker should point and run `/qa edit questname objectives edit 1 location set here`.

When a player is tracking that objective, NotQuests shows a client-side beam/marker pointing toward the saved location. It does not place real blocks in the world for everyone. The marker is only shown to the player who is doing the quest.

If you also enable `visual.objective-tracking.location-compass.enabled` in `general.yml`, players get a small bossbar compass while tracking an objective marker. It shows whether the target is left, right, behind, or straight ahead, plus the distance in blocks/meters. This is off by default because bossbars are visually noticeable and many servers already use them for progress or events.

For a full walkthrough, see the [Guided Location Quest tutorial](/docs/tutorials/guided-location-quest).

Useful commands:

- **`/qa edit questname objectives edit 1 location set here`** - Save your current in-game position for objective `1` and turn the marker on. This is the easiest way to set it up.
- **`/qa edit questname objectives edit 1 location set looking`** - Save the block you are looking at and turn the marker on.
- **`/qa edit questname objectives edit 1 location set world 1453 71 -2451`** - Save exact coordinates. This is useful from console or when copying coordinates from another tool.
- **`/qa edit questname objectives edit 1 location status`** - Show whether the objective has a saved marker, whether it is enabled, and where it points.
- **`/qa edit questname objectives edit 1 location preview`** - Show the saved marker to yourself for a short preview.
- **`/qa edit questname objectives edit 1 location enable`** - Turn the marker back on if the objective already has a saved location.
- **`/qa edit questname objectives edit 1 location disable`** - Turn the marker off but keep the saved location.
- **`/qa edit questname objectives edit 1 location clear`** - Delete the saved marker location and turn it off.

Good use cases:

- Show where a player should search after accepting a quest.
- Point players to a hidden cave, camp, chest, NPC, or dungeon entrance.
- Make `Interact`, `DeliverItems`, `KillMobs`, `Harvest`, or custom objective chains easier to follow.
- Enable the marker for a `ReachLocation` objective after creating it from a WorldEdit selection.

Notes:

- The marker appears for the player's currently tracked objective. This is usually the newest unlocked objective, or the objective that just gained progress.
- `set here`, `set looking`, and `preview` must be run in-game by a player. Console can use the exact-coordinate `location set world x y z` command.
- The target location must be in the same world as the player.
- The bossbar compass is global opt-in. There are no per-objective commands for it; if it is enabled, it appears for objectives that already have a marker location.
- Keep `general.enable-move-event` enabled in `general.yml`; it is needed for location tracking and `ReachLocation`.
- This is different from the `Beam` action. Objective locations are tied to objective tracking. The `Beam` action is a separate action you can run from rewards, triggers, or saved actions.

First, we'll list the objectives which are always available:

## Default Objectives

### ⛏️ BreakBlocks

<Admonition type="info" title="Description">

**Completed when:** Player breaks a specific amount of blocks.

**Command Arguments:**

- **`<material>`** The material of the block which the player has to break. Use 'hand' to specify the item which you are currently holding in your hand. Use 'any' so any item counts. You can also specify items made in the NotQuests item system.
- **`<amount>`** - The amount of blocks the player needs to break
- **`(flags)`** - Optional flags
  - `--doNotDeductIfBlockIsPlaced` - By default, if you place a block which is specified in the BreakBlocks objective, it will be deducted from your progress. Otherwise, players would be able to simply cheat by placing and then breaking the block. Setting this flag will **disable** that safety mechanism.

**Example command:** `/qa edit questname objectives add BreakBlocks grass_block 4`

</Admonition>

### ❣️ BreedMobs

<Admonition type="info" title="Description">

**Completed when:** Player breeds a specific mob

**Command Arguments:**

- **`<entityType>`** The mob type which the player needs to breed. Use 'any' if any mob type should count.
- **`<amount>`** - The amount of mobs the player needs to breed

**Example command:** `/qa edit questname objectives add BreedMobs cow 4`

</Admonition>

### 🍎 FeedMobs

<Admonition type="info" title="Description">

**Completed when:** Player feeds a specific mob a certain number of times

**Command Arguments:**

- **`<entityType>`** The mob type which the player needs to feed. Use 'any' if any mob type should count.
- **`<amount>`** - The amount of times the player needs to feed that mob

**Example command:** `/qa edit questname objectives add FeedMobs cow 4`

</Admonition>

### 🐺 TameMobs

<Admonition type="info" title="Description">

**Completed when:** Player tames a specific mob, such as a wolf, cat, horse, or parrot.

**Command Arguments:**

- **`<entityType>`** - The mob type the player needs to tame. Use `any` if any tameable mob should count.
- **`<amount>`** - The amount of mobs the player needs to tame.

**Example command:** `/qa edit questname objectives add TameMobs wolf 1`

</Admonition>

### 🌾 Harvest

<Admonition type="info" title="Description">

**Completed when:** Player harvests fully grown crops, plants, or fruit blocks.

This is safer than using `BreakBlocks` or `PickupItems` for farming quests. NotQuests checks that the crop was actually ready to harvest, and it ignores directly placed melon, pumpkin, cactus, and sugar cane blocks so players cannot just place-break the same block for progress.

**Command Arguments:**

- **`<crops>`** - The crop, plant, or fruit block to count. You can use crop block names like `wheat`, `carrots`, `potatoes`, and `beetroots`, or item-style aliases like `carrot`, `potato`, and `beetroot`. Comma-separated lists work too.
- **`<amount>`** - The amount of fully grown crops, plants, or fruit blocks the player has to harvest.

**What counts:**

- Fully grown ageable crops, such as wheat, carrots, potatoes, beetroot, nether wart, cocoa, sweet berries, pitcher crop, and torchflower crop.
- Melon and pumpkin fruit blocks.
- Sugar cane and cactus segments that grew on top of another sugar cane/cactus block.

**Example command:** `/qa edit questname objectives add Harvest wheat,carrot,potato,beetroot,melon,pumpkin,sugar_cane,cactus 32`

</Admonition>

### ❓ Condition

<Admonition type="info" title="Description">

**Completed when:** Player fulfills a certain condition (Created using `/qa conditions`). The plugin checks if the condition has been fulfilled every second or if the corresponding action to that condition has been executed (for example the _Money_ action for the _Money_ condition). This basically adds countless more objectives. For example, you can even use PlaceholderAPI Placeholders to create objectives.

**Command Arguments:**

- **`<condition name>`** This is the name of the condition it should check. Conditions can be created using `/qa conditions`.
- **`(flags)`** - Optional flags
  - `--checkOnlyWhenCorrespondingVariableValueChanged` - If you set this flag, the condition will only be checked if the corresponding action for the variable has been executed. (For example the Money action for the Money condition). The plugin will stop checking the condition periodically. Thus, this will also be more performant.

**Example command:** `/qa edit questname objectives add Condition myCondition`

</Admonition>

### 🥗 ConsumeItems

<Admonition type="info" title="Description">

**Completed when:** Player consumes an item. Consuming usually means eating or drinking - for example an apple.

Each item eaten or drunk counts as one, regardless of the size of the stack in the player's hand.

**Command Arguments:**

- **`<material>`** The material of the item which the player has to consume. Use 'hand' to specify the item which you are currently holding in your hand. Use 'any' so any item counts. You can also specify items made in the NotQuests item system.
- **`<amount>`** - The amount of items the player needs to consume

**Example command:** `/qa edit questname objectives add ConsumeItems apple 5`

</Admonition>

### ⚒️ CraftItems

<Admonition type="info" title="Description">

**Completed when:** Player crafts the requested number of matching items.

**Command Arguments:**

- **`<material>`** The material of the item which the player has to craft. Use 'hand' to specify the item which you are currently holding in your hand. Use 'any' so any item counts. You can also specify items made in the NotQuests item system.
- **`<amount>`** - The amount of items the player needs to craft

**Example command:** `/qa edit questname objectives add CraftItems enchanting_table 1`

</Admonition>

### 🚚 DeliverItems

<Admonition type="info" title="Description">

**Completed when:** Player delivers the requested items to an NPC. Citizens and FancyNPCs work on Paper; armor stands work on both Paper and NeoForge. Delivered items are removed from the player's inventory.

**Command Arguments:**

- **`<material>`** The material of the item which the player has to deliver. Use 'hand' to specify the item which you are currently holding in your hand. Use 'any' so any item counts. You can also specify items made in the NotQuests item system.
- **`<amount>`** - The amount of items the player needs to deliver
- **`<NPC ID or Armorstand>`** - Either enter the Citizens or FancyNPCs NPC ID, or 'armorstand' to receive an item with which you can easily attach this objective to an armorstand.

**Example command:** `/qa edit questname objectives add DeliverItems coal 20 armorstand`

</Admonition>

### 🧑‍🌾 TradeWithVillager

<Admonition type="info" title="Description">

**Completed when:** Player takes a matching result item from a villager trading window.

Use this for economy or reputation quests where the player must trade with villagers. NotQuests counts the item the trade gives to the player, not the items the player pays.

**Command Arguments:**

- **`<materials>`** - The trade result item that should count. Use a material like `emerald`, a comma-separated list such as `emerald,diamond`, a NotQuests custom item, or `any`.
- **`<amount>`** - The amount of matching traded items the player needs to receive.

**Example command:** `/qa edit questname objectives add TradeWithVillager emerald 12`

</Admonition>

### 🪄 Enchant

<Admonition type="info" title="Description">

**Completed when:** Player enchants an item

**Command Arguments:**

- **`<enchantment>`** The enchantment the player has to enchant the item with.
- **`<materials>`** The item the player has to enchant. You can use 'any' here if it doesn't matter
- **`<amount>`** - The amount of items the player needs to enchant that item
- **`(flags)`** - Optional flags
  - `--min <minimum level>` - Specify the minimum enchantment level
  - `--max <maximum level>` - Specify the maximum enchantment level

**Example command:** `/qa edit enchant1 objectives add Enchant minecraft:efficiency diamond_pickaxe 3.0 --min 2.0` (Enchant diamond pickaxe 3 times with efficiency (minimum enchantment level: 2))

</Admonition>

### 🐟 FishItems

<Admonition type="info" title="Description">

**Completed when:** Player fishes a specific item. Only successful fishing attempts are counted.

**Command Arguments:**

- **`<material>`** The material of the item which the player has to fish. Use 'hand' to specify the item which you are currently holding in your hand. Use 'any' so any item counts. You can also specify items made in the NotQuests item system.
- **`<amount>`** - The amount of items the player needs to fish

**Example command:** `/qa edit questname objectives add FishItems cod 3`

</Admonition>

### 👉 Interact

<Admonition type="info" title="Description">

**Completed when:** Player interacts with a specific location by either left-clicking, right-clicking or both.

**Command Arguments:**

- **`<amount>`** - Amount of times the player needs to interact
- Then choose one location setup:
  - **`looking`** - Use the block you are currently looking at. This must be run in-game by a player.
  - **`<world> <x> <y> <z>`** - Use exact coordinates. This also works from console.
- **`(flags)`** - Optional flags
  - `--leftClick` - If you set this flag, then interactions by left-clicking the location will count.
  - `--rightClick` - If you set this flag, then interactions by right-clicking the location will count.
  - `--cancelInteractions` - If you set this flag, then the interact event of the interaction will be cancelled. If, for example, the location is a chest and the player has to right-click the chest, the chest will open unless you set this flag. This also prevents breaking blocks.
  - `--taskDescription <task description>` - With this flag you can specify the description of what the player has to do. It will be displayed in the objective.
  - `--maxDistance <radius in blocks>` - This is the maximum radius in blocks around the specified location in which the interaction will count.

**Easy in-game setup:** `/qa edit questname objectives add Interact 2 looking --rightClick --maxDistance 2 --cancelInteraction --taskDescription "Find Trents fishing rod"`

**Exact-coordinate setup:** `/qa edit questname objectives add Interact 2 world 1453 71 -2451 --rightClick --maxDistance 2 --cancelInteraction --taskDescription "Find Trents fishing rod"`

</Admonition>

### 🏹 ShootArrow

<Admonition type="info" title="Description">

**Completed when:** Player shoots an arrow and that arrow lands inside a target region.

This is useful for archery ranges, target practice quests, hidden switches, dungeon puzzles, and any quest where the player should hit an area instead of just standing there.

**Command Arguments:**

- **`<amount>`** - Amount of arrows that need to land inside the target region
- **`<world>`** - World containing the target region. If WorldEdit is installed, you can use `worldeditselection` instead to use your current selection.
- **`<x>`** - Center X coordinate of the target region
- **`<y>`** - Center Y coordinate of the target region
- **`<z>`** - Center Z coordinate of the target region
- **`<radius>`** - Radius in blocks around the center where arrows count

**Example command:** `/qa edit questname objectives add ShootArrow 3 world 1453 71 -2451 4`

**WorldEdit example:** `@optional-integration /qa edit questname objectives add ShootArrow 3 worldeditselection`

</Admonition>

### 🤸 Jump

<Admonition type="info" title="Description">

**Completed when:** Player jumps a certain amount of times

**Command Arguments:**

- **`<amount>`** - The amount of items the player has to jump

**Example command:** `/qa edit questname objectives add Jump 10`

</Admonition>

### 🩸 KillMobs

<Admonition type="info" title="Description">

**Completed when:** Player kills a mobs.

**Command Arguments:**

- **`<entityType>`** - The type of mob which the player has to kill. Use 'any' so any mob counts. Use 'player' to kill a player. If you have MythicMobs or EcoMobs installed, you can also use mobs from those mods or target entire factions in mythicmobs using mmfaction:yourfactionname.
- **`<amount>`** - Amount of kills needed
- **`(flags)`** - Optional flags
  - `--nametag_containsany <what the nametag can contain>` - If you set this flag, it will check if the nametag of the mob contains any of the strings specified here
  - `--nametag_equals <what the nametag should be>` - If you set this flag, it will check if the nametag of the mob is equal to the nametag specified here

**Example command:** `/qa edit questname objectives add KillMobs zombie 10`

</Admonition>

### 🔢 NumberVariable

<Admonition type="info" title="Description">

**Completed when:** NumberVariable conditions you can specify here is fulfilled. This allows you to use variables in objectives relatively!

**Command Arguments:**

TODO

**Example command:** `/qa edit questname objectives add NumberVariable PlaytimeMinutes moreOrEqualThan PlaytimeMinutes+2` - This objective makes it, so the player needs to play 2 MORE minutes.

</Admonition>

### 🔢 Objective

<Admonition type="info" title="Description">

**Completed when:** This is a holder for sub-objectives. If you add sub-objectives to an "Objective" objective, it's completed once all its sub-objectives have been completed.

**Command Arguments:**

- **`<Objective Holder Name>`** - This will be displayed when taking the quest

**Example command:** `/qa edit questname objectives add Objective "Crafting Objectives"`

</Admonition>

### 🏴‍☠️ OpenBuriedTreasure

<Admonition type="info" title="Description">

**Completed when:** Player opens any x amount of buried treasures (buried treasures are a vanilla minecraft feature)

**Command Arguments:**

- **`<amount>`** - The amount of buried treasures the player needs to open (right-click)

**Example command:** `/qa edit questname objectives add OpenBuriedTreasure 3`

</Admonition>

### 📕 OtherQuest

<Admonition type="info" title="Description">

**Completed when:** Player completes another Quest

**Command Arguments:**

- **`<other quest name>`** - The name of the other Quest which the player needs to complete
- **`<amount>`** - The amount of times the player needs to complete the other Quest
- **`(flags)`** - Optional flags
  - `--countPreviouslyCompletedQuests` - If you set this flag, all previous Quest completions before the player unlocks this objective will count towards its progress as well. Otherwise, only new Quest completions will count.

**Example command:** `/qa edit questname objectives add OtherQuest otherQuestName 2 --countPreviouslyCompletedQuests`

</Admonition>

### 🚮 PickupItems

<Admonition type="info" title="Description">

**Completed when:** Player picks up a specific item by picking it up from the ground into his inventory.

**Command Arguments:**

- **`<material>`** The material of the block which the player has to break. Use 'hand' to specify the item which you are currently holding in your hand. Use 'any' so any item counts. You can also specify items made in the NotQuests item system.
- **`<amount>`** - The amount of items the player needs to pick up
- **`(flags)`** - Optional flags
  - `--doNotDeductIfItemIsDropped` - By default, if you drop an item which is specified in the PickupItems objective, it will be deducted from your progress. Otherwise, players would be able to simply cheat by dropping and then picking up the item over and m. Setting this flag will **disable** that safety mechanism.
  - `--doNotDeductIfItemIsPlaced` - By default, if you place an item which is specified in the PickupItems objective, it will be deducted from your progress. Otherwise, players would be able to simply cheat by placing and then picking up the item over and over. Setting this flag will **disable** that safety mechanism.
  - `--doNotDeductIfItemIsRemovedFromInventory` - By default, if you remove an item from your inventory (e.g. put in a chest) which is specified in the PickupItems objective, it will be deducted from your progress. Otherwise, players would be able to simply cheat by, e.g., putting an item in a chest and destroying the chest. Setting this flag will **disable** that safety mechanism.

**Example command:** `/qa edit questname objectives add PickupItems dirt 12`

</Admonition>

### 🪧 PlaceBlocks

<Admonition type="info" title="Description">

**Completed when:** Player breaks a specific amount of blocks.

**Command Arguments:**

- **`<material>`** The material of the block which the player has to place. Use 'hand' to specify the item which you are currently holding in your hand. Use 'any' so any item counts. You can also specify items made in the NotQuests item system.
- **`<amount>`** - The amount of blocks the player needs to place
- **`(flags)`** - Optional flags
  - `--doNotDeductIfBlockIsBroken` - By default, if you break a block which is specified in the PlaceBlocks objective, it will be deducted from your progress. Otherwise, players would be able to simply cheat by breaking and then placing the block. Setting this flag will **disable** that safety mechanism.

**Example command:** `/qa edit questname objectives add PlaceBlocks acacia_planks 20`

</Admonition>

### 🛬 ReachLocation

<Admonition type="info" title="Description">

**Completed when:** Player reaches a certain location or region.

**Command Arguments:**

- **`<world>`** - World containing the center of the target region. If WorldEdit is installed, you can use `worldeditselection` instead to use your current selection.
- **`<x>`** - Center X coordinate of the target region
- **`<y>`** - Center Y coordinate of the target region
- **`<z>`** - Center Z coordinate of the target region
- **`<radius>`** - Radius in blocks around the center where reaching the location counts
- **`<Location Name>`** - Name of the location the player has to reach. It will be displayed in the objective task description.

**Example command:** `/qa edit questname objectives add ReachLocation world 1453 71 -2451 6 Luthers Church`

**WorldEdit example:** `@optional-integration /qa edit questname objectives add ReachLocation worldeditselection Luthers Church`

</Admonition>

### 🧑‍💻 RunCommand

<Admonition type="info" title="Description">

**Completed when:** Player runs a certain command

**Command Arguments:**

- **`<amount>`** - Amount of times the player needs to run the command
- **`<Command>`** - Command which the player needs to run. Put it between "" if you need to use spaces. A / at the beginning is not required.
- **`(flags)`** - Optional flags
  - `--ignoreCase` - If you set this flag, it accepts every captitalization. Both /warp spawn and /wArP sPaWn will work
  - `--cancelCommand` - If you set this flag, the command isn't run while the objective is active. Instead, its execution is cancelled. Basically, nothing would happen if they run the command (apart from the progress of this objective increasing, of course)

**Example command:** `/qa edit questname objectives add RunCommand 2 "warp spawn" --ignoreCase`

</Admonition>

### 🧑‍💻 ShearSheep

<Admonition type="info" title="Description">

**Completed when:** Player shears a certain amount of sheep

**Command Arguments:**

- **`<amount>`** - Amount of times the player needs to shear the sheep
- **`(flags)`** - Optional flags
  - `--cancelShearing` - If you set this flag, the actual shearing of the sheep will be cancelled while this objective is active

**Example command:** `/qa edit questname objectives add ShearSheep 4 --cancelShearing`

</Admonition>

### 🐄 MilkCow

<Admonition type="info" title="Description">

**Completed when:** Player milks a certain amount of cows

**Command Arguments:**

- **`<amount>`** - Amount of times the player needs to milk a cow
- **`(flags)`** - Optional flags
  - `--cancelMilking` - If you set this flag, the actual milking of the cow will be cancelled while this objective is active

**Example command:** `/qa edit questname objectives add MilkCow 4 --cancelMilking`

</Admonition>

### 🔥 SmeltItems

<Admonition type="info" title="Description">

**Completed when:** Player takes a smelted item out of a furnace. So yeah, they'll have to smelt it, and then take it out. The output item counts, not the item which you put in the furnace.

**Command Arguments:**

- **`<material>`** - The material of the block which the player has to get our of smelting. Use 'hand' to specify the item which you are currently holding in your hand. Use 'any' so any item counts. You can also specify items made in the NotQuests item system.
- **`<amount>`** - Amount of times the player has to get this item from smelting

**Example command:** `/qa edit questname objectives add SmeltItems coal 4`

</Admonition>

### 🧪 BrewItems

<Admonition type="info" title="Description">

**Completed when:** Player takes freshly brewed items out of a brewing stand.

NotQuests tracks the brewing result, not just any potion in the inventory. A player cannot manually insert old potions into a brewing stand and take them back out for progress.

**Command Arguments:**

- **`<materials>`** - The potion, bottle, or custom brewed item the player must collect from the brewing stand. Use `potion`, `splash_potion`, `lingering_potion`, or a custom NotQuests item if you need a more specific result.
- **`<amount>`** - The amount of freshly brewed items the player has to collect.

**Example command:** `/qa edit questname objectives add BrewItems potion 5`

</Admonition>

### ⚒️ SmithItems

<Admonition type="info" title="Description">

**Completed when:** Player takes a matching result item from a smithing table.

The output item counts, so this is useful for quests around upgrades, armor trims, or other smithing recipes.

**Command Arguments:**

- **`<materials>`** - The smithing result item that should count. Use a material like `netherite_sword`, a comma-separated list, a NotQuests custom item, or `any`.
- **`<amount>`** - The amount of matching smithing result items the player needs to take.

**Example command:** `/qa edit questname objectives add SmithItems netherite_sword 1`

</Admonition>

### 💀 Die

<Admonition type="info" title="Description">

**Completed when:** Player dies.

You can count every death, or require a specific death cause such as `fall`, `lava`, `drown`, or `player_attack`.

**Command Arguments:**

- **`<amount>`** - Amount of times the player needs to die.
- **`(flags)`** - Optional flags
  - `--cause <damage type>` - Only count deaths caused by this Minecraft damage type.

**Example commands:**

- `/qa edit questname objectives add Die 1`
- `/qa edit questname objectives add Die 1 --cause fall`

</Admonition>

### 🧟 Sneak

<Admonition type="info" title="Description">

**Completed when:** Player sneaks

**Command Arguments:**

- **`<amount>`** - Amount of times the player needs to sneak

**Example command:** `/qa edit questname objectives add Sneak 4`

</Admonition>

### 🗯️ TalkToNPC

<Admonition type="info" title="Description">

**Completed when:** Player talks to (right-clicks) an NPC (Both Citizen NPCs and Armorstands work).

**Command Arguments:**

- **`<NPC ID or Armorstand>`** - Either enter the Citizens or FancyNPCs NPC ID, or 'armorstand' to receive an item with which you can easily attach this objective to an armorstand.

**Example command:** `/qa edit questname objectives add TalkToNPC armorstand`

</Admonition>

### ❗ TriggerCommand

<Admonition type="info" title="Description">

**Completed when:** A special command is run from someone with enough permissions (can be a command block or a player with op permissions. Usually, the console is used.)

This can be used to integrate NotQuests with many different plugins.

## Example use-case

An objective _“vote for us”_ which should be completed once the player votes. In your vote plugin, you could then add the trigger command to the vote reward.

Then, once that command is run from the console by the vote plugin (so once the player votes), the TriggerCommand Objective for that player is completed.

> This is also very useful if you want to make special quests integrated with the “Interactions” plugin. That plugin can be used if you want to make more detailed, scripted conversations with NPCs. Be warned: that plugin has a steep learning curve. Also note: Newer versions of NotQuests now have an integrated conversation system.

### Example on how to add a trigger command to fictional quest named “1”

![](https://i.imgur.com/MAioIq8.png)

For that, the trigger command would be `/qa triggerObjective playervoted NoeX` - NoeX being my username.

In our vote example, if you set that command as a vote reward (in your vote plugin) and the player votes, it would complete the objective.
![](https://i.imgur.com/NOUSIl0.png)

**Command Arguments:**

- **`<Trigger Name>`** - Name of the trigger. That name will have to be put into the trigger command (`/qa triggerObjective trigger1 Steve => /qa triggerObjective <triggerName> <player>`)
- **`<amount>`** - Amount of time the trigger/command needs to be triggered/ran, for the objective to be completed

**Example command:** `/qa edit questname objectives add TriggerCommand trigger1 1`

**Command to "trigger"/finish that objective:** `/qa triggerObjective trigger1 {PLAYER}` - `{PLAYER}` needs to be replaced with the players username.

</Admonition>

## BetonQuest 3 Integration Objectives

These objectives are only available when BetonQuest 3.0.0 or newer is installed. BetonQuest 1.x and 2.x are not supported.

### ℹ️ BetonQuestObjectiveStateChange

<Admonition type="info" title="Description">

**Completed when:** A BetonQuest objective from a BetonQuest package reaches the state you choose.

Use this when part of a quest is managed by BetonQuest, but you still want the player to progress a NotQuests quest when that BetonQuest objective changes state.

**Command Arguments:**

- **`<package>`** - BetonQuest package containing the objective.
- **`<objective>`** - Objective name inside that BetonQuest package.
- **`<objectiveState>`** - BetonQuest objective state that should count, such as `COMPLETED`. Tab-completion suggests the states available to NotQuests.

**Example command:** `@optional-integration /qa edit questname objectives add BetonQuestObjectiveStateChange main talk_to_guard COMPLETED`

</Admonition>

## [Citizens](https://ci.citizensnpcs.co/job/Citizens2/) Integration Objectives

### ℹ️ EscortNPC

<Admonition type="info" title="Description">

**Completed when:** You escort an NPC to another NPC. When the objective is unlocked, the NPC you need to escort spawns at your location (or a specified spawn location) and starts following you. You will need to get close to the destination NPC and then right-click the destination NPC while the escort NPC is close to you.

**Command Arguments:**

- **`<NPC to escort>`** - ID of the Citizens NPC the player has to escort
- **`<Destination NPC>`** - ID of the destination Citizens NPC to whom the player has to escort the NPC to
- **`(flags)`** - Optional flags
  - `--spawnLocation <Location X, Y, Z>` - If you set this flag, the NPC you need to escort will always spawn at this location. Otherwise, it will always spawn at the player's current location

**Example command:** `@optional-integration /qa edit questname objectives add EscortNPC 1 2`

</Admonition>

## [EliteMobs](https://magmaguy.com/downloads/elitemobs.html) Integration Objectives

### ℹ️ KillEliteMobs

<Admonition type="info" title="Description">

**Completed when:** Player kills a specific amount of EliteMobs.

**Command Arguments:**

- **`<amount>`** - The amount of Elite Mobs the player needs to kill. This can be a number expression.
- **`(flags)`** - Optional flags
  - `--mobname <name>` - Only count Elite Mobs whose name contains this text.
  - `--minimumLevel <level>` - Only count Elite Mobs at or above this level.
  - `--maximumLevel <level>` - Only count Elite Mobs at or below this level.
  - `--spawnReason <reason>` - Only count Elite Mobs that spawned for this reason.
  - `--minimumDamagePercentage <percentage>` - Only count the kill if the player dealt at least this percentage of the damage.

**Example command:** `@optional-integration /qa edit questname objectives add KillEliteMobs 10 --mobname Zombie --minimumLevel 5 --maximumLevel 15`

</Admonition>

## [Jobs Reborn](https://www.zrips.net/jobs/) Integration Objectives

### ℹ️ JobsRebornReachJobLevel

<Admonition type="info" title="Description">

**Completed when:** Player reaches a specific level in a Jobs Reborn job. This tracks the player's real Jobs level, including admin changes like `/jobs level add`.

**Command Arguments:**

- **`<Job Name>`** - The name of the job (e.g. `Miner`).
- **`<level>`** - The level the player needs to reach. This can be a number expression.
- **`(flags)`** - Optional flags
  - `--doNotCountPreviousLevels` - Only count levels gained _after_ the objective unlocks, instead of the player's current level.

**Example command:** `@optional-integration /qa edit questname objectives add JobsRebornReachJobLevel Miner 10`

</Admonition>

## [Slimefun](https://github.com/Slimefun/Slimefun4/releases) Integration Objectives

### ℹ️ SlimefunResearch

<Admonition type="info" title="Description">

**Completed when:** Player spends a specific amount of research points in Slimefun.

**Command Arguments:**

- **`<amount>`** - The amount of research points the player needs to spend. This can be a number expression.

**Example command:** `@optional-integration /qa edit questname objectives add SlimefunResearch 500`

</Admonition>

## [Towny](https://github.com/TownyAdvanced/Towny/releases) Integration Objectives

### ℹ️ TownyNationReachTownCount

<Admonition type="info" title="Description">

**Completed when:** The player's nation reaches a minimum number of towns.

**Command Arguments:**

- **`<amount>`** - The minimum number of towns the nation needs. This can be a number expression.
- **`(flags)`** - Optional flags
  - `--doNotCountPreviousTowns` - Only count towns added _after_ the objective unlocks.

**Example command:** `@optional-integration /qa edit questname objectives add TownyNationReachTownCount 5`

</Admonition>

### ℹ️ TownyReachResidentCount

<Admonition type="info" title="Description">

**Completed when:** The player's town reaches a minimum number of residents.

**Command Arguments:**

- **`<amount>`** - The minimum number of residents the town needs. This can be a number expression.
- **`(flags)`** - Optional flags
  - `--doNotCountPreviousResidents` - Only count residents added _after_ the objective unlocks.

**Example command:** `@optional-integration /qa edit questname objectives add TownyReachResidentCount 20`

</Admonition>
