document.getElementById("year").textContent = new Date().getFullYear();

const p = new URLSearchParams(window.location.search);

const set = (id, value) => document.getElementById(id).textContent = value || "—";

set("out-first", p.get("first"));
set("out-last", p.get("last"));
set("out-email", p.get("email"));
set("out-phone", p.get("phone"));
set("out-business", p.get("business"));
set("out-timestamp", p.get("timestamp"));
