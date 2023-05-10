// pages/auth/auth.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    workers:[]
  },
  highauth(e){
    console.log(e)
    let id = e.currentTarget.dataset.id
    wx.request({
      url: 'https://www.liuke.xyz/PMS/login',
      data:{
        code:'highauthUserinfo',
        id:id,
        auth:'F2'
      },
      method:'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log(res)
        if(res.data.status){
          wx.showToast({
            title: '工长权限授予成功',
            icon:'none',
            duration:3000
          })
          const pages = getCurrentPages()
          const perpage = pages[pages.length - 1]
          perpage.onLoad() 
        }
        else{
          wx.showToast({
            title: '工长权限授予失败',
            icon:'success',
            duration:3000
          })
        }
      }
    })
  } ,
  midauth(e){
    console.log(e)
    let id = e.currentTarget.dataset.id
    wx.request({
      url: 'https://www.liuke.xyz/PMS/login',
      data:{
        code:'highauthUserinfo',
        id:id,
        auth:'F3'
      },
      method:'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log(res)
        if(res.data.status){
          wx.showToast({
            title: '班长权限授予成功',
            icon:'none',
            duration:3000
          })
          const pages = getCurrentPages()
          const perpage = pages[pages.length - 1]
          perpage.onLoad() 
        }
        else{
          wx.showToast({
            title: '班长权限授予失败',
            icon:'success',
            duration:3000
          })
        }
      }
    })
  } ,
  delbtn(e){
    console.log(e)
    let id = e.currentTarget.dataset.id
    wx.request({
      url: 'https://www.liuke.xyz/PMS/login',
      data:{
        code:'delUserinfo',
        id:id
      },
      method:'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log(res)
        if(res.data.status){
          wx.showToast({
            title: '人员信息删除成功',
            icon:'none',
            duration:3000
          })
          const pages = getCurrentPages()
          const perpage = pages[pages.length - 1]
          perpage.onLoad() 
        }
        else{
          wx.showToast({
            title: '人员信息删除失败',
            icon:'success',
            duration:3000
          })
        }
      }
    })
  } ,
   /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let user = [];
    wx.request({
      url: 'https://www.liuke.xyz/PMS/login',
      data:{
        code:'unauthUserinfo',
        wokertype:App.userinfo.wokertype
      },
      method:'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        // console.log(res)
        let obj = res.data
        console.log(obj)
        if(obj.length == 0){
          wx.showToast({
            title: '没有等待审批权限的注册人员',
            icon: 'none',
            duration: 2000
          })
          that.setData({
            workers:[]
          })
        }else{
        for(var i=0;i<obj.length;i++){
          var obj1 = obj[i];
          user.push(obj1);
          that.setData({
            workers:user
          })
        }}
        // if(res.data.status = true){
        //   that.setData({
        //     user:res.data[0]
        //   })
        // }
      }
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})