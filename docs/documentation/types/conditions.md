---
title: 🎭 Conditions
sidebar_position: 2
description: This lists and explains all conditions in NotQuests, as well as how you can use them.
keywords: [notquests, conditions, quest conditions]
---

Raw conditions can be created using `/qa conditions`. Those will be saved in the `plugins/notquests/categoryname/conditions.yml`. Conditions are also Quest requirements, Objective conditions and Action conditions, which can be created with the respective other commands.

To "test" a condition created via `/qa conditions`, you can use `/qa conditions edit conditionname check <Player Name(optional)>`.

**Command Arguments for every condition:**

- **`(flags)`** - Optional flags
  - `--negate` - This negates the condition. True will turn to False, and False will turn to True
  - `--category <categoryName>` - If this is a raw, conditions.yml conditions, you are able to set its category here

## Default Variable Conditions

These conditions act as "vessels" for variables. What does that mean?

Well... for example, the NumberCondition is such a variable condition. In-game, it turns into as many conditions as there are number variables, so it's a lot more conditions than you think there are.

Please consult the [Variables Section](/docs/documentation/types/variables) for those.

### ❓ Boolean

:::info Description

**Fulfilled when:** The Boolean variable equals the expression. Booleans simply means true or false. Or, in easy words: Yes or No

**Command Arguments:**

- **`<variable type>`** Type of the Boolean variable
- **`<variable arguments>`** Additional variable arguments which may or may not exist for this specific variable
- **`<operator>`** - Currently, the only operator is `equals`
- **`<expression>`** - What the result of the variable should be. Common values are `true` or `false`, but you can also compare it to a different boolean variable here.

**Example commands:**

- `/qa conditions add conditionname Flying equals false` - Flying would be a variable type.
- `/qa conditions add conditionname True equals (Money>10)&Flying` - True would be a variable type. This condition is true, if the player is flying AND has more than 10 money.
  - Another way to do this: `/qa conditions add conditionname True equals Condition(Conditions:Flying&IsRich)` - The conditions `Flying` and `IsRich` will have to be created beforehand
  - Or `qa conditions add conditionname Condition equals Flying&IsRich` - The conditions `Flying` and `IsRich` will have to be created beforehand

:::

### 📙 List

:::info Description

**Fulfilled when:** The List variable equals the expression.

**Command Arguments:**

- **`<variable type>`** Type of the List variable
- **`<variable arguments>`** Additional variable arguments which may or may not exist for this specific variable
- **`<operator>`** - Possible operators are `contains`, `containsIgnoreCase`, `equals` and `equalsIgnoreCase`
- **`<expression>`** - What the result of the variable should be. This depends on the variable type

**Example command:** `/qa conditions add conditionname ActiveQuests contains questname` - Checks if questname is currently active for the player. ActiveQuests would be a list variable.

:::

### 📖 ItemStackList

:::info Description

**Fulfilled when:** The ItemStackList variable equals the expression.

**Command Arguments:**

- **`<variable type>`** Type of the ItemStackList variable
- **`<variable arguments>`** Additional variable arguments which may or may not exist for this specific variable
- **`<operator>`** - Possible operators are `contains` and `equals`
- **`<expression>`** - What the result of the variable should be. This depends on the variable type, but they do have to be Items

**Example command:** `/qa conditions add conditionname Inventory contains diamond 32` - Checks if the player has at least 32 diamonds in their inventory. Inventory would be an ItemStackList variable.

:::

### 💯 Number

:::info Description

**Fulfilled when:** The Number variable equals the expression.

**Command Arguments:**

- **`<variable type>`** Type of the Number variable
- **`<variable arguments>`** Additional variable arguments which may or may not exist for this specific variable
- **`<operator>`** - Possible operators are `equals`, `lessOrEqualThan`, `lessThan`, `moreOrEqualThan` and `moreThan`
- **`<expression>`** - What the result of the variable should be. This expression is cool, because it can contain any kind of math expression. And it can even contain other number variables.

