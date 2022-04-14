---
title: 🪨 BetonQuest
sidebar_position: 1
description: This explains how the NotQuests BetonQuest integration works
keywords: [notquests, betonquest, integration]
---

You can use ANY conditions and actions of NotQuests in BetonQuest. At the same time, you can use any actions, conditions & objectives of BetonQuest in NotQuests. Only [BetonQuest 2.x and higher](https://betonquest.org/) is supported.

## ❤️ Using BetonQuest Events in NotQuests

Example: `/qa actions add actionname BetonQuestFireEvent default tag_wood_done`

or

Example: `/qa actions add actionname BetonQuestFireInlineEvent tag add wood_done`

## ❤️ Using BetonQuest Conditions in NotQuests

Example: `/qa conditions add conditionname BetonQuestCondition default wood_done equals true`

## ❤️ Using BetonQuest Objectives in NotQuests

Example: `/qa edit questname objectives add BetonQuestObjectiveStateChange default wood COMPLETED`

## 💛 NotQuests Actions you can use in BetonQuest Events

- **`nq_action <action type> <inline arguments specific to that NotQuests action>`** - Inline arguments will be documented later in their respective type pages.
  - Example 1: `nq_action Beam test world -15140 85 2234`
  - Example 2: `nq_action Beam test -15140;85;2234;world`
- **`nq_triggerobjective <trigger name>`**
- **`nq_startquest <quest name> (optional: -force -silent -notriggers)`**
- **`nq_failquest <quest name>`**
- **`nq_abortquest <quest name>`** - This just removes the quest from the player if it's active. Does not fail the quest
- **`nq_questpoints <set/add/remove> <amount> (optional: -silent)`**

## 💛 NotQuests Conditions you can use in BetonQuest Conditions

- **`nq_condition <condition type> <inline arguments specific to that NotQuests condition>`**
