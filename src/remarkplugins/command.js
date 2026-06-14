// Remark plugin: turns `/q ...` and `/qa ...` inline code into rich, schema-backed command
// displays. The schema is generated at build time from NotQuests' native command tree by
// scripts/update-command-reference.mts. The browser never loads the JSON; MDX receives ready-made
// spans and Twoslash-style hover cards.
//
// Display override syntax:
//   `/qa full command with real values => /qa shorter display`
// The left side is used for schema matching; only the right side is rendered, with a "full" hover.

const fs = require('node:fs');
const path = require('node:path');

const schemaPath = path.join(__dirname, 'command-schema.generated.json');
const commandSchema = loadSchema();
const commandsByRoot = buildCommandIndex(commandSchema.commands);
const optionalIntegrationPrefix = '@optional-integration ';

function loadSchema() {
  try {
    return JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
  } catch {
    return {commands: []};
  }
}

function buildCommandIndex(commands) {
  const byRoot = new Map();
  for (const command of commands || []) {
    const roots = [command.root, ...(command.rootAliases || [])].map(normalizeRoot);
    for (const root of roots) {
      if (!byRoot.has(root)) {
        byRoot.set(root, []);
      }
      byRoot.get(root).push(command);
    }
  }
  for (const list of byRoot.values()) {
    list.sort((a, b) => b.segments.length - a.segments.length || b.syntax.length - a.syntax.length);
  }
  return byRoot;
}

function visitCommandNodes(node, callback) {
  if (!node || typeof node !== 'object') return;
  if (node.type === 'inlineCode' || node.type === 'code') {
    callback(node);
    return;
  }
  if (Array.isArray(node.children)) {
    node.children.forEach((child) => visitCommandNodes(child, callback));
  }
}

function textNode(value) {
  return {type: 'text', value};
}

function richSpan(className, value, title) {
  const attributes = [{type: 'mdxJsxAttribute', name: 'className', value: className}];
  if (title) {
    attributes.push({type: 'mdxJsxAttribute', name: 'aria-label', value: title});
  }
  const children = [textNode(value)];
  if (title) {
    children.push(tooltipNode(title));
  }
  return {
    type: 'mdxJsxTextElement',
    name: 'span',
    attributes,
    children,
  };
}

function tooltipNode(title) {
  const [heading, ...lines] = String(title).split('\n').filter(Boolean);
  const children = [
    {
      type: 'mdxJsxTextElement',
      name: 'span',
      attributes: [{type: 'mdxJsxAttribute', name: 'className', value: 'commandRichTooltipTitle'}],
      children: [textNode(heading || 'Command detail')],
    },
  ];

  for (const line of lines) {
    const row = tooltipRow(line);
    children.push(row);
  }

  return {
    type: 'mdxJsxTextElement',
    name: 'span',
    attributes: [
      {type: 'mdxJsxAttribute', name: 'className', value: 'commandRichTooltip'},
      {type: 'mdxJsxAttribute', name: 'aria-hidden', value: 'true'},
    ],
    children,
  };
}

function tooltipRow(line) {
  const match = line.match(/^(Accepts|Example|Full command):\s*(.*)$/);
  if (!match) {
    return {
      type: 'mdxJsxTextElement',
      name: 'span',
      attributes: [{type: 'mdxJsxAttribute', name: 'className', value: 'commandRichTooltipDescription'}],
      children: [textNode(line)],
    };
  }

  return {
    type: 'mdxJsxTextElement',
    name: 'span',
    attributes: [{type: 'mdxJsxAttribute', name: 'className', value: 'commandRichTooltipRow'}],
    children: [
      {
        type: 'mdxJsxTextElement',
        name: 'span',
        attributes: [{type: 'mdxJsxAttribute', name: 'className', value: 'commandRichTooltipLabel'}],
        children: [textNode(match[1])],
      },
      {
        type: 'mdxJsxTextElement',
        name: 'span',
        attributes: [{type: 'mdxJsxAttribute', name: 'className', value: 'commandRichTooltipValue'}],
        children: [textNode(match[2])],
      },
    ],
  };
}

const plugin = () => {
  return async (ast) => {
    visitCommandNodes(ast, (node) => {
      if (node.type === 'inlineCode') {
        transformInlineCommand(node);
      } else if (node.type === 'code') {
        transformCodeBlock(node);
      }
    });
  };
};

