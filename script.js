/* -----------------
   LAWFUL ECHOES – Ritual Script
-------------------*/

// --- TOKEN CORE ---
let tokens = parseInt(localStorage.getItem("tokens") || "0");
updateTokenDisplay();

// --- CONFESSION FLOW ---
function submitConfession() {
  const input = document.getElementById("confession");
  const confession = input.value.trim();
  if (!confession) return;

  // earn a token per confession
  tokens += 1;
  localStorage.setItem("tokens", tokens);

  const echo = generateEcho(confession);
  appendEcho(echo);
  updateTokenDisplay();
  input.value = "";
}

// generate a public echo line
function generateEcho(text) {
  const patterns = [
    "Others have whispered: ",
    "It still echoes: ",
    "You're not the only one: ",
    "⟁ lingers in silence: "
  ];
  const prefix = patterns[Math.floor(Math.random() * patterns.length)];
  return prefix + '"' + text + '"';
}

// add echo to the UI
function appendEcho(echo) {
  const list = document.getElementById("echo-list");
  const li = document.createElement("li");
  li.textContent = echo;
  list.prepend(li);
}

// reflect current token balance
function updateTokenDisplay() {
  document.getElementById("token-count").textContent = `⟁ Tokens: ${tokens}`;
}

// --- ∆-RITUAL (TOKEN BURN) ---
function unlockDeltaRitual(cost) {
  if (tokens < cost) {
    alert("You need more ⟁ to perform this ritual.");
    return;
  }

  tokens -= cost;
  localStorage.setItem("tokens", tokens);
  updateTokenDisplay();

  // show ritual feedback
  const deltaMsgs = [
    "∆-RITUAL COMPLETE: A secret has been erased.",
    "∆-RITUAL COMPLETE: Silence has been sealed.",
    "∆-RITUAL COMPLETE: Guilt has been consumed."
  ];
  alert(deltaMsgs[Math.floor(Math.random() * deltaMsgs.length)]);

  // update leaderboard (burn = 5 ⟁)
  updateLeaderboard("Anonymous Seeker", cost);
}

/* -----------------
   LEADERBOARD LOGIC
-------------------*/

// store / update leaderboard array
function updateLeaderboard(user, tokensBurned) {
  const board = JSON.parse(localStorage.getItem("leaderboard")) || [];
  const entry = board.find(e => e.user === user);

  if (entry) {
    entry.tokens += tokensBurned;
  } else {
    board.push({ user, tokens: tokensBurned });
  }

  board.sort((a, b) => b.tokens - a.tokens);
  localStorage.setItem("leaderboard", JSON.stringify(board.slice(0, 10)));
  renderLeaderboard();
}

// render top burners
function renderLeaderboard() {
  const board = JSON.parse(localStorage.getItem("leaderboard")) || [];
  const list = document.getElementById("leaderboard-list");
  list.innerHTML = ""; // reset

  board.forEach(entry => {
    const li = document.createElement("li");
    li.textContent = `${entry.user} — ${entry.tokens} ⟁ burned`;
    list.appendChild(li);
  });
}

// initial render
renderLeaderboard();
