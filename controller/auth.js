class Auth {
  authUser(req, res, next) {
    if(!req.session.user_id) {
      res.send({
        code: -3,
        message: '未登录'
      })
    }else {
      next();
    }
  }
}

export default new Auth();
