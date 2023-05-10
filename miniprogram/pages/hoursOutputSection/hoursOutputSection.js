Page({
  data: {
    lineArray: ['请选择条线','2.1条线','2.2条线'],
    lineIndex: 0,
    productionLineArray: ['请选择工段'],
    productionLineIndex: 0,
    areaArray: ['请选择班组'],
    areaIndex: 0,
    cartypeArea:['请选择车型'],
    cartypeIndex:0,
    AFOArray:['请选择工位'],
    AFOIndex:0,
    maintainers:'',
    timeStart:'请选择开始时间',
    endTime:'请选择结束时间',
    holdTime:'',
    startTimestamp:'',
    holdTimestamp:'',
    errorInfo:'',
    endTimestamp:'',
    modalContent:'确认此故障尚未结束？',
    endBtnShow:false
  },
  endTimeShow(){
    this.setData({
      endBtnShow:true
    })
  },
  
  maintainersInput(e){
    console.log(e.detail.value)
    this.setData({
      maintainers:e.detail.value
    })
  },
  bindLineChange: function (e) {
    let that = this
    console.log('picker line 发生选择改变，携带值为', e.detail.value);
    this.setData({
      lineIndex: e.detail.value
    })
    console.log(e.detail.value)
    if(e.detail.value != 0){
      if(this.data.lineArray[this.data.lineIndex].substring(0,3) == '2.1'){
        this.setData({
          cartypeArea:['请选择车型','Teramont','TeramontX','Viloran',]
        });
        console.log(this.data.cartypeArea)
      }
      else{
        this.setData({
          cartypeArea:['请选择车型','Tharu','AudiQ6','Karoq',]
        });
      }
      wx.request({
        url: 'https://www.liuke.xyz/PMS/login',
        data:{
          code:'productionLine',
          line:this.data.lineArray[this.data.lineIndex]
        },
        method:'POST',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function(res) {
          console.log(JSON.parse(res.data))
         if(res.data.length > 0){
           let list1 = JSON.parse(res.data)
           list1.unshift('请选择工段')
          that.setData({
            productionLineArray:list1
          })
          // console.log(that.data.productionLineArray)
         }
        }
      })
    }
      
    
  },
  checklineIndex(){
    let that = this
    if(this.data.lineIndex == 0){
      wx.showToast({
        title: '请先选择条线！！！',
        icon:'none',
        duration:3000
      })
      this.setData({
        productionLineArray:['请先选择条线']
      })
    }
    
  },
  checkLinePlineIndex(){
    let that = this
    if(this.data.lineIndex == 0 || this.data.productionLineIndex == 0){
      wx.showToast({
        title: '请先选择条线和工段！！！',
        icon:'none',
        duration:3000
      })
      this.setData({
        areaArray:['请先选择条线和工段']
      })
    }
  },
  checkLinePlineAreaIndex(){
    let that = this
    if(this.data.lineIndex == 0 || this.data.productionLineIndex == 0 || this.data.areaIndex == 0){
      wx.showToast({
        title: '请先选择条线、工段和班组！！！',
        icon:'none',
        duration:3000
      })
      this.setData({
        AFOArray:['请先选择条线、工段和班组']
      })
    }
  },
  bindProductionLineChange: function (e) {
  let that = this
    console.log('picker productionLine 发生选择改变，携带值为', e.detail.value);
    this.setData({
      productionLineIndex: e.detail.value
    })
    if(e.detail.value != 0){
      wx.request({
        url: 'https://www.liuke.xyz/PMS/login',
        data:{
          code:'areaArray',
          line:this.data.lineArray[this.data.lineIndex],
          productionLine:this.data.productionLineArray[this.data.productionLineIndex]
        },
        method:'POST',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function(res) {
          console.log(JSON.parse(res.data))
         if(res.data.length > 0){
           let list1 = JSON.parse(res.data)
           list1.unshift('请选择班组')
          that.setData({
            areaArray:list1
          })
          // console.log(that.data.productionLineArray)
         }
        }
      })
    }
  },
  bindAreaChange: function (e) {
    let that = this
    console.log('picker area 发生选择改变，携带值为', e.detail.value);
    this.setData({
      areaIndex: e.detail.value
    })
    if(e.detail.value != 0){
      wx.request({
        url: 'https://www.liuke.xyz/PMS/login',
        data:{
          code:'AFOArray',
          line:this.data.lineArray[this.data.lineIndex],
          productionLine:this.data.productionLineArray[this.data.productionLineIndex],
          area:this.data.areaArray[this.data.areaIndex]
        },
        method:'POST',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function(res) {
          console.log(JSON.parse(res.data))
         if(res.data.length > 0){
           let list1 = JSON.parse(res.data)
           list1.unshift('请选择工位')
          that.setData({
            AFOArray:list1
          })
          // console.log(that.data.productionLineArray)
         }
        }
      })
    }
  },
  bindAFOChange: function (e) {
    let that = this
    console.log('picker AFO 发生选择改变，携带值为', e.detail.value);
    this.setData({
      AFOIndex: e.detail.value
    })
    
  },
  bindCartypeChange(e){
    this.setData({
      cartypeIndex:e.detail.value
    })
  },
  bindstartTimeChange: function (e) {
    console.log('picker 时间 发生选择改变，携带值为', e.detail.value);
    var date = new Date(); 
    var startTime = date.toLocaleDateString() + ' ' + e.detail.value
    var startTimestamp = new Date(startTime).getTime()/1000;
    console.log(startTimestamp)
   if(this.data.endTimestamp != ''){
    var holdSec = this.data.endTimestamp - startTimestamp 
    var holdtime = parseInt(holdSec/3600) + '小时' + parseInt(holdSec%3600/60) + '分钟'
    this.setData({
      timeStart:e.detail.value,
      startTimestamp:startTimestamp,
      holdTime:holdtime,
      holdTimestamp:holdSec,
    })
   }else{
    var timeNow = parseInt(new Date().getTime()/1000)
    var holdSec = timeNow - startTimestamp 
    var holdtime = parseInt(holdSec/3600) + '小时' + parseInt(holdSec%3600/60) + '分钟'
    this.setData({
      timeStart:e.detail.value,
      startTimestamp:startTimestamp,
      holdTime:holdtime,
      holdTimestamp:holdSec,
    })
   }
    
  },
  errorInput(e){
    this.setData({
      errorInfo:e.detail.value
    })
  },
  bindendTimeChange: function (e) {
    // console.log('picker 时间 发生选择改变，携带值为', e.detail.value);
    var date = new Date(); 
    var endTime = date.toLocaleDateString() + ' ' + e.detail.value
    var endTimestamp = new Date(endTime).getTime()/1000;
    if(this.data.startTimestamp != ''){
      console.log('结束时间',endTime)
      var holdSec = endTimestamp - this.data.startTimestamp 
      var holdtime = parseInt(holdSec/3600) + '小时' + parseInt(holdSec%3600/60) + '分钟'
      this.setData({
        endTime:e.detail.value,
        endTimestamp:endTimestamp,
        modalContent:'确认此故障已结束？',
        holdTime:holdtime,
        holdTimestamp:holdSec,
      })
    }
    else{
      this.setData({
        endTime:e.detail.value,
        endTimestamp:endTimestamp,
        modalContent:'确认此故障已结束？'
      })
    }
    
  },
  submitForm: function (e) {
    let that = this
    var current = new Date()
    var todaydate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate().toString()
    console.log(todaydate + ' ' + that.data.timeStart) 
   
    if(that.data.lineIndex == 0){
      wx.showToast({
        title: '请选择条线',
        icon:'error',
        duration:3000
      })
    }
    else if(that.data.productionLineIndex == 0){
      wx.showToast({
        title: '请选择工段',
        icon:'error',
        duration:3000
      })
    }
    else if(that.data.areaIndex == 0){
      wx.showToast({
        title: '请选择班组',
        icon:'error',
        duration:3000
      })
    }
    else if(that.data.AFOIndex == 0){
      wx.showToast({
        title: '请选择工位',
        icon:'error',
        duration:3000
      })
    }
    else if(that.data.cartypeIndex == 0){
      wx.showToast({
        title: '请选择车型',
        icon:'error',
        duration:3000
      })
    }
    else if(that.data.maintainers == ''){
      wx.showToast({
        title: '请选择输入主修人',
        icon:'error',
        duration:3000
      })
    }
    else if(that.data.timeStart == '请选择开始时间'){
      wx.showToast({
        title: '请选择开始时间',
        icon:'error',
        duration:3000
      })
    }
    else if(that.data.errorInfo == ''){
      wx.showToast({
        title: '请输入故障描述',
        icon:'error',
        duration:3000
      })
    }
    else if(that.data.errorInfo == ''){
      wx.showToast({
        title: '请输入故障描述',
        icon:'error',
        duration:3000
      })
    }
    else{
      
          
      wx.showModal({
        title: '故障记录确认框',
        content: that.data.modalContent,
        success:function(res){    
          if (res.confirm) {
            wx.request({
              url: 'https://www.liuke.xyz/PMS/login',
              method:'POST',
              header:{'content-type': 'application/x-www-form-urlencoded'},
              data:{
                code:'errorInfoInsert',
                line:that.data.lineArray[that.data.lineIndex],
                productionline:that.data.productionLineArray[that.data.productionLineIndex],
                area:that.data.areaArray[that.data.areaIndex],
                cartype:that.data.cartypeArea[that.data.cartypeIndex],
                AFO:that.data.AFOArray[that.data.AFOIndex],
                maintainers:that.data.maintainers,
                startTime:that.data.startTimestamp,
                startTime1:todaydate + ' ' + that.data.timeStart,
                holdTime:that.data.holdTimestamp,
                holdTime1:that.data.holdTime,
                errorInfo:that.data.errorInfo,
                endTime:that.data.endTimestamp,
                endTime1:todaydate  + ' ' + that.data.endTime,
                employeeName:App.userinfo.employeeName,
                employeeId:App.userinfo.employeeId
              },
              success: function(res){
                if(res.data.status == true){
                  wx.showToast({
                    title: '故障信息录入成功',
                    icon: 'none',
                    duration: 1000
                  })
                  that.setData({
                    lineArray: ['请选择条线','2.1条线','2.2条线'],
                    lineIndex: 0,
                    productionLineArray: ['请选择工段'],
                    productionLineIndex: 0,
                    areaArray: ['请选择班组'],
                    areaIndex: 0,
                    cartypeArea:['请选择车型'],
                    cartypeIndex:0,
                    AFOArray:['请选择工位'],
                    AFOIndex:0,
                    maintainers:'',
                    timeStart:'请选择开始时间',
                    endTime:'请选择结束时间',
                    holdTime:'',
                    startTimestamp:'',
                    holdTimestamp:'',
                    errorInfo:'',
                    endTimestamp:'',
                    modalContent:'确认此故障尚未结束？',
                    endBtnShow:false
                  })
                }
                else{
                  wx.showToast({
                    title: '故障信息未录入成功，请重试',
                    icon: 'none',
                    duration: 1000
                  })
                }
              }
            })
          }
        }
      })
    }
  },
  naviToHoursOutput(){
    if(this.data.productionLineIndex != 0){
      wx.navigateTo({
        url: '/pages/hoursOutput/hoursOutput?bigsection='+this.data.productionLineArray[this.data.productionLineIndex],
      })
    }
    else{
      wx.showToast({
        title: '请选择要输入的工段',
        icon:'none',
        duration:3000
      })
    }
    
  }

})
