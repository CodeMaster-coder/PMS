// pages/userPage/userPage.js

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  naviToAuth(){
    if(App.userinfo.auth == 'S1' || App.userinfo.auth == 'F1' || App.userinfo.auth == 'F2'){
      wx.navigateTo({
        url: '/pages/auth/auth',
      })
    }
    else{
      wx.showToast({
        title: '您无权限！！！',
        icon:'error',
        duration:3000
      })
    }
  },
  naviToErrorRecord(){
    if(App.userinfo.auth == 'F2' || App.userinfo.auth == 'F3' || (App.userinfo.auth == 'J1' & App.userinfo.wokertype == '维修')){
      wx.navigateTo({
        url: '/pages/errorRecord/errorRecord',
      })
    }
    else{
      wx.showToast({
        title: '您无权限！！！',
        icon:'error',
        duration:3000
      })
    }
  },
  naviToOutput(){
    if(App.userinfo.auth == 'F2'  & App.userinfo.wokertype == '生产'){
      wx.navigateTo({
        url: '/pages/output/output',
      })
    }
    else{
      wx.showToast({
        title: '您无权限！！！',
        icon:'error',
        duration:3000
      })
    }
  },
  naviToHoursOutput(){
    if((App.userinfo.auth == 'F2' || App.userinfo.auth == 'F3') & App.userinfo.wokertype == '生产'){
      wx.navigateTo({
        url: '/pages/hoursOutputSection/hoursOutputSection',
      })
    }
    else{
      wx.showToast({
        title: '您无权限！！！',
        icon:'error',
        duration:3000
      })
    }
  },
  naviToErrorShowSection(){
    wx.navigateTo({
      url: '/pages/ErrorShowSection/ErrorShowSection',
    })
  },
  naviToMaintenanceRecord(){
    if(App.userinfo.wokertype == '维修'){
      wx.navigateTo({
        url: '/pages/maintainRecord/maintainRecord',
      })
    }
    else{
      wx.showToast({
        title: '您无权限！！！',
        icon:'error',
        duration:3000
      })
    }
  },
  naviToMatainceShow(){
      wx.navigateTo({
        url: '/pages/maintainShowSection/maintainShowSection',
      })
  },
 /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    setTimeout(() =>{
  this.setData({
        headImage:App.userinfo.avatarUrl,
        nickName:App.userinfo.nickName
      })
    } 
    , 800);
   
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