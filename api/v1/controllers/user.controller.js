const md5 = require('md5');
const User = require('../models/user.model'); 
const generate = require('../../../helpers/generate');
const sendMail = require('../../../helpers/sendMail');

const e = require('express');
const ForgotPassword = require('../models/forgot-password.model');

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

module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ 
            email: email,
            deleted: false
        });
        if (!user) {
            return res.status(404).json({ message: "Người dùng không tồn tại" });
        }
        if (user.password !== md5(password)) {
            return res.status(401).json({ message: "Mật khẩu không đúng" });
        }
        const token = user.token;
        res.cookie('token', token);
        res.status(200).json({
            message: "Đăng nhập thành công",
            token: token
        });
    } catch (error) {
        res.status(500).json({ message: "Lỗi đăng nhập", error });
    }
};

module.exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ 
            email, 
            deleted: false 
        });
        if (!user) {
            return res.status(404).json({ message: "Người dùng không tồn tại" });
        }
        const otp = generate.generateRandomString(6);
        const timeExpires = Date.now() + 5 * 60 * 1000; // 5 phút
        const objectForgotPassword = {
            email: email,
            otp: otp,
            expireAt: timeExpires
        };
        const forgotPassword = new ForgotPassword(objectForgotPassword);
        await forgotPassword.save();

        //Gửi OTP
        const subject = "Mã OTP đặt lại mật khẩu";
        const html = `
            <p>Mã OTP của bạn là: <strong>${otp}</strong></p>
            <p>Vui lòng không chia sẻ mã này với bất kỳ ai.</p>
        `;
        await sendMail.sendMail(email, subject, html);

        res.status(200).json({ message: "Đã gửi email đặt lại mật khẩu" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi quên mật khẩu", error });
    }
};

module.exports.otpPassword = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const forgotPassword = await ForgotPassword.findOne({ email, otp });
        if (!forgotPassword) {
            return res.status(400).json({ message: "Mã OTP không hợp lệ" });
        }
        if (forgotPassword.expireAt < Date.now()) {
            return res.status(400).json({ message: "Mã OTP đã hết hạn" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Người dùng không tồn tại" });
        }
        const token = user.token;
        res.cookie('token', token);
        res.status(200).json({ message: "Xác thực thành công!" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi xác thực OTP", error });
    }
};
