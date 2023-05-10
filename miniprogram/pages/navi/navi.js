// pages/navi/navi.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code:'PFH',
    inputCode:'',
  

  },
  //输入框输入事件
  codeInput(e){
    console.log(e)
    this.setData({
      inputCode:e.detail.value
    })
  },

  //页面跳转按钮点击事件
  naviToLogin(){
    if(this.data.inputCode.length == 0){
      wx.showToast({
        title: '请输入邀请码！！！',
        icon:'error',
        duration:3000
      })
    }
    else if(this.data.inputCode != 'PFH'){
      wx.showToast({
        title: '邀请码输入错误',
        icon:'error',
        duration:3000
      })
    }
    else{
      wx.navigateTo({
        url: '/pages/index/index',
        success:res=>{
          console.log(res)
        }
      })
    }
    
  },

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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