**Example command:** `/qa conditions add conditionname Health moreOrEqualThan 9.0` - Checks if the player's health is higher or equal than 9. Health would be a Number variable.
**Example command with math expression + other variables**: `/qa conditions add conditionname Money moreThan QuestPoints*Money+500-30/2` - This checks if you money is more than your quest points multiplied by your current money plus 500 minus 30/2
**Example command with very advanced expression:** `/qa conditions add conditionname Money moreThan 10+TagInteger(TagName:reputation)*TagInteger(TagName:level)` - Checks if the player's money is more than 10 + the value of the "reputation" tag multiplied by the value of the "level" tag.

:::

### 🆎 String

:::info Description

**Fulfilled when:** The String variable equals the expression.

**Command Arguments:**

- **`<variable type>`** Type of the String variable
- **`<variable arguments>`** Additional variable arguments which may or may not exist for this specific variable
- **`<operator>`** - Possible operators are `contains`, `endsWith`, `equals`, `equalsIgnoreCase`, `isEmpty` and `startsWith`
- **`<expression>`** - What the result of the variable should be. This is a string. The possible values depend on the variable type.

**Example command:** `/qa conditions add conditionname Name equals Tom` - Checks if the player's name is Tom. Name would be a String variable.

:::

## Default Conditions

These are the default, "standalone" conditions and don't depend on variables.

### ~~🤓 Condition~~

:::caution

This condition has been removed in v4.13.0. The Boolean variable `Condition` replaces this, and offers far more functionality.

:::

:::info ~~Description~~

~~**Fulfilled when:** The other condition is fulfilled. Yes, this simply checks another condition which is defined in the `conditions.yml`.~~

~~**Command Arguments:**~~

~~- **`<Other Condition Name>`** - Name of the other condition which needs to be fulfilled.~~

~~**Example command:** `/qa conditions add conditionname Condition otherconditionname`~~

:::

### ⏲️ WorldTime

:::info Description

**Fulfilled when:** The current time of the players Minecraft world is in a certain time range

**Command Arguments:**

- **`<minTime>`** - minimum time (24-hour clock)
- **`<maxTime>`** - maximum time (24-hour clock)

**Example command:** `/qa conditions add conditionname WorldTime 11 20` - Checks if the player's current world's time is between 11am and 8pm (or 11:00 - 20:00 in the superior 24-hour clock (come to my Discord, you Americans, and fight me))

:::

### 📅 Date

:::info Description

**Fulfilled when:** The current date is (operator) the specified date. Operators are 'before' and 'after'

**Command Arguments:**

- **`<Date operation>`** - Comparison operator between the currentDate or the specified date. Operators are `before` and `after`. Example: Current date `after` 2023
- **`(flags)`** - Optional flags
  - `--year <year>` - The year
  - `--month <month>` - The month of the year
  - `--day <day>` - The day of the month
  - `--hours <hours>` - The hours of the day
  - `--minutes <minutes>` - The minutes of the hour
  - `--seconds <seconds>` - The seconds of the minute
  - `--timeZone <name of the timezone>` - Name of the timezone of the specified date.

**Example commands:**

- `/qa conditions add conditionname Date after --year 2022 --timeZone Europe/Berlin` - Makes it so the condition is fulfilled next year in Europe/Berlin time
- `/qa conditions add conditionname Date after --month 11` - Seasonal condition! It's fulfilled every december
- `/qa conditions add conditionname Date before --month 11 --year 2022` - You have until the end of october 2022. After that, this condition is NOT fulfilled anymore

:::

## Special Default Conditions

### 🎖️ CompletedObjective Condition

:::info Description

This Condition can ONLY be used when attached to an Objective. That's because it's valid for the current Quest. Other Condition attachment places may not be bound to a specific Quest.

**Fulfilled when:** The specified objective of the current Quest has been completed

**Command Arguments:**

- **`<Objective ID>`** - ID of the objective which needs to be completed. To see the objective IDs, use `/qa edit questname objectives list`

**Example command:** `/qa edit questname objectives edit 1 conditions add CompletedObjective 2` - Ths basically makes it so Objective 2 only unlocks once Objective 1 has been completed.

:::
