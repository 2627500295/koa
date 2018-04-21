import Router from 'koa-router';

const router = new Router({
    strict: true
});

router.get('/', (ctx, next) => {
    ctx.body = "hello!";
});

export default router;
