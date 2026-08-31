---
title: ⭐ Variables
sidebar_position: 5
description: This lists all variables in NotQuests and explains how they work
keywords: [notquests, variables, quest variables]
---

import Admonition from '@theme/Admonition';

Variables are used internally to create both advanced actions and conditions at the same time- and that much quicker! A lot of the following variables can thus be used as conditions and, in many cases, as actions as well.
Not only that - they can also be used in so-called expressions. So you can even do calculations with these variables!

## Default variables

### ❓ ActiveQuests

<Admonition type="info" title="Description">

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

</Admonition>

### ❓ Advancement

<Admonition type="info" title="Description">

**Condition:** ✅ **Action:** ✅

**Type:** Boolean

</Admonition>

### ❓ Block

<Admonition type="info" title="Description">

**Condition:** ✅ **Action:** ✅

**Type:** String

</Admonition>

### ❓ Chance

<Admonition type="info" title="Description">

**Condition:** ✅ **Action:** ❌

**Type:** Boolean

</Admonition>

### ❓ Climbing

<Admonition type="info" title="Description">

**Condition:** ✅ **Action:** ❌

**Type:** Boolean

</Admonition>

### ❓ CompletedObjectiveIDsOfQuest

<Admonition type="info" title="Description">

**Condition:** ✅ **Action:** ✅

**Type:** String List

</Admonition>

### ❓ CompletedQuests

<Admonition type="info" title="Description">

**Condition:** ✅ **Action:** ✅

**Type:** String List

</Admonition>

### ❓ Condition

<Admonition type="info" title="Description">

**Condition:** ✅ **Action:** ❌

**Type:** Boolean

</Admonition>

### ❓ ContainerInventory

<Admonition type="info" title="Description">

**Condition:** ✅ **Action:** ✅

**Type:** ItemStack List

</Admonition>

### ❓ CurrentBiome

<Admonition type="info" title="Description">

**Condition:** ✅ **Action:** ❌

**Type:** String

</Admonition>

### ❓ CurrentPositionX

<Admonition type="info" title="Description">

**Condition:** ✅ **Action:** ✅

**Type:** Double

</Admonition>

### ❓ CurrentPositionY

<Admonition type="info" title="Description">

**Condition:** ✅ **Action:** ✅

**Type:** Double

</Admonition>

### ❓ CurrentPositionZ

<Admonition type="info" title="Description">

**Condition:** ✅ **Action:** ✅

**Type:** Double

</Admonition>

### ❓ CurrentWorld

<Admonition type="info" title="Description">

**Condition:** ✅ **Action:** ✅

**Type:** String

Reads the world the player is currently in. As an action, it teleports the player to that world's spawn.

</Admonition>

### ❓ DayOfWeek

<Admonition type="info" title="Description">

**Condition:** ✅ **Action:** ❌

**Type:** String

</Admonition>

### ❓ DistanceToLocation

<Admonition type="info" title="Description">

**Condition:** ✅ **Action:** ❌

**Type:** Double

Returns the player's distance in blocks from a fixed location. If the player is in a different world, the value is very large so “less than” checks will not pass by accident.

**Arguments:** `<world> <x> <y> <z>`

**Example condition:** `/qa conditions add nearShrine DistanceToLocation world 120 72 -45 lessThan 8`

</Admonition>

### ❓ EnderChest

<Admonition type="info" title="Description">

**Condition:** ✅ **Action:** ✅

**Type:** ItemStack List

</Admonition>

### ❓ Experience

<Admonition type="info" title="Description">

**Condition:** ✅ **Action:** ✅

**Type:** Integer

</Admonition>

### ❓ ExperienceLevel

<Admonition type="info" title="Description">

**Condition:** ✅ **Action:** ✅

**Type:** Integer

</Admonition>

### ❓ False

<Admonition type="info" title="Description">

**Condition:** ✅ **Action:** ❌

**Type:** Boolean

</Admonition>

### ❓ Flying

<Admonition type="info" title="Description">

**Condition:** ✅ **Action:** ✅

