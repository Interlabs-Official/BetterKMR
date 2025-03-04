const md = window.markdownit();

async function initializeDocs() {
  try {
    const response = await fetch('docs.json');
    const config = await response.json();

    const tabsContainer = document.getElementById('tabs');
    const pages = config.pages;
    const defaultPage = config.default_page;

    buildSidebar(pages, tabsContainer, defaultPage);
  } catch (error) {
    console.error("Error loading docs.json:", error);
    throwError(`meta/700.md`, error);
  }
}

function buildSidebar(pages, parentElement, defaultPage, currentPath = '') {
  for (const [name, content] of Object.entries(pages)) {
    const listItem = document.createElement('li');
    listItem.textContent = name;
    const fullPath = currentPath ? `${currentPath} > ${name}` : name;
    listItem.setAttribute('data-name', fullPath.toLowerCase());
    listItem.setAttribute('data-path', fullPath);

    if (typeof content === 'string') {
      listItem.onclick = () => loadContent(`md/${content}`);
      parentElement.appendChild(listItem);

      if (name === defaultPage) loadContent(`md/${content}`);
    } else if (typeof content === 'object') {
      const nestedList = document.createElement('ul');
      listItem.appendChild(nestedList);
      listItem.classList.add('collapsible');
      listItem.onclick = (e) => {
        e.stopPropagation();
        listItem.classList.toggle('active');
      };
      parentElement.appendChild(listItem);
      buildSidebar(content, nestedList, defaultPage, fullPath);
    }
  }
}

async function loadContent(file) {
  try {
    const response = await fetch(file);
    if (!response.ok) throw new Error("File not found");
    const markdown = await response.text();
    var xhReq = new XMLHttpRequest();
    xhReq.open("HEAD", file, false);
    xhReq.send(null);
    var lastModified = xhReq.getResponseHeader("Last-Modified");
    document.getElementById('markdown-content').innerHTML =
      md.render(markdown) + `<br><h6 style="color: grey;">Last modified at ${lastModified}</h6>`;
  } catch (error) {
    const response = await fetch(`meta/404.md`);
    if (!response.ok) throw new Error("File not found");
    const markdown = await response.text();
    document.getElementById('markdown-content').innerHTML = md.render(markdown);
  }
}

function fuzzyMatch(pattern, text) {
  pattern = pattern.split('').reduce((a, b) => `${a}.*${b}`);
  return new RegExp(pattern).test(text);
}

function filterDocs() {
  const query = document.getElementById('search').value.toLowerCase();
  const items = document.querySelectorAll('#tabs li');

  if (query.trim() === '') {
    resetSidebar();
    return;
  }

  items.forEach(item => {
    const itemName = item.getAttribute('data-name');
    const parentItem = item.closest('li.collapsible');

    if (fuzzyMatch(query, itemName)) {
      item.classList.remove('hidden');
      showParents(item);
    } else {
      item.classList.add('hidden');
    }
  });
}

function showParents(item) {
  let parent = item.closest('ul').closest('li.collapsible');
  while (parent) {
    parent.classList.add('active');
    parent = parent.closest('ul').closest('li.collapsible');
  }
}

function resetSidebar() {
  const items = document.querySelectorAll('#tabs li');
  items.forEach(item => {
    item.classList.remove('hidden');
    if (item.classList.contains('collapsible')) {
      item.classList.remove('active');
    }
  });
}

async function throwError(file, exError) {
  const response = await fetch(file);
  if (!response.ok) throw new Error("File not found");
  const markdown = await response.text();
  document.getElementById('markdown-content').innerHTML = md.render(markdown) +
    `<br><h4>Error:</h4> <p style="color: red;">${exError}</p>`;
}

window.onload = initializeDocs;