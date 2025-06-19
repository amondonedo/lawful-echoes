let tokens = parseInt(localStorage.getItem("tokens") || "0");
updateTokenDisplay();

function submitConfession() {
  const input = document.getElementById("confession");
  const confession = input.value.trim();
  if (!confession) return;

  tokens += 1; // Earn 1 token per confession
  localStorage.setItem("tokens", tokens);

  const echo = generateEcho(confession);
  appendEcho(echo);
  updateTokenDisplay();

  input.value = "";
}

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

function appendEcho(echo) {
  const list = document.getElementById("echo-list");
  const li = document.createElement("li");
  li.textContent = echo;
  list.prepend(li);
}

function updateTokenDisplay() {
  document.getElementById("token-count").textContent = `⟁ Tokens: ${tokens}`;
}

function unlockDeltaRitual(cost) {
  if (tokens < cost) {
    alert("You need more ⟁ to perform this ritual.");
    return;
  }

  tokens -= cost;
  localStorage.setItem("tokens", tokens);
  updateTokenDisplay();

  const delta = [
    "∆-RITUAL COMPLETE: A secret has been erased.",
    "∆-RITUAL COMPLETE: Silence has been sealed.",
    "∆-RITUAL COMPLETE: Guilt has been consumed."
  ];
  alert(delta[Math.floor(Math.random() * delta.length)]);
}
