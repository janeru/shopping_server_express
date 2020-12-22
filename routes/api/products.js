const router = require("express").Router();


const { getAllProducts, updateOneProduct, insertOneProduct, deleteOneProduct } = require("../../app/controllers/api/ProductsController")

// 查詢products
router.get("/query", getAllProducts)
// 新增product
router.post('/insert', insertOneProduct)
// 修改product
router.put('/update', updateOneProduct)
// 刪除product
router.delete('/delete', deleteOneProduct)
module.exports = router;