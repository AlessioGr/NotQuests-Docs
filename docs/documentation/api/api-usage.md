---
sidebar_position: 1
---

# 💻 API Usage

## Adding the API to your project

**For Gradle Kotlin DSL (recommended):**

Add this to your build.gradle:

```groovy
repositories{
    maven {
        url = "https://maven.pkg.github.com/alessiogr/NotQuests"
        content{
            includeGroup("rocks.gravili.notquests")
        }
        credentials {
            username = System.getenv("GITHUB_PACKAGES_USERID") ?: "alessiogr"
            password = System.getenv("GITHUB_PACKAGES_IMPORT_TOKEN") ?: "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"
        }
    }
}

dependencies {
    compileOnly 'rocks.gravili.notquests:paper:4.10.0'
}
```

Note: This API will work with versions 3.2.6+ (if released, if not github actions development builds), NOT with the 3.2.5 spigot release.

Attention: The GitHub Packages token posted above will not work, because GitHub revokes it every time I post it. You will either have to generate your own in your GitHub profile and use it, or just add the notquests jar to your project directly.

Done! Feel free to use your own GitHub user id / token if you have one.

## Paper and Spigot modules

After installing the API, you will notice that we basically have two almost-identical modules: Paper and Spigot. Please, only use the Paper module. The Spigot module only exists to comply with spigot.org resource guidelines and will be removed once spigot.org is dead and has been replaced with Hangar.

I will not provide feature updates for the Spigot module anymore. Please use the paper module.

Why?

The Spigot API is old and uses a lot of long-abandoned, legacy features. NotQuests however is a modern plugin and uses modern API features, which Spigot does not have and refuses to add. (Most importantly Kyori components, or even stupidly simple stuff like Bukkit.getTPS())

## Using the API

First, add `NotQuests` as `depend:` or `softdepend:` into you plugin.yml.

Then, access the instance with `NotQuests.getInstance()` (use the NotQuests of the paper module) and do whatever you want with it 😄

Make sure to disable your NotQuests integration, if NotQuests.getInstance() is null. Since you are hopefully use the Paper module, it would return null on Spigot servers.

## Registering your own Objectives

You can easily add your own Objectives to NotQuests (either directly or via the API) with, for example,

```java
NotQuests.getInstance().getObjectiveManager().registerObjective("jumpobjective", JumpObjective.class);
```

with JumpObjective extending "Objective" and being similar to all the other objective classes. Just copy the structure.
