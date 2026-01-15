// ===== MODE SOMBRE GLOBAL =====
document.addEventListener("DOMContentLoaded", () => {

  // 1️⃣ Appliquer le mode sombre si déjà activé
  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
  }

  // 2️⃣ Bouton sur index seulement
  const toggleBtn = document.getElementById("toggle-dark");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");

      if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("darkMode", "enabled");
      } else {
        localStorage.setItem("darkMode", "disabled");
      }
    });
  }
});
