---
sidebar_position: 1
---

# 🪨 BetonQuest

You can use the following Events and Conditions inside of BetonQuest. Only [BetonQuest 2.x and higher](https://betonquest.org/) is supported. I won't add BetonQuest 1.x support. You need minimum NotQuests version 1.5.3 to be able to use all the events and conditions.

## Events you can use in BetonQuest

_notquests_triggerobjective triggername_

**Triggers a TriggerObjective for a player**

***

_notquests_action actionname questname_(optional - only used for {QUEST} placeholder in the action)

**Runs an action which is defined in NotQuests**

***

_notquests_startquest questname_   (optional: -force -silent -notriggers)

**Starts a quest for a player**

***

_notquests_failquest questname_

**Fails a quest for a player**

***

_notquests_abortquest questname_ //Just removes the quest from the player if it's active. Does not fail the quest

**Aborts a quest for a player. This does not fail it and thus doesn't trigger any fail triggers. It directly removes the quest.**

***

_notquests_questpoints action(set/add/remove) amount_   (optional: -silent)

**Set, add or remove quest points for a player**

***

### Conditions you can use in BetonQuest:

_notquests_requirement requirementtype string int_

**Can do basically everything which NotQuests requirements can do. string and int is dependant on the requirement. Example: _notquests_requirement OtherQuest otherquestname 1_**

***

_notquests_is_quest_active questname_

**Returns true if the given quest is active for the player**

***

_notquests_active_quest_is_objective_unlocked questname objectiveid_

**Returns true if the given quest is active for the player AND if the specified objective is unlocked/active (not hidden). Doesn't count completed objectives.**

***

_notquests_active_quest_is_objective_completed questname objectiveid_

**Returns true if the given quest is active for the player AND if the specified objective is completed.**

***
