/* global window, document */

function addNavFocusedClass(element) { element.classList.add('nav-focused'); }

function removeNavFocusedClass(element) { element.classList.remove('nav-focused'); }

const rxHrefBaseHash = /[^/]+$/;

function focusNav() {
  const prevNavFocused = document.querySelectorAll('a.nav-focused');
  prevNavFocused.forEach(removeNavFocusedClass);
  const href = window.location.href.match(rxHrefBaseHash)?.[0];
  if (!href) { return; }
  const anchors = document.querySelectorAll(`a[href="${href}"]`);
  anchors.forEach(addNavFocusedClass);
}

function createAnchor(parent, href, className, textContent) {
  const anchor = document.createElement('a');
  anchor.classList.add(className);
  anchor.setAttribute('href', href);
  anchor.textContent = textContent;
  if (parent) { parent.appendChild(anchor); }
  return anchor;
}

function addAnchorHash(element) {
  createAnchor(element, `#${element.id}`, 'nav-anchor-hash', '#');
}

function addAnchorHashesToSymbols() {
  const symbols = document.querySelectorAll('div#main section article h4.name');
  symbols.forEach(addAnchorHash);
}

function addTitleId(element) {
  element.id = element.textContent;
}

function addAnchorHashesToSubsections() {
  const titles = document.querySelectorAll('div#main section article h3');
  titles.forEach(addTitleId);
  titles.forEach(addAnchorHash);
}

function getCurrentBaseHash() {
  const baseHash = window.location.href.match(rxHrefBaseHash)?.[0];
  return baseHash;
}

function addNavTopStyles(anchor) {
  let baseHash = getCurrentBaseHash();
  if (!baseHash) { return; }
  if (baseHash.indexOf('#') < 0) { window.location.href += '#'; baseHash += '#'; }
  let href = anchor.getAttribute('href');
  if (href.indexOf('#') < 0) { href += '#'; anchor.setAttribute('href', href); }
  if (anchor.nextSibling?.tagName === 'UL') { anchor.classList.add('nav-toggle'); }
  if (href === baseHash) {
    anchor.classList.add('nav-focused');
  } else {
    anchor.classList.add('nav-hidden'); // for: { collapse: true }
  }
}

function showFocusedSection() {
  const focused = document.querySelector('a.nav-focused');
  if (!focused) { return; }
  let p = focused;
  while ((p = p.parentNode) && p.tagName !== 'NAV') {
    if (p.tagName !== 'UL') { continue; }
    let anchor = p.previousSibling;
    while (anchor && anchor.tagName === 'UL') { anchor = anchor.previousSibling; }
    if (anchor?.tagName !== 'A') { continue; }
    anchor.classList.remove('nav-hidden');
    anchor.classList.add('nav-current-tree');
  }
}

function navToggle(classList) {
  if (classList.contains('nav-hidden')) {
    classList.remove('nav-hidden');
  } else {
    classList.add('nav-hidden');
  }
}

function onNavClick(event) {
  const anchor = event.target;
  const classList = anchor?.classList;
  if (!classList?.contains('nav-toggle')) { return; }
  navToggle(classList);
}

function showNav(anchor) {
  anchor.classList.remove('nav-hidden');
}

function hideAllButCurrentNav(anchor) {
  if (anchor.classList.contains('nav-current-tree')) { return; }
  anchor.classList.add('nav-hidden');
}

function onSearchInput() {
  if (this.value) {
    document.querySelectorAll('a.nav-hidden').forEach(showNav);
  } else {
    document.querySelectorAll('a.nav-toggle').forEach(hideAllButCurrentNav);
  }
}

function onCodeLineClick(event) {
  if (event.target.parentNode !== this) { return; }
  window.location.hash = `#${event.target.id}`;
}

function addConstructorToNav() {
  const pageTitle = document.querySelector('h1.page-title');
  if (!pageTitle) { return; }
  const className = pageTitle.textContent;
  const navClassHref = `${className}.html#`;
  const instanceMethods = document.querySelector(`a[href="${navClassHref}"] ~ ul.methods`);
  if (!instanceMethods) { return; }
  const href = `#${className}`;
  const anchorHash = document.querySelector(`a.nav-anchor-hash[href="${href}"]`);
  if (!anchorHash) { return; }
  const li = document.createElement('li');
  li.setAttribute('data-type', 'constructor');
  const a = document.createElement('a');
  a.setAttribute('href', navClassHref + className);
  a.textContent = `= new ${className}`;
  li.appendChild(a);
  instanceMethods.appendChild(li);
}

document.querySelectorAll('nav > ul > li > a').forEach(addNavTopStyles);

document.body.addEventListener('click', onNavClick);

const lineNums = document.querySelectorAll('ol.linenums');
lineNums.forEach((ol) => ol.addEventListener('click', onCodeLineClick));

const navSearch = document.getElementById('nav-search');
if (navSearch) { navSearch.addEventListener('input', onSearchInput); }

addAnchorHashesToSymbols();
addAnchorHashesToSubsections();
addConstructorToNav();
window.addEventListener('hashchange', focusNav);
focusNav();
showFocusedSection();
