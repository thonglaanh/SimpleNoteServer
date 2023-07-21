const Note = require('../models/note');
const Category = require('../models/category');
const fs = require('fs')

class NoteController {
    async get(req, res, next) {
        try {
            const categoryQuery = req.query.category;
            const titleQuery = req.query.title;
            let categoryData;
            let noteData;
            const account = req.cookies.user;
            console.log(account._id);

            // Lấy danh sách category
            const categories = await Category.find({ user: account });
            categoryData = categories.map((category) => category.toObject());

            // Tạo câu truy vấn cho note
            const noteQuery = {}; // Chỉ lấy note của người dùng đã xác thực

            if (categoryQuery) {
                const category = await Category.findOne({ _id: categoryQuery });
                if (category) {
                    noteQuery.category = category._id;
                }
            }

            if (titleQuery) {
                noteQuery.title = { $regex: titleQuery, $options: 'i' };
            }
            if (account) {
                noteQuery.user = account;
            }

            // Lấy danh sách note của người dùng
            noteData = await Note.find(noteQuery).sort({ 'startDate': -1 })
                .populate('user')
                .populate('category');
            res.json({ notes: noteData, categories: categoryData, account: account });
            // return res.status(200).json({ status: 'success', data: { note: noteData, category: categoryData } });


        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    }
    createNote(req, res, next) {
        console.log(req.body);
        const formData = req.body;
        if (req.file) {
            fs.rename(req.file.path, 'uploads/' + req.file.originalname, function (err) {
                console.log(req.file.originalname);
            });
            formData.img = 'http://192.168.0.107:3000/uploads/' + req.file.originalname;
        } else {
            console.log('Không có ảnh')
        }


        const currentDate = new Date();
        const account = req.cookies.user;
        formData.startDate = currentDate;
        formData.user = account._id;
        console.log(formData);
        Note.create(formData).then(() => {

            console.log('Tạo thành công')
        }).catch((err) => {
            console.log('Tạo thất bại ' + err)
        })

    }
    updateNote(req, res, next) {

        console.log(req.body);

        const formData = req.body;
        if (req.file) {
            fs.rename(req.file.path, 'uploads/' + req.file.originalname, function (err) {
                console.log(req.file.originalname);
            });
            formData.img = 'http://192.168.0.107:3000/uploads/' + req.file.originalname;
        } else {
            console.log('Không có ảnh');
        }

        const id = req.params._id;
        const currentDate = new Date();
        const account = req.cookies.user;
        formData.startDate = currentDate;
        formData.user = account._id;
        console.log(formData);

        Note.findByIdAndUpdate(id, formData).then(() => {

            res.json('Update thành công')
        }).catch((err) => {
            res.json('Update thất bại ' + err)
        })

    }
    deleteNote(req, res, next) {
        Note.deleteOne({ _id: req.params._id }).then(() => {
            res.json('Xóa thành công!')
        }).catch((err) => {
            res.json('Xóa thất bại!')
        })

    }
}

module.exports = new NoteController();
