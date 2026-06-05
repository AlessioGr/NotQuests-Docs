---
title: ⭐ Variables
sidebar_position: 5
description: This lists all variables in NotQuests and explains how they work
keywords: [notquests, variables, quest variables]
---

Variables are used internally to create both advanced actions and conditions at the same time- and that much quicker! A lot of the following variables can thus be used as conditions and, in many cases, as actions as well.
Not only that - they can also be used in so-called expressions. So you can even do calculations with these variables!

## Default variables

### ❓ ActiveQuests

:::info Description

**Condition:** ✅ **Action:** ✅

**Type:** String List

**Example conditions:**

- `/qa conditions add isWoodCutterQuestActive ActiveQuests contains woodCutter` - Condition is fulfilled if the player has the woodCutter quest active
- `/qa conditions add isOnlyWoodCutterQuestActive ActiveQuests equals woodCutter` - Condition is fulfilled if the player has ONLY the woodCutter quest active and no other quest
- `/qa conditions add hasAllWoodQuestsActive ActiveQuests contains woodCutter,saveTheWoods` - Condition is fulfilled if the player has BOTH the woodCutter and saveTheWoods quests active

**Example actions:**

- `/qa actions add giveQuestWoodCutter ActiveQuests add woodCutter` - This action force-gives the woodCutter quest to the player
- `/qa actions add setQuestWoodCutter ActiveQuests set woodCutter` - This action force-gives the woodCutter quest to the player and fails all other quests the player currently has
- `/qa actions add setQuestWoodCutter ActiveQuests set woodCutter` - This action force-gives the woodCutter quest to the player and fails all other quests the player currently has
- `/qa actions add giveForestQuests ActiveQuests add woodCutter,saveTheWoods` - This action force-gives both the woodCutter quest and the saveTheWoods quest to the player

:::

### ❓ Advancement

:::info Description

**Condition:** ✅ **Action:** ✅

**Type:** Boolean

:::

### ❓ Block

:::info Description

**Condition:** ✅ **Action:** ✅

**Type:** String

:::

### ❓ Chance

:::info Description

**Condition:** ✅ **Action:** ❌

**Type:** Boolean

:::

### ❓ Climbing

:::info Description

**Condition:** ✅ **Action:** ❌

**Type:** Boolean

:::

### ❓ CompletedObjectiveIDsOfQuest

:::info Description

**Condition:** ✅ **Action:** ✅

**Type:** String List

:::

### ❓ CompletedQuests

:::info Description

**Condition:** ✅ **Action:** ✅

**Type:** String List

:::

### ❓ Condition

:::info Description

**Condition:** ✅ **Action:** ❌

**Type:** Boolean

:::

### ❓ ContainerInventory

:::info Description

**Condition:** ✅ **Action:** ✅

**Type:** ItemStack List

:::

### ❓ CurrentBiome

:::info Description

**Condition:** ✅ **Action:** ❌

**Type:** String

:::

### ❓ CurrentPositionX

:::info Description

**Condition:** ✅ **Action:** ✅

**Type:** Double

:::

### ❓ CurrentPositionY

:::info Description

**Condition:** ✅ **Action:** ✅

**Type:** Double

:::

### ❓ CurrentPositionZ

:::info Description

**Condition:** ✅ **Action:** ✅

**Type:** Double

:::

### ❓ CurrentWorld

:::info Description

**Condition:** ✅ **Action:** ✅

**Type:** String

:::

### ❓ DayOfWeek

:::info Description

**Condition:** ✅ **Action:** ❌

**Type:** String

:::

### ❓ EnderChest

:::info Description

**Condition:** ✅ **Action:** ✅

**Type:** ItemStack List

:::

### ❓ Experience

:::info Description

**Condition:** ✅ **Action:** ✅

**Type:** Integer

:::

### ❓ ExperienceLevel

:::info Description

**Condition:** ✅ **Action:** ✅

**Type:** Integer

:::

### ❓ False

:::info Description

**Condition:** ✅ **Action:** ❌

**Type:** Boolean

:::

### ❓ Flying

:::info Description

