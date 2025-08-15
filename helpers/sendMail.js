const nodeMailer = require("nodemailer");

module.exports.sendMail = async (email, subject, html) => {
    try {
        const transporter = nodeMailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: `"Your Name" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: subject,
            html: html
        };

        await transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return console.error("Lỗi gửi email:", error);
            }
            console.log("Email đã được gửi thành công:", info.response);
        });
    } catch (error) {
        console.error("Lỗi gửi email:", error);
    }
};
