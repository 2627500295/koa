import Router from 'koa-router';

import v1 from './v1';

const router = new Router({
    prefix: '/api',
    strict: true
});

router.use(v1.routes());

export default router;
