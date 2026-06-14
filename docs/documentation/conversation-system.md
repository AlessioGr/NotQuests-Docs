---
title: 💬 Conversation System
sidebar_position: 5
description: Simple reference for NotQuests conversation files, commands, branching, actions, conditions, and NPC attachment.
keywords: [notquests, conversation, conversations, npc talk, npc conversations]
---

This page explains the conversation file format. If you are creating your first conversation, start with the [Conversations tutorial](/docs/tutorials/conversations) first.

## What a conversation is

A conversation is one YAML file in a category's `conversations` folder:

```text
plugins/NotQuests/<category>/conversations/<conversation>.yml
```

For the default category:

```text
plugins/NotQuests/default/conversations/intro.yml
```

The file controls:

- where the conversation starts,
- which speakers exist,
- which lines each speaker can say,
- which choices the player can click,
- which actions run,
- which conditions control branches.

## Minimal file

```yaml
start: Robert.greeting

Lines:
  Robert:
    color: "<blue>"
    greeting:
      text: "Hello!"
      next: Player.bye

  Player:
    color: "<green>"
    bye:
      text: "Bye!"
```

## Top-level keys

| Key | Required | Meaning |
| --- | --- | --- |
| `start` | yes | First line, or comma-separated fallback lines, for the conversation. |
| `Lines` | yes | Speakers and their lines. |
| `npcs` | no | NPC attachment data. Prefer managing this with commands instead of editing it manually. |

## Speakers

Speakers are children of `Lines`.

```yaml
Lines:
  Robert:
    color: "<blue>"
    greeting:
      text: "Hello!"
```

The speaker name is used in line references:

```text
Robert.greeting
```

Speaker keys:

| Key | Meaning |
| --- | --- |
| `color` | MiniMessage tag used for the speaker name. |
| any other key | A conversation line owned by that speaker. |

Use speaker names that are easy to read and stable, such as `Guard`, `Player`, `King`, or `Merchant`.

## Lines

A line is one named entry below a speaker.

```yaml
greeting:
  text: "Welcome to town."
  next: Player.askShop,Player.leave
```

Line keys:

| Key | Meaning |
| --- | --- |
| `text` | Message shown when the line plays. |
| `texts` | List of possible messages; one is chosen randomly. Use this instead of `text`. |
| `next` | Next line, or comma-separated fallback lines. If omitted, the conversation ends. |
| `conditions` | Conditions that must pass before this line can play. |
| `actions` | Actions executed when the line is reached. |
| `shout` | `true` makes the line visually stand out in bold. |

## Line references

Use this format everywhere a line is referenced:

```text
Speaker.line
```

Examples:

```text
Robert.greeting
Player.leave
Merchant.buy
```

`start:` and `next:` can contain one reference:

```yaml
next: Robert.goodbye
```

Or multiple references:

```yaml
next: Player.accept,Player.decline,Player.askMore
```

## How NotQuests picks the next line

NotQuests reads comma-separated line references from left to right.

```yaml
start: Guard.vipGreeting,Guard.normalGreeting
```

It tries `Guard.vipGreeting` first. If that line has conditions and they fail, NotQuests tries `Guard.normalGreeting`.

That is how you make branches that depend on conditions:

```yaml
vipGreeting:
  text: "Welcome back, honored guest."
  conditions:
    - condition HasVipTag
normalGreeting:
  text: "Welcome, traveler."
```

## Player choices

When an NPC line points to multiple `Player` lines, those lines become clickable answer options.

```yaml
Guard:
  greeting:
    text: "Do you want work?"
    next: Player.accept,Player.decline

Player:
  accept:
    text: "Yes. What do you need?"
    next: Guard.questOffer
  decline:
    text: "Not right now."
    next: Guard.goodbye
```

Players can click the answer in chat. If enabled in `general.yml`, they can also type the option number in chat.

## Text and formatting

Use `text:` for one message:

```yaml
text: "Bring me 10 herbs."
```

