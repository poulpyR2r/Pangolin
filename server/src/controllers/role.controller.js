const db = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { response } = require("express");



const User = db.user;

exports.changeRole = async(req, res) => {
    const {id_pangolin} = req.params;
    const { role } = req.body
    console.log(id_pangolin)
 
    try {
        const updatedUser = await User.findByIdAndUpdate(id_pangolin, { role: role }, { new: true });

        if(!updatedUser){
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        res.status(200).json(updatedUser);
    }catch(error) {
        res.status(500).json({ message: "Une erreur est survenue", error });
    }
}