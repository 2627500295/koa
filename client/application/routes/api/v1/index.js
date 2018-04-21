import Router from 'koa-router';

const router = new Router({
    strict: true,
    prefix: '/v1'
});

router.get('/', (ctx, next) => {
    ctx.body = "hello api";
});

export default router;
