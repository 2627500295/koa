/**
 * 模块依赖
 */
import http from "http";
import debugModel from "debug";

/**
 * 导入应用
 */
import app from "./application";

/**
 * debug
 */
const debug = debugModel("koa-srv:server");

/**
 * Get port from environment.
 */
const port = require("./utils/normalize-port")(process.env.PORT || "3000");

/**
 * Create HTTP server.
 */
const server = http.createServer(app.callback());

/**
 * Event listener for HTTP server "error" event.
 */
const onError = error => {
    if (error.syscall !== "listen") {
        throw error;
    }

    var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
};

/**
 * Event listener for HTTP server "listening" event.
 */
const onListening = () => {
    var addr = server.address();
    var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
    debug("Listening on " + bind);

    /**
     * 输出信息
     */
    var banner = [
        "",
        "",
        "                              ___.    ",
        "      _____  __  _  __  ____  \\_ |__  ",
        "     /     \\ \\ \\/ \\/ /_/ __ \\  | __ \\ ",
        "    |  Y Y  \\ \\     / \\  ___/  | \\_\\ \\",
        "    |__|_|  /  \\/\\_/   \\___  > |___  /",
        "          \\/               \\/      \\/",
        "",
        "",
        `  💻 App is running at http://${addr.address}:${addr.port}`,
        "  Press CTRL-C to stop",
        "",
        ""
    ].join("\n");
    console.log(banner);
};

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, "0.0.0.0");
server.on("error", onError);
server.on("listening", onListening);

/**
 * Export server
 */
export { server as default };
