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

export default router;