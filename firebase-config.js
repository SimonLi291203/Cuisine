<!-- Firebase -->
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js"></script>
<script>
  // Ta config Firebase copiée ici, légèrement adaptée
  const firebaseConfig = {
    apiKey: "UeYQT2LmmLrbuix2-AFJZT47dd2E",
    authDomain: "recettes-personnelles.firebaseapp.com",
    projectId: "recettes-personnelles",
    storageBucket: "recettes-personnelles.appspot.com",
    messagingSenderId: "3230470",
    appId: "1:323047086323:web:eb7a6a59a0cce03f86",
    measurementId: "G-C16RTE39L8"
  };

  // Initialisation Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
</script>
