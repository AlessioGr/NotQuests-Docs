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

## [BetonQuest](https://dev.betonquest.org/) Integration Variables

### ❓ BetonQuestCondition

:::info Description

**Condition:** ✅ **Action:** ❌

**Type:** Boolean

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

## [Project Korra](https://github.com/ProjectKorra/ProjectKorra/releases) Integration Variables

### ❓ ProjectKorraElements

:::info Description

**Condition:** ✅ **Action:** ✅

**Type:** String List

:::

### ❓ ProjectKorraSubElements

:::info Description

**Condition:** ✅ **Action:** ✅

**Type:** String List

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

### ❓ TownyTownResidentCountVariable

:::info Description

**Condition:** ✅ **Action:** ❌

**Type:** Integer

:::

## [UltimateClans](https://www.spigotmc.org/resources/85615/) Integration Variables

### ❓ UltimateClansClanLevel

:::info Description

**Condition:** ✅ **Action:** ✅

**Type:** Integer

:::
