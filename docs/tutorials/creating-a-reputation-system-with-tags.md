---
title: 👩‍❤️‍👨 Reputation system with tags
sidebar_position: 2
description: This tutorial helps you create a reputation system using our powerful tag system.
keywords: [notquests, tutorial, tags, tag, reputation, guide]
---

Say you have multiple NPCs with multiple quests attached to them. Now, let's create a reputation system for those NPCs!

## The idea

As you complete quests, your reputation for that NPC increases - and not just that! Your reputation for the NPCs "house" will also increase. As you gain reputation, you will unlock more quests and better rewards for quests from that house. NPCs from that house will also let you in their homes and give you access to other secret locations.

## How to do that

Basically, we will use NotQuests powerful tag system for that, together with a smart combination of actions, conditions and the conversation system.

## The tag system 

NotQuests tag system allows you to save data per-player. That's it. Sounds simple, but it's super powerful. You can save integers (= numbers), floats/doubles (= numbers with decimal places), strings (= text) and booleans (= true or false) for each player.

With actions, we can modify the tags and with conditions, we can check the tags (& even do math with them or compare them to other variables and tags).

## Creating our first tags

![Our three NPCs](/img/reputation-system/npcs.png)

We have three NPCs: Jon Snow (ID=0), Arya Stark (ID=1) and Cersei Lannister (ID=2). Jon Snow and Arya Stark belong to House Stark. Cerse Lannister belongs to House Lannister.

First let's create a tag called JonSnowReputation. This tag will store the reputation the player has with Jon Snow. It will be an Integer Tag, as we only need full numbers:

`/qa tags create Integer JonSnowReputation`

Let's do the same for the other NPCs and houses

`/qa tags create Integer AryaStarkReputation`

`/qa tags create Integer CerseiLannisterReputation`

`/qa tags create Integer HouseStarkReputation`

`/qa tags create Integer HouseLannisterReputation`

![The tags are created](/img/reputation-system/tagscreated.png)

Well done!

## Creating actions to modify our reputation tags

Now, let's create some actions which increased the houses reputation by 10 and some which will deduct the reputation by 1 (more info on that later):

`/qa actions add HouseStarkReputationAdd10 TagInteger housestarkreputation add 10`

`/qa actions add HouseStarkReputationDeduct1 TagInteger housestarkreputation deduct 1`

`/qa actions add HouseLannisterReputationAdd10 TagInteger houselannisterreputation add 10`

`/qa actions add HouseLannisterReputationDeduct1 TagInteger houselannisterreputation deduct 1`


Now let's create the actual actions which will be run when a player completes a quest for a house. For completing a quest for House Stark, the player should get +10 reputation for house stark and -1 reputation for House Lannister (as they don't like seeing you support their rivals):

`/qa actions add HouseStarkQuestCompleted Action HouseStarkReputationAdd10,HouseLannisterReputationDeduct1 1`

With this 'Action' action, we can create one action which executes two other actions at the same time. Let's do the same for House Lannister:

`/qa actions add HouseLannisterQuestCompleted Action HouseLannisterReputationAdd10,HouseStarkReputationDeduct1 1`

### Actual actions which will be added to the NPCs: More action nesting

But we also want the NPCs individual reputation to increase if you complete a quest for them, don't we? Let's create the final actions for that. First the actions for the reputation:

`/qa actions add JonSnowReputationAdd5 TagInteger jonsnowreputation add 5`

`/qa actions add AryaStarkReputationAdd5 TagInteger aryastarkreputation add 5`

`/qa actions add CerseiLannisterReputationAdd5 TagInteger cerseilannisterreputation add 5`

And now the actual final actions:

`/qa actions add JonSnowQuestCompleted Action HouseStarkQuestCompleted,JonSnowReputationAdd5 1`

`/qa actions add AryaStarkQuestCompleted Action HouseStarkQuestCompleted,AryaStarkReputationAdd5 1`

`/qa actions add CerseiLannisterQuestCompleted Action HouseLannisterQuestCompleted,CerseiLannisterReputationAdd5 1`

## Adding the actions to our quests

Awesome! Now we just need to add these last two actions as a reward to the respective quests. We have already created the quests `HelpJonSnow`, `HelpAryaStark` and `HelpCerseiLannister` for that (you should know how to create quests at this point. If not, please read the [beginner tutorial](getting-started.md) first.).

`/qa edit HelpJonSnow rewards add Action JonSnowQuestCompleted 1`

`/qa edit HelpAryaStark rewards add Action AryaStarkQuestCompleted 1`

`/qa edit HelpCerseiLannister rewards add Action CerseiLannisterQuestCompleted 1`

Voilà, we're done! Try completing those quests and check how your reputation changes:

## Checking your reputation (tags)

Here is an example of house you can check your reputation for house stark:

`/qa variables check TagInteger housestarkreputation`

## Let's add some privileges & rewards for our reputation system: Conditions

To be continued... I'll write this part up when I have time. Feel free to contribute to this tutorial (or any other tutorials) here: [Contribute to the docs](https://github.com/AlessioGr/NotQuests-Docs/blob/main/docs/tutorials/creating-a-reputation-system-with-tags.md).

