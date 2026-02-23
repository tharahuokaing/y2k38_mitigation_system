// Country data with estimated costs
const countryData = {
  brunei: {
    name: "Brunei",
    costs: {
      infrastructure: 1,
      financial: 1,
      communications: 1,
      government: 1
    },
    vulnerabilities: [
      { id: 1, name: 'Date/Time Overflow', severity: 'Critical', description: '32-bit time value overflow' },
      { id: 2, name: 'Legacy Oil Infrastructure', severity: 'High', description: 'Aging oil infrastructure systems' }
    ]
  },
  cambodia: {
    name: "Cambodia",
    costs: {
      infrastructure: 2,
      financial: 1,
      communications: 1,
      government: 1
    },
    vulnerabilities: [
      { id: 1, name: 'Date/Time Overflow', severity: 'Critical', description: '32-bit time value overflow' },
      { id: 3, name: 'Signature Bit Failure', severity: 'Medium', description: 'Signed 32-bit integer limitations' }
    ]
  },
  indonesia: {
    name: "Indonesia",
    costs: {
      infrastructure: 8,
      financial: 5,
      communications: 4,
      government: 3
    },
    vulnerabilities: [
      { id: 1, name: 'Date/Time Overflow', severity: 'Critical', description: '32-bit time value overflow' },
      { id: 5, name: 'Transaction Timestamp', severity: 'Critical', description: 'Financial transaction timestamp failures' },
      { id: 6, name: 'Network Time Protocol', severity: 'High', description: 'NTP vulnerabilities in communications' }
    ]
  },
  laos: {
    name: "Laos",
    costs: {
      infrastructure: 1,
      financial: 1,
      communications: 1,
      government: 1
    },
    vulnerabilities: [
      { id: 1, name: 'Date/Time Overflow', severity: 'Critical', description: '32-bit time value overflow' },
      { id: 3, name: 'Signature Bit Failure', severity: 'Medium', description: 'Signed 32-bit integer limitations' }
    ]
  },
  malaysia: {
    name: "Malaysia",
    costs: {
      infrastructure: 5,
      financial: 3,
      communications: 2,
      government: 2
    },
    vulnerabilities: [
      { id: 1, name: 'Date/Time Overflow', severity: 'Critical', description: '32-bit time value overflow' },
      { id: 5, name: 'Transaction Timestamp', severity: 'Critical', description: 'Financial transaction timestamp failures' }
    ]
  },
  myanmar: {
    name: "Myanmar",
    costs: {
      infrastructure: 3,
      financial: 2,
      communications: 2,
      government: 1
    },
    vulnerabilities: [
      { id: 1, name: 'Date/Time Overflow', severity: 'Critical', description: '32-bit time value overflow' },
      { id: 3, name: 'Signature Bit Failure', severity: 'Medium', description: 'Signed 32-bit integer limitations' }
    ]
  },
  philippines: {
    name: "Philippines",
    costs: {
      infrastructure: 4,
      financial: 3,
      communications: 2,
      government: 2
    },
    vulnerabilities: [
      { id: 1, name: 'Date/Time Overflow', severity: 'Critical', description: '32-bit time value overflow' },
      { id: 5, name: 'Transaction Timestamp', severity: 'Critical', description: 'Financial transaction timestamp failures' }
    ]
  },
  singapore: {
    name: "Singapore",
    costs: {
      infrastructure: 6,
      financial: 5,
      communications: 3,
      government: 2
    },
    vulnerabilities: [
      { id: 1, name: 'Date/Time Overflow', severity: 'Critical', description: '32-bit time value overflow' },
      { id: 5, name: 'Transaction Timestamp', severity: 'Critical', description: 'Financial transaction timestamp failures' },
      { id: 7, name: 'Financial Systems Security', severity: 'High', description: 'Banking and finance vulnerabilities' }
    ]
  },
  thailand: {
    name: "Thailand",
    costs: {
      infrastructure: 5,
      financial: 3,
      communications: 2,
      government: 2
    },
    vulnerabilities: [
      { id: 1, name: 'Date/Time Overflow', severity: 'Critical', description: '32-bit time value overflow' },
      { id: 5, name: 'Transaction Timestamp', severity: 'Critical', description: 'Financial transaction timestamp failures' }
    ]
  },
  vietnam: {
    name: "Vietnam",
    costs: {
      infrastructure: 6,
      financial: 4,
      communications: 3,
      government: 2
    },
    vulnerabilities: [
      { id: 1, name: 'Date/Time Overflow', severity: 'Critical', description: '32-bit time value overflow' },
      { id: 3, name: 'Signature Bit Failure', severity: 'Medium', description: 'Signed 32-bit integer limitations' }
    ]
  }
};

