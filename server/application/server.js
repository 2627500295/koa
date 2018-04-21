/**
 * 模块依赖
 */
import http from "http";
import debugModel from "debug";
import portScanner from "portscanner";

/**
 * 导入应用
 */
import app from "./application";

const server = (async () => {
    /**
     * debug
     */
    const debug = debugModel("koa-srv:server");

    /**
     * Get port from environment.
     */
    const port = await portScanner.findAPortNotInUse(
        require("./utils/normalize-port")(process.env.PORT || 3000),
        false
    );

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
        var bind =
            typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
        debug("Listening on " + bind);

        /**
         * 输出信息
         */
        var banner = [
            "",
            "",
            "                               .__ ",
            "        _____  _____   ______  |__|",
            "       /     \\ \\__  \\  \\____ \\ |  |",
            "      |  Y Y  \\ / __ \\_|  |_> >|  |",
            "      |__|_|  /(____  /|   __/ |__|",
            "            \\/      \\/ |__|        ",
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

    return server;
})();

/**
 * Export server
 */
export { server as default };
