firebase.initializeApp({
  apiKey: "AIzaSyBWp8UeYOQT2LmmLrbuix2-AFJZT47dd2E",
  authDomain: "recettes-personnelles.firebaseapp.com",
  projectId: "recettes-personnelles",
  storageBucket: "recettes-personnelles.firebasestorage.app",
  messagingSenderId: "323047086323",
  appId: "1:323047086323:web:b9afeb7a6a59cce03f86",
  measurementId: "G-C16RTE39L8"
});

/* ======================= INIT SERVICES ======================= */
const auth = firebase.auth();

/* ======================= VARIABLES ======================= */
const loginBtn = document.getElementById("loginBtn");
const emailInput = document.getElementById("email");
const message = document.getElementById("message");

/* ======================= ASTUCE DE DEBUG ======================= */
console.log("Nombre d'apps Firebase initialisées :", firebase.apps.length);
console.log("API Key utilisée :", firebase.app().options.apiKey);

/* ======================= ENVOI DU LIEN MAGIQUE ======================= */
loginBtn.onclick = () => {
  const email = emailInput.value.trim();
  if (!email) {
    message.textContent = "Veuillez entrer un email valide.";
    return;
  }

  auth.sendSignInLinkToEmail(email, {
    url: window.location.origin + "/Cuisine/Accueil.html", // page de redirection après clic
    handleCodeInApp: true
  })
  .then(() => {
    // Sauvegarde l'email pour confirmer après clic
    window.localStorage.setItem("emailForSignIn", email);
    message.textContent = "Lien envoyé ! Vérifiez votre email.";
    console.log("Lien magique envoyé à :", email);
  })
  .catch(err => {
    console.error("Erreur envoi lien :", err);
    message.textContent = "Erreur : " + err.message;
  });
};

/* ======================= FINALISER LA CONNEXION APRÈS CLIC ======================= */
if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
  let email = window.localStorage.getItem("emailForSignIn");

  if (!email) {
    email = window.prompt("Veuillez confirmer votre email pour finaliser la connexion");
  }

  auth.signInWithEmailLink(email, window.location.href)
    .then(result => {
      console.log("Utilisateur connecté :", result.user.email, "UID :", result.user.uid);
      window.localStorage.removeItem("emailForSignIn");

      // Redirection vers index.html après connexion
      window.location.href = "Cuisine/Accueil.html";
    })
    .catch(err => {
      console.error("Erreur connexion via lien :", err);
      message.textContent = "Erreur : " + err.message;
    });
}
