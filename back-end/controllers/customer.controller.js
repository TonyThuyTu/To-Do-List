const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Customer = require("../models/customer.model");

//sign up
exports.signup = async (req, res) => {
  try {
    const { lastname, firstname, email, password, nickname } = req.body;

    if (!lastname || !firstname || !email || !password || !nickname) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // check email exists
    const existingEmail = await Customer.findOne({ email });
    if (existingEmail) {
      return res.status(409).json({ message: "Email already in use" });
    }

    // ✅ hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newCustomer = new Customer({
      lastname,
      firstname,
      email,
      password: hashedPassword, // store hashed, not raw
      nickname,
    });

    await newCustomer.save();

    // generate token
    const token = jwt.sign({ id: newCustomer._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: newCustomer._id,
        firstname: newCustomer.firstname,
        lastname: newCustomer.lastname,
        email: newCustomer.email,
        nickname: newCustomer.nickname,
      },
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

//login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // find user by email
    const user = await Customer.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // ✅ compare given password with hashed one
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // issue token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        nickname: user.nickname,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
