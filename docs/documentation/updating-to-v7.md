---
title: Updating from 6.3 to v7
sidebar_position: 8
description: How to update a NotQuests 6.3 server to NotQuests 7 safely.
keywords: [notquests, update, migration, 6.3, 7.0, paper, neoforge]
---

# Updating from 6.3 to v7

NotQuests 7.0.0-beta.1 targets **Minecraft 26.2** and **Java 25**. It supports Paper and NeoForge; Spigot is no longer supported.

## Before starting

1. Stop the server completely.
2. Back up the complete NotQuests data folder and, if you use MySQL, make a database backup.
3. Update the server to Minecraft 26.2 and Java 25.
4. Replace the old jar with the matching v7 Paper or NeoForge jar.

The data folder is:

| Platform | Location            |
| -------- | ------------------- |
| Paper    | `plugins/NotQuests` |
| NeoForge | `<world>/notquests` |

For NeoForge, install the jar in `mods/` on the server and each client. The client install renders NotQuests objective markers.

## What happens on first startup

The released 6.3 player database schema is still the v7 database schema. Existing quest points, active quests, objective progress, completion history, failures, triggers, tags, and profiles load directly; you do not need to export or re-import the database.

Configuration files do need a one-time conversion. Before changing anything, NotQuests creates a full migration backup. It then converts the released 6.3 YAML shapes to the v7 format, including:

- quests, nested objectives, rewards, requirements, and action chains;
- exact items, saved-item selections, journal items, enchantments, and item flags;
- locations, yaw/pitch, completion NPCs, and NPC selectors;
- conversations and their NPC attachments;
- renamed general configuration values.

The completed migration version is written to `general.yml`, so this conversion runs only once. Do not edit `data-migration-version-do-not-edit`.

After the first successful startup, check the console, open a few quests, and verify one existing player's progress before reopening the server.

## Add-on developers

The Java extension API was redesigned for v7. Packages moved from `rocks.gravili.notquests` to `com.notquests`, and custom types now use registry packs instead of subclassing Paper implementation classes. Rebuild add-ons against the v7 jar and follow the [v7 API tutorial](./api/api-tutorial).
