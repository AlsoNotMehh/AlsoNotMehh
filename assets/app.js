const modules = [
  { name: "mod-account-bound", category: "progression", label: "Progression", description: "Account-wide achievements, mounts, pets, titles, reputations, professions, and friends with silent synchronization." },
  { name: "mod-no-profession-limit", category: "progression", label: "Progression", description: "A configurable primary-profession cap up to all 11 WotLK professions, with optional account sync." },
  { name: "mod-profession-experience", category: "progression", label: "Progression", description: "Balanced character experience from gathering, crafting, and fishing across levels 1–80." },
  { name: "mod-realm-first-titles", category: "progression", label: "Progression", description: "Audits and awards 43 canonical Realm First achievements and titles, including offline repair." },
  { name: "mod-two-names", category: "progression", label: "Identity", description: "First-and-last-name character creation with normalization, filtering, and social-system support." },
  { name: "mod-arac-enhanced", category: "progression", label: "Identity", description: "Granular all-races-all-classes rules with complete starter data and combination controls." },
  { name: "mod-fast-day-night", category: "world", label: "World", description: "Accelerated visual time, dynamic weather, lighting, music, and live GM environment controls." },
  { name: "mod-dangerous-nights", category: "world", label: "World", description: "Configurable nighttime experience, gold, and extra-loot rewards for outdoor encounters." },
  { name: "mod-hardcore-scaling", category: "world", label: "World", description: "Lightweight scheduled creature health and damage scaling for challenging PvE realms." },
  { name: "mod-war-effort", category: "world", label: "World event", description: "Restores the Alliance and Horde war effort for opening the Gates of Ahn'Qiraj." },
  { name: "mod-cfbg-enhanced", category: "pvp", label: "PvP", description: "Cross-faction battleground matchmaking with party locking, item-level balance, and Wintergrasp support." },
  { name: "mod-high-stakes-duels", category: "pvp", label: "PvP", description: "A wager-driven duel system designed to make organized player-versus-player challenges matter." },
  { name: "mod-streamer-protection", category: "pvp", label: "Community", description: "Detects repeated open-world stream sniping while exempting fair PvP and instanced content." },
  { name: "mod-eluna-racial-swap", category: "interface", label: "Eluna", description: "An AIO racial-trait selector that works without a custom client patch." },
  { name: "mod-eluna-teleport-selector", category: "interface", label: "Eluna", description: "A visual starting-zone teleport selector with live NPC portrait cards." },
  { name: "mod-direbrew-anti-block", category: "safety", label: "Server safety", description: "Prevents Personal Mole Machines from blocking doorways in capitals and sanctuaries." }
];

