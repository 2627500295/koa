/**
 * 模块依赖
 */
import * as path from "path";
import * as koaModel from "koa";

/**
 * 中间件
 */
import * as bodyparser from "koa-bodyparser";
import * as views from "koa-views";
import * as json from "koa-json";
import * as logger from "koa-logger";
import * as koaStatic from "koa-static";
import * as error from "koa-json-error";
import * as helmet from "koa-helmet";

/**
 * 项目实例化
 */
const app = new koaModel();

/**
 * Helmet
 */
app.use(helmet());

/**
 * 优化错误输出
 */
app.use(error());

/**
 * 日志输出
 */
app.use(logger());

/**
 * 数据解析器
 */
app.use(bodyparser());
app.use(json());

/**
 * Etag
 */
app.use(require('koa-conditional-get')());
app.use(require('koa-etag')());

/**
 * 模板引擎设置
 */
app.use(
  views(__dirname + "/views", {
    extension: "hbs",
    map: { hbs: "handlebars" }
  })
);

/**
 * 静态文件目录
 */
app.use(koaStatic(path.join(__dirname, "..", "public/static")));

/**
 * 应用路由
 */
import routers from "./routes";
Object.values(routers).forEach((router, index, array) => {
  app.use(router.routes());
});

/**
 * 自定义错误
 * 由 routers 先处理错误, 如果 routers 未处理, 则由 app.use 处理错误
 */
app.use(async (ctx, next) => {
  try {
    await next();
    if (ctx.status === 404) ctx.throw(404);
  } catch (err) {
    ctx.status = err.status || 500;
    let body = err.body || err.message;

    ctx.body = {
      ret: ctx.status,
      data: {
        url: ctx.url
      },
      msg: body
    };
  }
});

/**
 * 导出app
 */
export default app;
