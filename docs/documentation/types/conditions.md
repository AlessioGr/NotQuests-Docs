---
sidebar_position: 2
---

# 🎭 Conditions

Raw conditions can be created using `/qa conditions`. Those will be saved in the `plugins/notquests/categoryname/conditions.yml`. Conditions are also Quest requirements, Objective conditions and Action conditions, which can be created with the respective other commands.

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

**Fulfilled when:** The boolean variable equals the expression.

**Command Arguments:**

- **`<variable type>`** Type of the boolean variable
- **`<variable arguments>`** Additional variable arguments which may or may not exist for this specific variable
- **`<operator>`** - Currently, the only operator is "equals"
- **`<expression>`** - What the result of the variable should be. Common values are "true" or false", but you can also compare it to a different boolean variable here.

**Example command:** `/qa conditions add conditionname Flying equals false` - Flying would be a variable type.

:::

### ❓ List

:::info Description

**Fulfilled when:** The list variable equals the expression.

**Command Arguments:**

- **`<variable type>`** Type of the lust variable
- **`<variable arguments>`** Additional variable arguments which may or may not exist for this specific variable
- **`<operator>`** - Possible operators are `contains`, `containsIgnoreCase`, `equals` and `equalsIgnoreCase`.
- **`<expression>`** - What the result of the variable should be. This depends on the variable type

**Example command:** `/qa conditions add conditionname ActiveQuests contains questname` - Checks if questname is currently active for the player. ActiveQuests would be a list variable.

:::

...
