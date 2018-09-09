import express from 'express'
import User from '../controller/user'
import Auth from '../controller/auth'

const router = express.Router();

router.post('/login', User.login); //登录
router.get('/user_infor', Auth.authUser, User.getUserInfor);
router.get('/logout', User.logout); //登出
router.post('/mark:id', Auth.authUser, User.toMark); //收藏
router.post('/cancel_mark:id', Auth.authUser, User.cancelMark);
router.get('/is_mark:id', User.isMark);
router.post('/add_cart:id', User.addCart); //加购物车
router.get('/cart_content', Auth.authUser, User.getCartContent);//获取购物车内容
router.post('/delete_cart', Auth.authUser, User.deleteCart); //删除购物车
router.get('/my_collect', Auth.authUser, User.getCollectContent); //获取收藏内容
router.get('/get_address', Auth.authUser, User.getAddress); //获取收货地址
router.post('/change_address', Auth.authUser, User.changeAddress); //修改地址
router.post('/place_order', Auth.authUser, User.placeOrder); //提交订单
router.get('/get_order', Auth.authUser, User.getOrder); //获取订单
router.post('/change_name', Auth.authUser, User.changeName); //修改登录名
export default router;