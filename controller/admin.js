import ProductModel from '../model/product'
import StoreModel from '../model/store'

class Admin {
  constructor() {
    this.storeInformation = this.storeInformation.bind(this);
    this.productInformation = this.productInformation.bind(this);
    this.productList = this.productList.bind(this);
    this.classifySearch = this.classifySearch.bind(this);
    this.searchAnyWord = this.searchAnyWord.bind(this);
  }
  //进入首页时获取店铺基本信息
  async storeInformation(req, res, next) {
    const store_id = req.params.store_id;
    if(!store_id) {
      res.send({
        code: -1,
        message: '获取商店信息参数有误'
      });
    }else {
      try {
        const store = await StoreModel.findOne({store_id});
         if(!store) {
           res.send({
             code: -3,
             message: '该商店未注册'
           });
         }else {
           res.send({
             code: 200,
             success: '获取商店基本信息成功',
             data: store
           })
         }
      }catch(e) {
        console.log('getstorelist error', e);
        res.send({
          code: -3,
          message: '获取失败'
        })
      }
    }
  }
  //根据id获取店铺详细信息
  async productInformation(req, res, next) {
    let product_id = req.params.product_id;
    if(!product_id) {
      res.send({
        code: -1,
        message: '参数有误'
      });
    }else {
      try {
        const product = await ProductModel.findOne({_id: product_id});
        if(!product) {
          res.send({
            code: 3,
            message: '不存在该商品'
          });
        }else {
          res.send({
            code: 200,
            success: '获取商品信息成功',
            data: product
          })
        }
      }catch(e) {
        console.log('product error', e);
        res.send({
          code: -3,
          message: '获取失败'
        })
      }

    }
  }
  //获取商品列表
  async productList(req, res, next) {
    let {offset, limit, store_id} = req.params;
    try {
      const productList = await ProductModel.find({store_id});
      let sendList = [];
      offset = parseInt(offset);
      limit = parseInt(limit);
      sendList = productList.slice(offset, offset+limit);
      let hasmore=offset+limit > productList.length ? false : true;
      res.send({
        code: 200,
        success: '获取分页信息成功',
        data: {
          hasmore,
          list: sendList
        }
      })
    } catch (e) {
      console.log('getproductlist error', e);
      res.send({
        code: -1,
        message: '获取分页信息失败'
      });
    }
  }
  //按分类搜索
  async classifySearch(req, res, next) {
    let keywords = req.params.keywords;
    const search_result = await ProductModel.find({secondary_classify: keywords});
    try {
      res.send({
        code: 200,
        success: '查找成功',
        data: search_result
      })
    } catch (e) {
      console.log('classify search error', e);
      res.send({
        code: -1,
        message: '查找失败'
      })
    }
  }
  //任意词查找
  async searchAnyWord(req, res, next) {
    let keywords = req.params.keywords;
    const searchResult = await ProductModel.find({desc: { $regex: keywords, $options: 'i'}});
    try{
      res.send({
        code: 200,
        success: '查找成功',
        data: searchResult
      })
    } catch (e) {
      console.log('search any word error', e);
      res.send({
        code: -1,
        message: '查找失败'
      });
    }
  }
}

export default new Admin();