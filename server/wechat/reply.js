const tip = 'hello 这是一个测试回复'

export default async (ctx,next)=>{
    const message = ctx.weixin

    console.log('message',message)
    ctx.body = tip
}