const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.register = async (req, res) => {
const { name, email, password } = req.body;
const hashed = await bcrypt.hash(password, 10);


try {
const user = await User.create({ name, email, password: hashed });
res.json(user);
} catch (err) {
res.status(400).json({ message: "Email sudah terdaftar" });
}
};


exports.login = async (req, res) => {
const { email, password } = req.body;
console.log(email,password)

const user = await User.findOne({ email });

console.log(user) 


if (!user || !(await bcrypt.compare(password, user.password))) {
return res.status(401).json({ message: "Login gagal" });
}


const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
res.json({ token });
};