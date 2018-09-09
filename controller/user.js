import UserModel from '../model/user'
import BaseClass from '../prototype/baseclass'
import crypto from 'crypto'
import IdModel from '../model/id'
import ProductModel from '../model/product'
import MarkModel from '../model/mark'
import CartModel from '../model/cart';
import OrderModel from '../model/order'

class User extends BaseClass{
  constructor() {
    super();
    this.login = this.login.bind(this);
  }
  //注册登录
  async login(req, res, next) {
    const { username, password } = req.body;
    const md5password = this.encryption(password);
    try {
      const user = await UserModel.findOne({username});
      if(!user) {
        const user_id = await this.getId('user_id');
        const createData = {
          username,
          password: md5password,
          user_id: user_id,
          head_portrait: 'http://zjimg.5054399.com/allimg/170503/23_170503150254_1.jpg',
          address: ''
        };
        await new UserModel(createData).save();

        req.session.user_id = user_id;
        res.send({
          status: 200,
          success: '登录成功'
        });
      } else if(md5password === user.password){
        req.session.user_id = user.user_id;
        res.send({
          status: 200,
          success: '登录成功',
        })
      }else {
        res.send({
          status: -1,
          message: '用户已存在，密码错误'
        })
      }
    } catch(err) {
      console.log('用户登录失败', err);
      res.send({
        status: -1,
        message: '登录失败'
      });
    }
  }