**Condition:** ✅ **Action:** ✅

**Type:** Boolean

:::

### ❓ FlySpeed

:::info Description

**Condition:** ✅ **Action:** ✅

**Type:** Float

:::

### ❓ GameMode

:::info Description

**Condition:** ✅ **Action:** ✅

**Type:** String

:::

### ❓ Glowing

:::info Description

**Condition:** ✅ **Action:** ✅

**Type:** Boolean

:::

### ❓ Health

:::info Description

**Condition:** ✅ **Action:** ✅

**Type:** Double

:::

### ❓ InLava

:::info Description

**Condition:** ✅ **Action:** ❌

**Type:** Boolean

:::

### ❓ InWater

:::info Description

**Condition:** ✅ **Action:** ❌

**Type:** Boolean

:::

### ❓ Inventory

:::info Description

**Condition:** ✅ **Action:** ✅

**Type:** ItemStack List

:::

### ❓ ItemInInventoryEnchantments

:::info Description

**Condition:** ✅ **Action:** ❌

**Type:** String List

:::

### ❓ MaxHealth

:::info Description

**Condition:** ✅ **Action:** ✅

**Type:** Double

:::

### ❓ Money

:::info Description

**Condition:** ✅ **Action:** ✅

**Type:** Double

:::

### ❓ Name

:::info Description

**Condition:** ✅ **Action:** ✅

**Type:** String

:::

### ❓ Op

:::info Description

**Condition:** ✅ **Action:** ✅

**Type:** Boolean

:::

### ❓ Permission

:::info Description

**Condition:** ✅ **Action:** ✅ (only if LuckPerms is installed)

**Type:** Boolean

:::

### ❓ Ping

:::info Description

**Condition:** ✅ **Action:** ❌

**Type:** Integer

:::

### ❓ PlaytimeTicks

:::info Description

**Condition:** ✅ **Action:** ✅

**Type:** Integer

:::

### ❓ PlaytimeMinutes

:::info Description

**Condition:** ✅ **Action:** ✅

**Type:** Double

:::

### ❓ PlaytimeHours

:::info Description

**Condition:** ✅ **Action:** ✅

**Type:** Double

:::

### ❓ QuestAbleToAccept

:::info Description

**Condition:** ✅ **Action:** ❌

**Type:** Boolean

:::

### ❓ QuestOnCooldown

:::info Description

**Condition:** ✅ **Action:** ❌

**Type:** Boolean

:::

### ❓ QuestPoints

:::info Description

**Condition:** ✅ **Action:** ✅

**Type:** Long

:::

### ❓ QuestReachedMaxAccepts

:::info Description

**Condition:** ✅ **Action:** ❌

**Type:** Boolean

:::

### ❓ QuestReachedMaxCompletions

:::info Description

**Condition:** ✅ **Action:** ❌

**Type:** Boolean

:::

### ❓ QuestReachedMaxFails

:::info Description

**Condition:** ✅ **Action:** ❌

**Type:** Boolean

:::

### ❓ RandomNumberBetweenRange

:::info Description

**Condition:** ✅ **Action:** ❌

**Type:** Integer

:::

### ❓ ReflectionStaticBoolean

:::info Description

**Condition:** ✅ **Action:** ✅

**Type:** Boolean

:::

### ❓ ReflectionStaticDouble

:::info Description

**Condition:** ✅ **Action:** ✅

**Type:** Double

:::

### ❓ ReflectionStaticFloat

:::info Description

**Condition:** ✅ **Action:** ✅

**Type:** Float

:::

### ❓ ReflectionStaticInteger

:::info Description

**Condition:** ✅ **Action:** ✅

**Type:** Integer

:::

### ❓ ReflectionStaticString

:::info Description

**Condition:** ✅ **Action:** ✅

**Type:** String

:::

### ❓ Sleeping

:::info Description

**Condition:** ✅ **Action:** ❌

**Type:** Boolean

:::

### ❓ Sneaking

:::info Description

**Condition:** ✅ **Action:** ✅

**Type:** Boolean

:::

### ❓ Sprinting

:::info Description

