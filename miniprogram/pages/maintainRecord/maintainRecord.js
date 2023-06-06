Page({
  data: {
    // lineArray: ['请选择条线','2.1条线','2.2条线'],
    line: '请选择条线',
    // productionLineArray: ['请选择工段'],
    productionLine: '请选择工段',
    // areaArray: ['请选择班组'],
    area: '请选择班组',
    cartypeArea:['请选择车型'],
    cartypeIndex:0,
    // AFOArray:['请选择工位'],
    AFO:'请选择工位',
    maintainers:'',
    timeStart:'请选择开始时间',
    endTime:'请选择结束时间',
    holdTime:'',
    startTimestamp:'',
    holdTimestamp:'',
    errorInfo:'',
    endTimestamp:'',
    modalContent:'确认此维保尚未结束？',
    endBtnShow:false,
    customArray:[],
    customIndex: [0, 0, 0, 0],
    //当前选中数组
    onlyArray: [
      [],
      [],
      [],
      []
    ],
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
        modalContent:'确认此维保已结束？',
        holdTime:holdtime,
        holdTimestamp:holdSec,
      })
    }
    else{
      this.setData({
        endTime:e.detail.value,
        endTimestamp:endTimestamp,
        modalContent:'确认此维保已结束？'
      })
    }
    
  },
  submitForm: function (e) {
    let that = this
    var current = new Date()
    var todaydate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate().toString()
    console.log(todaydate + ' ' + that.data.timeStart) 
   that.setData({
     cartype:'all'
   })
    if(that.data.line == '请选择条线'){
      wx.showToast({
        title: '请选择条线、工段、班组、工位',
        icon:'none',
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
        title: '请输入维保描述',
        icon:'error',
        duration:3000
      })
    }
    else if(that.data.errorInfo == ''){
      wx.showToast({
        title: '请输入维保描述',
        icon:'error',
        duration:3000
      })
    }
    else{
      
          
      wx.showModal({
        title: '维保记录确认框',
        content: that.data.modalContent,
        success:function(res){    
          if (res.confirm) {
            wx.request({
              url: 'https://www.liuke.xyz/PMS/login',
              method:'POST',
              header:{'content-type': 'application/x-www-form-urlencoded'},
              data:{
                code:'maintainInfoInsert',
                line:that.data.line,
                productionline:that.data.productionLine,
                area:that.data.area,
                cartype:that.data.cartype,
                AFO:that.data.AFO,
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
                    title: '维保信息录入成功',
                    icon: 'none',
                    duration: 1000
                  })
                  that.setData({
                    line: '请选择条线',
                    // productionLineArray: ['请选择工段'],
                    productionLine: '请选择工段',
                    // areaArray: ['请选择班组'],
                    area: '请选择班组',
                    cartypeArea:['请选择车型'],
                    cartypeIndex:0,
                    // AFOArray:['请选择工位'],
                    AFO:'请选择工位',
                    maintainers:'',
                    timeStart:'请选择开始时间',
                    endTime:'请选择结束时间',
                    holdTime:'',
                    startTimestamp:'',
                    holdTimestamp:'',
                    errorInfo:'',
                    endTimestamp:'',
                    modalContent:'确认此维保尚未结束？',
                    endBtnShow:false
                  })
                }
                else{
                  wx.showToast({
                    title: '维保信息未录入成功，请重试',
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
    //多列自定义选择器改变value的方法
    bindCustomPickerChange: function (e) {
      var customArray = this.data.customArray,
        customIndex = this.data.customIndex,
        onlyArray = this.data.onlyArray;
        console.log(customArray)
  
      console.log('picker发送选择改变，携带值为', e.detail.value);
      //此处e.detail.value为当前选择的列的下标值数组，如[0,1,0]
  
      console.log('picker最终选择值为：', onlyArray[0][customIndex[0]], onlyArray[1][customIndex[1]], onlyArray[2][customIndex[2]], onlyArray[3][customIndex[3]]);
      this.setData({
        customIndex: e.detail.value,
        line: onlyArray[0][customIndex[0]],
        productionLine: onlyArray[1][customIndex[1]], 
        area: onlyArray[2][customIndex[2]], 
        AFO:onlyArray[3][customIndex[3]],
      })
      if(onlyArray[0][customIndex[0]].substring(0,3) == '2.1'){
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
    },
  
    //多列自创选择器换列方法
    bindCustomPickerColumnChange: function (e) {
      console.log(e)
      var customArray = this.data.customArray,
        customIndex = this.data.customIndex,
        onlyArray = this.data.onlyArray;
  
      customIndex[e.detail.column] = e.detail.value;
      // console.log(onlyArray);
  
      var searchColumn = () => {
        for (var i = 0; i < customArray.length; i++) {
          var arr1 = [];
          var arr2 = [];
          var arr3 = [];
          if (i == customIndex[0]) {
            for (var j = 0; j < customArray[i].content.length; j++) {
              arr1.push(customArray[i].content[j].bigsection);
              if (j == customIndex[1]) {
                for (var k = 0; k < customArray[i].content[j].content.length; k++) {
                  arr2.push(customArray[i].content[j].content[k].smallsection);
                  if (k == customIndex[2]) {
                    for (var m = 0; m < customArray[i].content[j].content[k].AFO.length; m++) {
                      arr3.push(customArray[i].content[j].content[k].AFO[m].content);
                    }
                    onlyArray[3] = arr3;
                  }
                }
                onlyArray[2] = arr2;
              }
            }
            onlyArray[1] = arr1;
          }
        };
      }
  
      switch (e.detail.column) {
        case 0:
          customIndex[1] = 0;
          customIndex[2] = 0;
          customIndex[3] = 0;
          searchColumn();
          break;
        case 1:
          customIndex[2] = 0;
          customIndex[3] = 0;
          searchColumn();
          break;
        case 2:
          customIndex[3] = 0;
          searchColumn();
          break;
      }
      this.setData({
        onlyArray: onlyArray,
        customIndex: customIndex
      });
    },
  onLoad(options) {
    // console.log(options)
    let that = this

    wx.request({
      url: 'https://www.liuke.xyz/PMS/login',
        data:{
          code:'section1Select',
        },
        method:'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success(res){
          console.log(res)
          // that.setData({
          //   customArray:res.data
          // })
          var data = {
            customArray: res.data,
            customIndex: that.data.customIndex,
            onlyArray: that.data.onlyArray,
          };
          console.log(data.customArray)
          for (var i = 0; i < data.customArray.length; i++) {
            data.onlyArray[0].push(data.customArray[i].line);
          }
          for (var j = 0; j < data.customArray[data.customIndex[0]].content.length; j++) {
            data.onlyArray[1].push(data.customArray[data.customIndex[0]].content[j].bigsection);
          }
          for (var k = 0; k < data.customArray[data.customIndex[0]].content[data.customIndex[1]].content.length; k++) {
            data.onlyArray[2].push(data.customArray[data.customIndex[0]].content[data.customIndex[1]].content[k].smallsection);
          }
          for (var m = 0; m < data.customArray[data.customIndex[0]].content[data.customIndex[1]].content[data.customIndex[2]].AFO.length; m++) {
            data.onlyArray[3].push(data.customArray[data.customIndex[0]].content[data.customIndex[1]].content[data.customIndex[2]].AFO[m].content)
          }
          that.setData(data);
      
          
         
        }
    })
    },

})
