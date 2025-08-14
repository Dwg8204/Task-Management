const User = require('../models/user.model');
const md5 = require('md5');

// module.exports.loginPost = async (req, res, next) => {
//     if (!req.body.email || !req.body.password) {
//         req.flash('error', 'Vui lòng nhập đầy đủ thông tin đăng nhập');
//         return res.redirect(systemConfig.PrefixAdmin + '/auth/login');
//     }

//     const account = await User.findOne({
//         email: req.body.email,
//         password: md5(req.body.password),
//         deleted: false
//     });

//     if (!account) {
//         req.flash('error', 'Email hoặc mật khẩu không đúng');
//         return res.redirect(systemConfig.PrefixAdmin + '/auth/login');
//     }

//     next();
// }

// module.exports.loginPost = (req, res, next) => {
//   const errors = [];
//   let { email, password } = req.body || {};

//   // email
//   if (!email) {
//     errors.push('Vui lòng nhập email');
//   } else {
//     email = String(email).trim().toLowerCase();
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
//     if (!emailRegex.test(email)) errors.push('Email không hợp lệ');
//     req.body.email = email;
//   }

//   // password
//   if (!password) {
//     errors.push('Vui lòng nhập mật khẩu');
//   } else if (password.length < 6) {
//     errors.push('Mật khẩu phải có ít nhất 6 ký tự');
//   }

//   if (errors.length) {
//     return res.status(400).json({ message: 'Dữ liệu không hợp lệ', errors });
//   }
//   return next();
// };

module.exports.register = async (req, res, next) => {
  try {
    const errors = [];
    let { fullName, email, password, confirmPassword } = req.body || {};

    // fullName
    if (!fullName || !fullName.trim()) {
      errors.push('Vui lòng nhập họ tên');
    } else {
      req.body.fullName = fullName.trim();
    }

    // email
    if (!email) {
      errors.push('Vui lòng nhập email');
    } else {
      email = String(email).trim().toLowerCase();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      if (!emailRegex.test(email)) errors.push('Email không hợp lệ');
      req.body.email = email;
    }

    // password
    if (!password) {
      errors.push('Vui lòng nhập mật khẩu');
    } else if (password.length < 6) {
      errors.push('Mật khẩu phải có ít nhất 6 ký tự');
    }

    // confirmPassword (nếu gửi kèm)
    // if (confirmPassword !== undefined && password !== confirmPassword) {
    //   errors.push('Mật khẩu xác nhận không khớp');
    // }

    // Check trùng email
    if (!errors.length) {
      const existed = await User.findOne({ email: req.body.email, deleted: false });
      if (existed) errors.push('Email đã tồn tại');
    }

    if (errors.length) {
      return res.status(400).json({ message: 'Dữ liệu không hợp lệ', errors });
    }

    return next();
  } catch (err) {
    return res.status(500).json({ message: 'Lỗi validate', error: err.message });
  }
};