const contributions = {
  merged: [
    ["Jun 01", "Allow friendly auras during Divine Shield", 26052, 25792],
    ["Jun 01", "Randomize Thorim lightning pillar", 26054, 22523],
    ["Jun 01", "Engage Murmur on spell damage", 26056, 17035],
    ["Jun 02", "Preserve aura instances when dispelling", 26060, 25798],
    ["Jun 05", "Prevent Stoneclaw Totem from breaking stealth", 26083, 26066],
    ["Jun 06", "Preserve catalogue pagination when returning from details", 120, null, "git-catalogue"],
    ["Jun 06", "Make Earthgrab break stealth", 26090, 26065],
    ["Jun 11", "Allow ritual helpers on cooldown", 26144, 26139],
    ["Jun 11", "Fix Improved Barkskin armor", 26150, 20028],
    ["Sep 01", "Fix Charge pathing against oversized targets standing over unwalkable space", 27412, 26266],
    ["Sep 02", "Fix Razorscale add spawn composition and queueing", 27411, 27335],
    ["Sep 03", "Remove excess fourth trash pack before Mimiron tram", 27440, 27294],
    ["Sep 06", "Fix Razorscale breath", 27409, 27336],
    ["Sep 09", "Fix Mimiron's Laser Barrage visual rotation and wipe desync", 27555, 27554],
    ["Sep 09", "Prevent Expedition Base Camp bubble from respawning after gauntlet start", 27442, 27317],
    ["Sep 11", "Fix Kologarn corpse despawning and death animation replay", 27557, 27556],
    ["Sep 12", "Fix pet pathing and chase angle against oversized targets", 27426, 27125],
    ["Sep 15", "Correct SPELLMOD_COST order of operations", 27388, 16905]
  ],
  open: [
    ["Aug 30", "Fix leash system", 27390, 5116],
    ["Aug 30", "Fix SmartAI caster creeping", 27391, 22677],
    ["Aug 31", "Prevent shorter-duration equal auras from overwriting", 27419, 26909],
    ["Aug 31", "Prevent trainers from offering lower learned ranks", 27420, 27196],
    ["Aug 31", "Apply Frost Fever from Chains of Ice to slow-immune targets", 27421, 26886],
    ["Sep 01", "Fix autocast conditions and stacking for hunter pet abilities", 27422, 26555],
    ["Sep 01", "Prevent Combustion proc stacks from getting stuck", 27423, 26895],
    ["Sep 01", "Prevent dual-wield penalty double dipping on Threat of Thassarian", 27424, 26873],
    ["Sep 01", "Fix Remorseless Attacks not being consumed by Mutilate", 27425, 27099],
    ["Sep 02", "Fix Mimiron Phase 3 add summon delay after Magnetic Core", 27438, 27303],
    ["Sep 02", "Fix coordinate rotation in GameObject range checks", 27441, 27322],
    ["Sep 02", "Implement Mechanostriker 54-A gauntlet trash and flight AI", 27444, 27310],
    ["Sep 18", "Prioritize center pathing for Charge against oversized targets", 27687, 26266]
  ]
};

const moduleGrid = document.querySelector("#module-grid");
const contributionList = document.querySelector("#contribution-list");

function renderModules(filter = "all") {
  const selected = modules.filter(item => filter === "all" || item.category === filter);
  moduleGrid.innerHTML = selected.map((item, index) => `
    <article class="module-card">
      <div class="module-top">
        <span class="module-icon">${String(index + 1).padStart(2, "0")}</span>
        <span class="module-category">${item.label}</span>
      </div>
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <a href="https://github.com/AlsoNotMehh/${item.name}" target="_blank" rel="noreferrer" aria-label="Open ${item.name} on GitHub">View repository ↗</a>
    </article>`).join("");
}

function renderContributions(status = "merged") {
  contributionList.innerHTML = contributions[status].map(item => {
    const [date, title, pr, issue, repo = "azerothcore-wotlk"] = item;
    const issueText = issue ? ` · issue #${issue}` : "";
    return `<a class="contribution-item" href="https://github.com/azerothcore/${repo}/pull/${pr}" target="_blank" rel="noreferrer">
      <span class="contribution-date">${date}</span>
      <span class="contribution-title">${title}</span>
      <span class="contribution-meta">PR #${pr}${issueText} ↗</span>
    </a>`;
  }).join("");
}

document.querySelectorAll("[data-filter]").forEach(button => button.addEventListener("click", () => {
  document.querySelectorAll("[data-filter]").forEach(item => item.classList.remove("is-active"));
  button.classList.add("is-active");
  renderModules(button.dataset.filter);
}));

document.querySelectorAll("[data-status]").forEach(button => button.addEventListener("click", () => {
  document.querySelectorAll("[data-status]").forEach(item => item.classList.remove("is-active"));
  button.classList.add("is-active");
  renderContributions(button.dataset.status);
}));

const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector("#site-nav");
navToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(open));
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
}));

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) {
    entry.target.classList.add("is-visible");
    observer.unobserve(entry.target);
  }
}), { threshold: .12 });
document.querySelectorAll(".reveal").forEach(item => observer.observe(item));

document.querySelector("#year").textContent = new Date().getFullYear();
renderModules();
renderContributions();
