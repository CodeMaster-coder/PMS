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
    endBtnShow:false,
    date:'请选择日期'
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
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  naviToErrorShow(){
    wx.navigateTo({
      url: '/pages/ErrorShow/ErrorShow?line='+this.data.lineArray[this.data.lineIndex] 
      + '&bigsection=' + this.data.productionLineArray[this.data.productionLineIndex] 
      + '&smallsection=' + this.data.areaArray[this.data.areaIndex] + '&AFO=' 
      + this.data.AFOArray[this.data.AFOIndex] + '&date=' + this.data.date
      ,
    })
  }

 


})
