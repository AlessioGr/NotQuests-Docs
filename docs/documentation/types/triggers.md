---
title: 🎁 Triggers
sidebar_position: 4
description: This explains how Triggers work in NotQuests
keywords: [notquests, triggers, quest triggers]
---

A trigger lets a Quest *react to things that happen* while a player has it active. You bind a trigger to an **action**, and when the trigger fires, that action runs.

For example: add a `DEATH` trigger to a Quest, and the moment the player dies, the bound action runs — maybe failing the Quest, maybe spawning some mobs, maybe sending a cheeky taunt. Up to you.

## How triggers work

A trigger always runs a pre-defined **action**. You create actions with `/qa actions` (see the [Actions page](/docs/documentation/types/actions)) and can reuse the same action across many triggers and quests.

You add a trigger to a quest like this:

`/qa edit <questName> triggers add <actionName> <TYPE> (extra args) (flags)`

- **`<actionName>`** - the action to run when the trigger fires.
- **`<TYPE>`** - *when* it fires (see the list below).
- **`(extra args)`** - some types need an extra value, like a world name or a death count.
- **`(flags)`** - optional, and shared by every type:
  - `--applyOn <objectiveID>` - only fire while a specific objective is active. `0` (the default) means the whole quest — fire as long as the quest is active. `1` means only while objective 1 is active, and so on.
  - `--world_name <world>` - only fire in this world. Defaults to `ALL` (any world).

:::tip What `--applyOn` is good for
This is what makes triggers flexible. Say objective 2 is hidden until objective 1 is done. Set `--applyOn 2` and the trigger only watches once the player reaches objective 2. Leave it off (or `0`) and it watches for the whole quest. Pretty flexible, eh?
:::

## Trigger types

| Type | Fires when… | Extra args |
| --- | --- | --- |
| `BEGIN` | a quest begins, or an objective unlocks | – |
| `COMPLETE` | a quest or objective is completed | – |
| `FAIL` | a quest is failed | – |
| `DEATH` | the player dies | `<amount>` |
| `DISCONNECT` | the player logs off | `<amount>` |
| `WORLDENTER` | the player enters a world | `<world>` `<amount>` |
| `WORLDLEAVE` | the player leaves a world | `<world>` `<amount>` |
| `NPCDEATH` | a Citizens NPC dies | `<npcID>` `<amount>` |

For the counted types (`DEATH`, `DISCONNECT`, `WORLDENTER`, `WORLDLEAVE`, `NPCDEATH`), the `<amount>` is how many times it has to happen before the trigger fires. `1` means "fire on the first one".

***

## Practical example

Let's make a quest fail if the player dies while doing it.

First, create an action that fails the quest:

`/qa actions add failQuest FailQuest test`

Then bind it to a `DEATH` trigger on the quest `test`:

`/qa edit test triggers add failQuest DEATH 1`

Now, while a player has the `test` quest active, dying once runs the `failQuest` action — and the quest fails. Here, `failQuest` is the action name and `DEATH` is the trigger type.

Want it to only count deaths in the nether, and only once the player has reached objective 2?

`/qa edit test triggers add failQuest DEATH 1 --applyOn 2 --world_name world_nether`
