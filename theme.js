// ========== MODE SOMBRE COMMUN ==========
const toggleDarkBtn = document.getElementById("toggle-dark");

// Si le bouton existe (index.html), ajoute l'écoute
if(toggleDarkBtn){
  toggleDarkBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    // Sauvegarder le choix
    if(document.body.classList.contains("dark-mode")){
      localStorage.setItem("darkMode", "enabled");
    } else {
      localStorage.setItem("darkMode", "disabled");
    }
  });
}

// Appliquer le mode sombre sur TOUTES les pages
if(localStorage.getItem("darkMode") === "enabled"){
  document.body.classList.add("dark-mode");
}
