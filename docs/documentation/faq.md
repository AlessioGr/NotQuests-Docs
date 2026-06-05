---
title: ❓ Frequently asked questions
sidebar_position: 9
description: This answers questions which have been asked a lot
keywords: [notquests, faq]
---

<details>
<summary>Help, all my rewards show as [HIDDEN]</summary>

Rewards show as hidden by default unless you give them a displayname. So just use `/qa edit [questname] rewards edit [rewardid] displayname` and that'll be displayed instead of [HIDDEN].

This gives you the benefit that you can better specify what the reward is (for example, “Mysterious sword” instead of “NETHERITE_SWORD” if it would be done automatically by the plugin)

</details>

<details>
<summary>Do I need a MySQL database?</summary>

Nope! The standard SQLite database (will be created in your `plugins/NotQuests` folder) will work just fine. However, MySQL is faster and thus recommended. The database queries were also designed with MySQL in mind.

</details>

<details>
<summary>How can I migrate player-data from SQLite to MySQL, or the other-way around?</summary>

I recommend you to do that manually via DBEaver or something like that. Shouldn't be too hard as the SQL Queries for both SQLite and MySQL NotQuests is using are the same. There is one experimental way of doing it automatically though. I won't guarantee that it works, and please make a backup before trying it out:

1. In general.yml set load-playerdata-on-join and save-playerdata-on-quit to false
2. Start server with old database
3. Add new database to the general.yml
4. Do /qa reload (might not be necessary)
5. Do /qa debug loadDataManagerUnsafe
6. Shut down the server
7. Revert what you did in step 1

</details>
