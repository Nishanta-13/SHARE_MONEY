const express = require('express');

const router = express.Router();

const upload = require("../config/multer_config");

const userMOD = require("../models/userModel");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { generateToken } = require("../utils/generateToken");

const { loginUser, logoutUser } = require("../controllers/userCont")

router.post("/create", upload.single("image"), async (req, res) => {
    try {
        let { name, email, password } = req.body;
        let user = await userMOD.findOne({ email: email })

        if (user) {
            res.redirect("/")
        } else {
            bcyrpt.genSalt(10, function (err, salt) {
                bcrypt.hash(password, salt, async function (err, hash) {
                    if (err) return res.send(err.message);
                    else {
                        let user = await userMOD.create({
                            image: req.file.buffer,
                            name,
                            email,
                            password: hash,
                        })

                        let token = generateToken(user);
                        res.cookie("token", token)
                        return res.redirect("/")
                    }
                })
            })
        }

    } catch (error) {
        console.log(error.message)
    }

})

router.post("/login", loginUser)

router.post("/logout", logoutUser)

module.exports = router;
