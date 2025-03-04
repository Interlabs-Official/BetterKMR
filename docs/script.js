/* no a lot of this I did not make I just wanted a better version of DocHaste so uhhh.. AI! */

async function initializeDocs() {
  try {
    const response = await fetch('docs.json');
    const config = await response.json();

    const tabsContainer = document.getElementById('tabs');
    const pages = config.pages;
    const defaultPage = config.default_page;

    buildSidebar(pages, tabsContainer, defaultPage);
    initializeUI();
  } catch (error) {
    console.error("Error loading docs.json:", error);
    throwError(`meta/700.md`, error);
  }
}

function buildSidebar(pages, parentElement, defaultPage, currentPath = '') {

  const categoryIcons = {
    'Introduction': 'fa-home',
    'Getting Started': 'fa-rocket',
    'Guides': 'fa-book-open',
    'API': 'fa-code',
    'Reference': 'fa-list',
    'Tutorials': 'fa-graduation-cap',
    'FAQ': 'fa-question-circle',
    'Troubleshooting': 'fa-wrench',
    'Advanced': 'fa-cogs',

    'default': 'fa-file-alt'
  };

  for (const [name, content] of Object.entries(pages)) {
    const listItem = document.createElement('li');
    const link = document.createElement('a');
    const fullPath = currentPath ? `${currentPath} > ${name}` : name;

    const iconClass = categoryIcons[name] || categoryIcons['default'];
    const iconSpan = document.createElement('span');
    iconSpan.className = `category-icon fas ${iconClass}`;

    link.appendChild(iconSpan);
    link.appendChild(document.createTextNode(name));

    listItem.appendChild(link);
    listItem.setAttribute('data-name', fullPath.toLowerCase());
    listItem.setAttribute('data-path', fullPath);

    if (typeof content === 'string') {
      link.onclick = (e) => {
        e.stopPropagation();
        loadContent(`md/${content}`, fullPath);
        highlightActiveItem(listItem);
      };
      parentElement.appendChild(listItem);

      if (name === defaultPage) loadContent(`md/${content}`, fullPath);
    } else if (typeof content === 'object') {
      const expandIcon = document.createElement('span');
      expandIcon.className = 'expand-icon fas fa-chevron-right';
      link.appendChild(expandIcon);

      const nestedList = document.createElement('ul');
      listItem.appendChild(nestedList);
      listItem.classList.add('collapsible');

      link.onclick = (e) => {
        e.stopPropagation();
        listItem.classList.toggle('active');
      };

      parentElement.appendChild(listItem);
      buildSidebar(content, nestedList, defaultPage, fullPath);
    }
  }
}

function highlightActiveItem(item) {

  document.querySelectorAll('#tabs li').forEach(li => {
    li.classList.remove('active');
  });

  item.classList.add('active');

  let parent = item.closest('ul').closest('li.collapsible');
  while (parent) {
    parent.classList.add('active');
    parent = parent.closest('ul').closest('li.collapsible');
  }
}

async function loadContent(file, path = '') {
  try {
    const response = await fetch(file);
    if (!response.ok) throw new Error("File not found");
    const markdown = await response.text();

    var xhReq = new XMLHttpRequest();
    xhReq.open("HEAD", file, false);
    xhReq.send(null);
    var lastModified = xhReq.getResponseHeader("Last-Modified");

    document.getElementById('markdown-content').innerHTML = 
      marked.parse(markdown) + 
      `<div class="last-modified">Last modified: ${new Date(lastModified).toLocaleString()}</div>`;

    updateBreadcrumbs(path);

    const firstHeading = document.querySelector('#markdown-content h1');
    if (firstHeading) {
      document.title = `${firstHeading.textContent} | Documentation`;
    }
  } catch (error) {
    try {
      const response = await fetch(`meta/404.md`);
      if (!response.ok) throw new Error("Error page not found");
      const markdown = await response.text();
      document.getElementById('markdown-content').innerHTML = marked.parse(markdown);
      updateBreadcrumbs('Error');
      document.title = "Page Not Found | Documentation";
    } catch (e) {
      document.getElementById('markdown-content').innerHTML = 
        `<h1>Error</h1><p>The requested page could not be found.</p>`;
    }
  }
}

