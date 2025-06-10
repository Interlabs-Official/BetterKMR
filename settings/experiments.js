class ExperimentsManager {
  constructor() {
    this.experiments = [];
    this.container = document.querySelector('.experiments-list');
  }

  addExperiment(experiment) {
    this.experiments.push(experiment);
    this.renderExperiment(experiment);
  }

  renderExperiment(experiment) {
    const item = document.createElement('div');
    item.className = 'experiment-item';

    const info = document.createElement('div');
    info.className = 'experiment-info';

    const header = document.createElement('div');
    header.className = 'experiment-header';

    const title = document.createElement('div');
    title.className = 'experiment-title';
    title.textContent = experiment.title;

    const tooltip = document.createElement('div');
    tooltip.className = 'experiment-tooltip';
    tooltip.title = experiment.tooltip;
    tooltip.textContent = 'ⓘ';

    header.appendChild(title);
    header.appendChild(tooltip);

    const subtitle = document.createElement('div');
    subtitle.className = 'experiment-subtitle';
    subtitle.textContent = experiment.subtitle;

    info.appendChild(header);
    info.appendChild(subtitle);

    const control = document.createElement('div');
    control.className = 'experiment-control';

    if (experiment.type === 'toggle') {
      const toggle = this.createToggle(experiment);
      control.appendChild(toggle);
    } else if (experiment.type === 'select') {
      const select = this.createSelect(experiment);
      control.appendChild(select);
    }

    item.appendChild(info);
    item.appendChild(control);
    this.container.appendChild(item);
  }

  createToggle(experiment) {
    const label = document.createElement('label');
    label.className = 'experiment-toggle';

    const input = document.createElement('input');
    input.type = 'checkbox';

    // Load saved state
    chrome.storage.sync.get([experiment.id], (result) => {
      input.checked = result[experiment.id] ?? experiment.default;
    });

    input.addEventListener('change', (e) => {
      chrome.storage.sync.set({ [experiment.id]: e.target.checked });
      if (experiment.onChange) {
        experiment.onChange(e.target.checked);
      }
    });

    const slider = document.createElement('span');
    slider.className = 'experiment-toggle-slider';

    label.appendChild(input);
    label.appendChild(slider);
    return label;
  }

  createSelect(experiment) {
    const select = document.createElement('select');
    select.className = 'experiment-select';

    experiment.options.forEach(option => {
      const optionElement = document.createElement('option');
      optionElement.value = option.value;
      optionElement.textContent = option.label;
      select.appendChild(optionElement);
    });

    // Load saved state
    chrome.storage.sync.get([experiment.id], (result) => {
      select.value = result[experiment.id] ?? experiment.default;
    });

    select.addEventListener('change', (e) => {
      chrome.storage.sync.set({ [experiment.id]: e.target.value });
      if (experiment.onChange) {
        experiment.onChange(e.target.value);
      }
    });

    return select;
  }
}

window.ExperimentsManager = ExperimentsManager;