---
title: API usage
sidebar_position: 1
description: Add the NotQuests 7 API to a Paper add-on and register portable extension types.
keywords: [notquests, api, java, paper, registry pack, addon]
---

# Using the v7 API

NotQuests 7 extensions use the same portable registry API as NotQuests' built-in objectives, actions, conditions, triggers, and variables. Extensions register a **registry pack**; NotQuests then generates command metadata and connects its callbacks to Paper or NeoForge.

## Dependency

Until the v7 artifacts are published to a Maven repository, put the matching NotQuests jar in your project's `libs/` folder and use it as a compile-only dependency:

```groovy
dependencies {
    compileOnly files('libs/notquests-7.0.0-beta.3-26.2-paper.jar')
    compileOnly 'io.papermc.paper:paper-api:26.2.build.121-stable'
}
```

Do not bundle the NotQuests jar inside your add-on.

Declare NotQuests as a dependency in `plugin.yml` so it loads first:

```yaml
name: MyNotQuestsAddon
version: 1.0.0
main: com.example.notquestsaddon.MyAddon
api-version: "26.2"
depend: [NotQuests]
```

## Registering a pack

Register packs from your Paper plugin's `onLoad()`. This lets NotQuests see the extra types before it compiles commands and loads quest configuration.

```java
import com.notquests.Main;
import org.bukkit.plugin.java.JavaPlugin;

public final class MyAddon extends JavaPlugin {
    @Override
    public void onLoad() {
        Main.getInstance().getNotQuests().addRegistryPack(new MyRegistryPack());
    }
}
```

The pack receives the Paper NotQuests host and gets its portable adapter:

```java
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

Registry callbacks use portable types such as `PlatformPlayer`, `NQLocation`, and `ItemSelection`. This keeps type behavior independent from Bukkit and gives Paper and NeoForge the same command and runtime behavior. If an extension truly depends on a Paper-only plugin or Bukkit event, keep that small integration part in the Paper add-on and register the generic NotQuests type through the same registry API.

See the [complete tutorial](./api-tutorial) for working objective and variable examples.
