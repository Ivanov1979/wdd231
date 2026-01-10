const menuButton = document.querySelector("#menuButton");
const nav = document.querySelector("#primaryNav");

if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
        nav.classList.toggle("open");
        const open = nav.classList.contains("open");
        menuButton.setAttribute("aria-expanded", String(open));
        menuButton.textContent = open ? "✖" : "☰";
    });
}

const year = document.querySelector("#currentyear");
const modified = document.querySelector("#lastModified");

if (year) year.textContent = new Date().getFullYear();
if (modified) modified.textContent = `Last Modification: ${document.lastModified}`;

const courses = [
    { subject: "CSE", number: 110, title: "Intro Programming", credits: 2, completed: false },
    { subject: "CSE", number: 111, title: "Functions", credits: 2, completed: false },
    { subject: "CSE", number: 210, title: "Classes", credits: 2, completed: false },
    { subject: "WDD", number: 130, title: "Web Fundamentals", credits: 2, completed: true },
    { subject: "WDD", number: 131, title: "Dynamic Web", credits: 2, completed: true },
    { subject: "WDD", number: 231, title: "Frontend I", credits: 2, completed: false }
];

const courseList = document.querySelector("#courseList");
const creditTotal = document.querySelector("#creditTotal");
const buttons = document.querySelectorAll(".filter-btn");

function render(list) {
    courseList.innerHTML = "";
    list.forEach(c => {
        const d = document.createElement("div");
        d.className = "course";
        if (c.completed) d.classList.add("completed");
        d.innerHTML = `${c.subject} ${c.number}<small>${c.credits} credits</small>`;
        courseList.appendChild(d);
    });
    creditTotal.textContent = list.reduce((s, c) => s + c.credits, 0);
}

buttons.forEach(b => {
    b.addEventListener("click", () => {
        buttons.forEach(x => x.classList.remove("active"));
        b.classList.add("active");
        const f = b.dataset.filter;
        if (f === "all") render(courses);
        if (f === "wdd") render(courses.filter(c => c.subject === "WDD"));
        if (f === "cse") render(courses.filter(c => c.subject === "CSE"));
    });
});

render(courses);
