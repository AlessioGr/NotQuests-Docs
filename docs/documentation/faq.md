---
sidebar_position: 8
---

# ❓ Frequently asked questions

<details><summary>Help, all my rewards show as [HIDDEN]</summary>
<p>

Rewards show as hidden by default unless you give them a displayname. So just use `/qa edit [questname] rewards edit [rewardid] displayname` and that'll be displayed instead of [HIDDEN].

This gives you the benefit that you can better specify what the reward is (for example, “Mysterious sword” instead of “NETHERITE_SWORD” if it would be done automatically by the plugin)

</p>
</details>

<details><summary>Do I need a MySQL database?</summary>
<p>

Nope! The standard SQLite database (will be created in your `plugins/NotQuests` folder) will work just fine. However, MySQL is faster and thus recommended. The database queries were also designed with MySQL in mind.

</p>
</details>
