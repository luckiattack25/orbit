import { readStore, writeStore, removeStore, createId } from "./storage.js";
import { escapeHTML, analyzeText, formatJSON } from "./utils.js";

const app = document.querySelector("#app");
const dialog = document.querySelector("#project-dialog");
const form = document.querySelector("#project-form");
const toast = document.querySelector("#toast");
const pages = ["dashboard","projects","utilities","connections","remote","youtube","business","settings"];
const labels = {dashboard:"Overview",projects:"Projects",utilities:"Utilities",connections:"Connections",remote:"Remote PC",youtube:"YouTube",business:"Business",settings:"Settings"};
let currentPage = "";
let projects = readStore("projects", []);
if (!Array.isArray(projects)) projects = [];
projects = projects.filter(project => project && typeof project.id === "string" && typeof project.name === "string")
  .map(project => ({
    ...project,
    description: typeof project.description === "string" ? project.description : "",
    status: ["In progress", "Planned", "On hold", "Completed"].includes(project.status) ? project.status : "Planned",
    createdAt: Number.isFinite(project.createdAt) ? project.createdAt : Date.now(),
    updatedAt: Number.isFinite(project.updatedAt) ? project.updatedAt : Date.now()
  }));
let prefs = readStore("preferences", {theme:"dark"});
if (!prefs || !["dark", "light", "system"].includes(prefs.theme)) prefs = {theme:"dark"};
let scratch = readStore("scratchpad", "");
if (typeof scratch !== "string") scratch = "";
let toastTimer;

