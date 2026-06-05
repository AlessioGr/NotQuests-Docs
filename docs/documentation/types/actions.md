---
title: 🧨 Actions
sidebar_position: 3
description: This lists and explains all actions (also known as rewards) in NotQuests, as well as how you can use them.
keywords: [notquests, actions, quest actions, rewards, quest rewards]
---

Raw actions can be created using `/qa actions`. Those will be saved in the `plugins/notquests/categoryname/actions.yml`. Actions are also Quest rewards or Objective rewards. An action is, as the name says, an action. Any action. Something "happens".

To "test" an action created via `/qa actions`, you can use `/qa actions edit actionname execute <Player Name(optional)>`. It can have the optional flag `--ignoreConditions` if you want to ignore any conditions attached to this action.

**Command Arguments for every action:**

- **`(flags)`** - Optional flags
  - `--category <categoryName>` - If this is a raw, actions.yml action, you are able to set its category here
  - `--delay <delay>` - If this is a raw, actions.yml action, you are able to set its execution delay here. If you enter, for example, 1s, it will be executed in 1 seconds and not immediately.

## Default Variable Actions

These actions act as "vessels" for variables. What does that mean?

Well... for example, the NumberAction is such a variable action. In-game, it turns into as many actions as there are number variables, so it's a lot more actions than you think there are. Other than for conditions, not every variable is able to set a value. For example, the DayOfWeek can only be used as a condition, but not as an action.

Makes sense right? You can't just time-travel in real life with a Minecraft plugin. The variable "Money" however can be used as a condition AND an action, since you can see a Player's money, but also change it. In-game money of course 🥲

Please consult the [Variables Section](/docs/documentation/types/variables) for those.

### ❓ Boolean

:::info Description

**What happens:** The value of this Boolean variable is set to either true or false

**Command Arguments:**

- **`<variable type>`** Type of the Boolean variable
- **`<variable arguments>`** Additional variable arguments which may or may not exist for this specific variable
- **`<operator>`** - Valid operators are `set` and `setNot`
- **`<expression>`** - What the variable should be. Common values are `true` or `false`, but you can also set it to a different boolean variables here.

**Example commands:**

- `/qa actions add actionname Flying set true` - Flying would be a Boolean variable type. This action would make the player fly.
- `/qa actions add pp3 Money add ((TagInteger(TagName:points)>=4)*(10+30))+(!(TagInteger(TagName:points)>=4)*5)` - This is just to show that very complex actions are also possible with NotQuests expression system. This action does the following: If your "points" (from the Integer tag) are bigger or equal 4, this action will give you 40$. Otherwise, it will give you 5$.

:::

### 📙 List

:::info Description

**What happens:** The value of this List variable is changed

**Command Arguments:**

- **`<variable type>`** Type of the List variable
- **`<variable arguments>`** Additional variable arguments which may or may not exist for this specific variable
- **`<operator>`** - Possible operators are `add`, `clear`, `remove` and `set`
- **`<expression>`** - What the variable should be. This depends on the variable type

**Example command:** `/qa actions add actionname ActiveQuests add questname` - ActiveQuests would be a List variable.

:::

### 📖 ItemStackList

:::info Description

**What happens:** The value of this ItemStackList variable is changed

**Command Arguments:**

- **`<variable type>`** Type of the ItemStackList variable
- **`<variable arguments>`** Additional variable arguments which may or may not exist for this specific variable
- **`<operator>`** - Possible operators are `add`, `clear`, `remove` and `set`
- **`<expression>`** - What the variable should be. This depends on the variable type, but they do have to be Items

**Example command:** `/qa actions add actionname Inventory remove hand 3` - Inventory would be an ItemStackList variable.

:::

### 💯 Number

:::info Description

**What happens:** The value of this Number variable is changed

**Command Arguments:**

- **`<variable type>`** Type of the Number variable
- **`<variable arguments>`** Additional variable arguments which may or may not exist for this specific variable
- **`<operator>`** - Valid operators are `add`, `deduct`, `divide`, `multiply` and `set`
- **`<expression>`** - What the result of the variable should be. This expression is cool, because it can contain any kind of math expression. And it can even contain other number variables.

**Example command:** `/qa actions add actionname Money multiply 2` - Flying would be a Number variable type. This action would make the player fly.
**Example command with math expression + other variables**: `/qa actions add actionname Money set QuestPoints*Money+500-30/2`
**Example command with very advanced expression:** `/qa actions add actionname Money set 10+TagInteger(TagName:reputation)*TagInteger(TagName:level)`

:::

### 🆎 String

:::info Description

**What happens:** The value of this String variable is changed

**Command Arguments:**

- **`<variable type>`** Type of the String variable
- **`<variable arguments>`** Additional variable arguments which may or may not exist for this specific variable
- **`<operator>`** - Valid operators are `set` and `append`
- **`<expression>`** - What the result of the variable should be. This depends on the variable type, but it has to be a String (= text)

