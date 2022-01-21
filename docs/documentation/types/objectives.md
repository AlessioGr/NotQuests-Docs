---
sidebar_position: 1
---

# 🗡️ Objectives

Objectives are tasks the player has to complete in order to finish the Quest. Some objectives are integrations with other plugins and are only available if you have that plugin installed.

First, we'll list the objectives which are always available:

## Default Objectives

### ⛏️ BreakBlocks

:::info Description

**Completed when:** Player breaks a specific amount of blocks.

**Command Arguments:**

- **`<material>`** The material of the block which the player has to break. Use 'hand' to specify the item which you are currently holding in your hand. You can also specify items made in the NotQuests item system.
- **`<amount>`** - The amount of blocks the player needs to break
- **`(flags)`** - Optional flags
  - `--doNotDeductIfBlockIsPlaced` - By default, if you place a block which is specified in the BreakBlocks objective, it will be deducted from your progress. Otherwise, players would be able to simply cheat by placing and then breaking the block. Setting this flag will **disable** that safety mechanism.

**Example command:** `/qa edit questname objectives add BreakBlocks grass_block 4`

:::

### ❣️ Breed

:::info Description

**Completed when:** Player breeds a specific mob

**Command Arguments:**

- **`<entityType>`** The mob type which the player needs to breed. Use 'any' if any mob type should count.
- **`<amount>`** - The amount of mobs the player needs to breed

**Example command:** `/qa edit questname objectives add BreedMobs cow 4`

:::

### 🚮 CollectItems

:::info Description

**Completed when:** Player collects a specific item by picking it up from the ground into his inventory.

**Command Arguments:**

- **`<material>`** The material of the block which the player has to break. Use 'hand' to specify the item which you are currently holding in your hand. Use 'any' so any item counts. You can also specify items made in the NotQuests item system.
- **`<amount>`** - The amount of items the player needs to collect
- **`(flags)`** - Optional flags
  - `--doNotDeductIfItemIsDropped` - By default, if you drop an item which is specified in the CollectItems objective, it will be deducted from your progress. Otherwise, players would be able to simply cheat by dropping and then picking up the item. Setting this flag will **disable** that safety mechanism.

**Example command:** `/qa edit questname objectives add CollectItems dirt 12`

:::

### ❓ Condition

:::info Description

**Completed when:** Player fulfills a certain condition (Created using `/qa conditions`). The plugin checks if the condition has been fulfilled every second or if the corresponding action to that condition has been executed (for example the *Money* action for the *Money* condition). This basically adds countless more objectives. For example, you can even use PlaceholderAPI Placeholders to create objectives.

**Command Arguments:**

- **`<condition name>`** This is the name of the condition it should check. Conditions can be created using `/qa conditions`.
- **`(flags)`** - Optional flags
  - `--checkOnlyWhenCorrespondingVariableValueChanged` - If you set this flag, the condition will only be checked if the corresponding action for the variable has been executed. (For example the Money action for the Money condition). The plugin will stop checking the condition periodically. Thus, this will also be more performant.

**Example command:** `/qa edit questname objectives add Condition myCondition`

:::

### 🥗 ConsumeItems

:::info Description

**Completed when:** Player consumes an item. Consuming usually means eating or drinking - for example an apple.

**Command Arguments:**

- **`<material>`** The material of the item which the player has to consume. Use 'hand' to specify the item which you are currently holding in your hand. Use 'any' so any item counts. You can also specify items made in the NotQuests item system.
- **`<amount>`** - The amount of items the player needs to consume

**Example command:** `/qa edit questname objectives add ConsumeItems apple 5`

:::

### ⚒️ Craft Items

:::info Description

**Completed when:** Player consumes an item. Consuming usually means eating or drinking - for example an apple.

**Command Arguments:**

- **`<material>`** The material of the item which the player has to craft. Use 'hand' to specify the item which you are currently holding in your hand. Use 'any' so any item counts. You can also specify items made in the NotQuests item system.
- **`<amount>`** - The amount of items the player needs to craft

**Example command:** `/qa edit questname objectives add CraftItems enchanting_table 1`

:::

### ⚒️ CraftItems

:::info Description

**Completed when:** Player consumes an item. Consuming usually means eating or drinking - for example an apple.

**Command Arguments:**

- **`<material>`** The material of the item which the player has to craft. Use 'hand' to specify the item which you are currently holding in your hand. Use 'any' so any item counts. You can also specify items made in the NotQuests item system.
- **`<amount>`** - The amount of items the player needs to craft

**Example command:** `/qa edit questname objectives add CraftItems enchanting_table 1`

:::