function transformInlineCommand(node) {
  const raw = node.value;
  const command = splitDisplayOverride(raw);
  const isCommand = isCommandLike(command.analysis);
  const children = isCommand
    ? [copyButtonNode(command.analysis), ...renderCommand(raw)]
    : parseNonCommandCode(raw);
  node.type = 'mdxJsxTextElement';
  node.name = 'span';
  node.attributes = [
    {
      type: 'mdxJsxAttribute',
      name: 'className',
      value: isCommand ? 'specialcode specialcode--cmd commandRich' : 'specialcode',
    },
  ];
  node.children = children;
  delete node.value;
}

function transformCodeBlock(node) {
  const lines = String(node.value || '').split('\n');
  if (!lines.some((line) => isCommandLike(splitDisplayOverride(line).analysis))) {
    return;
  }

  const children = [];
  lines.forEach((line, index) => {
    if (index > 0) {
      children.push({type: 'break'});
    }
    if (isCommandLike(splitDisplayOverride(line).analysis)) {
      children.push(commandLineNode(line));
    } else {
      children.push(textNode(line));
    }
  });

  node.type = 'mdxJsxFlowElement';
  node.name = 'div';
  node.attributes = [
    {type: 'mdxJsxAttribute', name: 'className', value: 'specialcode specialcode--cmd commandRich commandRichBlock'},
  ];
  node.children = children;
  delete node.value;
  delete node.lang;
  delete node.meta;
}

function commandLineNode(line) {
  const command = splitDisplayOverride(line);
  return {
    type: 'mdxJsxTextElement',
    name: 'span',
    attributes: [{type: 'mdxJsxAttribute', name: 'className', value: 'commandRichLine'}],
    children: [copyButtonNode(command.analysis), ...renderCommand(line)],
  };
}

function renderCommand(raw) {
  const sample = splitDisplayOverride(raw);
  const analysisTokens = tokenize(sample.analysis);
  const analysisMatch = matchCommand(analysisTokens, {allowPartial: false});
  const displayTokens = tokenize(sample.display);
  const match = analysisMatch
    ? matchCommand(displayTokens, {allowPartial: true, command: analysisMatch.command})
    : matchCommand(displayTokens, {allowPartial: true});
  const projectedParts = analysisMatch && sample.analysis !== sample.display
    ? projectDisplayOntoAnalysis(displayTokens, analysisMatch, sample.analysis)
    : null;
  const parts = projectedParts ?? match?.parts;
  if (!parts) {
    if (sample.allowUnmatched) {
      return parseFallbackCommand(sample.display);
    }
    throw new Error(`Command example is not backed by the generated NotQuests command schema: ${sample.analysis}`);
  }

  const nodes = [];
  parts.forEach((part, index) => {
    if (index > 0) {
      nodes.push(textNode(' '));
    }
    nodes.push(richSpan(tokenClassName(part), part.raw, part.title));
  });
  return nodes;
}

function projectDisplayOntoAnalysis(displayTokens, analysisMatch, fullCommand) {
  if (!displayTokens.length || !analysisMatch?.parts?.length) {
    return null;
  }

  const offset = bestProjectionOffset(displayTokens, analysisMatch.parts);
  const parts = [];
  for (let index = 0; index < displayTokens.length; index++) {
    const token = displayTokens[index];
    if (token.value === '...') {
      parts.push({
        raw: token.raw,
        kind: 'expand',
        semantic: 'expand',
        title: `More command input\nFull command: ${fullCommand}`,
      });
      continue;
    }

    const source = analysisMatch.parts[offset + index];
    if (!source) {
      parts.push({
        raw: token.raw,
        kind: 'expand',
        semantic: 'expand',
        title: `Displayed shortcut\nFull command: ${fullCommand}`,
      });
      continue;
    }

    parts.push({
      ...source,
      raw: index === 0 && token.value.startsWith('/') ? token.raw : token.raw,
      title: projectedTitle(source, token.raw),
    });
  }
  return parts;
}

