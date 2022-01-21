---
sidebar_position: 1
---

# 🗡️ Objectives

Objectives are tasks the player has to complete in order to finish the Quest. Some objectives are integrations with other plugins and are only available if you have that plugin installed.

First, we'll list the objectives which are always available:

## Default Objectives

### ⛏️ BreakBlocks

**Completed when:** Player breaks a specific amount of blocks.

**Command Arguments:**

- `<material>` The material of the block which the player has to break. Use 'hand' to specify the item which you are currently holding in your hand. You can also specify items made in the NotQuests item system.
- `<amount>` - The amount of blocks the player needs to break
- `(flags)` - Optional flags
  - **--doNotDeductIfBlockIsPlaced** - By default, if you place a block which is specified in the BreakBlocks objective, it will be deducted from your progress. Otherwise, players would be able to simply cheat by placing and then breaking the block. Setting this flag will **disable** that safety mechanism.

**Example command:** `/qa edit questname objectives add BreakBlocks grass_block 4`

### ❣️ Breed

**Completed when:** Player breeds a specific mob

**Command Arguments:**

- `<entityType>` The mob type which the player needs to breed. Use 'any' if any mob type should count.
- `<amount>` - The amount of mobs the player needs to breed

**Example command:** `/qa edit questname objectives add BreedMobs cow 4`

### 🚮 CollectItems

**Completed when:** Player collects a specific item by picking it up from the ground into his inventory.

**Command Arguments:**

- `<material>` The material of the block which the player has to break. Use 'hand' to specify the item which you are currently holding in your hand. Use 'any' so any item counts. You can also specify items made in the NotQuests item system.
- `<amount>` - The amount of items the player needs to collect
- `(flags)` - Optional flags
  - **--doNotDeductIfItemIsDropped** - By default, if you drop an item which is specified in the CollectItems objective, it will be deducted from your progress. Otherwise, players would be able to simply cheat by dropping and then picking up the item. Setting this flag will **disable** that safety mechanism.

**Example command:** `/qa edit questname objectives add CollectItems dirt 12`

### ❓ Condition

**Completed when:** Player fulfills a certain condition (Created using `/qa conditions`). The plugin checks if the condition has been fulfilled every second or if the corresponding action to that condition has been executed (for example the *Money* action for the *Money* condition). This basically adds countless more objectives. For example, you can even use PlaceholderAPI Placeholders to create objectives.

**Command Arguments:**

- `<condition name>` This is the name of the condition it should check. Conditions can be created using `/qa conditions`.
- `(flags)` - Optional flags
  - **--checkOnlyWhenCorrespondingVariableValueChanged** - If you set this flag, the condition will only be checked if the corresponding action for the variable has been executed. (For example the Money action for the Money condition). The plugin will stop checking the condition periodically. Thus, this will also be more performant.

**Example command:** `/qa edit questname objectives add Condition myCondition`

### 🥗 ConsumeItems

**Completed when:** Player consumes an item. Consuming usually means eating or drinking - for example an apple.

**Command Arguments:**

- `<material>` The material of the item which the player has to consume. Use 'hand' to specify the item which you are currently holding in your hand. Use 'any' so any item counts. You can also specify items made in the NotQuests item system.
- `<amount>` - The amount of items the player needs to consume

**Example command:** `/qa edit questname objectives add ConsumeItems apple 5`

### ⚒️ CraftItems

**Completed when:** Player consumes an item. Consuming usually means eating or drinking - for example an apple.

**Command Arguments:**

- `<material>` The material of the item which the player has to craft. Use 'hand' to specify the item which you are currently holding in your hand. Use 'any' so any item counts. You can also specify items made in the NotQuests item system.
- `<amount>` - The amount of items the player needs to craft

**Example command:** `/qa edit questname objectives add CraftItems enchanting_table 1`

### 🚚 DeliverItems

### 👉 Interact

### 🤸 Jump

### 🩸 KillMobs

### 📕 OtherQuest

### 🪧 PlaceBlocks

### 🛬 ReachLocation

### 🧑‍💻 RunCommand

### 🔥 Smelt

### 🧟 Sneak

### 🗯️ TalkToNPC

### ❗ TriggerCommand

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