### 🚚 DeliverItems

:::info Description

**Completed when:** Player delivers an Item to an NPC (Both Citizen NPCs and Armorstands work). Delivering means that the item will be removed from the player's inventory.

**Command Arguments:**

- **`<material>`** The material of the item which the player has to deliver. Use 'hand' to specify the item which you are currently holding in your hand. Use 'any' so any item counts. You can also specify items made in the NotQuests item system.
- **`<amount>`** - The amount of items the player needs to deliver
- **`<NPC ID or Armorstand>`** - Either enter the Citizens NPC ID, or 'armorstand' to receive an item with which you can easily attach this objective to an armorstand.

**Example command:** `/qa edit questname objectives add DeliverItems coal 20 armorstand`

:::

### 👉 Interact

:::info Description

**Completed when:** Player interacts with a specific location by either left-clicking, right-clicking or both.

**Command Arguments:**

- **`<amount>`** - Amount of times the player needs to interact
- **`<world>`** - World name of the location with which the player has to interact
- **`<x>`** - X-coordinate location with which the player has to interact
- **`<y>`** - Y-coordinate of the location with which the player has to interact
- **`<z>`** - Z-coordinate of the location with which the player has to interact
- **`(flags)`** - Optional flags
  - `--leftClick` - If you set this flag, then interactions by left-clicking the location will count.
  - `--rightClick` - If you set this flag, then interactions by right-clicking the location will count.
  - `--cancelInteractions` - If you set this flag, then the interact event of the interaction will be cancelled. If, for example, the location is a chest and the player has to right-click the chest, the chest will open unless you set this flag. This also prevents breaking blocks.
  - `--taskDescription <task description>` - With this flag you can specify the description of what the player has to do. It will be displayed in the objective.
  - `--maxDistance <radius in blocks>` - This is the maximum radius in blocks around the specified location in which the interaction will count.

**Example command:** `/qa edit questname objectives add Interact 2 world 1453 71 -2451 --rightClick --maxDistance 2 --cancelInteraction --taskDescription "Find Trents fishing rod"`

:::

### 🤸 Jump

:::info Description

**Completed when:** Player jumps a certain amount of times

**Command Arguments:**

- **`<amount>`** - The amount of items the player has to jump

**Example command:** `/qa edit questname objectives add Jump 10`

:::

### 🩸 KillMobs

### 📕 OtherQuest

### 🪧 PlaceBlocks

### 🛬 ReachLocation

### 🧑‍💻 RunCommand

### 🔥 Smelt

### 🧟 Sneak

### 🗯️ TalkToNPC

### ❗ TriggerCommand

:::info Description

> Please note that TriggerCommand Objectives and Triggers are two entirely different things.

**TriggerCommand** is a type of objective which is **completed once a special command is run (usually from console)**.

This can be used to integrate NotQuests with many different plugins.

## Example use-case

An objective _“vote for us”_ which should be completed once the player votes. In your vote plugin, you could then add the trigger command to the vote reward.

Then, once that command is run from the console by the vote plugin (so once the player votes), the TriggerCommand Objective for that player is completed.

> This is also very useful if you want to make special quests integrated with the “Interactions” plugin. That plugin can be used if you want to make more detailed, scripted conversations with NPCs. Be warned: that plugin has a steep learning curve. Also note: Newer versions of NotQuests now have an integrated conversation system.

***

### Example on how to add a trigger command to fictional quest named “1”

![](https://i.imgur.com/MAioIq8.png)

For that, the trigger command would be `/qa triggerObjective playervoted NoeX` - NoeX being my username.

In our vote example, if you set that command as a vote reward (in your vote plugin) and the player votes, it would complete the objective.
![](https://i.imgur.com/NOUSIl0.png)

:::

## [Citizens](https://ci.citizensnpcs.co/job/Citizens2/) Integration Objectives

### ℹ️ EscortNPC

## [EliteMobs](https://magmaguy.com/downloads/elitemobs.html) Integration Objectives

### ℹ️ KillEliteMobs

## [Jobs Reborn](https://www.spigotmc.org/resources/4216/) Integration Objectives

### ℹ️ JobsRebornReachJobLevel

## [Project Korra](https://github.com/ProjectKorra/ProjectKorra/releases) Integration Objectives

### ℹ️ ProjectKorraUseAbility

## [Slimefun](https://github.com/Slimefun/Slimefun4/releases) Integration Objectives

### ℹ️ SlimefunResearch

## [Towny](https://github.com/TownyAdvanced/Towny/releases) Integration Objectives

### ℹ️ TownyNationReachTownCount

### ℹ️ TownyReachResidentCount
