import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { firebaseConfig, isFirebaseConfigured } from "./firebase-config.js";

function getTextNodes() {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes = [];
  let node;
  while ((node = walker.nextNode())) {
    const parent = node.parentElement;
    if (!parent || parent.closest("#admin-panel") || ["SCRIPT", "STYLE"].includes(parent.tagName)) continue;
    if (node.nodeValue.trim()) nodes.push(node);
  }
  return nodes;
}

function applyState(state) {
  if (!state) return;
  Object.entries(state.fields || {}).forEach(([key, value]) => {
    const element = document.querySelector(`[data-site-field="${key}"]`);
    if (element) element.textContent = value;
  });
  Object.entries(state.namedImages || {}).forEach(([key, value]) => {
    const image = document.querySelector(`[data-site-image="${key}"]`);
    if (image && value) image.src = value;
  });
  Object.entries(state.links || {}).forEach(([key, value]) => {
    const link = document.querySelector(`[data-site-link="${key}"]`);
    if (link && value) link.href = value;
  });
  getTextNodes().forEach((node, index) => {
    if (state.texts?.[index] !== undefined) node.nodeValue = state.texts[index];
  });
  document.querySelectorAll("body img:not(#admin-panel img)").forEach((image, index) => {
    if (state.images?.[index]) image.src = state.images[index];
  });
  if (state.title) document.title = state.title;
  Object.entries(state.colors || {}).forEach(([name, value]) => {
    document.documentElement.style.setProperty(`--${name}`, value);
  });
}

if (isFirebaseConfigured) {
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  onValue(ref(database, "siteState"), snapshot => applyState(snapshot.val()));
}