function bestProjectionOffset(displayTokens, sourceParts) {
  if (displayTokens[0]?.value?.startsWith('/')) {
    return 0;
  }

  let best = {offset: 0, score: -1};
  for (let offset = 0; offset < sourceParts.length; offset++) {
    let score = 0;
    let failed = false;
    for (let index = 0; index < displayTokens.length; index++) {
      const token = displayTokens[index];
      const source = sourceParts[offset + index];
      if (!source) {
        break;
      }
      if (token.value === '...') {
        score += 1;
        continue;
      }
      const tokenScore = projectionTokenScore(token, source);
      if (tokenScore < 0) {
        failed = true;
        break;
      }
      score += tokenScore;
    }
    if (!failed && score > best.score) {
      best = {offset, score};
    }
  }
  return best.offset;
}

function projectionTokenScore(token, source) {
  if (source.kind === 'literal') {
    const sourceValue = String(source.raw || '').replace(/^\//, '');
    const tokenValue = String(token.value || '').replace(/^\//, '');
    if (token.value.startsWith('<') || token.value.startsWith('[')) {
      return 5;
    }
    return equalsCommandToken(tokenValue, sourceValue) ? 10 : -1;
  }

  if (source.kind === 'argument') {
    if (token.value.startsWith('--')) {
      return String(source.raw || '').toLowerCase().includes(token.value.toLowerCase()) ? 8 : -1;
    }
    if (token.value.startsWith('<') || token.value.startsWith('[') || token.value === '(flags)') {
      return 6;
    }
    return 2;
  }

  if (source.kind === 'flag') {
    return token.value.startsWith('--') && equalsCommandToken(token.value, source.raw) ? 10 : -1;
  }

  if (source.kind === 'flagValue') {
    return token.value.startsWith('--') ? -1 : 3;
  }

  return 1;
}

function projectedTitle(source, displayValue) {
  const sourceLines = String(source.title || '').split('\n').filter(Boolean);
  const heading = sourceLines[0] || 'Command detail';
  const body = sourceLines.filter((line) => !/^(Kind|Accepts|Example|Full command):?/.test(line) && line !== heading);

  if (source.kind === 'literal' && displayValue !== source.raw) {
    const lines = [isPlaceholder(displayValue) ? displayValue : String(displayValue)];
    lines.push(...body);
    if (source.raw && source.raw !== displayValue) {
      lines.push(`Example: ${source.raw}`);
    }
    return lines.join('\n');
  }

  if (source.kind === 'argument') {
    const lines = [isPlaceholder(displayValue) ? displayValue : heading];
    lines.push(...body);
    const accepts = acceptsFromTitle(source.title);
    if (accepts) {
      lines.push(`Accepts: ${accepts}`);
    }
    if (!isPlaceholder(displayValue) && displayValue !== source.raw) {
      lines.push(`Example: ${source.raw}`);
    }
    return lines.join('\n');
  }

  return userFacingTitle(source.title);
}

function copyButtonNode(command) {
  return {
    type: 'mdxJsxTextElement',
    name: 'button',
    attributes: [
      {type: 'mdxJsxAttribute', name: 'type', value: 'button'},
      {type: 'mdxJsxAttribute', name: 'className', value: 'commandCopyButton'},
      {type: 'mdxJsxAttribute', name: 'data-command-copy-value', value: command},
      {type: 'mdxJsxAttribute', name: 'aria-label', value: 'Copy command'},
      {type: 'mdxJsxAttribute', name: 'title', value: 'Copy command'},
    ],
    children: [
      {
        type: 'mdxJsxTextElement',
        name: 'span',
        attributes: [
          {type: 'mdxJsxAttribute', name: 'className', value: 'commandCopyPrompt'},
          {type: 'mdxJsxAttribute', name: 'aria-hidden', value: 'true'},
        ],
        children: [textNode('>')],
      },
      {
        type: 'mdxJsxTextElement',
        name: 'span',
        attributes: [
          {type: 'mdxJsxAttribute', name: 'className', value: 'commandCopyIcon'},
          {type: 'mdxJsxAttribute', name: 'aria-hidden', value: 'true'},
        ],
        children: [],
      },
      {
        type: 'mdxJsxTextElement',
        name: 'span',
        attributes: [
          {type: 'mdxJsxAttribute', name: 'className', value: 'commandCopyDone'},
          {type: 'mdxJsxAttribute', name: 'aria-hidden', value: 'true'},
        ],
        children: [textNode('✓')],
      },
    ],
  };
}

function splitDisplayOverride(raw) {
  let input = raw.trim();
  const allowUnmatched = input.startsWith(optionalIntegrationPrefix);
  if (allowUnmatched) {
    input = input.slice(optionalIntegrationPrefix.length).trim();
  }
  const marker = '=>';
  const index = input.indexOf(marker);
  if (index === -1) {
    return {analysis: input, display: input, allowUnmatched};
  }
  return {
    analysis: input.slice(0, index).trim(),
    display: input.slice(index + marker.length).trim(),
    allowUnmatched,
  };
}

function isCommandLike(value) {
  const tokens = tokenize(String(value || '').trim());
  if (!tokens.length || !tokens[0].value.startsWith('/')) {
    return false;
  }
  return commandsByRoot.has(normalizeRoot(tokens[0].value.slice(1)));
}

function matchCommand(tokens, options = {}) {
  if (!tokens.length || !tokens[0].value.startsWith('/')) {
    return null;
  }
  const root = normalizeRoot(tokens[0].value.slice(1));
  const candidates = options.command ? [options.command] : commandsByRoot.get(root) || [];
  for (const command of candidates) {
    const result = matchCandidate(command, tokens, root, options);
    if (result) {
      return result;
    }
  }
  return null;
}

function matchCandidate(command, tokens, root, options = {}) {
  const segments = command.segments;
  const parts = [];
  let cursor = 0;
  let argumentHighlightIndex = 0;

  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    if (cursor >= tokens.length) {
      return options.allowPartial ? {command, parts, partial: true} : null;
    }

    if (segment.kind === 'literal') {
      const expected = i === 0 ? root : segment.name;
      const actual = i === 0 ? root : tokens[cursor].value;
      if (!equalsCommandToken(actual, expected)) {
        return null;
      }
      parts.push({
        raw: i === 0 ? `/${displayRoot(root)}` : tokens[cursor].raw,
        kind: 'literal',
        semantic: 'literal',
        title: segmentTitle(segment, i === 0 ? `/${displayRoot(root)}` : tokens[cursor].raw),
      });
      cursor++;
      continue;
    }

    const remainingSegments = segments.length - i;
    const flagStart = findFlagStart(tokens, cursor);
    const pathEnd = flagStart === -1 ? tokens.length : flagStart;
    const availablePathTokens = pathEnd - cursor;
    if (availablePathTokens < remainingSegments) {
      if (!options.allowPartial || availablePathTokens < 1) {
        return null;
      }
    }

    const take = i === segments.length - 1 ? Math.max(1, availablePathTokens) : 1;
    const consumed = tokens.slice(cursor, cursor + take);
    const raw = consumed.map((token) => token.raw).join(' ');
    parts.push({
      raw,
      kind: 'argument',
      semantic: minecraftHighlightSemantic(argumentHighlightIndex++),
      title: argumentTitle(segment, raw),
    });
    cursor += take;
  }

  if (cursor < tokens.length) {
    const flagParts = parseFlagTail(command, tokens, cursor);
    if (!flagParts) {
      return null;
    }
    parts.push(...flagParts);
  }

  return {command, parts};
}

function parseFlagTail(command, tokens, start) {
  const flagByName = new Map(command.flags.map((flag) => [`--${flag.name}`.toLowerCase(), flag]));
  const parts = [];
  for (let i = start; i < tokens.length; i++) {
    const token = tokens[i];
    const flag = flagByName.get(token.value.toLowerCase());
    if (!flag) {
      return null;
    }
    parts.push({
      raw: token.raw,
      kind: 'flag',
      semantic: 'flag',
      title: flagTitle(flag),
    });
    if (!flag.presenceOnly) {
      if (i + 1 >= tokens.length || tokens[i + 1].value.startsWith('--')) {
        return null;
      }
      const value = tokens[i + 1];
      parts.push({
        raw: value.raw,
        kind: 'flagValue',
        semantic: 'flagValue',
        title: flagValueTitle(flag, value.raw),
      });
      i++;
    }
  }
  return parts;
}

function tokenClassName(part) {
  const classes = ['commandRichToken', `commandRichToken--${part.kind}`];
  if (part.semantic && part.semantic !== part.kind) {
    classes.push(`commandRichToken--${part.semantic}`);
  }
  return classes.join(' ');
}

function minecraftHighlightSemantic(index) {
  return ['minecraftAqua', 'minecraftYellow', 'minecraftGreen', 'minecraftLightPurple', 'minecraftGold'][index % 5];
}

function tokenize(input) {
  const tokens = [];
  let raw = '';
  let value = '';
  let quote = null;

  for (let i = 0; i < input.length; i++) {
    const ch = input[i];
    if (quote) {
      raw += ch;
      if (ch === quote) {
        quote = null;
      } else {
        value += ch;
      }
      continue;
    }
    if (ch === '"' || ch === "'") {
      quote = ch;
      raw += ch;
      continue;
    }
    if (/\s/.test(ch)) {
      if (raw) {
        tokens.push({raw, value});
        raw = '';
        value = '';
      }
      continue;
    }
    raw += ch;
    value += ch;
  }
  if (raw) {
    tokens.push({raw, value});
  }
  return tokens;
}

function findFlagStart(tokens, start) {
  for (let i = start; i < tokens.length; i++) {
    if (tokens[i].value.startsWith('--')) {
      return i;
    }
  }
  return -1;
}

function equalsCommandToken(a, b) {
  return String(a).toLowerCase() === String(b).toLowerCase();
}

function normalizeRoot(root) {
  const clean = String(root).replace(/^\//, '').toLowerCase();
  if (clean === 'qa') return 'nqa';
  if (clean === 'q') return 'nq';
  return clean;
}

function displayRoot(root) {
  if (root === 'nqa') return 'qa';
  if (root === 'nq') return 'q';
  return root;
}

function segmentTitle(segment, token) {
  const lines = [token];
  if (segment.description) {
    lines.push(segment.description);
  }
  return lines.join('\n');
}

function argumentTitle(segment, value) {
  const lines = [segment.token];
  if (segment.description) {
    lines.push(segment.description);
  }
  const accepts = segment.valueType || '';
  if (accepts) {
    lines.push(`Accepts: ${accepts}`);
  }
  if (!isPlaceholder(value)) {
    lines.push(`Example: ${value}`);
  }
  return lines.join('\n');
}

function flagTitle(flag) {
  const lines = [`--${flag.name}`];
  if (flag.description) {
    lines.push(flag.description);
  }
  if (!flag.presenceOnly) {
    const accepts = flag.valueType || '';
    if (accepts) {
      lines.push(`Accepts: ${accepts}`);
    }
  }
  return lines.join('\n');
}

function flagValueTitle(flag, value) {
  const lines = [`Value for --${flag.name}`];
  if (flag.description) {
    lines.push(flag.description);
  }
  const accepts = flag.valueType || '';
  if (accepts) {
    lines.push(`Accepts: ${accepts}`);
  }
  if (!isPlaceholder(value)) {
    lines.push(`Example: ${value}`);
  }
  return lines.join('\n');
}

function userFacingTitle(title) {
  return String(title || '')
    .split('\n')
    .filter((line) => !line.startsWith('Type:') && !line.startsWith('Value type:') && !line.startsWith('Value:'))
    .join('\n');
}

function acceptsFromTitle(title) {
  const typeLine = String(title || '')
    .split('\n')
    .find((line) => line.startsWith('Accepts:'));
  if (!typeLine) {
    return '';
  }
  return typeLine.slice(typeLine.indexOf(':') + 1).trim();
}

function isPlaceholder(value) {
  const text = String(value || '').trim();
  return !text || text === '...' || text.startsWith('<') || text.startsWith('[') || text.startsWith('(');
}

function parseNonCommandCode(raw) {
  return [textNode(raw)];
}

function parseFallbackCommand(command) {
  const allArguments = command.split(' ');
  const nodes = [];
  allArguments.forEach((argument, index) => {
    if (index > 0) {
      nodes.push(textNode(' '));
    }
    const part = fallbackPart(argument, index);
    nodes.push(richSpan(tokenClassName(part), argument));
  });
  return nodes;
}

function fallbackPart(argument, index) {
  if (index === 0) {
    return {kind: 'literal', semantic: 'literal'};
  }

  if (argument.startsWith('--')) {
    return {kind: 'flag', semantic: 'flag'};
  }
  if (['true', 'false'].includes(argument.toLowerCase())) {
    return {kind: 'argument', semantic: 'minecraftGreen'};
  }
  if (!Number.isNaN(Number(argument))) {
    return {kind: 'argument', semantic: 'minecraftGreen'};
  }
  return {kind: 'argument', semantic: minecraftHighlightSemantic(Math.max(0, index - 1))};
}

module.exports = plugin;