**Example command:** `/qa actions add actionname CurrentWorld set world` - CurrentWorld would be a String variable type. This action teleports the player to another world.

:::

## Default Actions

These are the default, "standalone" actions and don't depend on variables.

### 🤓 Action

:::info Description

**What happens:** One or multiple other actions are executed. Yes, this simply executes other actions defined in the `actions.yml`.

**Command Arguments:**

- **`<Other Action Name>`** - Name of the other action(s) which needs to be executed.
- **Optional: `<amount>`** - Amount of times the other action should be executed.
- **`(flags)`** - Optional flags
  - `--ignoreConditions` - If you set this flag, all conditions added to the other action which should be executed will be ignored. It will be executed no matter if they are fulfilled or not.
  - `--minRandom <amount>` - If this is set, it will only execute a random amount of quests with this minimum
  - `--maxRandom <amount>` - If this is set, it will only execute a random amount of quests with this maximum
  - `--onlyCountForRandomIfConditionsFulfilled` - Does not count an action to the min or max random counter if its conditions are not fulfilled, if this flag is set
  - `--executedActionDelay` - Sets the delay for which all included actions will be executed. This overrides possible existing delays.

**Example commands:**

- `/qa actions add actionname Action a1 2 --ignoreConditions` - This executes the action a1 two times, regardless of the conditions of action a1.
- `/qa actions add actionname Action a1,a2,money10 1` - This executes the actions a1, a2 and money10.

**Example commands for random actions:**
For these commands, I have pre-created the actions sm1, sm2, sm3 ... sm10 which are all different SendMessage actions.

- `/qa actions add sendAllMessages Action sm1,sm2,sm3,sm4,sm5,sm6,sm7,sm8,sm9,sm10 1` - Executes all 10 actions in the specified order
- `/qa actions add sendAllMessagesInRandomOrder Action sm1,sm2,sm3,sm4,sm5,sm6,sm7,sm8,sm9,sm10 1 --minRandom 10 --maxRandom 10` - Executes all 10 actions in a random order
- `/qa actions add sendRandomMessage Action sm1,sm2,sm3,sm4,sm5,sm6,sm7,sm8,sm9,sm10 1 --minRandom 1 --maxRandom 1` - Sends exactly one random action ouf of the provided actions
- `/qa actions add sendGuaranteedRandomMessage Action sm1,sm2,sm3,sm4,sm5,sm6,sm7,sm8,sm9,sm10 1 --minRandom 1 --maxRandom 1 --onlyCountForRandomIfConditionsFulfilled` - This is useful if your actions have conditions attached to them. It does exactly the same as the previous action. However, in case the action it chooses does not fulfill its condition, it will try out another action instead. The previous action however would simply send nothing
- `/qa actions add sendOneOrTwoRandomMessage Action sm1,sm2,sm3,sm4,sm5,sm6,sm7,sm8,sm9,sm10 1 --minRandom 1 --maxRandom 2` - Executes either one or two random actions out of the provided actions

:::

### 🔆 Beam

:::info Description

**What happens:** A beacon-style light beam is spawned (or removed) at a location. Handy for marking a quest objective spot from far away.

**Command Arguments:**

- **`<beamName>`** - A name for this beam, so you can remove it again later.
- **`spawn <world> <x> <y> <z>`** - Spawns the beam at these coordinates.
- **`remove`** - Removes the beam with that name instead.

**Example commands:**

- `/qa actions add showbeam Beam questbeam spawn world 100 64 200`
- `/qa actions add hidebeam Beam questbeam remove`

:::

### 📢 BroadcastMessage

:::info Description

**What happens:** A message is broadcast to *everyone* on the server. Supports MiniMessage formatting (`<gold>`, `<bold>`, ...).

**Command Arguments:**

- **`<message>`** - The message to broadcast.

**Example command:** `/qa actions add announce BroadcastMessage <gold>A hero has risen!`

:::

### 💬 Chat

:::info Description

**What happens:** The player sends a chat message, exactly as if they typed it themselves.

**Command Arguments:**

- **`<message>`** - The message the player should say. Wrap it in quotes.

**Example command:** `/qa actions add greet Chat "Hey everyone, I'm on an adventure!"`

:::

### ❌ CloseInventory

:::info Description

**What happens:** Closes whatever inventory or GUI the player currently has open. Useful at the end of a conversation or after opening a menu.

**Command Arguments:** None

**Example command:** `/qa actions add closegui CloseInventory`

:::

### ✅ CompleteQuest

:::info Description

**What happens:** Instantly completes a Quest for the player, as if they finished every objective.

**Command Arguments:**

- **`<quest>`** - The Quest to complete.

**Example command:** `/qa actions add finishtutorial CompleteQuest tutorial`

:::

### 🖥️ ConsoleCommand

:::info Description

**What happens:** Runs a command from the **console**. Use this whenever you need elevated permissions — giving currency through another economy plugin, granting a LuckPerms group, etc. `%player%` is replaced with the player's name.

