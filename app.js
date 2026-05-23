// ========================
// DATA – hier kannst du deine Produkte & Materialien anpassen!
// ========================

const products = [
  {
    id: 1,
    name: "Smartphone Halterung",
    desc: "Universal-Halterung für Fahrrad/KFZ, 3 Größen",
    price: "4,90 €",
    category: "lager",
    emoji: "📱",
    bg: "rgba(255,92,26,0.08)",
    available: true,
  },
  {
    id: 2,
    name: "Modell-Sockel Set",
    desc: "Runde und eckige Sockel für Figuren & Dekorationen",
    price: "2,50 €",
    category: "lager",
    emoji: "🏺",
    bg: "rgba(108,99,255,0.08)",
    available: true,
  },
  {
    id: 3,
    name: "Custom Namensschilder",
    desc: "Personalisierbare Schilder, beliebige Schrift & Größe",
    price: "ab 3,00 €",
    category: "custom",
    emoji: "🪪",
    bg: "rgba(26,255,110,0.06)",
    available: true,
  },
  {
    id: 4,
    name: "Prototyp Service",
    desc: "Schnelle Realisierung deiner CAD-Daten, 24h Express",
    price: "auf Anfrage",
    category: "proto",
    emoji: "⚙️",
    bg: "rgba(255,200,0,0.06)",
    available: true,
  },
  {
    id: 5,
    name: "Ersatzteile",
    desc: "Schwer zu findende Kunststoffteile nachgedruckt",
    price: "ab 1,50 €",
    category: "custom",
    emoji: "🔩",
    bg: "rgba(255,92,26,0.06)",
    available: true,
  },
  {
    id: 6,
    name: "Miniatur-Figuren",
    desc: "Hochdetaillierte Figuren in Resin, 0,05mm Auflösung",
    price: "ab 8,00 €",
    category: "lager",
    emoji: "🐉",
    bg: "rgba(108,99,255,0.08)",
    available: false,
  },
  {
    id: 7,
    name: "Logo / Firmenmodelle",
    desc: "Dein Logo als 3D-Objekt für Präsentationen oder Messen",
    price: "ab 12,00 €",
    category: "custom",
    emoji: "🏢",
    bg: "rgba(26,255,110,0.06)",
    available: true,
  },
  {
    id: 8,
    name: "Technischer Prototyp",
    desc: "Funktionale Teile für Maschinen- und Gerätebau",
    price: "auf Anfrage",
    category: "proto",
    emoji: "🔬",
    bg: "rgba(255,200,0,0.06)",
    available: true,
  },
];

const materials = [
  { name: "PLA",  props: "Leicht, biologisch, ideal für Deko",           price: "0,05 €/g", available: true  },
  { name: "PETG", props: "Zäh, lebensmittelecht, wasserfest",             price: "0,07 €/g", available: true  },
  { name: "ABS",  props: "Hitzebeständig, schleifbar, robust",            price: "0,09 €/g", available: true  },
  { name: "TPU",  props: "Flexibel, gummiartig, stoßfest",                price: "0,12 €/g", available: true  },
  { name: "Resin", props: "Hochauflösend, glatt, für Details",            price: "0,18 €/g", available: true  },
  { name: "ASA",  props: "UV-beständig, für Außeneinsatz",                price: "0,11 €/g", available: false },
  { name: "Nylon", props: "Chemikalienbeständig, sehr zäh",               price: "0,14 €/g", available: true  },
  { name: "Carbon PLA", props: "Extrem leicht & steif, optisch edel",     price: "0,22 €/g", available: false },
];

// ========================
// PRODUCT RENDERING
// ========================

let currentFilter = 'all';

function renderProducts(filter = 'all') {
  const grid = document.getElementById('productsGrid');
  const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);
  
  grid.innerHTML = filtered.map(p => `
    <div class="product-card">
      <div class="product-thumb" style="background:${p.bg}">
        <span>${p.emoji}</span>
        <span class="product-badge badge-${p.category}">
          ${ p.category === 'lager' ? 'Lager' : p.category === 'custom' ? 'Custom' : 'Prototyp' }
        </span>
      </div>
      <div class="product-body">
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <div class="product-meta">
          <div class="product-price">${p.price} <small>${p.category === 'lager' ? 'Stück' : ''}</small></div>
          <span class="product-avail ${p.available ? 'avail-yes' : 'avail-no'}">
            ${p.available ? '● Verfügbar' : '● Bald verfügbar'}
          </span>
        </div>
      </div>
    </div>
  `).join('');
}

