---
title: 🧍 NPC Quest Givers
sidebar_position: 2
description: Attach quests to NPCs and armor stands so players can pick them up out in the world.
keywords: [notquests, npc, quest giver, citizens, fancynpcs, armor stand, questgiver]
---

import Admonition from '@theme/Admonition';

Letting players run `/q take <quest>` is fine, but it's way more immersive when they walk up to a villager, right-click them, and get handed a quest. That's what **quest givers** are for.

NotQuests supports three kinds of quest givers out of the box:

| Backend | Platforms | Reference format | ID type |
| --- | --- | --- | --- |
| [Citizens](https://www.spigotmc.org/resources/citizens.13811/) | Paper | `citizens:<id>` | a number (e.g. `5`) |
| [FancyNPCs](https://modrinth.com/plugin/fancynpcs) | Paper | `fancynpcs:<uuid>` | a UUID (for example `6ab312dd-ddce-42a6-8965-e45605a05321`) |
| Armor stands | Paper and NeoForge | — (right-click them) | built right into vanilla |

You don't need a separate NPC plugin for armor stands — they work on both supported platforms. Citizens and FancyNPCs are Paper plugin integrations and are not registered on NeoForge.

## Attaching a quest to a Citizens / FancyNPCs NPC

This section applies to Paper servers with the matching NPC plugin installed.

Grab your NPC's id, then:

`/qa edit TheVirus npcs add citizens:5`

…or for a FancyNPC:

`/qa edit TheVirus npcs add fancynpcs:6ab312dd-ddce-42a6-8965-e45605a05321`

That's it — now players can right-click that NPC to preview and take the quest.

<Admonition type="tip" title="Don't know the id? Just click it.">

Instead of an id, type `rightClickSelect` and then right-click the NPC you want:

`/qa edit TheVirus npcs add rightClickSelect`

No need to look anything up. This also works for armor stands.

</Admonition>

### Hiding a quest on an NPC

Sometimes you want a quest *attached* to an NPC without it showing up in that NPC's "available quests" list — for example a delivery target, or the NPC you talk to in order to *finish* a quest. Add the `--hideInNPC` flag:

`/qa edit TheVirus npcs add citizens:5 --hideInNPC`

### Managing a quest's NPCs

- `/qa edit TheVirus npcs list` - shows every NPC this quest is attached to (and whether it's shown or hidden).
- `/qa edit TheVirus npcs clear` - detaches the quest from all NPCs.

## Armor stand quest givers

No NPC plugin? No problem. Any armor stand can be a quest giver.

`/qa edit TheVirus armorstands add`

This hands you a special item (a ghast tear). **Right-click the armor stand** with it, and the quest gets attached. Use the `--hideInArmorStand` flag if you want it attached but not listed.

A couple of companion commands, each of which gives you an item to click an armor stand with:

- `/qa edit TheVirus armorstands remove` - removes the quest from an armor stand you click.
- `/qa edit TheVirus armorstands check` - shows you which quests are on an armor stand you click.

<Admonition type="note">

By default, armor stands with quests attached are protected from accidental edits, and they get a little floating particle so players can spot them. Both are configurable under `visual.armorstands` in [general.yml](/docs/documentation/configuration).

</Admonition>

## Using NPCs inside objectives

The same NPC reference works for objectives that point at an NPC — like [`TalkToNPC`](/docs/documentation/types/objectives), delivering items to an NPC, or finishing a quest by talking to one. On Paper, use the same `citizens:<id>` / `fancynpcs:<uuid>` reference (or `rightClickSelect`). On NeoForge, use an armor stand.

## Giving an NPC a conversation

Quest givers get a lot more lively when they actually *talk*. On Paper, you can bind a [conversation](/docs/tutorials/conversations) to a Citizens or FancyNPCs NPC so right-clicking it starts a dialogue:

`/qa conversations edit myConversation npcs add citizens:5`

`rightClickSelect` works here too. For the full dialogue system — branching options, conditions, in-line actions — head over to the [Conversations guide](/docs/tutorials/conversations).

## Quick recap

- Attach: `/qa edit TheVirus npcs add rightClickSelect => /qa edit <quest> npcs add <npc>`
- Hide on the NPC: add `--hideInNPC`
- Armor stands: `/qa edit <quest> armorstands add`, then right-click the stand
- Conversations: `/qa conversations edit <conversation> npcs add <npc>`

Now go populate your world with quest givers. 🎉