**Command Arguments:**

- **`<command>`** - The command to run (no leading slash).

**Example command:** `/qa actions add payout ConsoleCommand eco give %player% 500`

:::

### 💥 FailQuest

:::info Description

**What happens:** Fails a Quest for the player.

**Command Arguments:**

- **`<quest>`** - The Quest to fail.

**Example command:** `/qa actions add botched FailQuest heist`

:::

### 🎒 GiveItem

:::info Description

**What happens:** Gives an item to the player. Works with vanilla materials and items made in the NotQuests item system.

**Command Arguments:**

- **`<material>`** - The item to give. Vanilla material name or a NotQuests custom item.
- **`<amount>`** - How many.

**Example command:** `/qa actions add reward_diamonds GiveItem diamond 16`

:::

### 📜 GiveQuest

:::info Description

**What happens:** Gives (starts) a Quest for the player.

**Command Arguments:**

- **`<quest>`** - The Quest to give.
- **`(flags)`** - Optional flags
  - `--forceGive` - Gives the quest even if the player doesn't meet its requirements or is on cooldown.

**Example command:** `/qa actions add startchapter2 GiveQuest chapter2 --forceGive`

:::

### 🪟 OpenGui

:::info Description

**What happens:** Opens one of NotQuests' GUIs for the player.

**Command Arguments:**

- **`<guiName>`** - The GUI to open.
- **`(flags)`** - Optional flags
  - `--targetPlayer <player>` - Open it for a different player.
  - `--quest <quest>` - Pass a quest to the GUI (for quest-specific GUIs like the preview).
  - `--npc <npcID>` - Pass an NPC to the GUI.
  - `--category <category>` - Pass a category to the GUI.

**Example command:** `/qa actions add showquests OpenGui questsoverview`

:::

### 🔊 PlaySound

:::info Description

**What happens:** Plays a sound for the player — or for everyone, at a location.

**Command Arguments:**

- **`<sound>`** - The sound to play (e.g. `entity.player.levelup`).
- **`(flags)`** - Optional flags
  - `--volume <0-1>` - How loud.
  - `--pitch <float>` - How high/low.
  - `--SoundCategory <category>` - Sound category (master, music, ...).
  - `--stopOtherSounds` - Stops all other sounds first.
  - `--playForEveryoneAtSetLocation` - Everyone hears it, coming from a fixed location.
  - `--playForEveryoneAtTheirLocation` - Everyone hears it, at their own location.
  - `--world`, `--locationX`, `--locationY`, `--locationZ` - The fixed location to play it at.

**Example command:** `/qa actions add levelup PlaySound entity.player.levelup --volume 0.8 --pitch 1.2`

:::

### 🧑 PlayerCommand

:::info Description

**What happens:** Runs a command **as the player** (with their permissions). `%player%` is replaced with their name.

**Command Arguments:**

- **`<command>`** - The command to run (no leading slash).

**Example command:** `/qa actions add gohome PlayerCommand home`

:::

### ✉️ SendMessage

:::info Description

**What happens:** Sends a private message to the player. Supports MiniMessage formatting.

**Command Arguments:**

- **`<message>`** - The message to send.

**Example command:** `/qa actions add congrats SendMessage <green>Nice work — the village is safe again!`

:::

### 🧟 SpawnMob

:::info Description

**What happens:** Spawns mobs — either right on the player, or at fixed coordinates.

**Command Arguments:**

- **`<entityType>`** - The mob to spawn (e.g. `ZOMBIE`).
- **`<amount>`** - How many.
- **`PlayerLocation`** *or* **`Location <world> <x> <y> <z>`** - Where to spawn them. `PlayerLocation` is dynamic (wherever the player is when the action runs).
- **`(flags)`** - Optional flags
  - `--spawnRadiusX <n>`, `--spawnRadiusY <n>`, `--spawnRadiusZ <n>` - Scatter the mobs randomly within this radius around the spawn point.

**Example command:** `/qa actions add ambush SpawnMob ZOMBIE 5 PlayerLocation --spawnRadiusX 3 --spawnRadiusZ 3`

:::

### 🗨️ StartConversation

:::info Description

**What happens:** Starts a [conversation](/docs/documentation/conversation-system) for the player.

**Command Arguments:**

- **`<conversation>`** - The conversation to start.
- **`(flags)`** - Optional flags
  - `--endPrevious` - If the player is already in a conversation, end it first.

**Example command:** `/qa actions add talktoking StartConversation king_intro --endPrevious`

:::

### 🎯 TriggerCommand

:::info Description

**What happens:** Fires a named `TriggerCommand` objective. This is how you complete one of those "do something, then we mark it done" objectives from an action — for example after a player flips a lever or reaches a region.

**Command Arguments:**

- **`<triggerName>`** - The name of the trigger to fire (matches the name on the `TriggerCommand` objective).

**Example command:** `/qa actions add pulllever TriggerCommand lever1`

:::
