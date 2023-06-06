// pages/ErrorShow/ErrorShow.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    closeTapShow:false,
    endtime:0,
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
          code:'maintainShowSelect',
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
          code:'maintainShowSelect',
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
  touchStart(e) {
    let that = this;
    that.setData({
      touchsx: e.changedTouches[0].clientX,
      // touchsy: e.changedTouches[0].clientY
    });
  
  },
  touchEnd(e) {
    console.log(e)
    let that = this;
    let index = e.currentTarget.dataset.index;
    that.setData({
      touchex: e.changedTouches[0].clientX,
      // touchey: e.changedTouches[0].clientY
    });
    if(that.data.touchsx-that.data.touchex >= 50){
      this.setData({
        currentItem:index
      })
    }
  
  },
  noendTouchStart(e) {
    let that = this;
    that.setData({
      noendtouchsx: e.changedTouches[0].clientX,
      // touchsy: e.changedTouches[0].clientY
    });
  
  },
  noendTouchEnd(e) {
    console.log(e)
    let that = this;
    let index = e.currentTarget.dataset.index;
    that.setData({
      noendtouchex: e.changedTouches[0].clientX,
      // touchey: e.changedTouches[0].clientY
    });
    if(that.data.noendtouchsx-that.data.noendtouchex >= 50){
      this.setData({
        noendCurrentItem:index
      })
    }
  
  },
  delBtnDisapear(){
    this.setData({
      currentItem:9999,
      noendCurrentItem:9999
    })
  },
  endDelBtn(e){
    console.log(e)
    let that = this
      wx.request({
        url: 'https://www.liuke.xyz/PMS/login',
        method:'POST',
        header:{'content-type': 'application/x-www-form-urlencoded'},
        data:{
          code:'deleteMaintainInfo',
          id:e.currentTarget.dataset.id,
        },
        success: function(res){
          if(res.data.status == true){
            wx.showToast({
              title: '维保信息删除成功',
              icon: 'none',
              duration: 1000
            })
            that.setData({
              currentItem:''
            })
            const pages = getCurrentPages()
            const perpage = pages[pages.length - 1]
            perpage.onLoad()
          }
          else{
            wx.showToast({
              title: '维保信息删除失败',
              icon: 'none',
              duration: 1000
            })
          }
        }
      })
  },
  updateNoendErrorInfo(e){
    let noendErrorInfo = this.data.errorInfo[e.currentTarget.dataset.index]
     wx.navigateTo({
       url: '/pages/updateMaintainceInfo/updateMaintainceInfo?noendErrorInfo='
       +JSON.stringify(noendErrorInfo)
     })
     console.log(noendErrorInfo)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
  if(options != undefined){
    let that = this
    this.setData({
      line:options.line,
      bigsection:options.bigsection,
      smallsection:options.smallsection,
      AFO:options.AFO,
      date:options.date,
      timeNow:parseInt(new Date().getTime()/1000)
    })
    wx.request({
      url: 'https://www.liuke.xyz/PMS/login',
        data:{
          code:'maintainShowSelect',
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
  }else{
    let that = this
    this.setData({
      timeNow:parseInt(new Date().getTime()/1000)
    })
    wx.request({
      url: 'https://www.liuke.xyz/PMS/login',
        data:{
          code:'maintainShowSelect',
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
  }

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
    let that = this
    wx.request({
      url: 'https://www.liuke.xyz/PMS/login',
        data:{
          code:'maintainShowSelect',
          line:this.data.line,
          bigsection:this.data.bigsection,
          smallsection:this.data.smallsection,
          AFO:this.data.AFO,
          date:this.data.date,
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