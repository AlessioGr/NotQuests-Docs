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

- **`<material>`** The material of the block which the player has to break. Use 'hand' to specify the item which you are currently holding in your hand. Use 'any' so any item counts. You can also specify items made in the NotQuests item system.
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

:::info Description

**Completed when:** Player kills a mobs.

**Command Arguments:**

- **`<entityType>`** - The type of mob which the player has to kill. Use 'any' so any mob counts. Use 'player' to kill a player. If you have MythicMobs or EcoBosses installed, you can also use mobs from those mods.
- **`<amount>`** - Amount of kills needed
- **`(flags)`** - Optional flags
  - `--nametag_containsany <what the nametag can contain>` - If you set this flag, it will check if the nametag of the mob contains any of the strings specified here
  - `--nametag_equals <what the nametag should be>` - If you set this flag, it will check if the nametag of the mob is equal to the nametag specified here
  - ProjectKorra integration:
    - `--withProjectKorraAbility <ability>` - This flag makes it so you need to kill the mob with a specific ProjectKorra ability.

**Example command:** `/qa edit questname objectives add KillMobs zombie 10`

:::

### 📕 OtherQuest

:::info Description

**Completed when:** Player completes another Quest

**Command Arguments:**

- **`<other quest name>`** - The name of the other Quest which the player needs to complete
- **`<amount>`** - The amount of times the player needs to complete the other Quest
- **`(flags)`** - Optional flags
  - `--countPreviouslyCompletedQuests` - If you set this flag, all previous Quest completions before the player unlocks this objective will count towards its progress as well. Otherwise, only new Quest completions will count.

**Example command:** `/qa edit questname objectives add OtherQuest otherQuestName 2 --countPreviouslyCompletedQuests`

:::

### 🪧 PlaceBlocks

:::info Description

**Completed when:** Player breaks a specific amount of blocks.

**Command Arguments:**

- **`<material>`** The material of the block which the player has to place. Use 'hand' to specify the item which you are currently holding in your hand. Use 'any' so any item counts. You can also specify items made in the NotQuests item system.
- **`<amount>`** - The amount of blocks the player needs to place
- **`(flags)`** - Optional flags
  - `--doNotDeductIfBlockIsBroken` - By default, if you break a block which is specified in the PlaceBlocks objective, it will be deducted from your progress. Otherwise, players would be able to simply cheat by breaking and then placing the block. Setting this flag will **disable** that safety mechanism.

**Example command:** `/qa edit questname objectives add PlaceBlocks acacia_planks 20`

:::

### 🛬 ReachLocation

:::info Description

**Completed when:** Player reaches a certain location

**Command Arguments:**

- **`<selection type>`** - Currently, the only selection type is *worldeditselection*. This takes your current worldedit selection as the location the player needs to reach. Thus, worldedit is currently required to create this objective. Please make a worldedit selection (via `//wand` or `//pos1` and `//pos2`) before running this command.
- **`<Location Name>`** - Name of the location the player has to reach. It will be displayed in the objective task description.

**Example command:** `/qa edit questname objectives add ReachLocation worldeditselection Luthers Church`

:::

### 🧑‍💻 RunCommand

:::info Description

**Completed when:** Player runs a certain command

**Command Arguments:**

- **`<amount>`** - Amount of times the player needs to run the command
- **`<Command>`** - Command which the player needs to run. Put it between "" if you need to use spaces. A / at the beginning is not required.
- **`(flags)`** - Optional flags
  - `--ignoreCase` - If you set this flag, it accepts every captitalization. Both /warp spawn and /wArP sPaWn will work
  - `--cancelCommand` - If you set this flag, the command isn't run while the objective is active. Instead, its execution is cancelled. Basically, nothing would happen if they run the command (apart from the progress of this objective increasing, of course)

**Example command:** `/qa edit questname objectives add RunCommand 2 "warp spawn" --ignoreCase`

:::

### 🔥 SmeltItems

:::info Description

**Completed when:** Player takes a smelted item out of a furnace. So yeah, they'll have to smelt it, and then take it out. The output item counts, not the item which you put in the furnace.

**Command Arguments:**

- **`<material>`** - The material of the block which the player has to get our of smelting. Use 'hand' to specify the item which you are currently holding in your hand. Use 'any' so any item counts. You can also specify items made in the NotQuests item system.
- **`<amount>`** - Amount of times the player has to get this item from smelting

**Example command:** `/qa edit questname objectives add SmeltItems coal 4`

:::

### 🧟 Sneak

:::info Description

**Completed when:** Player sneaks

**Command Arguments:**

- **`<amount>`** - Amount of times the player needs to sneak

**Example command:** `/qa edit questname objectives add Sneak 4`

:::

### 🗯️ TalkToNPC

:::info Description

**Completed when:** Player talks to (right-clicks) an NPC (Both Citizen NPCs and Armorstands work).

**Command Arguments:**

- **`<NPC ID or Armorstand>`** - Either enter the Citizens NPC ID, or 'armorstand' to receive an item with which you can easily attach this objective to an armorstand.

**Example command:** `/qa edit ooo objectives add TalkToNPC armorstand`

:::

### ❗ TriggerCommand

:::info Description

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

- **`<Trigger Name>`** - Name of the trigger. That name will have to be put into the trigger command (`/qa triggerObjective <Trigger Name>`)
- **`<amount>`** - Amount of time the trigger/command needs to be triggered/ran, for the objective to be completed

**Example command:** `/qa edit ooo objectives add TriggerCommand trigger1 1`

**Command to "trigger"/finish that objective:** `/qa triggerObjective trigger1 {PLAYER}` - {PLAYER} needs to be replaced with the players username.

:::

## [Citizens](https://ci.citizensnpcs.co/job/Citizens2/) Integration Objectives

### ℹ️ EscortNPC

:::info Description

**Completed when:** You escort an NPC to another NPC. When the objective is unlocked, the NPC you need to escort spawns at your location and starts following you. You will need to get close to the destination NPC and then right-click the destination NPC while the escort NPC is close to you.

**Command Arguments:**

- **`<NPC to escort>`** - ID of the Citizens NPC the player has to escort
- **`<Destination NPC>`** - ID of the destination Citizens NPC to whom the player has to escort the NPC to

**Example command:** `/qa edit ooo objectives add EscortNPC 1 2`

:::

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
