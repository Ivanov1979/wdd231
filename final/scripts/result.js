const params = new URLSearchParams(window.location.search);

const student = params.get("student") || "Not"
