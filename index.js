/* ======================= FIREBASE INIT ======================= */

firebase.initializeApp({
  apiKey: "AIzaSyBWp8UeYOQT2LmmLrbuix2-AFJZT47dd2E",
  authDomain: "recettes-personnelles.firebaseapp.com",
  projectId: "recettes-personnelles",
  storageBucket: "recettes-personnelles.firebasestorage.app",
  messagingSenderId: "323047086323",
  appId: "1:323047086323:web:b9afeb7a6a59cce03f86",
  measurementId: "G-C16RTE39L8"
});

const db = firebase.firestore();     // Firestore

/* ======================= DOM ======================= */
const recettesList = document.getElementById("recettes-list");
const searchInput = document.getElementById("search");

let recettesData = [];

/* ======================= UTILS ======================= */
function removeAccents(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

/* ======================= AFFICHAGE ======================= */
function displayRecettes(recettes) {
  recettesList.innerHTML = "";

  recettes.forEach(data => {
    recettesList.innerHTML += `
      <a href="recette.html?id=${data.id}" class="recette-card">
        <h2>${data.titre}</h2>
        <p class="date">Dernière modification : ${data.date}</p>
        <span class="arrow">›</span>
      </a>
    `;
  });
}

/* ======================= CHARGEMENT ======================= */
db.collection("recettes").get().then(snapshot => {
  recettesData = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  recettesData.sort((a, b) =>
    a.titre.localeCompare(b.titre, "fr", { sensitivity: "base" })
  );

  displayRecettes(recettesData);
});

/* ======================= RECHERCHE ======================= */
searchInput.addEventListener("input", () => {
  const query = removeAccents(searchInput.value.toLowerCase());

  const filtered = recettesData.filter(r =>
    removeAccents(r.titre.toLowerCase()).includes(query)
  );

  displayRecettes(filtered);
});
<script src="theme.js"></script>