**Condition:** ✅ **Action:** ✅

**Type:** Boolean

:::

### ❓ Swimming

:::info Description

**Condition:** ✅ **Action:** ✅

**Type:** Boolean

:::

### ❓ True

:::info Description

**Condition:** ✅ **Action:** ❌

**Type:** Boolean

:::

### ❓ WalkSpeed

:::info Description

**Condition:** ✅ **Action:** ✅

**Type:** Float

:::

### ❓ Statistic

:::info Description

**Condition:** ✅ **Action:** ✅

**Type:** Number

**Required argument:** the [Bukkit statistic](https://jd.papermc.io/paper/1.21/org/bukkit/Statistic.html) to read or change (e.g. `MOB_KILLS`, `JUMP`, `DAMAGE_DEALT`).

**Example:** `/qa conditions add killedEnough Statistic MOB_KILLS moreOrEqualThan 100` - true once the player has 100+ mob kills.

:::

## Tag Variables

NotQuests has a powerful **tag system**: store a custom value on a player — a reputation score, a faction name, a `hasMetTheKing` flag — and then read or change it anywhere variables work (conditions, actions, objectives, even inside expressions).

First create a tag with `/qa tags create <Type> <name>` (types: `Integer`, `Double`, `Float`, `Boolean`, `String`). Then use the matching variable below. In commands the tag name is **positional** (`TagInteger reputation add 10`); inside an expression use the `TagInteger(TagName:reputation)` form instead.

For a full, practical walkthrough, see the [reputation system tutorial](/docs/tutorials/creating-a-reputation-system-with-tags).

### ❓ TagInteger

:::info Description

**Condition:** ✅ **Action:** ✅

**Type:** Number (whole numbers)

**Required argument:** the tag name (create it with `/qa tags create Integer <name>`).

**Examples:**

- `/qa conditions add hasRep TagInteger reputation moreOrEqualThan 50` - true once the player's `reputation` tag is at least 50.
- `/qa actions add addRep TagInteger reputation add 10` - adds 10 to the `reputation` tag.

:::

### ❓ TagDouble

:::info Description

**Condition:** ✅ **Action:** ✅

**Type:** Number (decimals)

**Required argument:** the tag name (create it with `/qa tags create Double <name>`).

:::

### ❓ TagFloat

:::info Description

**Condition:** ✅ **Action:** ✅

**Type:** Number (decimals)

**Required argument:** the tag name (create it with `/qa tags create Float <name>`).

:::

### ❓ TagBoolean

:::info Description

**Condition:** ✅ **Action:** ✅

**Type:** Boolean

**Required argument:** the tag name (create it with `/qa tags create Boolean <name>`).

:::

### ❓ TagString

:::info Description

**Condition:** ✅ **Action:** ✅

**Type:** String

**Required argument:** the tag name (create it with `/qa tags create String <name>`).

:::

## [PlaceholderAPI](https://github.com/PlaceholderAPI/PlaceholderAPI/releases) Integration Variables

### ❓ PlaceholderAPINumber

:::info Description

**Condition:** ✅ **Action:** ❌

**Type:** Double

:::

### ❓ PlaceholderAPIString

:::info Description

**Condition:** ✅ **Action:** ❌

**Type:** String

:::

## [Towny](https://github.com/TownyAdvanced/Towny/releases) Integration Variables

### ❓ TownyNationName

:::info Description

**Condition:** ✅ **Action:** ✅

**Type:** String

:::

### ❓ TownyNationTownCount

:::info Description

**Condition:** ✅ **Action:** ❌

**Type:** Integer

:::

### ❓ TownyTownPlotCount

:::info Description

**Condition:** ✅ **Action:** ❌

**Type:** Integer

:::

### ❓ TownyTownResidentCount

:::info Description

**Condition:** ✅ **Action:** ❌

**Type:** Integer

:::

## [Floodgate](https://github.com/GeyserMC/Floodgate) Integration Variables

### ❓ FloodgateIsFloodgatePlayer

:::info Description

**Condition:** ✅ **Action:** ❌

**Type:** Boolean

:::