Use `texts:` for random variants:

```yaml
texts:
  - "Bring me 10 herbs."
  - "The apothecary needs herbs again."
  - "I have work for someone who knows the forest."
```

Conversation text supports MiniMessage:

```yaml
text: "Bring me <green>10 herbs</green> and I will pay you <gold>well</gold>."
```

Use `text: "/skip/"` for a line that sends no message and only runs actions or moves to another line:

```yaml
giveReward:
  text: "/skip/"
  actions:
    - action GiveReward
  next: Guard.rewardGiven
```

## Actions

Actions run when a line is reached.

Recommended: create saved actions with commands, then reference them by name:

`/qa actions add RewardQuestPoints QuestPoints add 5`

```yaml
actions:
  - action RewardQuestPoints
```

Inline actions are also supported:

```yaml
actions:
  - SendMessage You made the guard happy.
  - QuestPoints add 5
```

Saved actions are easier to check because `/qa actions add ...` gives command feedback immediately. Inline actions are useful for short, obvious actions.

## Conditions

Conditions decide whether a line is allowed to play.

Recommended: create saved conditions with commands, then reference them:

`/qa conditions add HasTenQuestPoints QuestPoints moreOrEqualThan 10`

```yaml
conditions:
  - condition HasTenQuestPoints
```

Negate a saved condition with `!` and quotes:

```yaml
conditions:
  - "!condition HasTenQuestPoints"
```

Inline conditions are also supported:

```yaml
conditions:
  - QuestPoints moreOrEqualThan 10
```

Use saved conditions when you are learning. They are easier to test and reuse.

## NPC attachments

Prefer attaching conversations with commands:

`/qa conversations edit intro npcs add citizens:5`

`/qa conversations edit intro npcs add fancynpcs:guard`

`/qa conversations edit intro npcs add rightClickSelect`

`rightClickSelect` gives a selector item. Right-click a Citizens NPC, FancyNPCs NPC, or armor stand to attach the conversation.

Useful NPC commands:

- `/qa conversations list` - shows conversations and attached NPCs.
- `/qa conversations edit intro npcs add rightClickSelect` - attach by clicking.
- `/qa conversations edit intro armorstand remove` - get the tool that removes conversations from armor stands.

## Categories

Conversations belong to a category, just like quests.

Create in a specific category:

`/qa conversations create intro --category story`

Move an existing conversation:

`/qa conversations edit intro category set story`

Show the current category:

`/qa conversations edit intro category show`

## Speakers from commands

You can add and remove speakers with commands, but line content is still edited in the YAML file.

`/qa conversations edit intro speakers add Guard --speakerColor <gold>`

`/qa conversations edit intro speakers list`

`/qa conversations edit intro speakers remove Guard`

## Checking and debugging

After editing a file:

`/qa reload conversations`

Then check how NotQuests reads the file:

`/qa conversations analyze intro`

For larger conversations, print the output to console:

`/qa conversations analyze intro --printToConsole`

If something does not work, check these first:

- YAML uses spaces, not tabs.
- Indentation is consistent.
- Every `start:` and `next:` target exists.
- Every saved `condition ...` exists in `/qa conditions`.
- Every saved `action ...` exists in `/qa actions`.
- You ran `/qa reload conversations` after editing the file.
- You are starting the conversation as a player. `/qa conversations start <conversation>` is player-only.

## Packet magic

NotQuests can keep conversation chat tidy by removing previous conversation lines and restoring older chat afterwards. This is controlled in `general.yml` under packet magic conversation settings.

If players report that chat messages appear to disappear during conversations, that is usually this feature. It is intended, but it can be disabled in the config if your server prefers normal chat history.

## Keep conversations easy to debug

Conversations are powerful, but they are still YAML files. The most reliable workflow is:

1. Add a small branch.
2. Reload.
3. Analyze.
4. Test in-game.
5. Repeat.

Avoid writing a whole questline before the first test. It is much faster to debug five lines than fifty.
