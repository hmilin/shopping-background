import admin from './admin'
import v1 from './v1'

export default router => {
  router.use('/admin', admin);
  router.use('/v1', v1);
}