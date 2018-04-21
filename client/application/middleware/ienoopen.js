
let ienoopen = () => {
    return async (ctx, next) => {
        ctx.set('X-Download-Options', 'noopen');
        await next();
    };
};

export default ienoopen;