function filterProducts(filter, btn) {
  currentFilter = filter;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderProducts(filter);
}

// ========================
// MATERIAL TABLE
// ========================

function renderMaterials() {
  const tbody = document.getElementById('materialTableBody');
  tbody.innerHTML = materials.map(m => `
    <tr>
      <td><strong>${m.name}</strong></td>
      <td style="color:var(--white2)">${m.props}</td>
      <td><span class="mat-price">${m.price}</span></td>
      <td>
        <span class="avail-dot ${m.available ? 'dot-yes' : 'dot-no'}"></span>
        ${m.available ? 'Verfügbar' : 'Nicht verfügbar'}
      </td>
    </tr>
  `).join('');
}

// ========================
// PRICE CALCULATOR
// ========================

let qualityMultiplier = 1;

function setQuality(mult, btn) {
  qualityMultiplier = mult;
  document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  updateCalc();
}

function updateCalc() {
  const weight = parseInt(document.getElementById('weightRange').value);
  const matPrice = parseFloat(document.getElementById('materialSelect').value);
  document.getElementById('weightVal').textContent = weight;

  const checkboxes = document.querySelectorAll('.checkbox-group input[type="checkbox"]');
  const extras = [2.00, 5.00, 1.50];
  let extraTotal = 0;
  let extraLines = [];

  checkboxes.forEach((cb, i) => {
    if (cb.checked) {
      extraTotal += extras[i];
      const labels = ['Lackierung', 'Express', 'Support-Entfernung'];
      extraLines.push(`+ ${labels[i]}: ${extras[i].toFixed(2).replace('.', ',')} €`);
    }
  });

  const base = weight * matPrice * qualityMultiplier;
  const total = base + extraTotal;

  document.getElementById('resultPrice').textContent = total.toFixed(2).replace('.', ',') + ' €';

  const qualityLabels = { 1: 'Standard', 1.4: 'Hoch', 2: 'Profi' };
  document.getElementById('resultBreakdown').innerHTML = `
    ${weight}g × ${matPrice.toFixed(2).replace('.', ',')} €/g = ${(weight * matPrice).toFixed(2).replace('.', ',')} €<br>
    Qualität (${qualityLabels[qualityMultiplier]}): × ${qualityMultiplier}<br>
    ${extraLines.length ? extraLines.join('<br>') + '<br>' : ''}
    <strong style="color:var(--white)">Gesamt: ${total.toFixed(2).replace('.', ',')} €</strong>
  `;
}

// ========================
// STATS COUNTER ANIMATION
// ========================

function animateCounters() {
  const counters = document.querySelectorAll('.stat-num');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    let current = 0;
    const step = Math.ceil(target / 60);
    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      counter.textContent = current;
    }, 25);
  });
}

// ========================
// FORM HANDLING
// ========================

function submitForm(e) {
  e.preventDefault();
  showToast('✅ Anfrage gesendet! Wir melden uns bald.');
  e.target.reset();
  document.getElementById('fileLabel').textContent = '📎 Datei auswählen oder hierher ziehen';
}

function handleFile(input) {
  if (input.files[0]) {
    document.getElementById('fileLabel').textContent = `📎 ${input.files[0].name}`;
  }
}

// File Drag & Drop
const fileDrop = document.getElementById('fileDrop');
fileDrop.addEventListener('dragover', e => { e.preventDefault(); fileDrop.style.borderColor = 'var(--orange)'; });
fileDrop.addEventListener('dragleave', () => { fileDrop.style.borderColor = ''; });
fileDrop.addEventListener('drop', e => {
  e.preventDefault();
  fileDrop.style.borderColor = '';
  if (e.dataTransfer.files[0]) {
    document.getElementById('fileLabel').textContent = `📎 ${e.dataTransfer.files[0].name}`;
  }
});

// ========================
// TOAST NOTIFICATION
// ========================

function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// ========================
// MOBILE MENU
// ========================

function toggleMenu() {
  document.body.classList.toggle('mobile-menu-open');
}

// Close menu on link click
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => document.body.classList.remove('mobile-menu-open'));
});

// ========================
// INTERSECTION OBSERVER
// (Animate stats when in view)
// ========================

const statsBar = document.querySelector('.stats-bar');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
if (statsBar) observer.observe(statsBar);

// ========================
// INIT
// ========================

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  renderMaterials();
  updateCalc();
});
