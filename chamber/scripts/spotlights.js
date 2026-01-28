const spotlights = document.querySelector("#spotlights");
const membersUrl = "data/members.json";

function normalizeLevel(value) {
    return String(value).trim().toLowerCase();
}

function shuffle(array) {
    return array
        .map((item) => ({ item, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ item }) => item);
}

function createSpotlightCard(member) {
    const card = document.createElement("article");
    card.classList.add("spotlight-card");

    const name = document.createElement("h3");
    name.textContent = member.name;

    const img = document.createElement("img");
    img.src = member.image;
    img.alt = `${member.name} logo`;
    img.loading = "lazy";
    img.width = 220;
    img.height = 120;

    const level = document.createElement("p");
    level.innerHTML = `<strong>Level:</strong> ${member.membershipLevel}`;

    const phone = document.createElement("p");
    phone.innerHTML = `<strong>Phone:</strong> ${member.phone}`;

    const address = document.createElement("p");
    address.innerHTML = `<strong>Address:</strong> ${member.address}`;

    const link = document.createElement("a");
    link.href = member.website;
    link.target = "_blank";
    link.rel = "noopener";
    link.textContent = "Visit Website";

    card.append(name, img, level, phone, address, link);
    return card;
}

async function loadSpotlights() {
    try {
        const response = await fetch(membersUrl);
        if (!response.ok) throw new Error("Members JSON fetch failed.");
        const data = await response.json();

        const members = data.members ?? data;

        const eligible = members.filter((m) => {
            const level = normalizeLevel(m.membershipLevel);
            return level === "gold" || level === "silver";
        });

        const count = Math.random() < 0.5 ? 2 : 3;
        const picks = shuffle(eligible).slice(0, count);

        spotlights.innerHTML = "";
        picks.forEach((m) => spotlights.appendChild(createSpotlightCard(m)));
    } catch (err) {
        spotlights.innerHTML = "<p>Spotlights unavailable.</p>";
        console.error(err);
    }
}

loadSpotlights();
