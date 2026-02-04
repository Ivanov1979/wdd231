document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("timestamp").value = new Date().toISOString();

document.querySelectorAll(".open-modal").forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        document.getElementById(link.dataset.modal).showModal();
    });
});

document.querySelectorAll(".close-modal").forEach(btn => {
    btn.addEventListener("click", () => btn.closest("dialog").close());
});
