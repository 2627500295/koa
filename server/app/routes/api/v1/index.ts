import * as Router from "koa-router";

const router = new Router({
  strict: true,
  prefix: "/api/v1"
});

router.get("/", (ctx, next) => {
  ctx.body = "hello api";
});

export default router;
