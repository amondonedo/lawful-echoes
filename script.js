function submitConfession() {
  const input = document.getElementById("confession");
  const confession = input.value.trim();
  if (!confession) return;

  const echo = generateEcho(confession);
  appendEcho(echo);

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

