/**
 * INTERACTIONS ULTRA-MODERNES & EFFETS VISUELS
 * Portfolio Web Design Showcase & Concepts Fictifs
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. EFFET SPOTLIGHT / LUMINESCENCE À LA SOURIS SUR LES CARTES PROJETS
  const projectCards = document.querySelectorAll('.project-card, .bento-card');
  projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // 2. FILTRE INTERACTIF DES PROJETS (Page d'accueil Portfolio)
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectArticles = document.querySelectorAll('.project-card[data-category]');

  if (filterButtons.length > 0 && projectArticles.length > 0) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterVal = btn.getAttribute('data-filter');

        projectArticles.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filterVal === 'all' || category === filterVal) {
            card.style.display = 'grid';
            card.style.opacity = '0';
            card.style.transform = 'translateY(15px)';
            setTimeout(() => {
              card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 30);
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // 3. SMOOTH SCROLL POUR LES ANCRES INTERNES
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        if (history.pushState) {
          history.pushState(null, null, targetId);
        }
      }
    });
  });

  // 4. DÉTECTION DU LIEN ACTIF DANS LES EN-TÊTES
  const navLinks = document.querySelectorAll('.azur-nav-link, .gout-nav-link, .nova-nav-link');
  if (navLinks.length > 0) {
    const sections = Array.from(navLinks)
      .map(link => {
        const href = link.getAttribute('href');
        return href && href.startsWith('#') ? document.querySelector(href) : null;
      })
      .filter(Boolean);

    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY + 180;
      sections.forEach(section => {
        if (!section) return;
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        if (scrollPosition >= top && scrollPosition < top + height) {
          navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, { passive: true });
  }

  // 5. SIMULATEUR DE SÉJOUR — MAISON AZUR
  const btnCheckAzur = document.getElementById('btn-check-azur');
  const feedbackAzur = document.getElementById('azur-feedback');
  if (btnCheckAzur && feedbackAzur) {
    btnCheckAzur.addEventListener('click', () => {
      const suiteSelect = document.getElementById('azur-stay-suite');
      const selectedSuite = suiteSelect ? suiteSelect.options[suiteSelect.selectedIndex].text : 'Suite';
      
      feedbackAzur.style.display = 'block';
      feedbackAzur.innerHTML = `✨ <strong>Disponibilité confirmée</strong> pour la <em>${selectedSuite}</em>. Conciergerie privée informée. (Simulation conceptuelle fictive).`;
    });
  }

  // 6. SIMULATEUR DE TABLE — MAISON DU GOÛT
  const btnCheckGout = document.getElementById('btn-check-gout');
  const feedbackGout = document.getElementById('gout-feedback');
  if (btnCheckGout && feedbackGout) {
    btnCheckGout.addEventListener('click', () => {
      const guestsSelect = document.getElementById('gout-guests');
      const selectedGuests = guestsSelect ? guestsSelect.options[guestsSelect.selectedIndex].text : '2 Personnes';
      
      feedbackGout.style.display = 'block';
      feedbackGout.innerHTML = `🍷 <strong>Table disponible !</strong> Une table d'exception pour <em>${selectedGuests}</em> est réservée. (Simulation conceptuelle fictive).`;
    });
  }

  // 7. ONGLETS DE MENU INTERACTIFS — MAISON DU GOÛT
  const menuTabButtons = document.querySelectorAll('.menu-tab-btn');
  if (menuTabButtons.length > 0) {
    const menuView = document.getElementById('menu-view-degustation');
    
    const menuContents = {
      degustation: `
        <div class="gout-menu-category">
          <h3 class="category-title">Préludes Végétaux & Iodés</h3>
          <div class="menu-item">
            <div class="menu-item-info">
              <h4 class="menu-item-name">Langoustine de Casier Rôtie</h4>
              <p class="menu-item-desc">Bouillon d'arêtes grillées au poivre de Timut, émulsion de verveine citronnelle.</p>
            </div>
            <span class="menu-item-price">Temps 1</span>
          </div>
          <div class="menu-item">
            <div class="menu-item-info">
              <h4 class="menu-item-name">Topinambour en Trois Textures</h4>
              <p class="menu-item-desc">Infusion fumée au foin d'alpage, éclats de noisettes du Piémont et truffe noire.</p>
            </div>
            <span class="menu-item-price">Temps 2</span>
          </div>
          <div class="menu-item">
            <div class="menu-item-info">
              <h4 class="menu-item-name">Ormeau de Plouguerneau Braisé</h4>
              <p class="menu-item-desc">Beurre blanc infusé au koji d'orge perlé et mouron des oiseaux.</p>
            </div>
            <span class="menu-item-price">Temps 3</span>
          </div>
        </div>
        <div class="gout-menu-category">
          <h3 class="category-title">Mets Signatures & Douceurs</h3>
          <div class="menu-item">
            <div class="menu-item-info">
              <h4 class="menu-item-name">Pigeonneau des Flandres au Sang</h4>
              <p class="menu-item-desc">Cuisson basse température, jus corsé aux mûres sauvages et mousseline de céleri.</p>
            </div>
            <span class="menu-item-price">Temps 4</span>
          </div>
          <div class="menu-item">
            <div class="menu-item-info">
              <h4 class="menu-item-name">Bleu de Termignon Affiné</h4>
              <p class="menu-item-desc">Pâte de coing sauvage à la cardamome et pain au levain de seigle ancien.</p>
            </div>
            <span class="menu-item-price">Temps 5</span>
          </div>
          <div class="menu-item">
            <div class="menu-item-info">
              <h4 class="menu-item-name">Chocolat Sauvage de Bolivie & Tagète</h4>
              <p class="menu-item-desc">Ganache 78%, glace florale à la tagète et crumble de sarrasin breton.</p>
            </div>
            <span class="menu-item-price">Temps 6 & 7</span>
          </div>
        </div>
      `,
      saison: `
        <div class="gout-menu-category">
          <h3 class="category-title">Entrées de Saison</h3>
          <div class="menu-item">
            <div class="menu-item-info">
              <h4 class="menu-item-name">Carpaccio de Saint-Jacques de plongée</h4>
              <p class="menu-item-desc">Huile de bergamote fraîche, salicorne croquante et caviar d'Aquitaine.</p>
            </div>
            <span class="menu-item-price">48 €</span>
          </div>
          <div class="menu-item">
            <div class="menu-item-info">
              <h4 class="menu-item-name">Foie Gras Poêlé au Bois de Chêne</h4>
              <p class="menu-item-desc">Chutney de poires tapées de Touraine et brioche tiède feuilletée.</p>
            </div>
            <span class="menu-item-price">44 €</span>
          </div>
        </div>
        <div class="gout-menu-category">
          <h3 class="category-title">Plats de Chasse & Mer</h3>
          <div class="menu-item">
            <div class="menu-item-info">
              <h4 class="menu-item-name">Filet de Bar de Ligne Rôti</h4>
              <p class="menu-item-desc">Gnocchis de potimarron, tombée d'épinards sauvages et jus d'arêtes perlé.</p>
            </div>
            <span class="menu-item-price">62 €</span>
          </div>
          <div class="menu-item">
            <div class="menu-item-info">
              <h4 class="menu-item-name">Dos de Cerf d'Alsace Rôti Entier</h4>
              <p class="menu-item-desc">Grand veneur aux airelles, panais confit au miel de châtaignier.</p>
            </div>
            <span class="menu-item-price">68 €</span>
          </div>
        </div>
      `,
      accords: `
        <div class="gout-menu-category">
          <h3 class="category-title">Accords Vins Vivants & Terroirs</h3>
          <div class="menu-item">
            <div class="menu-item-info">
              <h4 class="menu-item-name">Sélection Terroirs en 5 Verres</h4>
              <p class="menu-item-desc">Chablis 1er Cru, Hermitage Blanc, Chambolle-Musigny, Maury Vintage.</p>
            </div>
            <span class="menu-item-price">95 €</span>
          </div>
          <div class="menu-item">
            <div class="menu-item-info">
              <h4 class="menu-item-name">Quintessence des Grands Crus en 7 Verres</h4>
              <p class="menu-item-desc">Meursault-Charmes, Côte-Rôtie La Landonne, Château d'Yquem 2011.</p>
            </div>
            <span class="menu-item-price">165 €</span>
          </div>
        </div>
        <div class="gout-menu-category">
          <h3 class="category-title">Accords Sans Alcool Créatifs</h3>
          <div class="menu-item">
            <div class="menu-item-info">
              <h4 class="menu-item-name">Infusions Botaniques & Fermentations</h4>
              <p class="menu-item-desc">Kombucha de thé blanc aux fleurs de sureau, macération de baies d'argousier.</p>
            </div>
            <span class="menu-item-price">60 €</span>
          </div>
        </div>
      `
    };

    menuTabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        menuTabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const tabKey = btn.getAttribute('data-tab');
        if (menuView && menuContents[tabKey]) {
          menuView.style.opacity = '0';
          setTimeout(() => {
            menuView.innerHTML = menuContents[tabKey];
            menuView.style.opacity = '1';
          }, 150);
        }
      });
    });
  }

  // 8. COMMUTATEUR TÉLÉMÉTRIE — NOVA INDUSTRIES
  const telemetryButtons = document.querySelectorAll('.telemetry-tab-btn');
  const metricPrecision = document.getElementById('metric-val-precision');
  const metricUptime = document.getElementById('metric-val-uptime');
  const telemetryLog = document.getElementById('telemetry-log-text');

  if (telemetryButtons.length > 0 && metricPrecision && metricUptime && telemetryLog) {
    const telemetryData = {
      robotic: {
        precision: '± 0.002',
        uptime: '99.98',
        log: 'CELLULE 6-AXES : KINEMATIC_FEED STABLE • REPRISE DE POSITION TEMPS RÉEL (1 kHz)'
      },
      agv: {
        precision: '± 1.500',
        uptime: '99.95',
        log: 'FLOTTE AGV : SLAM LiDAR 3D ACTIF • 12 VÉHICULES SYNCHRONISÉS SANS CONFLIT'
      },
      vision: {
        precision: '± 0.0005',
        uptime: '99.99',
        log: 'IA CONTRÔLE OPTIQUE : CAMÉRA HYPERSPECTRALE • 120 PIÈCES/MIN • 0 DÉFAUT ÉLUDÉ'
      }
    };

    telemetryButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        telemetryButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const mode = btn.getAttribute('data-telemetry');
        const data = telemetryData[mode];

        if (data) {
          metricPrecision.textContent = data.precision;
          metricUptime.textContent = data.uptime;
          telemetryLog.textContent = data.log;
        }
      });
    });
  }

  // 9. CALCULATEUR DE GAINS PRODUCTIVITÉ — NOVA INDUSTRIES
  const calcLines = document.getElementById('calc-lines');
  const calcCadence = document.getElementById('calc-cadence');
  const calcGainDisplay = document.getElementById('calc-gain-display');

  function updateRoi() {
    if (!calcLines || !calcGainDisplay) return;
    const lines = parseInt(calcLines.value, 10) || 3;
    const cadence = calcCadence ? calcCadence.value : 'high';

    let gain = 24 + (lines * 5);
    if (cadence === 'high') gain += 6;

    calcGainDisplay.textContent = `+ ${gain} %`;
  }

  if (calcLines && calcCadence) {
    calcLines.addEventListener('change', updateRoi);
    calcCadence.addEventListener('change', updateRoi);
  }

  // 10. TIROIR D'INSPECTION DE DIRECTION ARTISTIQUE (D.A. INSPECTOR)
  const inspectButtons = document.querySelectorAll('.btn-inspect-da');
  inspectButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const panel = document.getElementById(targetId);
      if (!panel) return;

      const isHidden = panel.style.display === 'none' || panel.style.display === '';
      if (isHidden) {
        panel.style.display = 'block';
        btn.innerHTML = '<span>✖ Fermer</span>';
        btn.style.background = 'rgba(255, 255, 255, 0.15)';
      } else {
        panel.style.display = 'none';
        btn.innerHTML = '<span>🔍 Charte Graphique</span>';
        btn.style.background = 'rgba(255, 255, 255, 0.05)';
      }
    });
  });

  // 11. COPIE DE COULEUR AU CLIC SUR LES NUANCIERS
  const swatches = document.querySelectorAll('.color-swatch');
  swatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      const hex = swatch.getAttribute('data-color') || '#ffffff';
      if (navigator.clipboard) {
        navigator.clipboard.writeText(hex).then(() => {
          const originalTitle = swatch.getAttribute('title');
          swatch.setAttribute('title', `✓ Copié : ${hex}`);
          swatch.style.transform = 'scale(1.5)';
          setTimeout(() => {
            swatch.setAttribute('title', originalTitle);
            swatch.style.transform = 'scale(1)';
          }, 1200);
        });
      }
    });
  });
});
