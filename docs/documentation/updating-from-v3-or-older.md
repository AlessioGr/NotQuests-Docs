---
sidebar_position: 6
title: NotQuests Updating from V3
description: This explains how the update process from NotQuests version 3 or older to version 4 or newer works
keywords: [notquests]
---

# 🆙 Updating from v3 or older

In version 4.x of notquests, I have made a lot of changes to conditions (includes Requirements), actions (includes Rewards) and the entire folder structure (because of categories).

Writing an automatic converter for that would be hard and take a long time, which I'm not willing to spend. That's why previous versions of NotQuests are not fully compatible with v4.x.

## How to update

### Easy way: clean install

The easiest way would be to shut down the server, delete the `plugins/NotQuests` folder, update the NotQuests jar and then start over again. You would lose all progress, but it would be a clean update.
You might want to restore your previous conversations (see step 3 of Harder way below) though, as it's pretty easy. You would just need to move the folder.

### Harder way: Trying to keep as much data as possible

1. Shut down your server and delete the `plugins/NotQuests/translations` folder.
2. Update the plugin jar, start the server and then shut it down again
3. Move the `plugins/NotQuests/conversations` folder to `plugins/NotQuests/default/conversations`. That way, you will keep all previously created conversations
4. Move the `plugins/NotQuests/quests.yml` file to `plugins/NotQuests/default/quests.yml`. Then open the quests.yml and remove ALL rewards/requirements (actions/conditions) from the file. If this is too hard for you, just delete the quests.yml and start over again.
5. Start the server and re-create all actions and conditions. Most of them will be broken with this update and I don't think it's worth trying to restore those. The `plugins/NotQuests/actions.yml` and `plugins/NotQuests/conditions.yml` can be deleted, as only the ones in the `plugins/NotQuests/default` folder will be read.
6. Check your console when the server starts up and look out for warnings or errors. If you see some, read them and try to fix them. This is likely to happen with many quests if you decide to do step 4.
