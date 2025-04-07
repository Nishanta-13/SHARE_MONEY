const userMOD = require("../models/userModel")
const bcrypt = require("bcrypt")
const { generateToken } = require("../utils/generateToken")

module.exports.loginUser = async function (req, res) {
    try {
        let { email, password } = req.body;

        let user = await userMOD.findOne({ email });
        if (!user) {
            return res.redirect("/");
        } else {
            bcrypt.compare(password, user.password, function (err, result) {
                if (result) {
                    let token = generateToken(user)
                    res.cookie("token", token)
                    res.status(200).send("successfull")
                } else {
                    return res.redirect("/")
                }
            })
        }

    } catch (error) {
        console.log(error.message)
    }
}

module.exports.logoutUser = function (req, res) {
    res.cookie("token", "")
    res.redirect("/")
}