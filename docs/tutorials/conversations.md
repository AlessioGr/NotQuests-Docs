---
title: 💬 Conversations
sidebar_position: 5
description: This tutorial helps you create conversations
keywords: [notquests, tutorial, conversation, conversations, chat, speak, talk]
---

NotQuests has a wonderful conversation system which allows you to create unlimited conversations with unlimited speakers, options, paths and outcomes each. This is also the hardest feature to understand, since conversations are created YAML files.

Before starting this journey, please learn YAML (yml) first. [Here](https://spacelift.io/blog/yaml) is a tutorial you can use. Make sure you understand the hierarchies of yaml before you continue (e.g. in the below demo conversation code, understand that "greeting" is a PART of the speaker "Atlas" which by itself is a part of the object "Lines". One indentation (spaces) too much or too little and you fuck up the hierarchy and thus the entire syntax)

Next, install a suitable editor with YAML support. I recommend [Visual Studio Code](https://code.visualstudio.com/download). Without a proper editor, it's easy to fuck up the YAML syntax (especially spaces, tabs, indentation) which will cause your conversations to not work. Visual Studio code will show you errors as you type them.

## Create a demo conversations

To get started, first create a demo conversation using `/qa conversations create test --demo`. The --demo flag at the end makes it create a conversation filled with demo data instead of a blank one. **test** is the name of the conversation. You can find the conversation in `plugin/notquests/default/conversations/test.yml` - go ahead and open that one with Visual Studio Code! It should look like this:

```yaml
start: Atlas.specialgreeting,Atlas.greeting1
Lines:
  Atlas:
    color: "<BLUE>"
    delay: 200
    greeting1:
      text: "Hello traveler! I am atlas, the keeper of time!"
      next: Player.greeting1,Player.greeting2
      shout: true
    specialgreeting:
      text: "I don't wanna talk to you while you fulfill this condition. Bye!"
      conditions:
        - condition replaceThisWithTheNameOfYourCondition
    answer1:
      text: "That's a secret, but without me, you all wouldn't exist."
      next: Atlas.answer3
    notime:
      text: "Time is a rare good. Au revoir!"
    answer3:
      text: "Anyways though, what are you doing here?"
      next: Player.three,Player.four,Player.five
    answer4:
      text: "Oooh I see! I'm sure you are in need for some time, then. Should I lend you some?"
      next: Player.lend,Player.nolend
    answer5:
      text: "Here it is!"
      next: Atlas.answer6
    answer6:
      text: "[Hands time]"
      next: Player.bye
    nicebye:
      text: "You're very welcome. Good luck on your ventures!"
      actions:
        - "action replaceThisWithTheNameOfYourAction"
        - "action anotherAction"
  Player:
    delay: 200
    greeting1:
      text: "Nice to meet you! Why do you need to keep time?"
      next: Atlas.answer1
    greeting2:
      text: "I have no time for you."
      next: Atlas.notime
    three:
      text: "I'm just exploring the area!"
      next: Atlas.answer4
    four:
      text: "I'm on a mission."
      next: Atlas.answer4
    five:
      text: "I'm here to meet the king."
      next: Atlas.answer4
    lend:
      text: "Yes, please! I could use some time"
      next: Atlas.answer5
    nolend:
      text: "No, sorry, I have enough time. Thank you for the offer, though!"
      next: Atlas.notime
    bye:
      text: "Thank you a lot, time keeper. See you around!"
      next: Atlas.nicebye
```

With your newest yaml knowledge, try to understand what this file does and how it works. Just use your brain and go through it. Experiment with it, make some changes, and see what happens.

Every time you change the file and save it, you can load all changes in-game using `/qa reload conversations`. Please check your console for warnings and erros afterwards and READ them. You can the start the conversation using `/qa conversations start yourconversationname`, so in this case `/qa conversations start test`.

## Terminology

That file is a **conversation** (test). A conversation has multiple **speakers** (in this case, Atlas and Player). Each speaker has multiple **conversation lines** which are identified using this format: "`<Speaker>.<LineName>`". For example: `Atlas.greeting1`

## Actions and conditions

Each conversation line can have an `actions:` list object, and a `conditions:` list object. When it reaches the conversation line, it will execute all actions you specified there. It will ONLY play the conversation line, if all conditions you specified are fulfilled.

Just check the demo conversation above - it has examples for both actions and conditions.

Conditions usually start with "condition yourconditionname". "condition" at the beginning tells it that it should look for a condition you pre-created in-game, and next comes the name of the condition. Actions work similarly

### Negating conditions

You can negate conditions by putting a "!" in front. Example:

- "!condition yourconditionname"

Make sure to wrap it in quotes ("")

### in-line actions/conditions

So, putting "condition" in front makes it look for a pre-created condition which you created in-game. You can also do stuff like

```yaml
conditions:
- Money moreThan 100
```

or

```yaml
actions:
- StartConversation someotherconversationname
```

instead of

```
actions:
- action youringamecreatedactionwhichstartsanotherconversation
```

This is NOT recommended as there is no documentation for in-line stuff (they usually follow the commands closely) and there is no checking if you do it correctly, unlike the in-game commands which tell you exactly if you do something wrong (`/qa conditions create` and `/qa actions create`)

## Some explanations

I don't have a lot of time so I cannot make a 100% throughout guide yet - instead, try to experiment and understand it yourself. I'll improve this guide gradually when I find time. Let's begin with some explanations:

### start

On line 1, you should see `start: Atlas.specialgreeting,Atlas.greeting1`. This determines where it should start the conversations. In here, 2 conversation lines are specified: Atlas.specialgreeting and Atlas.greeting 1.

How it works is, it first tries to start Atlas.specialgreeting, which is this line:

```yaml
specialgreeting:
    text: "I don't wanna talk to you while you fulfill this condition. Bye!"
    conditions:
    - condition replaceThisWithTheNameOfYourCondition
```

As you can see, it has a text and a condition attached to it. The text is what will be sent to the player. Conditions are conditions which have to be fulfilled in order for the conversation line to play. You can create them in-game using `/qa conditions create yourconditionname ...` - the condition in the demo conversation obviously won't exist, so replace it with your own.

Now, what happens if the attached condition is not fulfilled? Well, since it's the start of the conversation, it would then try to play the next conversation line specified in the comma-separated list in `start: Atlas.specialgreeting,Atlas.greeting1` - and this would be Atlas.greeting1:

```yaml
answer1:
    text: "That's a secret, but without me, you all wouldn't exist."
    next: Atlas.answer3
```

So basically, it only plays the first conversation line specified (Atlas.specialgreeting here) and ignores the second one (Atlas.greeting1) here, UNLESS the condition of the first conversation line is not fulfilled. Then it goes to the next conversation until the FIRST conversation line which has a fulfilled condition. And that's how you can branch your conversation into multiple paths!

### next

Each conversation line has a next: object. See the Atlas.answer1 for example

```yaml
answer1:
    text: "That's a secret, but without me, you all wouldn't exist."
    next: Atlas.answer3
```

The next attribute determines, well, which conversation it should play next. In this case, it goes to `Atlas.answer3` next. This should be quite obvious. Similarly to start, you can also specify multiple conversation lines separated by commas here, if you want to branch it conditionally.

So what happens when a conversation line does not have a `next:` attribute attached to it?

Simple!

The conversation will just end. No next, it'll end.

## Something doesn't work!

Every time you use `/qa reload conversations`, it'll throw warnings inside your server console if anything is wrong. So just read them. Read the damn warnings. They will tell you EXACTLY what went wrong.

Thus, it is a good practice to check your server console every time you reload your conversations, if you did something wrong. If you see a giiiant error which is not yellow and rambles about some yaml errors, you fucked up the yaml syntax. Thus, as I said in the second and third paragraph of this guide, use a proper editor which shows you errors as you type them (like Visual Studio Code) and read the yaml tutorial. Yaml is very anal about its syntax - if you forget one space or add a space too much, you're fucked.

Also tip: better us too many quotes than too little.