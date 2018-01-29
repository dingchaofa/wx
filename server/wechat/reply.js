const tip = 'hello 这是一个测试回复'+'<p>这是一个p标签</p>'

//https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140453

export default async (ctx,next)=>{
    const message = ctx.weixin
    

    if(message.MsgType === 'event'){

        if(message.Event ==='subscribe'){
            ctx.body = '👏欢迎关注'
            console.log('👏欢迎关注')
        }else if(message.Event ==='unsubscribe'){
            ctx.body = '👏欢迎下次关注'
            console.log('👏欢迎下次关注')
        }else if(message.Event ==='LOCATION'){
            ctx.body = '纬度：' +message.Latitude + '\n经度：' + message.Longitude + '\n精度：' + message.Precision
        }
        

    }else if(message.MsgType === 'text'){
        ctx.body = message.Content
    }else if(message.MsgType === 'image'){
        ctx.body = {
            type:'image',
            picUrl: message.PicUrl,
            mediaId:message.MediaId
        }
    }else if(message.MsgType === 'voice'){
        ctx.body = {
            type:'voice',
            format:message.Format,
            mediaId:message.MediaId
        }
    }else if(message.MsgType === 'video'){
        ctx.body = {
            type:'video',
            thumbMediaId:message.ThumbMediaId,
            mediaId:message.MediaId
        }
    }else if(message.MsgType === 'shortvideo'){
        ctx.body = {
            type:'shortvideo',
            thumbMediaId:message.ThumbMediaId,
            mediaId:message.MediaId
        }
    }else if(message.MsgType === 'location'){
        // ctx.body = {
        //     type:'location',
        //     location_X:message.Location_X,
        //     location_Y:message.Location_Y,
        //     scale:message.Scale,
        //     label:message.Label
        // }
        ctx.body = '纬度：' +message.Location_X + '\n经度：' + message.Location_Y + '\n缩放：' + message.Scale + '\n地名：' + message.Label
    }else if(message.MsgType === 'link'){
        // ctx.body = {
        //     type:'link',
        //     title:message.Title,
        //     description:message.Description,
        //     url:message.Url
        // }
        ctx.body = [{
            title:message.Title,
            description:message.Description,
            url:message.Url,
            picUrl:message.PicUrl //链接没有这个字段，但是模版里有这个字段，如果有就加上，没有就undefined
        }]
    }
   
}
