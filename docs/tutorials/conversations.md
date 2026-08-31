---
title: 💬 Conversations
sidebar_position: 3
description: Create NPC conversations with choices, branches, actions, and conditions.
keywords: [notquests, tutorial, conversation, conversations, chat, speak, talk]
---

Conversations let an NPC talk to a player, show clickable answers, branch into different paths, and run quest actions or checks during the dialogue.

Armor-stand conversations work on Paper and NeoForge. Citizens and FancyNPCs conversation attachments are Paper-only integrations.

You do not need to understand the whole system before making your first one. Start with a tiny file, test it in-game, then add choices and logic one piece at a time.

## The fastest working conversation

Create a conversation file:

`/qa conversations create intro`

Open:

```text
default/conversations/intro.yml
```

Replace the file with this:

```yaml
start: Guard.hello

Lines:
  Guard:
    color: "<gold>"
    hello:
      text: "Welcome to town. Need directions?"
      next: Player.yes,Player.no
    directions:
      text: "The market is north, the mine is east, and the inn is behind you."
    goodbye:
      text: "Safe travels."

  Player:
    color: "<green>"
    yes:
      text: "Yes, please."
      next: Guard.directions
    no:
      text: "No thanks."
      next: Guard.goodbye
```

Reload conversations:

`/qa reload conversations`

Start it as a player:

`/qa conversations start intro`

If that works, you already know the main idea:

- an NPC line sends text,
- `next:` points to the answers the player can choose,
- each player answer points back to the next NPC line.

Think of it like a small flow chart.

## Attach it to an NPC

For a Citizens NPC:

`/qa conversations edit intro npcs add citizens:5`

For a FancyNPCs NPC:

`/qa conversations edit intro npcs add fancynpcs:guard`

If you do not want to type an id, use the selector item:

`/qa conversations edit intro npcs add rightClickSelect`

Then right-click the NPC or armor stand in-game. Players can now right-click that NPC to start the conversation.

## Use the demo when you want examples

The demo is useful after you understand the small version above:

`/qa conversations create atlas --demo`

It creates a larger conversation with multiple answers, random text variants, MiniMessage formatting, and nested branches. Use it for ideas after your small test conversation works.

## How conversation files work

Every conversation has:

- `start`: the first line, or a short list of fallback lines.
- `Lines`: every speaker and every line they can say.
- speakers such as `Guard` or `Player`.
- line names such as `hello`, `yes`, or `goodbye`.

A line is referenced as:

```text
SpeakerName.lineName
```

Examples:

```text
Guard.hello
Player.yes
```

## Choices and branches

When an NPC line points to multiple player lines, the player sees multiple answers:

```yaml
hello:
  text: "Need directions?"
  next: Player.yes,Player.no
```

Those answers then decide where the conversation goes:

```yaml
Player:
  yes:
    text: "Yes, please."
    next: Guard.directions
  no:
    text: "No thanks."
    next: Guard.goodbye
```

If a line has no `next:`, the conversation ends after that line.

## Conditions

Conditions decide whether a line is allowed to play.

You can skip this section until your basic conversation works.

First create a saved condition in-game:

`/qa conditions add HasTenQuestPoints QuestPoints moreOrEqualThan 10`

Then use it in the conversation:

```yaml
start: Guard.reward,Guard.noReward

Lines:
  Guard:
    color: "<gold>"
    reward:
      text: "You have proven yourself. Take this reward."
      conditions:
        - condition HasTenQuestPoints
      actions:
        - action GiveReward
    noReward:
      text: "Come back after you have earned 10 quest points."
```

Because `start` lists `Guard.reward` first, NotQuests tries that line first. If the player does not pass the condition, NotQuests tries `Guard.noReward` instead.

To negate a condition, add `!` before it and quote the line:

```yaml
conditions:
  - "!condition HasTenQuestPoints"
```

## Actions

Actions run when the conversation reaches a line.

Create a saved action:

`/qa actions add GiveReward QuestPoints add 5`

Use it in a line:

```yaml
reward:
  text: "You have proven yourself. Take this reward."
  actions:
    - action GiveReward
```

You can also run inline actions:

```yaml
actions:
  - SendMessage Thanks for talking to the guard.
  - QuestPoints add 5
```

Saved actions are easier to test because the command tells you immediately if the action syntax is wrong. Inline actions are handy later, once you know the action types well.

## Random text variants

Use `texts:` instead of `text:` when a line should randomly pick one message:

```yaml
hello:
  texts:
    - "Good to see you again."
    - "Back already?"
    - "Need something?"
  next: Player.ask,Player.leave
```

## Formatting and speaker names

Speaker `color` controls how that speaker name is shown:

```yaml
Lines:
  Guard:
    color: "<gold>"
```

Line text supports MiniMessage formatting:

```yaml
text: "Bring me <green>10 herbs</green> and I will pay you <gold>well</gold>."
```

Use `shout: true` when a line should stand out in bold:

```yaml
warning:
  text: "Do not enter the ruins after dark."
  shout: true
```

## Running actions without showing text

Use `text: "/skip/"` for a hidden step that only runs actions:

```yaml
giveReward:
  text: "/skip/"
  actions:
    - action GiveReward
  next: Guard.rewardGiven
```

This is useful when you want to give a reward or update a tag without showing an extra chat message.

## Testing checklist

After every edit:

1. Save the `.yml` file.
2. Run `/qa reload conversations`.
3. Watch the server console for warnings.
4. Run `/qa conversations analyze intro --printToConsole`.
5. Start it with `/qa conversations start intro` or right-click the attached NPC.

Most conversation problems come from one of these:

- The YAML indentation is wrong.
- `start:` or `next:` points to a line that does not exist.
- A line uses `conditions:` or `actions:` but the saved condition/action name is wrong.
- A player answer points nowhere, so the conversation ends earlier than expected.
- You edited the file but forgot `/qa reload conversations`.

## Recommended workflow

1. Create a tiny conversation with one NPC line and one player answer.
2. Reload and test.
3. Add one branch.
4. Reload and test.
5. Add one condition.
6. Reload and test.
7. Attach it to an NPC.

Do not write a huge conversation before testing it. Small changes are much easier to fix.

## Useful commands

- `/qa conversations create intro` - create a blank conversation file.
- `/qa conversations create intro --demo` - create the larger demo conversation.
- `/qa reload conversations` - reload edited files.
- `/qa conversations start intro` - start a conversation as a player.
- `/qa conversations analyze intro --printToConsole` - print the parsed conversation tree to console.
- `/qa conversations list` - list loaded conversations and their attached NPCs.
- `/qa conversations edit intro npcs add rightClickSelect` - attach the conversation by clicking an NPC or armor stand.
- `/qa conversations edit intro npcs add citizens:5` - attach to a Citizens NPC.
- `/qa conversations edit intro npcs add fancynpcs:guard` - attach to a FancyNPCs NPC.
