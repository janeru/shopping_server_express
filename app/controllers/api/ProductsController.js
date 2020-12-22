const Product = require("../../models/Product");
const { success, error } = require("../../helpers/responseApi");
const mongoose = require('mongoose')
/**
 *  query 顯示所有products
 */

exports.getAllProducts = async (req, res) => {
    let { page = 1, limit = 20 } = req.query
    page = Number(page)
    limit = Number(limit)
    console.log(typeof page)
    try {

        // 找一筆id的資料
        // let data = await Product.findById({ _id: ObjectID('5fd043e362e3b348cbdec99c') }).exec()

        // 找全部的資料
        let data = await Product.find()
            .limit(limit)
            .skip((page - 1) * limit)
            .exec()
        // get total documents in the Posts collection 
        const allProducts = await Product.find({})
        const count = allProducts.length
        // console.log(count)
        const totalPages = Math.ceil(count / limit)
        const result = {
            products: data,
            totalPages: totalPages,
            currentPage: page,
            totalCount: count
        }
        //對data有沒有存在進行處理
        if (!data) {
            return res.status(404).json(error("Not found product", res.statusCode));
        }


        res.status(200)
            .json(success('get products', result, res.statusCode))


    } catch (err) {
        console.error(err.message);
        res.status(500).json(error("Server error", res.statusCode));
    }

}

exports.updateOneProduct = async (req, res) => {
    const { _id, name, price } = req.body

    if ((_id === null || _id === undefined) ||
        (name === null || name === undefined) ||
        (price === null || price === undefined)
    ) {
        return res.status(500).json(error("update request data is error", res.statusCode));
    }
    // 找出要update的id

    const filter = { _id: mongoose.Types.ObjectId(_id) }
    const update = { $set: { "name": name, "price": price } }

    try {

        let data = await Product.findOneAndUpdate(filter, update, { new: true })

        if (!data) {
            return res.status(404).json(error("insert product fail", res.statusCode));
        }

        // 如果更新成功，回傳true
        res.status(200)
            .json(success('success update product', true, res.statusCode))

    } catch (err) {
        console.error(err.message);
        res.status(500).json(error("Server error", res.statusCode));
    }
}

exports.insertOneProduct = async (req, res) => {
    const { name, price, count, image } = req.body
    if ((name === null || name === undefined) ||
        (price === null || price === undefined) ||
        (count === null || count === undefined) ||
        (image === null || image === undefined)
    ) {
        return res.status(500).json(error("insert request data is error", res.statusCode));
    }
    const insertData = {
        _id: mongoose.Types.ObjectId(),
        name, price, count, image
    }

    const newProduct = new Product(insertData)
    try {
        // 要用save的方式post data,在mongoose沒有insertOne or insert data
        let data = await newProduct.save()
        if (!data) {
            return res.status(404).json(error("insert product fail", res.statusCode));
        }

        // 如果更新成功，回傳true
        res.status(200)
            .json(success('success insert product', data, res.statusCode))
    } catch (err) {
        console.log(err.message)
        res.status(500).json(error("Server error", res.statusCode));
    }
}

exports.deleteOneProduct = async (req, res) => {
    const { _id } = req.body
    if (_id === null || _id === undefined) {
        return res.status(500).json(error("delete request data is error", res.statusCode));
    }
    const deleteData = { _id: mongoose.Types.ObjectId(_id) }


    try {
        const deleteResult = await Product.deleteOne(deleteData)

        if (!deleteResult) {
            return res.status(404).json(error("insert product fail", res.statusCode));
        }

        // 如果更新成功，回傳true
        res.status(200)
            .json(success('success delete product', true, res.statusCode))
    } catch (error) {
        console.log(err.message)
        res.status(500).json(error("Server error", res.statusCode));
    }
}