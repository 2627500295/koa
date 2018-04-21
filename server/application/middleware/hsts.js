var util = require('core-util-is')

let hsts = (options) => {
    options = options || {};

    let defaultMaxAge = 180 * 24 * 60 * 60;
    let maxAge = options.maxAge != null ? options.maxAge : defaultMaxAge;
    var includeSubDomains = (options.includeSubDomains !== false) && (options.includeSubdomains !== false)
    let force = options.force;
    let setIf = options.setIf;

    if (options.hasOwnProperty('maxage')) {
        throw new Error('maxage is not a supported property. Did you mean to pass "maxAge" instead of "maxage"?');
    };

    /*
    if (arguments.length > 1) {
        throw new Error('HSTS passed the wrong number of arguments.');
    };
    */

    if (!util.isNumber(maxAge)) {
        throw new TypeError('HSTS must be passed a numeric maxAge parameter.');
    };

    if (maxAge < 0) {
        throw new RangeError('HSTS maxAge must be nonnegative.');
    };

    if (options.hasOwnProperty('setIf')) {
        if (!util.isFunction(setIf)) {
            throw new TypeError('setIf must be a function.');
        };

        if (options.hasOwnProperty('force')) {
            throw new Error('setIf and force cannot both be specified.');
        };
    };

    if (options.hasOwnProperty('includeSubDomains') && options.hasOwnProperty('includeSubdomains')) {
        throw new Error('includeSubDomains and includeSubdomains cannot both be specified.');
    };

    let header = 'max-age=' + Math.round(maxAge);
    if (includeSubDomains) {
        header += '; includeSubDomains';
    };

    if (options.preload) {
        header += '; preload';
    };


    return async (ctx, next) => {
        ctx.req.secure = ctx.request.secure;

        var setHeader;
        
        if (setIf) {
            setHeader = setIf(ctx.req, ctx.res);
        } else {
            setHeader = force || ctx.req.secure;
        };

        if (setHeader) {
            ctx.set('Strict-Transport-Security', header);
        };

        await next();
    };
};

export default hsts;
