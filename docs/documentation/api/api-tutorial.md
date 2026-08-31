---
title: API example tutorial
sidebar_position: 2
description: Create a NotQuests 7 registry pack with a custom objective and variable.
keywords: [notquests, api, tutorial, objective, variable, registry]
---

# Creating a v7 registry pack

This example targets **NotQuests 7.0.0-beta.2**, **Minecraft 26.2**, **Java 25**, and Paper. The objective and variable themselves use the portable API and can also live in a shared module for NeoForge.

Start with the dependency and `plugin.yml` setup from [API usage](./api-usage).

## 1. Create the registry pack

A pack keeps all of your registrations in one obvious place:

```java
package com.example.notquestsaddon;

import com.notquests.core.platform.NotQuestsAdapter;
import com.notquests.core.registry.NotQuestsRegistry.Pack;
import com.notquests.paper.NotQuests;

public final class MyRegistryPack implements Pack<NotQuests> {
    @Override
    public void register(final NotQuests notQuests) {
        final NotQuestsAdapter adapter = notQuests.getRegistryAdapter();
        CustomJumpObjective.register(adapter);
        CustomFoodLevelVariable.register(adapter);
    }
}
```

Register it from your add-on's `onLoad()`:

```java
package com.example.notquestsaddon;

import com.notquests.Main;
import org.bukkit.plugin.java.JavaPlugin;

public final class MyAddon extends JavaPlugin {
    @Override
    public void onLoad() {
        Main.getInstance().getNotQuests().addRegistryPack(new MyRegistryPack());
    }
}
```

## 2. Add an objective

This objective exposes one `amount` argument. Every registered field becomes part of command parsing, suggestions, YAML loading, and generated command documentation.

```java
package com.example.notquestsaddon;

import com.notquests.core.platform.NotQuestsAdapter;

public final class CustomJumpObjective {
    private CustomJumpObjective() {}

    public static void register(final NotQuestsAdapter adapter) {
        adapter.objectives().objective("CustomJump")
                .displayName("Custom Jump")
                .description("Counts player jumps for this add-on.")
                .field(
                        "amount",
                        adapter.fields().numberExpression().progressNeeded(),
                        "Number of jumps required.")
                .taskDescription((objective, player, activeObjective) ->
                        "Jump " + (activeObjective != null
                                ? activeObjective.progressNeeded()
                                : objective.text("amount")) + " times.")
                .onPlayerJump(activeObjective -> activeObjective.addProgress(1))
                .register();
    }
}
```

After startup, create it like every built-in objective:

```text
@optional-integration /qa edit ExampleQuest objectives add CustomJump 20
```

There is no Paper event listener in this class. NotQuests translates the platform jump event and calls the portable `onPlayerJump` callback.

## 3. Add a number variable

Variables can provide a value for conditions and, when a setter is registered, generate matching actions that change the value.

```java
package com.example.notquestsaddon;

import com.notquests.core.platform.NotQuestsAdapter;

public final class CustomFoodLevelVariable {
    private CustomFoodLevelVariable() {}

    public static void register(final NotQuestsAdapter adapter) {
        adapter.variables().numberVariable("AddonFoodLevel")
                .displayName("Add-on Food Level")
                .description("Reads or changes a player's hunger value from 0 to 20.")
                .singular("Food level")
                .plural("Food levels")
                .get((player, objects) -> player == null ? 0 : player.foodLevel())
                .set((newValue, player, objects) -> player != null
                        && player.setFoodLevel(Math.max(0, Math.min(20, newValue.intValue()))))
                .register();
    }
}
```

The generated condition can read the value, and the generated action can set, add, remove, multiply, or divide it using NotQuests' normal variable commands.

## 4. Test the registration

Start the server and check the console for registry errors. Then use tab completion under:

```text
@optional-integration /qa edit ExampleQuest objectives add CustomJump
@optional-integration /qa variables check AddonFoodLevel
```

Use a unique identifier for every registered type. Registering a duplicate identifier replaces the existing type, which is useful for deliberate overrides but surprising when accidental.

For more examples, see the built-in registrations in the NotQuests source under `src/builtin/src/main/java/com/notquests/builtin/`.