  //获取用户信息
  async getUserInfor(req, res) {
    const user_id = req.session.user_id;
    try {
      const {username, head_portrait} = await UserModel.findOne({user_id});
      res.send({
        code: 200,
        success: '获取用户信息成功',
        data: {
          username,
          head_portrait
        }
      })
    } catch(err) {
      console.log('获取用户信息出现错误', err);
      res.send({
        code: -1,
        message: '获取用户信息失败'
      })
    }
  }
  //退出登录
  logout(req, res, next) {
    try {
      delete req.session.user_id;
      res.send({
        code: 200,
        success: '退出成功'
      })
    } catch(err) {
      console.log('退出登录发生错误', err);
      res.send({
        code: -1,
        message: '退出失败'
      });
    }
  }
  //加入收藏
  async toMark(req, res, next) {
    const product_id = req.params.id;
    const user_id = req.session.user_id;
    try {
      const product = await ProductModel.findOne({_id: product_id});
      const createData = {
        user_id,
        product_id,
        store_id: product.store_id,
        name: product.name,
        desc: product.desc,
        price: product.price,
        imageList: product.imageList
      };
      await new MarkModel(createData).save();
      res.send({
        code: 200,
        success: '收藏成功'
      });
    } catch(err) {
      console.log('收藏发生错误', err);
      res.send({
        code: -1,
        message: '收藏失败'
      });
    }
  }
  //取消收藏
  async cancelMark(req, res, next) {
    const user_id = req.session.user_id;
    const product_id = req.params.id;
    try {
      const product = await MarkModel.findOne({user_id, product_id});
      await product.remove();
      res.send({
        code: 200,
        success: '取消收藏成功'
      })
    } catch(err) {
      console.log('取消收藏发生错误', err);
      res.send({
        code: -1,
        message: '取消收藏失败'
      })
    }
  }
  //查询是否已收藏
  async isMark(req, res, next) {
    const user_id = req.session.user_id;
    const product_id = req.params.id;
    try {
      let ismark = false;
      const mark = await MarkModel.findOne({user_id, product_id});
      if(mark) {
        ismark = true;
      }
      res.send({
        code: 200,
        success: '获取收藏状态成功',
        data: {
          ismark
        }
      })
    } catch(err) {
      console.log('获取收藏状态发生错误', err);
      res.send({
        code: -1,
        message: '获取收藏状态失败'
      })
    }
  }
  //加入购物车
  async addCart(req, res ,next) {
    const product_id = req.params.id;
    const user_id = req.session.user_id;
    try {
      const product = await ProductModel.findOne({_id: product_id});
      const createData = {
        user_id,
        product_id,
        store_id: product.store_id,
        name: product.name,
        desc: product.desc,
        price: product.price,
        imageList: product.imageList
      };
      await new CartModel(createData).save();
      res.send({
        code: 200,
        success: '加入购物车成功'
      });
    } catch(err) {
      console.log('加入购物车发生错误', err);
      res.send({
        code: -1,
        message: '加入购物车失败'
      });
    }
  }
  //获取购物车内容
  async getCartContent(req, res) {
    const user_id = req.session.user_id;
    try {
      const cart = await CartModel.find({user_id});
      res.send({
        code: 200,
        success: '获取购物车内容成功',
        data: {
          cart
        }
      })
    } catch(err) {
      console.log('获取购物车内容发生错误', err);
      res.send({
        code: -1,
        message: '获取购物车内容失败'
      })
    }
  }
  //删除购物车内容
  async deleteCart(req, res) {
    const user_id = req.session.user_id;
    const deleteList = req.body.deleteList;
    try {
      deleteList.forEach( async (item) => {
        const deleteData = await CartModel.findOne({user_id, _id: item});
        deleteData.remove();
      });
      res.send({
        code: 200,
        success: '删除购物车成功'
      })
    } catch(err) {
      console.log('删除购物车发生错误', err);
      res.send({
        code: -1,
        message: '删除购物车失败'
      })
    }
  }
  //获取收藏内容
  async getCollectContent(req, res) {
    const user_id = req.session.user_id;
    try {
      const mark = await MarkModel.find({user_id});
      res.send({
        code: 200,
        success: '获取收藏内容成功',
        data: {
          list: mark
        }
      })
    } catch(err) {
      console.log('获取收藏内容发生错误', err);
      res.send({
        code: -1,
        message: '获取收藏内容失败'
      })
    }
  }
  //获取收货地址
  async getAddress(req, res) {
    const user_id = req.session.user_id;
    try {
      const user = await UserModel.findOne({user_id});
      res.send({
        code: 200,
        success: '获取地址成功',
        data: {
          name: user.name,
          phone: user.phone,
          location: user.location
        }
      });
    } catch(err) {
      console.log('获取地址发生错误', err);
      res.send({
        code: -1,
        message: '获取地址失败'
      });
    }
  }
  //修改地址
  async changeAddress(req, res) {
    const user_id = req.session.user_id;
    const { name, phone, location} = req.body;
    try {
      await UserModel.update({user_id}, {name, phone, location});
      res.send({
        code: 200,
        success: '修改地址成功',
        data: {
          name,
          phone,
          location
        }
      })
    }catch (err) {
      console.log('修改地址发生错误', err);
      res.send({
        code: -1,
        message: '修改地址错误'
      })
    }
  }
  //提交订单
  async placeOrder(req, res) {
    const user_id = req.session.user_id;
    const {productList, total_price } = req.body;
    try {
      const order = {
        user_id,
        product: productList,
        total_price
      }
      await new OrderModel(order).save();
      productList.forEach(async (item) => {
        const data = await CartModel.findOne({user_id, product_id: item.product_id});
        data.remove();
      })
      res.send({
        code: 200,
        success: '提交订单成功'
      });
    } catch(err) {
      console.log('提交订单发生错误', err);
      res.send({
        code: -1,
        message: '提交订单失败'
      })
    }
  }
  //获取订单
  async getOrder(req, res) {
    const user_id = req.session.user_id;
    try {
      const order = await OrderModel.find({user_id});
      res.send({
        code: 200,
        success: '获取订单成功',
        data: order
      });
    } catch(err) {
      console.log('获取订单发生错误',err);
      res.send({
        code: -1,
        message: '获取订单失败'
      });
    }
  }
  //修改头像
  async changeName(req, res) {
    const user_id = req.session.user_id;
    const new_name = req.body.new_name;
    const name = await UserModel.findOne({username: new_name});
    if(name) {
      res.send({
        code: -3,
        message: '该昵称已被使用'
      });
    }else {
      try {
        await UserModel.update({user_id}, {username: new_name});
        res.send({
          code: 200,
          success: '修改昵称成功'
        })
      } catch(err) {
        console.log('修改登录名发生错误', err);
        res.send({
          code: -1,
          message: '修改昵称失败'
        });
      }
    }
  }
  //加密
  encryption(password) {
    const md5password = this.Md5(this.Md5(password));
    return md5password
  }

  //md5加密
  Md5(password) {
    const md5 = crypto.createHash('md5');
    return md5.update(password).digest('base64');
  }
}

export default new User();