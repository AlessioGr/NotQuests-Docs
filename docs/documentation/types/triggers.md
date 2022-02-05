---
sidebar_position: 4
title: NotQuests Triggers Overview
description: This explains how Triggers work in NotQuests
keywords: [notquests, triggers, quest triggers]
---

# 🎁 Triggers

A trigger can be attached to a quest. A trigger is basically an action (usually a console command) which gets activated when something happens.

For example, if you create a `DEATH` trigger in that Quest, it gets activated once the player dies.

## What happens if the trigger activates?

Well, if the trigger is activated (so, if in the above example, the player dies), an `Action` will be executed. An Action is just a Console Command which you can create using the `/qa actions` command.

## More advanced options for triggers

A trigger also has more advanced options. Not only can you set it that it should "trigger" when the player dies (via the `DEATH` trigger). You can also set it to trigger when the player dies ONLY while, let's say, objective 3 is unlocked. Or, only if the player dies in a specific world.

## Actions

Actions can be created and re-used outside of Quests. So basically, you create them with the `/qa actions` command and can re-use them for multiple triggers.

Currently, the only type of actions is a console command. More will be added in the future.

***

## Practical Example

Let's create an action which fails the quest:
`/qa actions add failQuest qa failQuest {PLAYER} {QUEST}`

{PLAYER} and {QUEST} are internal placeholders. You can view all internal placeholders using `/qa listPlaceholders`.

So, `failQuest qa failQuest {PLAYER} {QUEST}` would be the entire command which is executed in the console.

Then let's create a trigger in the fictional Quest `test` and bind it to our action:
`/qa edit test triggers add failQuest DEATH Quest ALL 1`

Basically, what happens now, is that when you have the Quest active, and you die, the Quest will fail for you.
`failQuest` here is the name of the action. `DEATH` is the `TriggerType`.

### Detailed explanation of the trigger add command in this example

The next argument, "Quest" is when that trigger should apply. With "Quest", it's enough to have the quest active for the trigger to activate. If I were to set this to "O1" instead of "Quest", it would only trigger if the Objective Number 1 is currently active. In our case, it does not matter, since Objective 1 is always active.

But in a Quest with 2 Objectives you could set it so Objective 2 depends on Objective 1. That way, objective 2 would be hidden until objective 1 is completed. If, in that Quest, you were to set this trigger to "O2", it will not trigger until you have reached objective 2 (by finishing objective 1 first). Pretty flexible, eh?

The next argument, "ALL" is the world it should apply to. If I set that to "world_nether" I would need to die in the nether for the trigger to activate.
The last argument is simply the amount of deaths until it activates.
