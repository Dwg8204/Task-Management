const md5 = require('md5');
const User = require('../models/user.model'); 


module.exports.register = async (req, res) => {
    try {
        const { email, password, fullName } = req.body;
        const existEmail = await User.findOne({ 
            email: email,
            deleted: false
        });
        if (existEmail) {
            return res.status(400).json({ message: "Email đã tồn tại" });
        }
        const user = new User({ email, password: md5(password), fullName });
        await user.save();
        const token = user.token;
        res.cookie('token', token);
        res.status(201).json({
            message: "Đăng ký người dùng thành công",
            token: token
        });
    } catch (error) {
        res.status(500).json({ message: "Lỗi đăng ký người dùng", error });
    }
};
