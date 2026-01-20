/* global test */

/* function testClass(Class) {
  for (const { value: fn } of Object.values(Object.getOwnPropertyDescriptors(Class))) {
    if (typeof fn === 'function') { test(fn.toString().match(/\/\/ TEST: (.*)/)?.[1], fn); }
  }
} */

const rxParseJsdocDescription = /\/\*\*\s*([^]*?)(?:[\r\n]\s*\*?\s*@[^]+?)?\*\/\s*static(?:\s+async)?\s+(\w+)\(/g;
const rxDescriptionTags = /(?:\{(@[^}]+)\})?([^{]*)/g;
const rxWhitespace = /\s+/;

const captionFormatterByLinkType = {
  '@linkplain': (caption) => caption,
  '@linkcode': (caption) => `\`${caption}\``,
};

function getDescriptionTagsText([, inlineTag, text]) {
  if (!inlineTag) { return text; }
  const [linkType, , caption] = inlineTag.split(rxWhitespace);
  const captionFormatter = captionFormatterByLinkType[linkType];
  // if (!captionFormatter) { return `{${inlineTag}}${text}`; }
  const result = captionFormatter(caption);
  return `${result}${text}`;
}

function testClass(Class) {
  const source = Class.toString();
  const testFuncs = source.matchAll(rxParseJsdocDescription);
  for (const [, description, funcName] of testFuncs) {
    const descTags = description.matchAll(rxDescriptionTags);
    const descriptionText = Array.from(descTags).map(getDescriptionTagsText).join('');
    const func = Class[funcName];
    test(descriptionText, func);
  }
}

module.exports = {
  testClass,
};
