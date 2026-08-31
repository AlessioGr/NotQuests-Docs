---
title: 🧭 Guided Location Quest
sidebar_position: 4
description: Create a quest that guides players to a place with a marker beam and an optional bossbar compass.
keywords: [notquests, tutorial, location, marker, beam, bossbar, compass, guided quest]
---

This tutorial shows how to make a quest that points players toward a real place in your world.

The player will:

1. accept a quest,
2. see the normal objective progress,
3. follow a guiding marker beam,
4. optionally use a bossbar compass to face the right direction,
5. interact with the target block to finish the objective.

We'll build a small quest called **Lost Relic**. The player has to find an old crate near some ruins and right-click it.

![A player following a NotQuests guiding beam with the bossbar compass visible at the top.](/img/tutorials/guided-location-quest/01-player-following-marker.jpg)

## Before you start

Pick the exact block or spot players should find. Stand there in-game and note:

- the world name,
- the `x`, `y`, and `z` coordinates,
- which block the player should right-click.

In this tutorial, replace `world 100 64 200` with your real location.

## Enable the visual helpers

Open `general.yml` in the NotQuests data folder (`plugins/NotQuests` on Paper or `<world>/notquests` on NeoForge) and check this section:

```yaml
visual:
  objective-tracking:
    actionbar:
      enabled: true
    bossbar:
      enabled: true
    location-compass:
      enabled: true
```

`actionbar` and `bossbar` show objective progress. `location-compass` adds the direction helper for objectives that have a saved marker location.

Restart the server or reload NotQuests after changing the config.

## Create the quest

Create the quest:

`/qa create LostRelic`

Give it a name and description players will understand:

`/qa edit LostRelic displayName set Lost Relic`

`/qa edit LostRelic description set The blacksmith lost an old crate near the ruins. Follow the marker and inspect it.`

## Add the objective

For this tutorial, use an `Interact` objective. It completes when the player right-clicks the block at your chosen location:

`/qa edit LostRelic objectives add Interact 1 world 100 64 200 --rightClick --maxDistance 2 --cancelInteraction --taskDescription "Inspect the lost crate"`

What this means:

- `1` - the player must interact once.
- `world 100 64 200` - the block or spot to interact with.
- `--rightClick` - only right-clicks count.
- `--maxDistance 2` - the player must be close enough.
- `--cancelInteraction` - prevents the click from also opening or changing the block.
- `--taskDescription` - the text players see for this objective.

## Add the guiding marker

The objective now has a real target, but the marker beam is a separate setting. Set it to the same place:

`/qa edit LostRelic objectives edit 1 location set world 100 64 200`

If you are standing exactly where the marker should point, you can use this instead:

`/qa edit LostRelic objectives edit 1 location set here`

You can also aim at the block and use:

`/qa edit LostRelic objectives edit 1 location set looking`

Check that the marker is saved:

`/qa edit LostRelic objectives edit 1 location status`

Preview the marker before giving the quest to players:

`/qa edit LostRelic objectives edit 1 location preview`

## Test it like a player

Take the quest:

`/q take LostRelic`

Walk away from the target location. If everything is set up correctly:

- the objective appears in the actionbar or bossbar,
- the marker beam points toward the saved location,
- the bossbar compass shows whether the marker is ahead, left, right, or behind,
- the distance goes down as you get closer.

Right-click the target block to complete the objective.

## Optional: attach the quest to an NPC

For a nicer player flow, attach the quest to an NPC or armor stand:

`/qa edit LostRelic npcs add rightClickSelect`

After running the command, right-click the NPC that should offer the quest.

For more detail, see the [NPC quest givers tutorial](/docs/tutorials/npc-quest-givers).

## Common issues

- **No marker appears:** run `location status` and make sure the marker is enabled.
- **The compass does not show:** check `visual.objective-tracking.location-compass.enabled` in `general.yml`.
- **The marker points to the wrong place:** stand at the correct spot and run `location set here` again.
- **The objective does not complete:** make sure the `Interact` objective coordinates match the block the player is clicking.
- **The player is in another world:** marker tracking works best when the player and marker are in the same world.

## Marker beams vs the Beam action

This tutorial uses **objective location markers**. They are tied to the objective the player is tracking and are usually the best choice for guiding players.

The separate [`Beam` action](/docs/documentation/types/actions#-beam) is for manually spawning or removing a named beam from rewards, triggers, or saved actions. Use that when you want a custom effect, not basic quest navigation.

## Quick recap

- Add any objective that has a place in the world.
- Set its marker with `location set here`, `location set looking`, or exact coordinates.
- Enable `visual.objective-tracking.location-compass.enabled` if you want the bossbar compass.
- Use `location preview` before players try the quest.
- Test the quest with `/q take LostRelic`.
