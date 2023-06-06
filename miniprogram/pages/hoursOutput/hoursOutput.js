// pages/hoursOutput/hoursOutput.js
const util = require("../output/util");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalOutputObj:'',
    totalOutput:'',
    pastTimeOutput:[],
    timePeriod:'',
    date:'',
    workingHours:'',
    attendance:'',
    region:'',
    planAverageOutput:'',
    actualAverageOutput:'',
    startHour:'',
    endHour:'',
    hoursOutput:'',
    section : '',
    inputShow: false,
    btnShow:false,
    outputStatus: 1,
    outputStatusContent:'',
    noinput:false
  },
  //起始时间计算
  timeDeal(startTime){
    var startTimeHour = util.formatDate(parseInt(startTime*1000))
    var list1 = []
    if(startTimeHour.substring(11,16) == '10:00'){
      var endTime = parseInt((startTime*1000 + 5400000)/1000)
      var endTimeHour = util.formatDate(parseInt(startTime*1000 + 5400000))
      var period = startTimeHour.substring(11,16)+ '-' + endTimeHour.substring(11,16)
      list1.push(period)
      list1.push(endTime)
      console.log(list1)
      return list1
    }
    else{
      var endTime = parseInt((startTime*1000 + 3600000)/1000)
      var endTimeHour = util.formatDate(parseInt(startTime*1000 + 3600000))
      var period = startTimeHour.substring(11,16) + '-' + endTimeHour.substring(11,16)
      list1.push(period)
      list1.push(endTime)
      return list1
    }
    
  },
  
  OutputStatus(){
    let that = this
    that.setData({
      outputStatus:this.housOutputStatus(that.data.pastTimeOutput,parseFloat(that.data.planAverageOutput),parseFloat(that.data.hoursOutput))
    })
    if(that.data.outputStatus == 0){
      that.setData({
        outputStatusContent: '欠产'
      })
    }else{
      that.setData({
        outputStatusContent: '无欠产'
      })
    }
    that.realaverageOutput(that.data.pastTimeOutput,parseFloat(that.data.hoursOutput))
  },
  // 产量状态计算
  housOutputStatus(pastTimeOutput,averageOutput,lastHourOutput){
    // console.log(averageOutput)
    if(pastTimeOutput.length == 0){
      if(lastHourOutput >= averageOutput){
        return 1
      }
      else{
        return 0    
      } 
    }
    else{
      let output = lastHourOutput
      console.log(pastTimeOutput[0])
      for(let i = 0;i < pastTimeOutput.length;i++){
        console.log(i)
        output = output + pastTimeOutput[i].hoursOutput
      }
      console.log(output)
      if(output >= (pastTimeOutput.length+1)*averageOutput){
        return 1
      }
      else{
        return 0
      }
    }
  },
  //实际平均产量计算
  realaverageOutput(pastTimeOutput,lastHourOutput){
    if(pastTimeOutput.length == 0){
      this.setData({
        actualAverageOutput:lastHourOutput
      })
    }
    else{
      let output = lastHourOutput
      // console.log(pastTimeOutput[0])
      for(let i = 0;i < pastTimeOutput.length;i++){
        console.log(i)
        output = output + pastTimeOutput[i].hoursOutput
      }
      // console.log(output)
      this.setData({
        actualAverageOutput:(output/(pastTimeOutput.length + 1)).toFixed(2)
      })
    }
  },
   // 分时产量输入完成后产量状态计算
   finishhousOutputStatus(pastTimeOutput,averageOutput){
    // console.log(averageOutput)
    let that = this
      let output = 0
      // console.log(pastTimeOutput[0])
      for(let i = 0;i < pastTimeOutput.length;i++){
        // console.log(i)
        output = output + pastTimeOutput[i].hoursOutput
      }
      // console.log(output)
      if(output >= pastTimeOutput.length*averageOutput){
        that.setData({
          outputStatusContent: '无欠产'
        })
      }
      else{
        that.setData({
          outputStatusContent: '欠产'
        })
      }
    
  },
  //分时产量输入完成后实际平均产量计算
  finishrealaverageOutput(pastTimeOutput){
    
        let output = 0
        // console.log(pastTimeOutput[0])
        for(let i = 0;i < pastTimeOutput.length;i++){
          // console.log(i)
          output = output + pastTimeOutput[i].hoursOutput
        }
        // console.log(output)
        this.setData({
          actualAverageOutput:(output/pastTimeOutput.length ).toFixed(2)
        })
      
    },
  //实际产量输入
  hoursOutput(e){
    let that = this
    this.setData({
      hoursOutput:e.detail.value
    })
    
  },
  //分时产量输入后端
  insertHoursOutput(){
    let that = this
    if(this.data.totalOutput == ''){
      wx.showToast({
        title: '总产量信息不完整',
        icon: 'none',
        duration: 3000
      })
    }
    else if(this.data.hoursOutput == ''){
      wx.showToast({
        title: '请输入产量',
        icon: 'none',
        duration: 3000
      })
    }
    else{
      wx.showModal({
        title: '分产数据提交框',
        content: '分时产量数据',
        success:function(res){    
          if (res.confirm) {
            wx.request({
              url: 'https://www.liuke.xyz/PMS/login',
              method:'POST',
              header:{'content-type': 'application/x-www-form-urlencoded'},
              data:{
                code:'hoursOutputInfoInsert',
                section:that.data.region,
                timePeriod:that.data.timePeriod,
                startHour:that.data.startHour,
                endHour:that.data.endHour,
                hoursOutput:that.data.hoursOutput,
                outputStatus:that.data.outputStatus,
                employeeName:App.userinfo.employeeName,
                employeeId:App.userinfo.employeeId
              },
              success: function(res){
                if(res.data.status == true){
                  wx.showToast({
                    title: '分时产量信息录入成功',
                    icon: 'none',
                    duration: 1000
                  })
                  that.setData({
                    noinput:true,
                    btnShow:false,
                  })
                }
                else{
                  wx.showToast({
                    title: '分时产量信息未录入成功，请重试',
                    icon: 'none',
                    duration: 1000
                  })
                }
              }
            })
          }}})
      
      
    }
  },
  // 从后端查询当前总产信息
  totalOutputInfo(){
    
    var timestamp = Date.parse(new Date());  
    var date = util.formatDate(parseInt(timestamp)).substring(0,10)
    var section = this.data.section
    var that = this;
    return new Promise(function(resolve,reject){

wx.request({
  url: 'https://www.liuke.xyz/PMS/login',
    data:{
      code:'totalOutput',
      date:date,
      section:section
    },
    method:'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded' // 默认值
    },
    success(res){
      resolve(res)
      // console.log(res)
      // console.log(res)
      var obj1 =  res.data;
      // let obj = JSON.parse(obj1);
      // console.log(obj1)
      
     
    }
})})
  },
   // 从后端查询当天分产信息
  hoursOutputInfo(){
    var that = this
    var timestamp = Date.parse(new Date());  
    var date = util.formatDate(parseInt(timestamp)).substring(0,10)
    
    var section = that.data.section
    return new Promise(function(resolve,reject){
  
   wx.request({
    url: 'https://www.liuke.xyz/PMS/login',
      data:{
        code:'hoursOutput',
        date:date,
        section:section
      },
      method:'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res){
        console.log(res)
        resolve(res)
        var obj1 = res.data;
        // let obj = JSON.parse(obj1);
        // console.log(obj1)
     
       
      }
  })
  })},
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
  delBtnDisapear(){
    this.setData({
      currentItem:9999
    })
  },
  updateHoursOutput(e){
    let hoursOutput = this.data.pastTimeOutput[e.currentTarget.dataset.index]
     wx.navigateTo({
       url: '/pages/updateHoursOutput/updateHoursOutput?hoursOutputdata='
       +JSON.stringify(hoursOutput)+ '&bigsection=' + this.data.region 
       + '&planAverageOutput=' + this.data.planAverageOutput,
     })
     console.log(hoursOutput)
  },

  /**
   * 生命周期函数--监听页面加载
   */
 async onLoad(options) {
    let that = this
    await this.setData({
    section:options.bigsection
   })
 
    
    // console.log(date)
    
    // console.log(date1)

      await this.totalOutputInfo().then((res) => {
        let obj1 = res.data
        if(res.data.length == 0){
          wx.showToast({
            title: '总产量尚未输入',
            icon:'error',
            duration:3000
          })
        }else{
          // console.log(util.formatDate(obj1[0].startTime*1000))
           that.setData({
            totalOutputObj:obj1[0],
            date:util.formatDate(obj1[0].startTime*1000).substring(0,10),
            totalOutput:obj1[0].totalOutput,
            workingHours:obj1[0].workingHours,
            attendance:obj1[0].attendance,
            region:obj1[0].section,
            planAverageOutput:obj1[0].averageOutput,
          })
        }})
      
      await that.hoursOutputInfo().then((res)=>{
        if(res.data.length == 0 ){
          if(that.data.region != 0){
            // console.log(that.data.totalOutputObj.startTime)
            // console.log(that.timeDeal(that.data.totalOutputObj.startTime))
            that.setData({
              timePeriod:that.timeDeal(that.data.totalOutputObj.startTime)[0],
              startHour:that.data.totalOutputObj.startTime,
              endHour:parseInt(that.timeDeal(that.data.totalOutputObj.startTime)[1]),
              inputShow: true,
              btnShow:true

            })
          }
          else{
            wx.showToast({
              title: '总产量尚未输入',
              icon:'error',
              duration:3000
            })
          }
          
  
        }
        else{
          // console.log(util.formatDate(obj1[0].startTime*1000))
         
          if(res.data.length >= that.data.workingHours){
            wx.showToast({
              title: '今日分时产量输入完成',
              icon: 'none',
              duration:3000
            })
            that.setData({
              pastTimeOutput:res.data,
              inputShow: false,
              btnShow:false
            })
            that.finishrealaverageOutput(res.data)
            that.finishhousOutputStatus(res.data,parseFloat(this.data.planAverageOutput))
          }
          else{
            that.setData({
              pastTimeOutput:res.data,
              timePeriod:that.timeDeal(res.data[0].endHour)[0],
              startHour:res.data[0].endHour,
              endHour:parseInt(that.timeDeal(res.data[0].endHour)[1]),
              inputShow: true,
              btnShow:true,
            })
            that.finishhousOutputStatus(res.data,that.data.planAverageOutput)
            that.finishrealaverageOutput(res.data)
          }
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