function notify(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2300);
}
function persist() {
  const ok = writeStore("projects", projects);
  if (!ok) notify("Storage is unavailable. Your changes may not persist.");
}
function setTheme(theme) {
  prefs.theme = theme;
  writeStore("preferences", prefs);
  const resolved = theme === "system"
    ? (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark")
    : theme;
  document.documentElement.dataset.theme = resolved;
  const meta = document.querySelector('meta[name="theme-color"]');
  meta.content = resolved === "light" ? "#f4f4f6" : "#101114";
}
function navigate(page, syncUrl = true) {
  if (!pages.includes(page)) page = "dashboard";
  if (syncUrl && location.hash.slice(1) !== page) history.pushState({page}, "", "#" + page);
  if (page === currentPage && document.querySelector("#page-name")?.textContent === labels[page]) return;
  currentPage = page;
  document.querySelectorAll(".nav-item[data-page]").forEach(button => button.classList.toggle("active", button.dataset.page === page));
  document.querySelector("#page-name").textContent = labels[page];
  document.querySelector("#sidebar").classList.remove("open");
  document.querySelector("#menu-toggle").setAttribute("aria-expanded", "false");
  render();
}
function pageHeader(title, subtitle, action = "") {
  return `<div class="page-heading"><div><h1>${title}</h1><p>${subtitle}</p></div>${action}</div>`;
}
function projectMarkup(project) {
  const status = project.status;
  const safeStatus = escapeHTML(status);
  const projectId = escapeHTML(project.id);
  const projectName = escapeHTML(project.name);
  return `<article class="project-row"><div class="project-symbol">◈</div><div class="project-copy"><h3>${projectName}</h3><p>${escapeHTML(project.description || "No description yet.")}</p></div><span class="status status-${status.toLowerCase().replace(/\s/g,"-")}">${safeStatus}</span><div class="project-actions"><button class="text-button" data-edit-project="${projectId}" aria-label="Edit ${projectName}">Edit</button><button class="text-button delete-project" data-delete-project="${projectId}" aria-label="Delete ${projectName}">Delete</button></div></article>`;
}
function dashboard() {
  const recent = [...projects].sort((a,b)=>b.updatedAt-a.updatedAt).slice(0,3);
  return `${pageHeader("Your space, in orbit.","A clear place for the things you're working on.",'<button class="button primary" data-action="new-project">＋ New project</button>')}
  <section class="welcome-panel"><div class="welcome-copy"><span class="welcome-mark"><img src="./assets/orbit-mark.svg" alt=""></span><div><h2>Everything in your orbit.</h2><p>Your personal workspace is ready. Start with a project, open a utility, or shape your environment.</p><button class="text-button" data-page="projects">Explore projects <span>↗</span></button></div></div><div class="orbit-art" aria-hidden="true"><span class="planet"></span><i class="ring ring-one"></i><i class="ring ring-two"></i><i class="spark spark-one"></i><i class="spark spark-two"></i></div></section>
  <div class="section-heading"><div><h2>Workspace</h2><p>Your tools, close at hand.</p></div></div>
  <div class="quick-grid"><button class="quick-link" data-page="projects"><span class="quick-icon pink">▦</span><strong>Projects</strong><small>Keep work moving</small><b>↗</b></button><button class="quick-link" data-page="utilities"><span class="quick-icon blue">⌘</span><strong>Utilities</strong><small>Small tools, ready to go</small><b>↗</b></button><button class="quick-link" data-page="connections"><span class="quick-icon neutral">⌁</span><strong>Connections</strong><small>Services and integrations</small><b>↗</b></button></div>
  <div class="section-heading recent-heading"><div><h2>Recently updated</h2><p>Your latest project activity.</p></div><button class="text-button" data-page="projects">View all <span>→</span></button></div>
  <div class="project-list">${recent.length ? recent.map(projectMarkup).join("") : '<div class="empty-state compact"><span>◈</span><h3>Nothing in motion yet</h3><p>Create a project and it will appear here.</p></div>'}</div>
  <div class="privacy-note"><span>⌑</span><p><strong>Private by default.</strong> Your workspace data stays in this browser. No accounts or external services are connected.</p></div>`;
}
function projectsPage() {
  const action = '<button class="button primary" data-action="new-project">＋ New project</button>';
  return `${pageHeader("Projects","A home for ideas, plans, and ongoing work.",action)}<div class="toolbar"><label class="search-box"><span>⌕</span><input id="project-search" type="search" placeholder="Find a project..." aria-label="Search projects"></label><span class="muted">${projects.length} ${projects.length===1?"project":"projects"}</span></div><div class="project-list" id="project-results">${projects.length ? projects.map(projectMarkup).join("") : '<div class="empty-state"><span>◈</span><h3>Your next project starts here</h3><p>Keep personal projects organized in one quiet place.</p><button class="button secondary" data-action="new-project">Create a project</button></div>'}</div>`;
}
function utilitiesPage() {
 return `${pageHeader("Utilities","Useful little tools. No accounts, no setup.")}<div class="utility-layout"><div class="utility-tabs"><button class="utility-tab active" data-tool="scratch">Scratchpad</button><button class="utility-tab" data-tool="json">JSON formatter</button><button class="utility-tab" data-tool="text">Text tools</button></div><section class="utility-workspace" id="utility-workspace"></section></div>`;
}
function renderTool(tool = "scratch") {
 document.querySelectorAll(".utility-tab").forEach(b=>b.classList.toggle("active",b.dataset.tool===tool));
 const target = document.querySelector("#utility-workspace");
 if (!target) return;
 if (tool === "scratch") target.innerHTML = `<div class="tool-heading"><div><h2>Scratchpad</h2><p>A quiet place to put things down. Saved in this browser.</p></div><span class="saved-label" id="scratch-status">Saved locally</span></div><textarea class="large-editor" id="scratch-editor" placeholder="Start writing...">${escapeHTML(scratch)}</textarea><div class="tool-foot"><span>Local only · Not synced</span><button class="button secondary small" data-action="clear-scratch">Clear notes</button></div>`;
 if (tool === "json") target.innerHTML = `<div class="tool-heading"><div><h2>JSON formatter</h2><p>Format or validate JSON in your browser.</p></div></div><textarea class="large-editor code-editor" id="json-input" placeholder='{"hello":"orbit","ready":true}'></textarea><div class="tool-actions"><button class="button primary" data-action="format-json">Format JSON</button><button class="button secondary" data-action="minify-json">Minify</button><button class="button secondary" data-action="clear-json">Clear</button><span id="json-status" class="tool-result" role="status"></span></div><pre class="code-output" id="json-output" aria-live="polite"></pre>`;
 if (tool === "text") target.innerHTML = `<div class="tool-heading"><div><h2>Text tools</h2><p>Quick counts and simple transformations.</p></div></div><textarea class="large-editor" id="text-input" placeholder="Paste or type your text..."></textarea><div class="text-stats" id="text-stats"><span>0 <small>words</small></span><span>0 <small>characters</small></span><span>0 <small>lines</small></span></div><div class="tool-actions"><button class="button secondary" data-action="uppercase">Uppercase</button><button class="button secondary" data-action="lowercase">Lowercase</button><button class="button secondary" data-action="copy-text">Copy text</button></div>`;
}
function connectionsPage() {
 const items = [["Google Drive","Files and documents","Planned"],["GitHub","Repositories and development","Planned"],["YouTube","Personal video library","Planned"],["Remote computer","Access your own computer","Not configured"]];
 return `${pageHeader("Connections","A clear view of what is — and isn't — connected.")}<div class="notice"><span>i</span><p>Nothing is connected yet. ORBIT works independently, and these services will only show as connected after a real integration is configured and verified.</p></div><div class="connection-list">${items.map(([name,desc,status],i)=>`<div class="connection-row"><div class="connection-icon">${["◫","⌘","▷","▣"][i]}</div><div class="connection-copy"><strong>${name}</strong><small>${desc}</small></div><span class="status status-planned">${status}</span><span class="muted">—</span></div>`).join("")}</div>`;
}
function futurePage(page) {
 const info = {remote:["Remote PC","Your computer, when you're away from it.","A secure remote connection has not been configured. This space is reserved for a future connection with explicit device pairing and access controls.","▣"],youtube:["YouTube","A more personal way to explore video.","No YouTube account or API credentials are connected. A private video interface can be added here later.","▷"],business:["Business","A dedicated space for business-related work.","This area is intentionally open for future tools, workflows, and resources.","◫"]}[page];
 return `${pageHeader(info[0],info[1])}<section class="future-panel"><div class="future-icon">${info[3]}</div><h2>Not connected. Not pretending.</h2><p>${info[2]}</p><span class="status status-planned">Planned</span></section>`;
}
function settingsPage() {
 return `${pageHeader("Settings","Make this space feel like yours.")}<section class="settings-section"><div><h2>Appearance</h2><p>Choose how ORBIT looks on this device.</p></div><div class="theme-options">${["dark","light","system"].map(theme=>`<button class="theme-option ${prefs.theme===theme?"selected":""}" data-theme-choice="${theme}"><span class="theme-preview ${theme}"><i></i><i></i><i></i></span><strong>${theme[0].toUpperCase()+theme.slice(1)}</strong><small>${theme==="system"?"Follow device setting":theme==="dark"?"Low-light interface":"Bright interface"}</small></button>`).join("")}</div></section><section class="settings-section about-section"><div><h2>About ORBIT</h2><p>Everything in your orbit.</p></div><dl><div><dt>Version</dt><dd>0.1.0 · Initial foundation</dd></div><div><dt>Storage</dt><dd>Local browser storage</dd></div><div><dt>Connections</dt><dd>None configured</dd></div><div><dt>Logo</dt><dd>Temporary geometric replacement</dd></div></dl></section><section class="settings-section danger-section"><div><h2>Local data</h2><p>Remove this browser's ORBIT projects, notes, and preferences.</p></div><button class="button danger" data-action="reset-data">Clear local workspace</button></section>`;
}
function render() {
 const views = {dashboard,projects:projectsPage,utilities:utilitiesPage,connections:connectionsPage,remote:()=>futurePage("remote"),youtube:()=>futurePage("youtube"),business:()=>futurePage("business"),settings:settingsPage};
 app.innerHTML = views[currentPage]();
 app.classList.remove("page-enter");
 void app.offsetWidth;
 app.classList.add("page-enter");
 if(currentPage==="utilities") renderTool();
}
function openProject(project = null) {
 form.reset();
 document.querySelector("#dialog-title").textContent = project ? "Edit project" : "New project";
 document.querySelector("#project-id").value = project?.id || "";
 document.querySelector("#project-name").value = project?.name || "";
 document.querySelector("#project-description").value = project?.description || "";
 document.querySelector("#project-status").value = project?.status || "In progress";
 dialog.showModal();
 document.querySelector("#project-name").focus();
}
function saveProject(event) {
 event.preventDefault();
 const id = document.querySelector("#project-id").value;
 const name = document.querySelector("#project-name").value.trim();
 const description = document.querySelector("#project-description").value.trim();
 const status = document.querySelector("#project-status").value;
 if(!name) return;
 if(id) projects = projects.map(p=>p.id===id?{...p,name,description,status,updatedAt:Date.now()}:p);
 else projects.unshift({id:createId(),name,description,status,createdAt:Date.now(),updatedAt:Date.now()});
 persist(); dialog.close(); render(); notify(id?"Project updated":"Project created");
}
document.addEventListener("click", event => {
 const pageButton = event.target.closest("[data-page]");
 if(pageButton){ navigate(pageButton.dataset.page); return; }
 const toolButton = event.target.closest("[data-tool]");
 if(toolButton){ renderTool(toolButton.dataset.tool); return; }
 const edit = event.target.closest("[data-edit-project]");
 if(edit){ const project=projects.find(p=>p.id===edit.dataset.editProject); if(project) openProject(project); return; }
 const remove = event.target.closest("[data-delete-project]");
 if(remove){
  const project = projects.find(item => item.id === remove.dataset.deleteProject);
  if(project && confirm(`Delete "${project.name}"? This cannot be undone.`)){
   projects = projects.filter(item => item.id !== project.id);
   persist();
   render();
   notify("Project deleted");
  }
  return;
 }
 const close = event.target.closest("[data-close-dialog]");
 if(close){dialog.close();return;}
 const theme = event.target.closest("[data-theme-choice]");
 if(theme){setTheme(theme.dataset.themeChoice);render();return;}
 const action = event.target.closest("[data-action]")?.dataset.action;
 if(!action)return;
 if(action==="new-project")openProject();
 if(action==="clear-scratch"){scratch="";writeStore("scratchpad",scratch);renderTool();notify("Scratchpad cleared");}
 if(action==="format-json"||action==="minify-json"){
  const input=document.querySelector("#json-input"); const status=document.querySelector("#json-status"); const output=document.querySelector("#json-output");
  try{const parsed=JSON.parse(input.value);output.textContent=JSON.stringify(parsed,null,action==="format-json"?2:0);status.textContent="Valid JSON";status.className="tool-result success";}
  catch(error){output.textContent="";status.textContent="Invalid JSON: "+error.message;status.className="tool-result error";}
 }
 if(action==="clear-json"){document.querySelector("#json-input").value="";document.querySelector("#json-output").textContent="";document.querySelector("#json-status").textContent="";}
 if(action==="uppercase"||action==="lowercase"){const input=document.querySelector("#text-input");input.value=action==="uppercase"?input.value.toUpperCase():input.value.toLowerCase();input.dispatchEvent(new Event("input"));}
 if(action==="copy-text"){
  const input=document.querySelector("#text-input");
  if(!navigator.clipboard?.writeText){notify("Clipboard access is unavailable in this browser");return;}
  navigator.clipboard.writeText(input.value).then(()=>notify("Text copied")).catch(()=>notify("Clipboard access unavailable"));
 }
 if(action==="reset-data"&&confirm("Clear all ORBIT data stored in this browser? This cannot be undone.")){
  removeStore("projects");removeStore("scratchpad");removeStore("preferences");
  projects=[];scratch="";prefs={theme:"dark"};setTheme("dark");render();notify("Local workspace cleared");
 }
});
document.addEventListener("input", event=>{
 if(event.target.id==="scratch-editor"){scratch=event.target.value;writeStore("scratchpad",scratch);document.querySelector("#scratch-status").textContent="Saved locally";}
 if(event.target.id==="text-input"){const stats=analyzeText(event.target.value);document.querySelector("#text-stats").innerHTML=`<span>${stats.words} <small>words</small></span><span>${stats.characters} <small>characters</small></span><span>${stats.lines} <small>lines</small></span>`;}
 if(event.target.id==="project-search"){const q=event.target.value.toLowerCase();const filtered=projects.filter(p=>(p.name+" "+p.description).toLowerCase().includes(q));document.querySelector("#project-results").innerHTML=filtered.length?filtered.map(projectMarkup).join(""):'<div class="empty-state compact"><h3>No matching projects</h3><p>Try a different search.</p></div>';}
});
form.addEventListener("submit",saveProject);
document.querySelector("#menu-toggle").addEventListener("click",()=>{
 const sidebar = document.querySelector("#sidebar");
 const open = sidebar.classList.toggle("open");
 document.querySelector("#menu-toggle").setAttribute("aria-expanded", String(open));
});
document.querySelector("#theme-cycle").addEventListener("click",()=>{const order=["dark","light","system"];setTheme(order[(order.indexOf(prefs.theme)+1)%order.length]);if(currentPage==="settings")render();notify("Theme: "+prefs.theme);});
window.matchMedia("(prefers-color-scheme: light)").addEventListener?.("change",()=>{if(prefs.theme==="system")setTheme("system");});
setTheme(prefs.theme);
navigate(location.hash.slice(1)||"dashboard", !location.hash);
function restorePageFromUrl() {
 const page = location.hash.slice(1);
 if (pages.includes(page) && page !== currentPage) navigate(page, false);
}
window.addEventListener("hashchange", restorePageFromUrl);
window.addEventListener("popstate", restorePageFromUrl);
