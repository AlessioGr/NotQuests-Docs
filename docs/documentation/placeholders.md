---
title: 📄 Placeholders
sidebar_position: 6
description: This lists all PlaceholderAPI placeholders available in NotQuests and explains what they do
keywords: [notquests, PlaceholderAPI, placeholders]
---

These all require [PlaceholderAPI](https://github.com/PlaceholderAPI/PlaceholderAPI/releases). Anything in **UPPERCASE** you replace yourself — `QUESTNAME` with a quest's name, `OBJECTIVEID` with an objective ID (find it with `/qa edit questname objectives list`), and so on.

## Quest points & counts

- `%notquests_player_questpoints%` — the player's current quest points.
- `%notquests_player_active_quests_amount%` — how many quests the player has active right now.
- `%notquests_player_completed_quests_amount%` — how many quests the player has completed.

## Quest lists

- `%notquests_player_active_quests_list_horizontal%` — the player's active quests on one line. The separator, a limit, and whether to use display names are all configurable under `placeholders` in [general.yml](/docs/documentation/configuration).
- `%notquests_player_active_quests_list_vertical%` — the same, but one quest per line.

## Quest status

These return `Yes` or `No`:

- `%notquests_player_has_completed_quest_QUESTNAME%` — has the player ever completed this quest?
- `%notquests_player_has_current_active_quest_QUESTNAME%` — does the player have this quest active right now?

## Objective status

These return `Yes` or `No`:

- `%notquests_player_is_objective_unlocked_OBJECTIVEID_from_active_quest_QUESTNAME%` — is this objective unlocked (whether it's still active or already completed)?
- `%notquests_player_is_objective_unlocked_and_active_OBJECTIVEID_from_active_quest_QUESTNAME%` — is this objective unlocked **and** still active (not yet completed)?
- `%notquests_player_is_objective_completed_OBJECTIVEID_from_active_quest_QUESTNAME%` — has this objective been completed?

## Objective progress

- `%notquests_player_objective_progress_OBJECTIVEID_from_active_quest_QUESTNAME%` — the current progress count on the objective (e.g. `7` when 7 of 10 blocks are broken).
- `%notquests_player_objective_progress_percentage_OBJECTIVEID_from_active_quest_QUESTNAME%` — that same progress as a percentage (`0`–`100`).

## Cooldowns

- `%notquests_player_quest_cooldown_left_formatted_QUESTNAME%` — formatted time left before the player can take this quest again.

## Power tools

These reach straight into NotQuests' systems, so they're hugely flexible:

- `%notquests_player_variable_VARIABLENAME%` — the value of any [variable](/docs/documentation/types/variables) (for example `Money` or `PlaytimeMinutes`).
- `%notquests_player_tag_TAGNAME%` — the value of one of the player's [tags](/docs/documentation/types/variables#tag-variables).
- `%notquests_player_expression_EXPRESSION%` — calculates any NotQuests [expression](/docs/tutorials/getting-started) and returns the result. Math, variables, tags — all fair game.
- `%notquests_player_rounded_expression_EXPRESSION%` — the same, rounded to a whole number.
