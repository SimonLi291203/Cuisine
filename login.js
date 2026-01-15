firebase.initializeApp({
  apiKey: "AIzaSyBWp8UeYOQT2LmmLrbuix2-AFJZT47dd2E",
  authDomain: "recettes-personnelles.firebaseapp.com",
  projectId: "recettes-personnelles",
  storageBucket: "recettes-personnelles.firebasestorage.app",
  messagingSenderId: "323047086323",
  appId: "1:323047086323:web:b9afeb7a6a59cce03f86",
  measurementId: "G-C16RTE39L8"
});

const auth = firebase.auth();

const loginBtn = document.getElementById("loginBtn");
const emailInput = document.getElementById("email");
const message = document.getElementById("message");

loginBtn.onclick = () => {
  const email = emailInput.value;

  auth.sendSignInLinkToEmail(email, {
    url: window.location.origin + "/index.html",
    handleCodeInApp: true
  })
  .then(() => {
    window.localStorage.setItem("emailForSignIn", email);
    message.textContent = "Lien envoyé ! Vérifiez votre email.";
  })
  .catch(err => {
    message.textContent = err.message;
  });
};