**Type:** Boolean

</Admonition>

### ❓ FlySpeed

<Admonition type="info" title="Description">

**Condition:** ✅ **Action:** ✅

**Type:** Float

</Admonition>

### ❓ FoodLevel

<Admonition type="info" title="Description">

**Condition:** ✅ **Action:** ✅

**Type:** Integer

Reads or changes the player's hunger bar value from `0` to `20`.

**Example condition:** `/qa conditions add isHungry FoodLevel lessThan 8`

**Example action:** `/qa actions add feedPlayer FoodLevel set 20`

</Admonition>

### ❓ GameMode

<Admonition type="info" title="Description">

**Condition:** ✅ **Action:** ✅

**Type:** String

</Admonition>

### ❓ Glowing

<Admonition type="info" title="Description">

**Condition:** ✅ **Action:** ✅

**Type:** Boolean

</Admonition>

### ❓ Health

<Admonition type="info" title="Description">

**Condition:** ✅ **Action:** ✅

**Type:** Double

</Admonition>

### ❓ InLava

<Admonition type="info" title="Description">

**Condition:** ✅ **Action:** ❌

**Type:** Boolean

</Admonition>

### ❓ InWater

<Admonition type="info" title="Description">

**Condition:** ✅ **Action:** ❌

**Type:** Boolean

</Admonition>

### ❓ Inventory

<Admonition type="info" title="Description">

**Condition:** ✅ **Action:** ✅

**Type:** ItemStack List

</Admonition>

### ❓ ItemInInventoryEnchantments

<Admonition type="info" title="Description">

**Condition:** ✅ **Action:** ❌

**Type:** String List

</Admonition>

### ❓ MaxHealth

<Admonition type="info" title="Description">

**Condition:** ✅ **Action:** ✅

**Type:** Double

</Admonition>

### ❓ Money

<Admonition type="info" title="Description">

**Condition:** ✅ **Action:** ✅

**Type:** Double

</Admonition>

### ❓ Name

<Admonition type="info" title="Description">

**Condition:** ✅ **Action:** ✅

**Type:** String

</Admonition>

### ❓ NearbyEntityCount

<Admonition type="info" title="Description">

**Condition:** ✅ **Action:** ❌

**Type:** Integer

Counts nearby entities around the player. The player themself is not counted.

**Arguments:** `<entityType> <radius>`

Use a mob type like `zombie`, `villager`, or `wolf`, or use `any` to count all nearby entities.

**Example condition:** `/qa conditions add crowded NearbyEntityCount any 10 moreOrEqualThan 5`

</Admonition>

### ❓ Op

<Admonition type="info" title="Description">

**Condition:** ✅ **Action:** ✅

**Type:** Boolean

</Admonition>

### ❓ Permission

<Admonition type="info" title="Description">

**Paper only. Condition:** ✅ **Action:** ✅ (setting requires LuckPerms)

**Type:** Boolean

</Admonition>

### ❓ Ping

<Admonition type="info" title="Description">

**Condition:** ✅ **Action:** ❌

**Type:** Integer

</Admonition>

### ❓ PlaytimeTicks

<Admonition type="info" title="Description">

**Condition:** ✅ **Action:** ✅

**Type:** Integer

</Admonition>

### ❓ PlaytimeMinutes

<Admonition type="info" title="Description">

**Condition:** ✅ **Action:** ✅

**Type:** Double

</Admonition>

### ❓ PlaytimeHours

<Admonition type="info" title="Description">

**Condition:** ✅ **Action:** ✅

**Type:** Double

</Admonition>

### ❓ QuestAbleToAccept

<Admonition type="info" title="Description">

**Condition:** ✅ **Action:** ❌

**Type:** Boolean

</Admonition>

### ❓ QuestOnCooldown

<Admonition type="info" title="Description">

**Condition:** ✅ **Action:** ❌

**Type:** Boolean

</Admonition>

### ❓ QuestPoints

<Admonition type="info" title="Description">

**Condition:** ✅ **Action:** ✅

