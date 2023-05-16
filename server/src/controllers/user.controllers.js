const db = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { response } = require("express");

const User = db.user;

exports.GetAllPangolin = async (req, res) => {
  try {
    const response = await User.find({});

    if (response.length === 0) {
      return res.status(404).json({ message: "Aucun pangolin trouvé." });
    }

    const pangolin = response.map((pangolin) => ({
      id : pangolin._id,
      username: pangolin.username,
      role: pangolin.role,
      friends: pangolin.friends,
    }));
    res.status(200).json(pangolin);
  } catch (error) {
    res.status(500).json({ message: "Erreur : " + error.message });
  }
};

//création du controller register
exports.register = async (req, res) => {
  const { username, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10); //hash du mot de passe
  
  try {

    const user = await new User({
      username: username,
      email: email,
      role: role,
      password: hashedPassword,
    });
    user.save();
    res.status(200).json({ message: "Bienvenue à toi jeune Pangolin." });
  } catch (error) {
    // console.log(error);
    res.status(500).json({
      message: "Une erreur est survenue lors de l'inscription.",
      error,
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "Mot de passe et/ou nom d'utilisateur incorrect" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Mot de passe et/ou nom d'utilisateur incorrect." });
    }

    const token = jwt.sign({ _id: user._id , username: user.username}, "secret", { expiresIn: "1h" });
    res.status(200).json({ message: "Connexion réussie.", token });
  } catch (error) {
    // console.error(error);
    res.status(500).json({
      message: "Une erreur est survenue lors de la connexion.",
      error,
    });
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie("token"); // Supprime le cookie "token"
    res.status(200).json({ message: "Déconnexion réussie." });
  } catch (error) {
    // console.error(error);
    res.status(500).json({
      message: "Une erreur est survenue lors de la déconnexion.",
      error,
    });
  }
};
//controller qui récupere les details du pangolin
exports.GetDetailsPangolin = async (req, res) => {
  const { id_pangolin } = req.params;

  // console.log(id_pangolin);

  try {
    const user = await User.findById(id_pangolin);
    // console.log(user.role);

    if (!user) {
      res.status(404).json({ message: "Le Pangolin n'a pas était trouvé" });
    }

    res.status(200).json({
      role: user.role,
    });
  } catch (err) {
    res.status(500).json({ message: "erreur est survenue" });
  }
};

//controller update details du pangolin
exports.UpdateDetailsPangolin = async (req, res, next) => {
  const { role } = req.body;
  try {
    const response = await User.findOneAndUpdate({
      role: role,
    });
    if (!response) {
      res
        .status(404)
        .json({ message: "erreur lors de la mise à jour du role" });
    }
    res.status(200).json({ message: `mise à jour du role ${response.role}` });
  } catch (error) {
    res.status(500).json({ message: "erreur est survenue" });
  }
};
