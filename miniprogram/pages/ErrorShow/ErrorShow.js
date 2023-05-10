// pages/ErrorShow/ErrorShow.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    closeTapShow:true,
    endtime:1,
    errorInfo:[]
  },
  endErrorSelect(){
    let that = this
    that.setData({
      closeTapShow:true,
    endtime:1,
    })
    wx.request({
      url: 'https://www.liuke.xyz/PMS/login',
        data:{
          code:'errorShowSelect',
          line:that.data.line,
          bigsection:that.data.bigsection,
          smallsection:that.data.smallsection,
          AFO:that.data.AFO,
          date:that.data.date,
          endtime:this.data.endtime
        },
        method:'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success(res){
          console.log(res)
  
          // var obj1 = res.data;
          // let obj = JSON.parse(obj1);
          // console.log(obj1)
          that.setData({
            errorInfo:res.data
          })
         
        }
    })
  },
  noendErrorSelect(){
    let that = this
    that.setData({
      closeTapShow:false,
    endtime:0,
    })
    wx.request({
      url: 'https://www.liuke.xyz/PMS/login',
        data:{
          code:'errorShowSelect',
          line:that.data.line,
          bigsection:that.data.bigsection,
          smallsection:that.data.smallsection,
          AFO:that.data.AFO,
          date:that.data.date,
          endtime:this.data.endtime
        },
        method:'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success(res){
          console.log(res)
  
          // var obj1 = res.data;
          // let obj = JSON.parse(obj1);
          // console.log(obj1)
          that.setData({
            errorInfo:res.data
          })
         
        }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
  console.log(options)
  let that = this
  this.setData({
    line:options.line,
    bigsection:options.bigsection,
    smallsection:options.smallsection,
    AFO:options.AFO,
    date:options.date,
  })
  wx.request({
    url: 'https://www.liuke.xyz/PMS/login',
      data:{
        code:'errorShowSelect',
        line:options.line,
        bigsection:options.bigsection,
        smallsection:options.smallsection,
        AFO:options.AFO,
        date:options.date,
        endtime:this.data.endtime
      },
      method:'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res){
        console.log(res)

        // var obj1 = res.data;
        // let obj = JSON.parse(obj1);
        // console.log(obj1)
        that.setData({
          errorInfo:res.data
        })
       
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