**Type:** Long

</Admonition>

### ❓ QuestReachedMaxAccepts

<Admonition type="info" title="Description">

**Condition:** ✅ **Action:** ❌

**Type:** Boolean

</Admonition>

### ❓ QuestReachedMaxCompletions

<Admonition type="info" title="Description">

**Condition:** ✅ **Action:** ❌

**Type:** Boolean

</Admonition>

### ❓ QuestReachedMaxFails

<Admonition type="info" title="Description">

**Condition:** ✅ **Action:** ❌

**Type:** Boolean

</Admonition>

### ❓ RandomNumberBetweenRange

<Admonition type="info" title="Description">

**Condition:** ✅ **Action:** ❌

**Type:** Integer

</Admonition>

### ❓ ReflectionStaticBoolean

<Admonition type="info" title="Description">

**Condition:** ✅ **Action:** ✅

**Type:** Boolean

</Admonition>

### ❓ ReflectionStaticDouble

<Admonition type="info" title="Description">

**Condition:** ✅ **Action:** ✅

**Type:** Double

</Admonition>

### ❓ ReflectionStaticFloat

<Admonition type="info" title="Description">

**Condition:** ✅ **Action:** ✅

**Type:** Float

</Admonition>

### ❓ ReflectionStaticInteger

<Admonition type="info" title="Description">

**Condition:** ✅ **Action:** ✅

**Type:** Integer

</Admonition>

### ❓ ReflectionStaticString

<Admonition type="info" title="Description">

**Condition:** ✅ **Action:** ✅

**Type:** String

</Admonition>

### ❓ Sleeping

<Admonition type="info" title="Description">

**Condition:** ✅ **Action:** ❌

**Type:** Boolean

</Admonition>

### ❓ Saturation

<Admonition type="info" title="Description">

**Condition:** ✅ **Action:** ✅

**Type:** Float

Reads or changes the player's hidden saturation value. This is Minecraft's extra food buffer before the visible hunger bar starts dropping.

**Example condition:** `/qa conditions add lowSaturation Saturation lessThan 2`

**Example action:** `/qa actions add restoreSaturation Saturation set 10`

</Admonition>

### ❓ Sneaking

<Admonition type="info" title="Description">

**Condition:** ✅ **Action:** ✅

**Type:** Boolean

</Admonition>

### ❓ Sprinting

<Admonition type="info" title="Description">

**Condition:** ✅ **Action:** ✅

**Type:** Boolean

</Admonition>

### ❓ Swimming

<Admonition type="info" title="Description">

**Condition:** ✅ **Action:** ✅

**Type:** Boolean

</Admonition>

### ❓ True

<Admonition type="info" title="Description">

**Condition:** ✅ **Action:** ❌

**Type:** Boolean

</Admonition>

### ❓ WalkSpeed

<Admonition type="info" title="Description">

**Condition:** ✅ **Action:** ✅

**Type:** Float

</Admonition>

### ❓ Weather

<Admonition type="info" title="Description">

**Condition:** ✅ **Action:** ✅

**Type:** String

Reads or changes the weather in the player's current world. Possible values are `clear`, `rain`, and `thunder`.

**Example condition:** `/qa conditions add isStormy Weather equals thunder`

**Example action:** `/qa actions add makeItRain Weather set rain`

</Admonition>

### ❓ Statistic

<Admonition type="info" title="Description">

**Condition:** ✅ **Action:** ✅

**Type:** Number

**Required argument:** the Minecraft statistic id to read or change (for example `MOB_KILLS`, `JUMP`, or `DAMAGE_DEALT`). Tab completion shows the ids supported by the current platform.

**Example:** `/qa conditions add killedEnough Statistic MOB_KILLS moreOrEqualThan 100` - true once the player has 100+ mob kills.

</Admonition>

## Tag Variables

NotQuests has a powerful **tag system**: store a custom value on a player — a reputation score, a faction name, a `hasMetTheKing` flag — and then read or change it anywhere variables work (conditions, actions, objectives, even inside expressions).

