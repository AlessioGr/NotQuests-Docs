---
sidebar_position: 3
---

# 🧨 Actions

Raw actions can be created using `/qa actions`. Those will be saved in the `plugins/notquests/categoryname/actions.yml`. Actions are also Quest rewards or Objective rewards. An action is, as the name says, an action. Any action. Something "happens".

To "test" an action created via `/qa actions`, you can use `/qa actions edit actionname execute <Player Name(optional)>`. It can have the optional flag `--ignoreConditions` if you want to ignore any conditions attached to this action.

**Command Arguments for every condition:**

- **`(flags)`** - Optional flags
  - `--category <categoryName>` - If this is a raw, actions.yml action, you are able to set its category here

## Default Variable Conditions

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
- **`<expression>`** - What the result of the variable should be. Common values are `true` or `false`, but you can also set it to a different boolean variables here.

**Example command:** `/qa actions add actionname Flying set true` - Flying would be a variable type. This action would make the player fly.

:::

...this page is unfinished...