function updateBreadcrumbs(path) {
  const breadcrumbsEl = document.getElementById('breadcrumbs');
  breadcrumbsEl.innerHTML = '<a href="#"><i class="fas fa-home"></i></a>';

  if (path) {
    const parts = path.split(' > ');
    let currentPath = '';

    parts.forEach((part, index) => {
      breadcrumbsEl.innerHTML += '<span class="separator"><i class="fas fa-chevron-right"></i></span>';

      currentPath += (index > 0 ? ' > ' : '') + part;

      if (index === parts.length - 1) {
        breadcrumbsEl.innerHTML += `<span>${part}</span>`;
      } else {
        breadcrumbsEl.innerHTML += `<a href="#" data-path="${currentPath}">${part}</a>`;
      }
    });

    document.querySelectorAll('#breadcrumbs a[data-path]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const path = link.getAttribute('data-path');
        const item = document.querySelector(`#tabs li[data-path="${path}"]`);
        if (item) {
          item.querySelector('a').click();
        }
      });
    });
  }
}

function initializeUI() {

  const mobileToggle = document.getElementById('mobileToggle');
  const sidebar = document.querySelector('.sidebar');

  if (mobileToggle && sidebar) {
    mobileToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      mobileToggle.innerHTML = sidebar.classList.contains('open') ? 
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
  }

  const widthControlBtn = document.getElementById('widthControlBtn');
  const widthDropdown = document.getElementById('widthDropdown');

  if (widthControlBtn && widthDropdown) {

    widthControlBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      widthDropdown.classList.toggle('show');
    });

    document.querySelectorAll('.width-option').forEach(option => {
      option.addEventListener('click', () => {
        const width = option.getAttribute('data-width');
        document.documentElement.style.setProperty('--content-width', width);

        document.querySelectorAll('.width-option').forEach(opt => {
          opt.classList.remove('active');
        });
        option.classList.add('active');

        widthDropdown.classList.remove('show');
      });
    });

    document.addEventListener('click', (e) => {
      if (!widthControlBtn.contains(e.target)) {
        widthDropdown.classList.remove('show');
      }
    });
  }

  function enhanceImages() {
    const images = document.querySelectorAll('#markdown-content img');
    images.forEach(img => {

      if (img.parentNode.classList.contains('image-container')) return;

      const container = document.createElement('div');
      container.className = 'image-container';

      if (img.alt && img.alt.includes('|')) {
        const parts = img.alt.split('|');
        img.alt = parts[0].trim();
        const size = parts[1].trim().toLowerCase();
        if (['small', 'medium', 'large', 'full'].includes(size)) {
          container.classList.add(size);
        }
      }

      img.parentNode.insertBefore(container, img);
      container.appendChild(img);
    });
  }

  const contentObserver = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === 'childList') {
        enhanceImages();
      }
    });
  });

  const markdownContent = document.getElementById('markdown-content');
  if (markdownContent) {
    contentObserver.observe(markdownContent, { childList: true, subtree: true });
  }

  const darkModeToggle = document.getElementById('darkModeToggle');
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {

      alert('Dark/light mode toggle would be implemented here!');
    });
  }

  const fontSizeButton = document.getElementById('fontSizeButton');
  if (fontSizeButton) {
    fontSizeButton.addEventListener('click', () => {
      const currentSize = parseInt(getComputedStyle(document.documentElement).fontSize);
      const sizes = [14, 16, 18, 20];
      const currentIndex = sizes.indexOf(currentSize);
      const nextIndex = (currentIndex + 1) % sizes.length;
      document.documentElement.style.fontSize = `${sizes[nextIndex]}px`;
    });
  }

  const shareButton = document.getElementById('shareButton');
  if (shareButton) {
    shareButton.addEventListener('click', () => {
      if (navigator.share) {
        navigator.share({
          title: document.title,
          url: window.location.href
        }).then(() => {
          console.log('Thanks for sharing!');
        }).catch(console.error);
      } else {
        const dummy = document.createElement('input');
        document.body.appendChild(dummy);
        dummy.value = window.location.href;
        dummy.select();
        document.execCommand('copy');
        document.body.removeChild(dummy);
        alert('Link copied to clipboard!');
      }
    });
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