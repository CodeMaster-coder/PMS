// pages/updateHoursOutput/updateHoursOutput.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noinput:false,
  },
 
    //实际产量输入
    // hoursOutput(e){
    //   let that = this
      
    //   this.setData({
    //     hoursOutput:e.detail.value
    //   })
      
    // },
    updateValue(e){
    console.log(e)
    this.setData({
      newHoursOutput:e.detail.value
    })
    if(parseInt(e.detail.value) >=  this.data.planAverageOutput){
      this.setData({
        newHoursOutputStatus:1
      })
    }else{
      this.setData({
        newHoursOutputStatus:0
      })
    }
    },
    updateHoursOutput(){
      let that = this
      wx.request({
        url: 'https://www.liuke.xyz/PMS/login',
        method:'POST',
        header:{'content-type': 'application/x-www-form-urlencoded'},
        data:{
          code:'updateHoursOutput',
          id:this.data.beforehoursOutput.id,
          newHoursOutput:this.data.newHoursOutput,
        },
        success: function(res){
          if(res.data.status == true){
            wx.showToast({
              title: '分时产量信息更新成功',
              icon: 'none',
              duration: 1000
            })
            that.setData({
              noinput:true,
              // btnShow:false,
            })
          }
          else{
            wx.showToast({
              title: '分时产量信息更新失败',
              icon: 'none',
              duration: 1000
            })
          }
        }
      })
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(JSON.parse(options.hoursOutputdata))
    console.log(options)
    this.setData({
      region:options.bigsection,
      planAverageOutput:options.planAverageOutput,
      timePeriod:JSON.parse(options.hoursOutputdata).timePeriod,
      hoursOutput:JSON.parse(options.hoursOutputdata).hoursOutput,
      beforehoursOutput:JSON.parse(options.hoursOutputdata)
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