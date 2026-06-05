// Remark plugin: turns inline code (`/qa ...`) into colour-highlighted command spans.
//
// MDX v3 (Docusaurus 3) parses raw HTML in markdown as JSX, so emitting an HTML string
// (`<span class="...">`) no longer works (`class` is not valid JSX, and the markup is not
// rendered). Instead we emit proper MDX JSX element nodes (mdxJsxTextElement with a
// `className` attribute). We also drop the now ESM-only `unist-util-visit` dependency and
// use a tiny built-in walker so this file can stay CommonJS.

function visitInlineCode(node, callback) {
  if (!node || typeof node !== "object") return;
  if (node.type === "inlineCode") {
    callback(node);
    return;
  }
  if (Array.isArray(node.children)) {
    node.children.forEach((child) => visitInlineCode(child, callback));
  }
}

function textNode(value) {
  return { type: "text", value };
}

function colouredSpan(className, value) {
  return {
    type: "mdxJsxTextElement",
    name: "span",
    attributes: [
      { type: "mdxJsxAttribute", name: "className", value: className },
    ],
    children: [textNode(value)],
  };
}

const plugin = (options) => {
  return async (ast) => {
    visitInlineCode(ast, (node) => {
      const children = parseCommand(node.value);
      node.type = "mdxJsxTextElement";
      node.name = "span";
      node.attributes = [
        { type: "mdxJsxAttribute", name: "className", value: "specialcode" },
      ];
      node.children = children;
      delete node.value;
    });
  };
};

function parseCommand(command) {
  const allArguments = command.split(" ");
  const nodes = [];
  let index = 0;
  for (const argument of allArguments) {
    const color = getColorForArgument(argument, index, allArguments);
    // Text nodes are escaped automatically by MDX, so no manual HTML-entity encoding.
    if (color === "inherit") {
      nodes.push(textNode(argument + " "));
    } else {
      nodes.push(colouredSpan(color, argument + " "));
    }
    index++;
  }
  return nodes;
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
          color = "color-quest-string-minimessage";
        } else {
          color = "color-quest-string";
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

  if (
    argument.startsWith("<") &&
    argument.endsWith(">") &&
    !argument.includes("/")
  ) {
    color += " color-optional";
  }

  if (argument === "QuestOnCooldown") {
    color = "inherit";
  }

  return color;
}

module.exports = plugin;
