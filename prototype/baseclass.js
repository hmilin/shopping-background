import IdModel from '../model/id'

export default class BaseClass {
  constructor() {
    this.idList = ['user_id', 'store_id'];
  }
  async getId(type_id) {
    if (!this.idList.includes(type_id)) {
      throw new Error('id类型错误');
    }
    try {
      const idData = await IdModel.findOneAndUpdate({}, {'$inc': {[type_id]: 1}});
      return ++idData[type_id];                //返回当前类型id数量*/
    } catch (err) {
      console.log('获取ID数据失败', err);
      throw new Error(err)
    }
  }
}