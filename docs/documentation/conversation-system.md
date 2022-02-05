---
sidebar_position: 7
description: This guide explains how the conversation system in notquests works
keywords: [notquests, conversation, conversations, npc talk, npc conversations]
---

# 💬 Conversation System

> Showcase of conversations with packet magic enabled: https://www.youtube.com/watch?v=iPwcf277K8k (it has improved since I made that video).

Good, easy-to-understand video tutorial: https://www.youtube.com/watch?v=OC45_H3Tv8Y

Shitty Video Tutorial: https://www.youtube.com/watch?v=2xgzLTX8KyQ

NotQuests has a very extensive and flexible conversation system integrated. With it, you can create and add remarkable conversations to both Citizens NPCs or Armor Stands (or basically anything else via commands).

The learning curve for creating conversations is steeper compared to learning other features NotQuests offers. That's mainly because the majority of the conversation cannot be created using commands (I'll add that in the future).

That means that you will have to edit conversation files to create your conversation. Each conversation = one `.yml` file. But don't worry! There are some commands to assist you.

## Creating our first conversation

Of course, you can create the conversation file yourself by going to the `plugins/NotQuests/default/conversations` folder - but I added a helpful command which creates the initial template for you:

`/qa conversations create [name]`. Make sure _[name]_ contains no spaces. For our first conversation, however, let's use this command:

`/qa conversations create [name] --demo` By adding the --demo flag at the end of the command, it won't just create a conversation file with the blank template - it will also fill it with a demo conversation.

### Editing our first conversation

Head to the `plugins/NotQuests/default/conversations` folder and open the respective `[name].yml` file which the _create command_ should have created for you.

Since you used the --demo flag, it should be filled with a demo conversation.

In-game, you can already “start” the conversation by using `/qa conversations start [name]`. Now it's up to you:

Try to understand the conversation file and how it works by comparing it with the result in-game. Make some changes and see what happens in-game. Note that after each change, you have to re-load it in-game by using `/qa reload conversations`.

I know that "Learn it yourself" approach isn't that easy - I'm still preparing a proper guide which explains everything for you. The following "Features & Explanation" should help as well.

## Features & Explanation

* Each conversation can have multiple Speakers. Each speaker has multiple conversation lines.
* The system jumps from conversation line to conversation line (by using the `next:` attribute). If there is no `next:` attribute, the conversation will end.
* There can be unlimited branches in your conversation - for example, you can link to multiple Player conversation lines in a `next:`. That will make it, so the player can choose different “answers” and depending on their answer, they will get a different reply (/ branch)
* Each conversation line can have an action which executes once that line is reached (sent to the player). These actions are identical to the actions used in triggers (saved in the `plugins/NotQuests/default/actions.yml`)
* Each Speaker can have a different color
* Old chat messages can be restored via our packet magic system (see last section)
* You can bind a conversation to an NPC ID (by specifying it in the file) or to an armor stand (there is a command for that in-game)

## Further helpful tips

* You can use the `/qa conversations analyze` command to see how the game parses your conversation file and to check if everything is correct.
* After making changes to a conversation file and reloading it, please check your console for any errors or warnings. If you made a mistake, it will tell you right there!

## Fancy conversations with chat packets

I have added an amazing, unique system which deletes previous conversations from the chat by catching the chat packets the server sends to the client and “restoring” the old chat. **This makes the player experience a LOT better,** and currently no other conversation plugin offers it.

If you want to try it out, head to `plugins/NotQuests/general.yml` and enable both packet options (set them to true). Then, restart your server (/qa reload won't do it) and enjoy! In current versions, this is enabled by default.

## Coming Soon

* [ ] Full in-game conversation editor via just commands (no file editing required)
* [x] Conditions: Each line will have a condition which will be checked. This will be done in v3.0, when the old Quest requirements are fully converted to conditions which can be re-used everywhere.
* [x] Shouting flags. This is a simple flag which can be applied to a conversation line, which will make its font bold.
* [x] End current conversation if you start another, new conversation
* [ ] End conversation if you move too far away from the NPC
* [ ] End conversation if you ~~shit~~shift
