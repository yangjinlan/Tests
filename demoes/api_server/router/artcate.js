const express = require('express');
const router = express.Router();
const artcate_handler = require('../router_handler/artcate');
const { add_cate_schema, delete_cate_schema, get_cate_schema, update_cate_schema } = require('../schema/user');
const expressJoi = require('@escook/express-joi');
//获取文章分类
router.get('/catea', artcate_handler.getArticleCates);
//新增文章分类
router.post('/addcates', expressJoi(add_cate_schema), artcate_handler.addArticleCates);
//删除分类
router.get('/deletecate/:id', expressJoi(delete_cate_schema), artcate_handler.deleteCateById);
//获取分类数据
router.get('/cates/:id', expressJoi(get_cate_schema), artcate_handler.getArtCateById);
//更新分类数据
router.post('/updatecate', expressJoi(update_cate_schema), artcate_handler.updateCateById);
module.exports = router;