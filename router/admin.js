import express from 'express'
import Admin from '../controller/admin'

const router = express.Router();

router.get('/store_infor/:store_id', Admin.storeInformation); //获取店铺信息
router.get('/product_infor/:product_id', Admin.productInformation); //获取商品信息
router.get('/product/:offset/:limit/:store_id', Admin.productList); //获取商品分页列表
router.get('/classify_search/:keywords', Admin.classifySearch); //按分类查找
router.get('/search_anyword/:keywords', Admin.searchAnyWord); //按任意词查找

export default router;