First create a tag with `/qa tags create <Type> <name>` (types: `Integer`, `Double`, `Float`, `Boolean`, `String`). Then use the matching variable below. In commands the tag name is **positional** (`TagInteger reputation add 10`); inside an expression use the `TagInteger(TagName:reputation)` form instead.

For a full, practical walkthrough, see the [reputation system tutorial](/docs/tutorials/creating-a-reputation-system-with-tags).

### ❓ TagInteger

<Admonition type="info" title="Description">

**Condition:** ✅ **Action:** ✅

**Type:** Number (whole numbers)

**Required argument:** the tag name (create it with `/qa tags create Integer <name>`).

**Examples:**

- `/qa conditions add hasRep TagInteger reputation moreOrEqualThan 50` - true once the player's `reputation` tag is at least 50.
- `/qa actions add addRep TagInteger reputation add 10` - adds 10 to the `reputation` tag.

</Admonition>

### ❓ TagDouble

<Admonition type="info" title="Description">

**Condition:** ✅ **Action:** ✅

**Type:** Number (decimals)

**Required argument:** the tag name (create it with `/qa tags create Double <name>`).

</Admonition>

### ❓ TagFloat

<Admonition type="info" title="Description">

**Condition:** ✅ **Action:** ✅

**Type:** Number (decimals)

**Required argument:** the tag name (create it with `/qa tags create Float <name>`).

</Admonition>

### ❓ TagBoolean

<Admonition type="info" title="Description">

**Condition:** ✅ **Action:** ✅

**Type:** Boolean

**Required argument:** the tag name (create it with `/qa tags create Boolean <name>`).

</Admonition>

### ❓ TagString

<Admonition type="info" title="Description">

**Condition:** ✅ **Action:** ✅

**Type:** String

**Required argument:** the tag name (create it with `/qa tags create String <name>`).

</Admonition>

## [PlaceholderAPI](https://github.com/PlaceholderAPI/PlaceholderAPI/releases) Integration Variables

### ❓ PlaceholderAPINumber

<Admonition type="info" title="Description">

**Condition:** ✅ **Action:** ❌

**Type:** Double

</Admonition>

### ❓ PlaceholderAPIString

<Admonition type="info" title="Description">

**Condition:** ✅ **Action:** ❌

**Type:** String

</Admonition>

## [Towny](https://github.com/TownyAdvanced/Towny/releases) Integration Variables

### ❓ TownyNationName

<Admonition type="info" title="Description">

**Condition:** ✅ **Action:** ✅

**Type:** String

</Admonition>

### ❓ TownyNationTownCount

<Admonition type="info" title="Description">

**Condition:** ✅ **Action:** ❌

**Type:** Integer

</Admonition>

### ❓ TownyTownPlotCount

<Admonition type="info" title="Description">

**Condition:** ✅ **Action:** ❌

**Type:** Integer

</Admonition>

### ❓ TownyTownResidentCount

<Admonition type="info" title="Description">

**Condition:** ✅ **Action:** ❌

**Type:** Integer

</Admonition>

## [Floodgate](https://github.com/GeyserMC/Floodgate) Integration Variables

### ❓ FloodgateIsFloodgatePlayer

<Admonition type="info" title="Description">

**Condition:** ✅ **Action:** ❌

**Type:** Boolean

</Admonition>

## BetonQuest 3 Integration Variables

These variables are only available when BetonQuest 3.0.0 or newer is installed. BetonQuest 1.x and 2.x are not supported.

### ❓ BetonQuestCondition

<Admonition type="info" title="Description">

**Condition:** ✅ **Action:** ❌

**Type:** Boolean

Checks a condition from a BetonQuest package and returns `true` or `false` for the current player.

**Required arguments:**

- **`<package>`** - BetonQuest package containing the condition.
- **`<condition>`** - Condition name inside that BetonQuest package.

**Example command:** `@optional-integration /qa conditions add has_betonquest_permission BetonQuestCondition main permission_check equals true`

</Admonition>
