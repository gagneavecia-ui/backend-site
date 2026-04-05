const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// "Base de données" simple
let users = [];

// INSCRIPTION
app.post("/register", (req, res) => {
  const { username } = req.body;
  if (users.find(u => u.username === username)) {
    return res.send("Utilisateur déjà inscrit !");
  }
  users.push({ username, password: null });
  res.send("Inscription enregistrée. Tu recevras le mot de passe après paiement.");
});

// AJOUT DU MOT DE PASSE (toi seulement)
app.post("/setpassword", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) return res.send("Utilisateur introuvable");
  user.password = password;
  res.send(`Mot de passe ajouté pour ${username}`);
});

// CONNEXION
app.post("/login", (req, res) => {
  const { username } = req.body;
  const user = users.find(u => u.username === username && u.password !== null);
  if (user) res.send("Accès autorisé !");
  else res.send("Accès refusé ! Contactez l'administrateur");
});

// Render fournit le port via process.env.PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));
