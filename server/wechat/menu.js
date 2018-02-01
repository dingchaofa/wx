export const menu =   {
    "button":[
    {    
         "name":"点",
         'sub_button':[
             {
                type:'click',
                name: '不要点我啊',
                key: 'notClick'
             },
             {
                type: 'view',
                name: '我要去dingcf.top',
                url: 'http://dingcf.top'
             }
         ]
     },
     {
            name:"线",
            sub_button: [
            {    
                type: "scancode_push",
                name: "让我看看你扫的啥",
                key: "scancode_push"
           },
           {
                type:"scancode_waitmsg",
                name:"扫码弹窗",
                key:"scancode_waitmsg"
           }]
      },
    {
        name: '面',
        sub_button: [
            {    
                type: "pic_sysphoto",
                name: "拍照",
                key: "pic_sysphoto"
           },
           {
                type:"pic_photo_or_album",
                name:"弹出拍照或者相册发图",
                key:"pic_photo_or_album",
                sub_button:[]
           },
           {
                type:"pic_weixin",
                name:"弹出微信相册发图器",
                key:"pic_weixin"
           },
           {
                type:"location_select",
                name:"弹出地理位置选择器",
                key:"location_select"
           },
           {
                type:"media_id",
                name:"看永久素材",
                media_id:"AjsxwBRbryXLBaiuhGQ-_AVN4n7lMn50OD1R8mEKRYo"
           }
        ]
    }]
}