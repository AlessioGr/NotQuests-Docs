---
title: 📄 Placeholders
sidebar_position: 5
description: This lists all PlaceholderAPI placeholders available in NotQuests and explains what they do
keywords: [notquests, PlaceholderAPI, placeholders]
---

## Player Placeholders

These are all the Player Placeholders you can use ([PlaceholderAPI](https://github.com/PlaceholderAPI/PlaceholderAPI/releases) required):

- %notquests_player_has_completed_quest_QUESTNAME%
- %notquests_player_has_current_active_quest_QUESTNAME%
- %notquests_player_is_objective_unlocked_and_active_OBJECTIVEID_from_active_quest_QUESTNAME%
- %notquests_player_is_objective_unlocked_OBJECTIVEID_from_active_quest_QUESTNAME%
- %notquests_player_is_objective_completed_OBJECTIVEID_from_active_quest_QUESTNAME%
- %notquests_player_questpoints%
- %notquests_player_active_quests_list_horizontal%
- %notquests_player_active_quests_list_vertical%
- %notquests_player_completed_quests_amount%
- %notquests_player_active_quests_amount%
- %notquests_player_tag_TAGNAME%
- %notquests_player_variable_VARIABLENAME%
- %notquests_player_expression_EXPRESSION%
- %notquests_player_rounded_expression_EXPRESSION%
- %notquests_player_quest_cooldown_left_formatted_QUESTNAME%
- %notquests_player_objective_progress_OBJECTIVEID_from_active_quest_QUESTNAME%
- %notquests_player_objective_progress_percentage_OBJECTIVEID_from_active_quest_QUESTNAME%

If applicable, you will need to replace `QUESTNAME` with the name of the quest and `OBJECTIVEID` with the ID of the objective (visible in `/qa edit questname objectives list`) and so on. Uppercase parts of the placeholder will need to be replaced by you.