// Penetration testing system
class PenetrationTester {
  constructor() {
    this.vulnerabilities = [];
    this.testResults = [];
    this.testIntensity = 5;
    this.currentCountry = 'brunei';
    this.currentSystemType = 'infrastructure';
  }

  init() {
    this.bindEvents();
    this.generateVulnerabilities();
  }

  bindEvents() {
    document.getElementById('country-select').addEventListener('change', (e) => {
      this.currentCountry = e.target.value;
      this.generateVulnerabilities();
    });

    document.getElementById('system-type').addEventListener('change', (e) => {
      this.currentSystemType = e.target.value;
      this.generateVulnerabilities();
    });

    document.getElementById('test-intensity').addEventListener('input', (e) => {
      document.getElementById('intensity-value').textContent = e.target.value;
      this.testIntensity = parseInt(e.target.value);
    });

    document.getElementById('start-test').addEventListener('click', () => {
      this.runTest();
    });
  }

  generateVulnerabilities() {
    const country = countryData[this.currentCountry];
    const systemType = this.currentSystemType;
    
    // Use country-specific vulnerabilities as base
    this.vulnerabilities = country.vulnerabilities;
  }

  runTest() {
    // Simulate penetration test with realistic results
    const country = countryData[this.currentCountry];
    const systemType = this.currentSystemType;
    const results = [];
    
    this.vulnerabilities.forEach(vuln => {
      // Random chance of detecting vulnerability based on test intensity
      const detected = Math.random() * 10 < this.testIntensity + (vuln.severity === 'Critical' ? 3 : 0);
      
      results.push({
        id: vuln.id,
        name: vuln.name,
        severity: vuln.severity,
        detected: detected,
        description: vuln.description
      });
    });

    this.testResults = results;
    this.displayResults();
    this.updateVulnerabilityChart();
  }

  displayResults() {
    const resultsEl = document.getElementById('test-results');
    let html = '<ul>';
    
    this.testResults.forEach(result => {
      const colorClass = this.getSeverityColor(result.severity);
      html += `<li class="${colorClass}">${result.name} - ${result.detected ? 'Detected ✓' : 'Not Detected ✗'}</li>`;
    });
    
    html += '</ul>';
    resultsEl.innerHTML = html;
  }

  getSeverityColor(severity) {
    switch(severity) {
      case 'Critical': return 'holo-red';
      case 'High': return 'holo-orange';
      case 'Medium': return 'holo-yellow';
      default: return 'holo-green';
    }
  }

  updateVulnerabilityChart() {
    const chartEl = document.getElementById('vulnerability-chart');
    const critical = this.testResults.filter(r => r.severity === 'Critical' && r.detected).length;
    const high = this.testResults.filter(r => r.severity === 'High' && r.detected).length;
    const medium = this.testResults.filter(r => r.severity === 'Medium' && r.detected).length;
    
    chartEl.innerHTML = `
      <div class="chart-bar critical">Critical: ${critical}/${this.testResults.filter(r => r.severity === 'Critical').length}</div>
      <div class="chart-bar high">High: ${high}/${this.testResults.filter(r => r.severity === 'High').length}</div>
      <div class="chart-bar medium">Medium: ${medium}/${this.testResults.filter(r => r.severity === 'Medium').length}</div>
    `;
  }
}

// Cost estimation system
class CostEstimator {
  constructor() {
    this.currentCountry = 'brunei';
    this.costs = {
      infrastructure: 1,
      financial: 1,
      communications: 1,
      government: 1
    };
  }

  init() {
    this.bindEvents();
    this.updateCostValues();
    this.calculateTotalCost();
  }

  bindEvents() {
    document.getElementById('cost-country-select').addEventListener('change', (e) => {
      this.currentCountry = e.target.value;
      this.updateCostValues();
      this.calculateTotalCost();
    });

    document.getElementById('infrastructure-cost').addEventListener('input', (e) => {
      this.costs.infrastructure = parseInt(e.target.value);
      document.getElementById('infrastructure-value').textContent = `$${this.costs.infrastructure}B`;
      this.calculateTotalCost();
    });

    document.getElementById('financial-cost').addEventListener('input', (e) => {
      this.costs.financial = parseInt(e.target.value);
      document.getElementById('financial-value').textContent = `$${this.costs.financial}B`;
      this.calculateTotalCost();
    });

    document.getElementById('communications-cost').addEventListener('input', (e) => {
      this.costs.communications = parseInt(e.target.value);
      document.getElementById('communications-value').textContent = `$${this.costs.communications}B`;
      this.calculateTotalCost();
    });

    document.getElementById('government-cost').addEventListener('input', (e) => {
      this.costs.government = parseInt(e.target.value);
      document.getElementById('government-value').textContent = `$${this.costs.government}B`;
      this.calculateTotalCost();
    });

    document.getElementById('calculate-costs').addEventListener('click', () => {
      this.calculateTotalCost();
    });
  }

