// ======== MODE SOMBRE COMMUN ========

// Fonction pour appliquer le mode sombre
function applyDarkMode() {
  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }
}

// Appliquer le mode sombre dès que le DOM est chargé
document.addEventListener("DOMContentLoaded", () => {
  applyDarkMode();

  // Bouton uniquement si présent (index.html)
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
