---
title: ⏰ Customization
sidebar_position: 3
description: This tutorial helps you create daily quests
keywords: [notquests, tutorial, daily, repeating, timed, guide]
---

Creating daily quests is something which gets asked a lot - depending on how *exactly* you want to do it, this is currently either very hard or very easy to do.

## Option 1: Accept or finish a quest no more than once a day

If by "daily" quest you mean that you want a player to be able to finish or accept specific quest no more than once a day, this is very easy to do! Simply set the accept cooldown of a quest to 1 day:

`/qa edit questName acceptCooldown complete set 1d`

## Option 2: Daily quest from a predefined quest pool

If you want to have multiple quests set, and every day, the player can pick and finish one of them, this is possible but a lot harder to do in notquests! There is currently a system in the works to make that work very easily - but it's currently not done.

Since notquests is built to be super powerful, it's possible now nonetheless - just in a more complex way. Here's how:

Say you have Quest A and B which should be in the daily pool (you can set it to be weekly or monthly as well for weekly or daily quests).
1. Give them a 1 day cooldown: /qa edit A acceptCooldown complete set 1d and /qa edit B acceptCooldown complete set 1d

2. Create two actions which give you the Quest when executed
/qa actions add giveQuestA GiveQuest A
/qa actions add giveQuestB GiveQuest B

3. Create an Action action which executes either Action giveQuestA or giveQuestB randomly:
/qa actions add giveDailyQuest Action giveQuestA,giveQuestB 1 --minRandom 1 --maxRandom 1
Without the --minRandom 1 --maxRandom 1 flags it would execute both actions and thus give you both Quests. With these flags however, it only chooses 1 random one out of those.

4. Add two conditions to this Action action so it executes only when neither A or B are on cooldown
/qa actions edit giveDailyQuest conditions add QuestOnCooldown A equals false
/qa actions edit giveDailyQuest conditions add QuestOnCooldown B equals false

5. Execute the action like this. Should do exactly what you want with the daily Quest pool
/qa actions edit giveDailyQuest execute

You can put this command anywhere - e.g. with the citizens plugin, you could make an npc run that command for a certain player