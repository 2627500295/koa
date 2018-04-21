
/**
 * Set Response Headers X-Powered-By 
 */
export default (options) => {
    var powered = (options || {}).powered;

    if (powered) {
        return async (ctx, next) => {
            ctx.set('X-Powered-By', powered)
            await next()
        }
    } else {
        return async (ctx, next) => {
            ctx.remove('X-Powered-By')
            await next()
        }  
    }
}