  calculateTotalCost() {
    const country = countryData[this.currentCountry];
    const multiplier = country.costs.infrastructure + 
                      country.costs.financial + 
                      country.costs.communications + 
                      country.costs.government;
    
    const total = this.costs.infrastructure + 
                  this.costs.financial + 
                  this.costs.communications + 
                  this.costs.government;
    
    document.getElementById('total-cost-value').textContent = `$${total}B`;
    document.getElementById('regional-cost').textContent = `$${total * multiplier}B`;
  }

  updateCostValues() {
    const country = countryData[this.currentCountry];
    
    this.costs = {
      infrastructure: country.costs.infrastructure,
      financial: country.costs.financial,
      communications: country.costs.communications,
      government: country.costs.government
    };
    
    document.getElementById('infrastructure-cost').value = country.costs.infrastructure;
    document.getElementById('financial-cost').value = country.costs.financial;
    document.getElementById('communications-cost').value = country.costs.communications;
    document.getElementById('government-cost').value = country.costs.government;
    
    document.getElementById('infrastructure-value').textContent = `$${country.costs.infrastructure}B`;
    document.getElementById('financial-value').textContent = `$${country.costs.financial}B`;
    document.getElementById('communications-value').textContent = `$${country.costs.communications}B`;
    document.getElementById('government-value').textContent = `$${country.costs.government}B`;
    
    const total = country.costs.infrastructure + 
                  country.costs.financial + 
                  country.costs.communications + 
                  country.costs.government;
    
    document.getElementById('total-cost-value').textContent = `$${total}B`;
    document.getElementById('regional-cost').textContent = `$${total * 3}B`; // Initial estimate
  }
}

// Music Toggle
document.getElementById('music-toggle').addEventListener('click', function() {
  const music = document.getElementById('bg-music');
  if (music.paused) {
    music.play();
    this.textContent = '🔊';
  } else {
    music.pause();
    this.textContent = '🔇';
  }
});

// System status simulation
setInterval(() => {
  const statuses = ['Active', 'Testing', 'Analyzing', 'Migrating', 'Complete'];
  const currentStatus = document.getElementById('system-status');
  const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
  currentStatus.textContent = newStatus;
}, 5000);

// Real-time Clock
function updateDateTime() {
  const now = new Date();
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'Asia/Phnom_Penh'
  };
  const dateTimeEl = document.getElementById('current-datetime');
  if (dateTimeEl) {
    dateTimeEl.textContent = now.toLocaleString('km-KH', options);
    dateTimeEl.style.textShadow = '0 0 10px var(--holo-blue)';
  }
}

// Add datetime display in status bar
const statusBar = document.getElementById('status-bar');
if (statusBar) {
  const dateTimeSpan = document.createElement('span');
  dateTimeSpan.id = 'current-datetime';
  dateTimeSpan.className = 'holo-blue';
  dateTimeSpan.style.marginLeft = '1rem';
  statusBar.appendChild(dateTimeSpan);
}

updateDateTime();
setInterval(updateDateTime, 1000);

// Progress Bar
class ProgressBar {
  constructor(elementId, phases) {
    this.progressBar = document.getElementById(elementId);
    this.phases = phases;
    this.currentPhase = 0;
    this.progress = 0;
    this.bindEvents();
  }

  bindEvents() {
    this.progressBar.addEventListener('mouseenter', () => {
      this.showPhaseDetails();
    });
  }

  startProgress() {
    this.progressInterval = setInterval(() => {
      this.progress += 1;
      this.updateProgressBar();
      
      if (this.progress >= 100) {
        this.progress = 0;
        this.nextPhase();
      }
    }, 200);
  }

  updateProgressBar() {
    this.progressBar.style.width = `${this.progress}%`;
    this.progressBar.textContent = `${Math.floor(this.progress)}%`;
  }

  nextPhase() {
    this.currentPhase = (this.currentPhase + 1) % this.phases.length;
    this.progressBar.parentElement.querySelector('.phase-label').textContent = 
      this.phases[this.currentPhase];
  }

  showPhaseDetails() {
    const details = this.phases[this.currentPhase];
    alert(`Current Phase: ${details}\n${this.getPhaseDescription(details)}`);
  }

