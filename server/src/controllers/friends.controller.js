const db = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { response } = require("express");

const User = db.user;

exports.AddFriends = async (req, res) => {
  const { id_pangolin, id_friend } = req.params;


  try {
    //on vient chercher l'id du pangolin ami
    const friend = await User.findById(id_friend);


    if (!friend) {
      return res.status(404).json({ message: " pangolin reception not found" });
    }
    //update le tableau pangolin  dans le document pour ajouter l'ami + eviter les doublons

    const response = await User.findByIdAndUpdate(
      id_pangolin,
      { $addToSet: { friends: id_friend } },
      { new: true }
    );

    if (!response) {
      return res
        .status(404)
        .json({ message: "pangolin demandeur d'ami non trouvée" });
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "erreur" });
  }
};

exports.RemoveFriends = async (req, res) => {
  const { id_friend, id_pangolin } = req.params;


  try {
    //on vient chercher l'id du pangolin ami
    const friend = await User.findById(id_friend);


    if (!friend) {
      return res.status(404).json({ message: " pangolin reception not found" });
    }
    //update le tableau pangolin  dans le document pour ajouter l'ami + eviter les doublons

    const response = await User.findByIdAndUpdate(
      id_pangolin,
      { $pull: { friends: id_friend } },
      { new: true }
    );

    if (!response) {
      return res
        .status(404)
        .json({ message: "pangolin demandeur d'ami non trouvée" });
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "erreur" });
  }
};
