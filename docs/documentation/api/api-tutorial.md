---
sidebar_position: 2
---

# 💻 API Example Project Tutorial

Let's create our first Project using the NotQuests API!

## First Step: Adding the NotQuests API to your Project

First, create a libs folder in your project and add the NotQuests jar to it. *You can also use our GitHub packages repository, but it doesn't work that well because you'll need to generate your own GitHub secret key and can't publish it. As for JitPack, they don't support Java 17.*

![Libs folder](/img/api-tutorial/libsfolder.png)

Assuming you are using gradle as your build tool (you should), then head to your `build.gradle` file and add the following to your dependencies:

```groovy
dependencies {
    compileOnly 'io.papermc.paper:paper-api:1.18.1-R0.1-SNAPSHOT'
    compileOnly files('libs/notquests-4.10.1.jar')
}
```

Next, open your plugin.yml and add NotQuests as a depend or softdepend. In our case, we'll add it as a depend:
![plugin.yml](/img/api-tutorial/pluginyml.png)

## Step 2: getting the NotQuests instance

NotQuests has one module for Spigot and one module for Paper. They're both very different and the Spigot module is much older. In this Tutorial, we'll be creating our own Objectives, Conditions and Actions using the Paper module only.

Make sure you only use the classes from the paper module:
![Paper and Spigot module](/img/api-tutorial/paperspigot.png)

Well, let's start by creating the (proper) NotQuests instance in our Main:

```java
public final class NotQuestsAPIExample extends JavaPlugin {

    NotQuests notQuestsInstance;
    
    @Override
    public void onEnable() {
        // Plugin startup logic
        notQuestsInstance = NotQuests.getInstance();
    }

    @Override
    public void onDisable() {
        // Plugin shutdown logic
    }
}
```

Cool. NotQuests barely uses any static shit, so we'll be using the instance for basically everything.

## Let's create an action and a condition (= requirement) via variables

In NotQuests you can create a Condition, an Action, or both at the same time using variables!

Let's create a variable for the player's food level. Create a new class called `FoodLevelVariable` and make it extend `Variable<Integer>`. The food level is an integer and the Variable class uses generics.

Then, implement all necessary methods using your IDE. It should look like this:

```java
public class FoodLevelVariable extends Variable<Integer> {
    private final NotQuests main;
    
    public FoodLevelVariable(NotQuests main) {
        super(main);
        this.main = main;
    }

    @Override
    public Integer getValue(Player player, Object... objects) {
        return null;
    }

    @Override
    public boolean setValueInternally(Integer integer, Player player, Object... objects) {
        return false;
    }

    @Override
    public List<String> getPossibleValues(Player player, Object... objects) {
        return null;
    }

    @Override
    public String getPlural() {
        return null;
    }

    @Override
    public String getSingular() {
        return null;
    }
}
```

All we need to do is fill out the each and every method. Let's start with getValue. This method will be used for the Condition which is generated from this variable. Here, we need to return the player's current food level. Pretty simple:

```java
@Override
public Integer getValue(Player player, Object... objects) {
    return player.getFoodLevel();
}
```

Next, in setValueInternally, that's what's used internally for the action. By default, a variable only needs the getValue method filled out. Only SOME variables can also change the value. It works here, so let's fill it out:

```java
@Override
public boolean setValueInternally(Integer integer, Player player, Object... objects) {
    player.setFoodLevel(integer);
    return true;
}
```

Always return true there if the setting-of-the-value is successful. Now we need to enable setting the value in the constructor. Otherwise, the corresponding action will not be generated:

```java
public FoodLevelVariable(NotQuests main) {
    super(main);
    this.main = main;
    setCanSetValue(true);
}
```

As for getPossibleValues, let's leave it at null. NotQuests will just use the default integer auto-completion there. For getSingular and getPlural, use this:

```java
    @Override
    public String getPlural() {
        return "Food level";
    }

    @Override
    public String getSingular() {
        return "Food levels";
    }
```

And we're done! Now just register this variable in the onEnable method in your Main:

```java
@Override
public void onEnable() {
    // Plugin startup logic
    notQuestsInstance = NotQuests.getInstance();
    notQuestsInstance.getVariablesManager().registerVariable("FoodLevel", FoodLevelVariable.class);
}
```

Done! Let's see how it looks in-game. During startup, you should be able to see this "Registering Variable" line in the console:

![Registering the variable in the console](/img/api-tutorial/consoleregistering.png)

That'd be how you create the condition:

![In-game command](/img/api-tutorial/foodlevelconditioncommand.png)

And the action:

![In-game command](/img/api-tutorial/foodlevelactioncommand.png)

And if we execute it via `/qa actions edit actionname4 execute`:

![FoodLevel action executes](/img/api-tutorial/actionexecuted.png)

For many simple values you can use the variable system. Not only is it easier, it also gives you access to the advanced comparison operators (like being able to use Math and other variables in the expression for Integer variables).

## Let's create an Objective

Create the class called `TakeDamageObjective` and make it extend `Objective`. Then implement everything. It should look like this:

```java
public class TakeDamageObjective extends Objective {
    private final NotQuests main;

    public TakeDamageObjective(NotQuests main) {
        super(main);
        this.main = main;
    }

    @Override
    public String getObjectiveTaskDescription(Player player) {
        return null;
    }

    @Override
    public void save(FileConfiguration fileConfiguration, String s) {

    }

    @Override
    public void load(FileConfiguration fileConfiguration, String s) {

    }

    @Override
    public void onObjectiveUnlock(ActiveObjective activeObjective, boolean b) {

    }

    @Override
    public void onObjectiveCompleteOrLock(ActiveObjective activeObjective, boolean b, boolean b1) {

    }
}
```

Let's already register it in our onEnable in our Main:

```java
@Override
public void onEnable() {
    // Plugin startup logic
    notQuestsInstance = NotQuests.getInstance();
    notQuestsInstance.getVariablesManager().registerVariable("FoodLevel", FoodLevelVariable.class);
    notQuestsInstance.getObjectiveManager().registerObjective("TakeDamage", TakeDamageObjective.class);
}
```

Now back to our `TakeDamageObjective`, just fill out each method. You can see how other Objectives do it [here](https://github.com/AlessioGr/NotQuests/tree/main/paper/src/main/java/rocks/gravili/notquests/paper/structs/objectives).

Then, you'll need to register and handle your own Bukkit events to add Progress (and eventuall complete) your objective. For the internal objectives, I'm doing that [here](https://github.com/AlessioGr/NotQuests/blob/main/paper/src/main/java/rocks/gravili/notquests/paper/events/QuestEvents.java). Feel free to copy the boilerplate code.

I'll add a more explanatory tutorial on this later, feel free to ask for help on our Discord.
