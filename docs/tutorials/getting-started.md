---
sidebar_position: 1
---

# Getting Started

:::danger Before you read

This guide was designed with version **4.x** and **[Paper](https://papermc.io/)** in mind.

Older versions, or the Spigot versions, will have less features and different commands.
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

Each thing you write, separated by a space, is called an *argument*. In the following pictures, *qa*, *edit*, and *questname* are the three arguments:

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

`/qa edit TheVirus displayName A Deadly Virus`

Next, we want to add a description to the Quest, which will be displayed in multiple places, for example if the player tries to preview or take the Quest:

`/qa edit TheVirus description A deadly virus has infected the people of Winterfell. You have to murder the infected villagers to prevent the virus from spreading further.`

Now, your players will see a beautiful description and display name after accepting the Quest:

![After they accepted the Quest](/img/getting-started/after-accepting-with-description.png)