---
title: 👋 Getting Started
sidebar_position: 1
description: This tutorial helps you get started with NotQuests from zero to hero - with an easy-to-follow, practical example
keywords: [notquests, tutorial, getting started, beginner, guide]
---

:::danger Before you read

This guide was designed with version **5.5.0 or higher** and **[Paper 1.19.2](https://papermc.io/)** in mind.

Older versions or Spigot servers, will have less features and different commands.
If you're using an older version or Spigot, please do your own research as the commands will be different.

:::

Let's discover **NotQuests!** There's two ways to get started:

- Either you keep on reading this guide
- Or watch our [Video Tutorial](https://www.youtube.com/watch?v=OC45_H3Tv8Y). Note that the video tutorial was made with NotQuests v3 and some commands might be slightly different.

## The Structure

A Quest in NotQuests can have different properties. Examples:

- **displayName**: the Quest name which players will actually see
- **description**: the Quest description
- **maxAccepts**: the maximum amount of times a player can complete the Quest
- *and much more...*

Additionally, we can attach the following to a Quest:

- **Objectives**: An objective is basically "something the player needs to do". Once all objectives the Quest has are completed, the Quest itself is completed.
- **Requirements**: These determine if the player can accept the Quest. If the player does not fulfill all requirements, they can not start the Quest. Internally, they are called *conditions*.
- **Rewards**: Should be self-explanatory! Rewards are actions which will be "executed" once the Player completes the Quest.
- **Triggers**: Triggers are a bit more complicated to understand. Basically, they "execute" an action once *something happens*.

## The Commands

There are two types of commands:

- `/q` or `/notquests` for **Player commands**. All players will have access to this command.
- `/qa` or `/notquestsadmin` for **Admin commands**. We're gonna use this to make and edit our Quests!

In NotQuests, we create all our Quests with commands. No need to edit complicated configuration files!

### Command Completions

Each thing you write, separated by a space, is called an *argument*. In the following pictures, *edit*, and *questname* are the two arguments:

![Command Completions](/img/getting-started/command-completions.png)

If you press space after the last argument, our intelligent command system will show you what argument comes "next". If you're stuck with a command, just make sure the last character is a space and **read the command completions**!

:::tip Still stuck?

If the command completions aren't enough and you still don't know how a command works, just **press enter** and run the command! It will show you a **help menu**. Just read it, and it will tell you what arguments it needs and what they do.

:::

## Creating our first Quest

I think the best and easiest way to learn, is to learn-by-doing! So let's not waste time on boring documentations and create our first Quest:

`/qa create TheVirus`

It should then show you the following message:

![Quest successfully created](/img/getting-started/quest-successfully-created.png)

### 1. Quest Description & Display Name

Now, the initial Quest Name cannot have any spaces. It's just an identifier for the Quest. However, we can give it a display name which can have spaces - and that's the name the player will actually see!

`/qa edit TheVirus displayName set A Deadly Virus`

Next, we want to add a description to the Quest, which will be displayed in multiple places, for example if the player tries to preview or take the Quest:

`/qa edit TheVirus description set A deadly virus has infected the people of Winterfell. You have to murder the infected villagers to prevent the virus from spreading further.`

Now, your players will see a beautiful description and display name after accepting the Quest:

![After they accepted the Quest](/img/getting-started/after-accepting-with-description.png)

### 2. Requirements

Without any requirements, every single player will be able to accept your Quest. However, that Quest we're gonna make will be quite tricky! Let's require the player to have at least 10 Quest Points until they can accept the Quest:

`/qa edit TheVirus requirements add QuestPoints moreOrEqualThan 10`

Quest Points can be earned by completing Quests, or they can be given out manually.

This is what Players will now see if they try to accept the Quest but don't fulfill the requirements.

![After they accepted the Quest](/img/getting-started/requirements-not-fulfilled.png)

In order for us to be able to test our own Quest, give yourself 10 Quest Points:

`/qa questpoints putyourminecraftnamehere add 10`

### 3. Objectives

Objectives are the heart of every Quest. Let's add our first one!

First, the player has to free up the road from all the shit the infected Zombies made:

`/qa edit TheVirus objectives add BreakBlocks dirt 64`

This objective will be completed once the player breaks 64 dirt 👍 If you want to, you can specify multiple materials there. For example, if both dirt or stone is fine for the player to break, just enter `dirt,stone` there.

Now, let's add a description for that objective:

`/qa edit TheVirus objectives edit 1 description set The infected Zombies shat on the street. Clean it up by breaking 64 dirt blocks!`

And a name:

`/qa edit TheVirus objectives edit 1 displayName set Stinky Street`

Let's accept our Quest by using `/q take TheVirus`:

![After they accepted the Quest with first Objective](/img/getting-started/after-accepting-with-first-objective.png)

That was easy, wasn't it?

#### Second Objective

Onto our next objective! The street is clear! The player should now kill all the infected villagers:

`/qa edit TheVirus objectives add KillMobs zombie_villager 15`

After 15 kills of Zombie Villagers, that objective will be completed! Now let's add an objective description and name:

`/qa edit TheVirus objectives edit 2 description set You can see the infected villagers in front of you! Murder them all to stop the virus from spreading!`

`/qa edit TheVirus objectives edit 2 displayName set Zombies ahead!`

#### Objective Dependencies

Now, after accepting this Quest, you will see this:

![After they accepted the Quest with second Objective](/img/getting-started/after-accepting-with-second-objective.png)

As you see, both objectives are visible. You can also complete them in no particular order.

However, we want the second Objective, "Zombies ahead!" to only be visible and complete-able after the first Objective is completed.

To accomplish that, we need to add a condition to the second objective which makes it so the player needs to complete objective 1 first. There's two ways to achieve this in NotQuests (choose just one):

- **Easy way**: `/qa edit TheVirus objectives predefinedProgressOrder set firstToLast`. This also automatically sets the correct, same order for any future objectives you may add to this quest.
- **Harder way**: `/qa edit TheVirus objectives edit 2 conditions unlock add CompletedObjective 1`. You'd need to set this for every single objective of that quest. However, this way may give you more flexibility.

Done! If we take the Quest now, the second objective is hidden:

![After they accepted the Quest with second Objective which has a dependency](/img/getting-started/after-accepting-with-second-objective-and-dependency.png)

It will be unlocked once you complete the first objective 😀

### 4. Triggers

With Triggers, we can add some action to the Quest!

When the user reaches the second objective and has to kill the Zombie Villagers, he will notice one thing: **There are no Zombie Villagers to kill**. Why would they?

Let's make NotQuests **spawn some Zombie Villagers for him once he reaches the second objective**.

First, we need to create the action which spawns the zombie villagers. Actions can be created outside of Quests and re-used for every quest. Let's make a SpawnMob Action:

`/qa actions add Spawn15ZombieVillagers SpawnMob zombie_villager 15 PlayerLocation`

This action spawns 15 zombie villagers at the location wherever the player taking this Quest currently is 😄

Now, let's add the **trigger with this action** to our Quest:

`/qa edit TheVirus triggers add Spawn15ZombieVillagers BEGIN --applyon O2 --world_name ALL`

This runs the action "*Spawn15ZombieVillagers*" once we BEGIN O2 (objective 2) in ALL worlds (not limited to any world). Feel free to test it out — it will work 👍

![When you complete the first objective, zombie villagers will spawn](/img/getting-started/trigger-after-completing-first-objective.png)

### 5. Rewards

Your players will murder you if they waste their time on this super hard Quest without receiving any rewards. So let's add some:

- +2 Quest Points: `/qa edit TheVirus rewards add QuestPoints add 2`
- 2 Swords: `/qa edit TheVirus rewards add GiveItem hand 2`
  - For this reward, you have to hold the item in your hand while running that command. Otherwise, you can also run `/qa edit TheVirus rewards add GiveItem wooden_sword 2`
- +300 Money (if you have Vault installed): `/qa edit TheVirus rewards add Money add 300`

#### Reward Display Names

Once you complete the Quest, you will receive the rewards, but the player won't notice. That's because rewards are hidden (can be changed in the config) by default **unless you give them a display name**! So let's do that:

1. `/qa edit TheVirus rewards edit 1 displayName set +2 Quest Points`
2. `/qa edit TheVirus rewards edit 2 displayName set +2 handcrafted Wooden Swords`
3. `/qa edit TheVirus rewards edit 3 displayName set +300 Coins`

Done! Once you finish the Quest, you will see the rewards:

![Rewards are shown after you complete the Quest](/img/getting-started/quest-completed-rewards.png)

### 6. More Quest Settings

We don't want the player to take this Quest over and over and over and over again after they completed it. Let's limit that.

First, let's make it, so they can only accept it once every 20 hours:

`/qa edit TheVirus acceptCooldown set 20h`

20h = 20 hours. Now, let's give it a hard limit of 10 Quest completions. After 10 completions, the player cannot accept the Quest anymore, no matter how long they wait:

`/qa edit TheVirus maxAccepts 10`

At last, let's set takeEnabled to false:

`/qa edit TheVirus takeEnabled false`

This will make it, so the player cannot take the Quest using the `/q take TheVirus` command. Instead, they have to take it by either right-clicking a Quest Giver NPC or a Quest Giver armor stand. More regarding that in the next section:

### 7. Taking the Quest

Use `/q take TheVirus` to take the Quest! You can also bind it to either Citizens NPCs or Armor stands using `/qa edit TheVirus npcs add [NPC ID]` or `/qa edit TheVirus armorstands add`.

Files for the finished TheVirus Quest (if you want them for some reason. They are not needed):

- [quests.yml](https://github.com/AlessioGr/NotQuests/blob/main/Demo%20Quests/Deadly%20Virus/quests.yml)
- [actions.yml](https://github.com/AlessioGr/NotQuests/blob/main/Demo%20Quests/Deadly%20Virus/actions.yml)

The quest is saved in the `plugins/NotQuests/default/quests.yml` and `plugins/NotQuests/default/actions.yml` files.

## Advanced concepts

### Color codes

Colors are supported basically everywhere in notquests - but not the legacy ones you used to know. Stuff like &6 or &c won't bring you far - it has long been abandoned by Mojang & kept alive by Spigot - as NotQuests thrives to be as modern and innovating as possible, it abandoned those too.

Instead, we are now using MiniMessage, which allows you to do even more advanced stuff easier, like RGB colors, gradients, and even click commands & hover messages! You can find the MiniMessage docs [here](https://docs.adventure.kyori.net/minimessage/).

Let's start by giving our quest a colorful display name:

`/qa edit TheVirus displayName set <red>A <bold>Deadly</bold> <#eb34a1>Virus`

![Cool display name](/img/getting-started/displayname-1.png)

Or even:

`/qa edit TheVirus displayName set <rainbow>A <bold>Deadly</bold></rainbow> <gradient:#eb34a1:#ffffff>Virus</gradient>`

![Another display name](/img/getting-started/displayname-2.png)

Pretty cool, right? You even have auto-completions for all MiniMessage color tags for many commands. At the same time, NotQuests has added some internal colors which you can use to achieve a consistent look. For example `<highlight>`, `<highlight2>` or `<main>`. Those can be customize inside of the config, to change NotQuests entire color scheme.

### Categories

You can group Quests together in categories. Categories are just a way to organize your Quests. Let's create a category called "Virus Quests":

`/qa categories create VirusQuests`

Now let's move our quest to that category (by default, it's in a category called "default").

`/qa edit TheVirus category set VirusQuests`

Done - that easy! Each Quest can only belong to one single category. Categories also determine the folder structure of NotQuests - and they'll even determine how it's displayed in the GUI!

#### Sub-categories

Each category can also have sub-categories. There can be unlimited sub-categories, and you can nest them how deep you want. Example of creating a category "Zombies" as a sub-category of "VirusQuests": `/qa categories create VirusQuests.Zombies`

#### Category display names

The name we specified above is also just the categorie's identifier. You can add a display name (which is what the player will actually see). It can contain spaces, or even color codes, just like quest names! Example:

`/qa categories edit VirusQuests displayName set <dark_green>Virus Quests <main>(dangerous)`

#### Category predefined progress order:

(todo, still need to write this up. Works like the predefined progress order for quests > objectives, but for category > quests. Super useful, this can make your life VERY easy and speed things up by a lot)

## What next?

Now, start making Quests! On this website, you can find further information about NotQuests and help if you check out the [Documentation](/docs/documentation/docs/) tab on the top of this page. If you need any help, feel free to join our [Discord](https://discord.gg/7br638S5Ex).
