/**
 * Normalize a port into a number, string, or false.
 * credit: https://github.com/expressjs/generator/blob/fade8ce129eff75f661e3a748333025148efde32/templates/js/www#L32-L50
 */
const normalizePort = value => {
    var port = parseInt(value, 10);

    if (isNaN(port)) {
        // named pipe
        return value;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
};

export { normalizePort as default };
