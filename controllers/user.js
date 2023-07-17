
const userSchema = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class userController {
    get(req, res, next) {
        userSchema.find({}).then((data) => {
            console.log(data + req.cookies.token);
            return res.status(200).json({ status: 'success', data });
        })
    }
    login(req, res, next) {
        console.log(req.body);
        var email = req.body.email;
        var password = req.body.password;


        userSchema.findOne({ email: email })
            .then((data) => {
                if (!data) {
                    return res.status(401).json({ status: 'error', message: 'Tài khoản chưa tồn tại' });
                }
                console.log(data);
                // So sánh mật khẩu đã nhập với mật khẩu đã mã hóa
                bcrypt.compare(password, data.password)
                    .then(isMatch => {
                        if (isMatch) {
                            var accessToken = getAccessToken({ _id: data._id });
                            var refreshToken = getRefeshToken({ _id: data._id });
                            console.log('accessToken', accessToken);
                            console.log('refreshToken', refreshToken);

                            res.cookie('token', accessToken); // Lưu access token vào cookie
                            res.cookie('refreshToken', refreshToken); // Lưu refresh token vào cookie
                            res.cookie('user', data);

                            console.log(data);
                            return res.status(200).json({ status: 'success', data });
                        } else {
                            console.log('hehehe');
                            return res.status(401).json({ status: 'error', message: 'Sai mật khẩu!!' });
                        }
                    })
                    .catch(error => {
                        // Xử lý lỗi so sánh mật khẩu
                        console.error(error);
                        return res.status(501).json({ status: 'error', message: 'Đã xảy ra lỗi' });
                    });

            })
            .catch((err) => {
                return res.status(500).json({ status: 'error', message: 'Đã xảy ra lỗi' });
            });
    }
    register(req, res, next) {
        var username = req.body.username;
        var email = req.body.email;
        var password = req.body.password;

        userSchema.findOne({ email: email })
            .then((data) => {
                if (data) {
                    res.status(400).json('Email đã tồn tại!');
                } else {
                    bcrypt.genSalt(10)
                        .then(salt => {
                            return bcrypt.hash(password, salt);
                        })
                        .then(hash => {
                            password = hash; // Gán mật khẩu đã được mã hóa vào formData
                            userSchema.create({
                                username: username,
                                password: password,
                                email: email,
                                img: 'https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg'
                            })
                                .then(() => {
                                    return res.status(200).json({ status: 'success', message: 'Thành công' });

                                })
                                .catch((err) => {
                                    return res.status(500).json({ status: 'error', message: 'Đã xảy ra lỗi tạo thất bại' + err });

                                });
                        })
                        .catch(() => {
                            return res.status(500).json({ status: 'error', message: 'Đã xảy ra lỗi mã hóa mật khẩu' });

                        });

                }
            })
            .catch((err) => {
                res.status(500).json('Lỗi trong quá trình kiểm tra username');
            });
    }
    logout(req, res, next) {
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        res.send('Cookie has been cleared');
    }

}
function getAccessToken(data) {
    const plainData = { ...data, _id: data._id.toString() };
    return jwt.sign(plainData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
}
function getRefeshToken(data) {
    const plainData = { ...data, _id: data._id.toString() };
    return jwt.sign(plainData, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
}


module.exports = new userController;