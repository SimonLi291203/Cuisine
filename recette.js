/* ================= FIREBASE INIT ================= */

firebase.initializeApp({
  apiKey: "AIzaSyBWp8UeYOQT2LmmLrbuix2-AFJZT47dd2E",
  authDomain: "recettes-personnelles.firebaseapp.com",
  projectId: "recettes-personnelles",
  storageBucket: "recettes-personnelles.firebasestorage.app",
  messagingSenderId: "323047086323",
  appId: "1:323047086323:web:b9afeb7a6a59a0cce03f86",
  measurementId: "G-C16RTE39L8"
});
firebase.auth().signInAnonymously()
  .catch(error => {
    console.error("Erreur auth anonyme", error);
  });


const db = firebase.firestore();

/* ================= VARIABLES ================= */
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const details = document.getElementById("recette-details");
const form = document.getElementById("recette-form");
const title = document.getElementById("page-title");

const inputPersonnes = document.getElementById("personnes");
const inputTitre = document.getElementById("titre");
const inputIngredients = document.getElementById("ingredients");
const inputPreparation = document.getElementById("preparation");
const inputNotes = document.getElementById("notes");

/* ================= MODE ================= */

// 🔹 MODE CRÉATION
if (!id) {
  title.textContent = "Nouvelle recette";
  form.style.display = "block";
}

// 🔹 MODE LECTURE
if (id) {
  loadRecette();
}

/* ================= FONCTIONS ================= */

function loadRecette() {
  db.collection("recettes").doc(id).get().then(doc => {
    if (!doc.exists) {
      alert("Recette introuvable");
      window.location.href = "index.html";
      return;
    }

    const data = doc.data();
    title.textContent = data.titre;

    // affichage nombre de personnes
    document.getElementById("personnes-text").textContent = data.personnes || 1;

    document.getElementById("ingredients-list").innerHTML =
      data.ingredients.map(i => `<li>${i}</li>`).join("");

    document.getElementById("preparation-list").innerHTML =
      data.preparation.map(p => `<li>${p}</li>`).join("");

    document.getElementById("notes-text").textContent = data.notes || "";
    document.getElementById("date-text").textContent = data.date || "";

    details.style.display = "block";
  });
}

function showEditForm() {
  form.style.display = "block";
  details.style.display = "none";

  inputTitre.value = title.textContent;
  inputPersonnes.value = document.getElementById("personnes-text").textContent;
  inputIngredients.value = [...document.querySelectorAll("#ingredients-list li")]
    .map(li => li.textContent).join(", ");
  inputPreparation.value = [...document.querySelectorAll("#preparation-list li")]
    .map(li => li.textContent).join("\n");
  inputNotes.value = document.getElementById("notes-text").textContent;
}

function cancelEdit() {
  if (id) {
    form.style.display = "none";
    details.style.display = "block";
  } else {
    window.location.href = "index.html";
  }
}

function saveRecette() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0'); // mois de 0 à 11
  const year = today.getFullYear();
  const dateEurope = `${day}-${month}-${year}`; // "05-01-2026"

  const data = {
    personnes: parseInt(inputPersonnes.value) || 1,
    titre: inputTitre.value,
    ingredients: inputIngredients.value.split(",").map(s => s.trim()),
    preparation: inputPreparation.value.split("\n").map(s => s.trim()),
    notes: inputNotes.value,
    date: dateEurope
  };

  if (id) {
    db.collection("recettes").doc(id).set(data)
      .then(() => {
        alert("Recette modifiée !");
        location.reload();
      });
  } else {
    db.collection("recettes").add(data)
      .then(() => {
        alert("Recette ajoutée !");
        window.location.href = "index.html";
      });
  }
}

function deleteRecette() {
  if (!confirm("Supprimer cette recette ?")) return;
  db.collection("recettes").doc(id).delete()
    .then(() => {
      alert("Recette supprimée");
      window.location.href = "index.html";
    });
}
