import * as Router from "koa-router";

const router = new Router({
  strict: true,
  prefix: "/api/v2"
});

router.get("/", (ctx, next) => {
  ctx.body = "hello api v2";
});

export default router;
