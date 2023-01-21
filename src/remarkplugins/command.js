const visit = require("unist-util-visit");

function htmlEntities(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const plugin = (options) => {
  const transformer = async (ast) => {
    let number = 1;
    visit(ast, "inlineCode", (node) => {
      let text = node.value;

      /* const html = `
                        <h1 style="color: rebeccapurple">
                            ${htmlEntities(text)}
                        </h1>
                    `;*/
      const html = `
            <p class="specialcode">
                ${parseCommand(text)}
            </p>
        `;

      node.type = "html";
      node.children = undefined;
      node.value = html;
    });
  };
  return transformer;
};

function parseCommand(command) {
  const arguments = command.split(" ");
  let finalString = "";
  let index = 0;
  for (argument of arguments) {
    let color = getColorForArgument(argument, index, arguments);
    //...
    argument = htmlEntities(argument);
    if (color === "inherit") {
      finalString += argument + " ";
    } else {
      finalString += `<span class="${color}">${argument} </span> `;
    }
    index++;
  }
  return finalString;
}

function getColorForArgument(argument, index, allArguments) {
  let color = "inherit";
  if (index === 0) {
    if (
      argument === "/qa" ||
      argument === "/notquestsadmin" ||
      argument === "/nqa"
    ) {
      return "color-qa";
    } else if (
      argument === "/q" ||
      argument === "/quests" ||
      argument === "/notquests"
    ) {
      return "color-q";
    }
  }

  if (
    index === 2 &&
    ["edit", "create", "delete", "take", "abort", "preview"].includes(
      allArguments[1]
    )
  ) {
    color = "color-questname";
  }

  if (
    index >= 3 &&
    [
      "actions",
      "conditions",
      "categories",
      "profiles",
      "conversations",
      "triggers",
    ].includes(allArguments[index - 2]) &&
    ["edit", "create", "delete", "add", "remove"].includes(
      allArguments[index - 1]
    )
  ) {
    color = "color-questname";
  }

  if (
    index >= 4 &&
    ["tags", "variables"].includes(allArguments[index - 3]) &&
    ["create", "check"].includes(allArguments[index - 2])
  ) {
    color = "color-questname";
  }

  if (index === 3 && allArguments[1] === "edit") {
    color = "color-quest-operation";
  }

  if (
    allArguments.includes("description") ||
    allArguments.includes("displayName") ||
    allArguments.includes("ConsoleCommand") ||
    //Now convert stringlist to string:
    allArguments.join(" ").includes("objectives add Objective")
  ) {
    let ii = 0;
    if (allArguments.includes("description")) {
      ii = allArguments.indexOf("description");
    }
    if (allArguments.includes("displayName")) {
      ii = allArguments.indexOf("displayName");
    }

    if (allArguments.includes("ConsoleCommand")) {
      ii = allArguments.indexOf("ConsoleCommand");
    }

    if (allArguments.join(" ").includes("objectives add Objective")) {
      ii = allArguments.lastIndexOf("Objective");
    }
    if (index > ii) {
      if (!(index === ii + 1 && argument === "set")) {
        if (argument.startsWith("<") && argument.endsWith(">")) {
          color = "color-quest-string-minimessage"; //TODO: Doesnt work if mm is part of string
        } else {
          color = "color-quest-string"; // TODO: Also maybe check if there is a -- before (for flag)
        }
      }
    }
  }

  if (color === "inherit" && !isNaN(argument)) {
    color = "color-number";
  }

  if (argument.includes(".yml") || argument.includes("plugins/NotQuests")) {
    color = "color-file";
  }

  if (["true", "false"].includes(argument)) {
    color = "color-boolean";
  }

  if (index >= 2) {
    if (
      ["equals", "moreThan", "lessThan", "equalsIgnoreCase"].includes(
        allArguments[index - 1]
      ) &&
      color === "inherit"
    ) {
      let ii = 0;
      if (allArguments.includes("equals")) {
        ii = allArguments.indexOf("equals");
      }
      if (allArguments.includes("moreThan")) {
        ii = allArguments.indexOf("moreThan");
      }
      if (allArguments.includes("lessThan")) {
        ii = allArguments.indexOf("lessThan");
      }
      if (allArguments.includes("equalsIgnoreCase")) {
        ii = allArguments.indexOf("equalsIgnoreCase");
      }
      if (index > ii && ii !== 0) {
        color = "color-expression";
      }
    }
  }

  if (argument.startsWith("--")) {
    color = "color-flag";
  }

  if (argument.startsWith("<") && argument.endsWith(">")) {
    color = "color-optional";
  }

  if (argument === "QuestOnCooldown") {
    color = "inherit";
  }

  return color;
}

module.exports = plugin;
