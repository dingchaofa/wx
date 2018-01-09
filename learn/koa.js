const koa = require('koa')
const app = new koa()


// const one = (ctx, next) => {
//     console.log('>> one');
//     next();
//     console.log('<< one');
//   }
  
//   const two = (ctx, next) => {
//     console.log('>> two');
//     next(); 
//     console.log('<< two');
//   }
  
//   const three = (ctx, next) => {
//     console.log('>> three');
//     next();
//     console.log('<< three');
//   }
  
//   app.use(one);
//   app.use(two);
//   app.use(three);

// app.use(async (ctx, next) => {
//     const start = Date.now();
//     await next();
//     const ms = Date.now() - start;
//     ctx.set('X-Response-Time', `${ms}ms`);
//   });
  
//   // logger
  
//   app.use(async (ctx, next) => {
//     const start = Date.now();
//     await next();
//     const ms = Date.now() - start;
//     console.log(`${ctx.method} ${ctx.url} - ${ms}`);
//   });
  
//   // response
  
//   app.use(async ctx => {
//     ctx.body = 'Hello World';
//   });

  const handler = async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      ctx.response.status = err.statusCode || err.status || 500;
      ctx.response.body = {
        message: err.message
      };
    }
  };
  
  const main = ctx => {
    ctx.throw(500);
  };
  
  app.use(handler);
  app.use(main);

  app.listen(4000);
  console.log('http://localhost:4000')