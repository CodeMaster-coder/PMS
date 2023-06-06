// pages/mainpage/mainpage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lineStatus:[]
  },
  // toNextPage(e){
  //   console.log(e)
  //   wx.navigateTo({
  //     // 跳转到详情页面并携带两个参数id1和id2，两个参数直接用&隔开
  //       url: '/pages/bigsectionStatus/bigsectionStatus?line=' + this.data.lineStatus[e.currentTarget.dataset.index].line
  //     })

  // },
  //条线状态查询
  lineStatusSelect(){
    return new Promise(function(resolve,reject){
      wx.request({
        url: 'https://www.liuke.xyz/PMS/login',
        method:'POST',
        header:{'content-type': 'application/x-www-form-urlencoded'},
        data:{
          code:'lineStatusSelect',
    
        },
        success: function(res){
          console.log(res.data)
          resolve(res)
          // that.setData({
          //   lineStatus:res.data
          // })
        }
      })
    })
  },
  //工段状态查询
  bigsectionStatusSelect21(){
    return new Promise(function(resolve,reject){
      wx.request({
        url: 'https://www.liuke.xyz/PMS/login',
        method:'POST',
        header:{'content-type': 'application/x-www-form-urlencoded'},
        data:{
          code:'bigsectionStatusSelect',
          line: '2.1条线'
        },
        success: function(res){
          // console.log(res.data)
          resolve(res)
          // that.setData({
          //   bigsectionStatus:res.data
          // })
        }
      })
    })
  },
  bigsectionStatusSelect22(){
    return new Promise(function(resolve,reject){
      wx.request({
        url: 'https://www.liuke.xyz/PMS/login',
        method:'POST',
        header:{'content-type': 'application/x-www-form-urlencoded'},
        data:{
          code:'bigsectionStatusSelect',
          line: '2.2条线'
        },
        success: function(res){
          // console.log(res.data)
          resolve(res)
          // that.setData({
          //   bigsectionStatus:res.data
          // })
        }
      })
    })
  },
  //将条线，工段，班组的状态整合到一起
  arrangeStatus(lineStatus1,bigsectionStatus21,bigsectionStatus22){
    // console.log(bigsectionStatus21,bigsectionStatus22)
    for (let i = 0; i　< lineStatus1.length; i++){
      if(lineStatus1[i].line == '2.1条线'){
        lineStatus1[i].bigsectionStatus = bigsectionStatus21
      }
      else{
        lineStatus1[i].bigsectionStatus = bigsectionStatus22
      }
    }
    console.log(lineStatus1)
    return lineStatus1
   },
   naviToHousoutput(e){
     if(App.userinfo.wokertype == '生产' & App.userinfo.auth == 'F2'){
      wx.navigateTo({
        url: '/pages/hoursOutput/hoursOutput?bigsection='
        +e.currentTarget.dataset.bigsection
        
      })
     }
    
   },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    let that = this
    await this.lineStatusSelect().then((res) => {
      // console.log(res)
      that.setData({
        lineStatus1:res.data
      })
    })
    await this.bigsectionStatusSelect21().then((res) => {
      // console.log(res)
      that.setData({
        bigsectionStatusSelect21:res.data
      })
    })
    await this.bigsectionStatusSelect22().then((res) => {
      // console.log(res)
      that.setData({
        bigsectionStatusSelect22:res.data
      })
      
      // console.log(errorline)
      that.setData({
        lineStatus:this.arrangeStatus(that.data.lineStatus1,that.data.bigsectionStatusSelect21,that.data.bigsectionStatusSelect22)
      })
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
  async onShow() {
    let that = this
    await this.lineStatusSelect().then((res) => {
      // console.log(res)
      that.setData({
        lineStatus1:res.data
      })
    })
    await this.bigsectionStatusSelect21().then((res) => {
      // console.log(res)
      that.setData({
        bigsectionStatusSelect21:res.data
      })
    })
    await this.bigsectionStatusSelect22().then((res) => {
      // console.log(res)
      that.setData({
        bigsectionStatusSelect22:res.data
      })
      
      // console.log(errorline)
      that.setData({
        lineStatus:this.arrangeStatus(that.data.lineStatus1,that.data.bigsectionStatusSelect21,that.data.bigsectionStatusSelect22)
      })
    })
 
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
    let that = this
    await this.lineStatusSelect().then((res) => {
      // console.log(res)
      that.setData({
        lineStatus1:res.data
      })
    })
    await this.bigsectionStatusSelect21().then((res) => {
      // console.log(res)
      that.setData({
        bigsectionStatusSelect21:res.data
      })
    })
    await this.bigsectionStatusSelect22().then((res) => {
      // console.log(res)
      that.setData({
        bigsectionStatusSelect22:res.data
      })
      
      // console.log(errorline)
      that.setData({
        lineStatus:this.arrangeStatus(that.data.lineStatus1,that.data.bigsectionStatusSelect21,that.data.bigsectionStatusSelect22)
      })
    })
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