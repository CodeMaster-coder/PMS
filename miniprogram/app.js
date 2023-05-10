// app.js
var app = getApp()
App({

  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        env: 'mycloud-0guiv98u8ba3ed98',
        traceUser: true,
      });
    }
          wx.login({
        success: function(res){
        let code = res.code;
        console.log(code)
        if(code != ''){
          wx.request({
            url: 'https://www.liuke.xyz/PMS/login',
            method: 'POST',
            header:{'content-type': 'application/x-www-form-urlencoded'},
            data:{
              code: 'login',
              demo:code
            },        
            success: function(res){
            // console.log(res)
              if(res.data.length > 0 ){
                App.userinfo = res.data[0]
                console.log(App.userinfo)

              if(res.data[0].auth != '0'){
                wx.switchTab({
                  url: '/pages/mainpage/mainpage',
                }) 
              }
              else{
                wx.navigateTo({
                  url: '/pages/register/register',
                })
              }
              }
              else{
                wx.navigateTo({
                  url: '/pages/register/register',
                })
              }
              
            }})}}
          })

    this.globalData = {};
   
  }
});
