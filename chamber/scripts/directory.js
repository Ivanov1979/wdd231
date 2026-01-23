const membersContainer = document.querySelector("#members");
const gridBtn = document.querySelector("#gridBtn");
const listBtn = document.querySelector("#listBtn");
const statusEl = document.querySelector("#status");
const yearEl = document.querySelector("#year");
const menuBtn = document.querySelector("#menuBtn");
const primaryNav = document.querySelector("#primaryNav");

yearEl.textContent = new Date().getFullYear();

const dataUrl = "data/members.json";

function setView(mode) {
    const isGrid = mode === "grid";
    membersContainer.classList.toggle("members-grid", isGrid);
    membersContainer.classList.toggle("members-list", !isGrid);
    gridBtn.setAttribute("aria-pressed", String(isGrid));
    listBtn.setAttribute("aria-pressed", String(!isGrid));
    localStorage.setItem("directoryView", mode);
}

function createCard(member) {
    const card = document.createElement("article");
    card.className = "member-card";

    const logoBox = document.createElement("div");
    logoBox.className = "logo-box";

    const img = document.createElement("img");
    img.src = member.image;
    img.alt = `${member.name} logo`;
    img.loading = "lazy";
    img.width = 300;
    img.height = 300;

    logoBox.appendChild(img);

    const name = document.createElement("h3");
    name.className = "name";
    name.textContent = member.name;

    const badge = document.createElement("p");
    badge.className = "badge";
    badge.textContent = member.membershipLevel;

    const address = document.createElement("p");
    address.className = "meta";
    address.textContent = member.address;

    const phone = document.createElement("p");
    phone.className = "meta";
    phone.textContent = member.phone;

    const website = document.createElement("a");
    website.href = member.website;
    website.target = "_blank";
    website.rel = "noopener";
    website.textContent = member.website.replace("https://", "");

    card.append(logoBox, name, badge, address, phone, website);
    return card;
}

async function loadMembers() {
    const response = await fetch(dataUrl);
    const data = await response.json();
    membersContainer.innerHTML = "";
    data.members.forEach(m => membersContainer.appendChild(createCard(m)));
    statusEl.textContent = `${data.members.length} members loaded`;
}

gridBtn.addEventListener("click", () => setView("grid"));
listBtn.addEventListener("click", () => setView("list"));

menuBtn.addEventListener("click", () => {
    const open = primaryNav.getAttribute("data-open") === "true";
    primaryNav.setAttribute("data-open", String(!open));
    menuBtn.setAttribute("aria-expanded", String(!open));
});

const savedView = localStorage.getItem("directoryView") || "grid";
setView(savedView);
loadMembers();