  getPhaseDescription(phase) {
    const descriptions = {
      'Penetration Testing': 'Identifying vulnerabilities in systems',
      'System Analysis': 'Analyzing detected vulnerabilities',
      'Migration Planning': 'Planning 64-bit migration strategy',
      'Implementation': 'Implementing system upgrades',
      'Verification': 'Verifying solutions effectiveness'
    };
    return descriptions[phase] || 'Unknown phase';
  }
}

// Notification System
class NotificationSystem {
  constructor() {
    this.notifications = [];
    this.maxNotifications = 5;
  }

  addNotification(message, type = 'info') {
    if (this.notifications.length >= this.maxNotifications) {
      this.notifications.shift();
    }
    
    const notification = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date()
    };
    
    this.notifications.push(notification);
    this.displayNotifications();
    this.autoRemoveNotification();
  }

  displayNotifications() {
    const notificationsEl = document.getElementById('notifications');
    if (!notificationsEl) return;
    
    let html = '';
    this.notifications.forEach(notif => {
      const colorClass = this.getNotificationClass(notif.type);
      html += `
        <div class="notification ${colorClass}" id="notif-${notif.id}">
          <span class="message">${notif.message}</span>
          <span class="timestamp">${notif.timestamp.toLocaleTimeString()}</span>
          <button class="close-btn" onclick="notificationSystem.removeNotification(${notif.id})">✕</button>
        </div>
      `;
    });
    
    notificationsEl.innerHTML = html;
  }

  removeNotification(id) {
    this.notifications = this.notifications.filter(notif => notif.id !== id);
    this.displayNotifications();
  }

  autoRemoveNotification() {
    setTimeout(() => {
      if (this.notifications.length > 0) {
        this.removeNotification(this.notifications[0].id);
      }
    }, 5000);
  }

  getNotificationClass(type) {
    switch(type) {
      case 'warning': return 'holo-orange';
      case 'alert': return 'holo-red';
      case 'success': return 'holo-green';
      case 'info': return 'holo-blue';
      default: return 'holo-blue';
    }
  }
}

// Automatic Test Sequence
class TestSequencer {
  constructor() {
    this.testPhases = [
      'Initial System Scan',
      'Vulnerability Detection',
      'Solution Prototyping',
      'Migration Testing',
      'Final Verification'
    ];
    this.currentTest = 0;
  }

  startSequence() {
    this.testInterval = setInterval(() => {
      this.nextTest();
    }, 8000);
  }

  nextTest() {
    this.currentTest = (this.currentTest + 1) % this.testPhases.length;
    notificationSystem.addNotification(`Test phase changed: ${this.testPhases[this.currentTest]}`, 'info');
    
    // Visual effects
    const statusBar = document.getElementById('status-bar');
    statusBar.style.transform = 'translateX(5px)';
    setTimeout(() => {
      statusBar.style.transform = 'translateX(0)';
    }, 300);
  }
}

// Initialize notification system
window.notificationSystem = new NotificationSystem();

// Example notifications
setTimeout(() => {
  notificationSystem.addNotification('Regional penetration test started', 'info');
}, 1000);

setTimeout(() => {
  notificationSystem.addNotification('Critical vulnerability detected in Indonesian infrastructure', 'alert');
}, 15000);

setTimeout(() => {
  notificationSystem.addNotification('Migration planning completed for Malaysia', 'success');
}, 30000);

// Add notification container to the UI
const notificationsContainer = document.createElement('div');
notificationsContainer.id = 'notifications-container';
notificationsContainer.style.position = 'absolute';
notificationsContainer.style.bottom = '0';
notificationsContainer.style.right = '0';
notificationsContainer.style.zIndex = '1000';
notificationsContainer.style.padding = '10px';

const notificationsEl = document.createElement('div');
notificationsEl.id = 'notifications';
notificationsEl.style.background = 'rgba(10, 15, 30, 0.9)';
notificationsEl.style.border = '1px solid var(--holo-blue)';
notificationsEl.style.borderRadius = '5px';
notificationsEl.style.padding = '10px';
notificationsEl.style.margin = '5px';
notificationsEl.style.minWidth = '300px';

notificationsContainer.appendChild(notificationsEl);
document.body.appendChild(notificationsContainer);

// Initialize systems after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize penetration tester
  const penetrationTester = new PenetrationTester();
  penetrationTester.init();
  
  // Initialize cost estimator
  const costEstimator = new CostEstimator();
  costEstimator.init();
  
  // Initialize progress bar
  const progressBar = new ProgressBar('progress-bar', [
    'Penetration Testing',
    'System Analysis',
    'Migration Planning',
    'Implementation',
    'Verification'
  ]);
  progressBar.startProgress();
  
  // Initialize test sequencer
  const testSequencer = new TestSequencer();
  testSequencer.startSequence();
});