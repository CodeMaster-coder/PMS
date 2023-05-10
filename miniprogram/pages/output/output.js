const util = require("../output/util");
var utiltap = require("../../utils/taputil");

Page({
  data: {
    totalOutput: 0,
    car11Output:'',
    car12Output:'',
    car13Output:'',
    workingHours: '',
    attendance: '',
    averageOutput: 0,
    sectionList: ['请选择工段'],
    sectionIndex: 0,
    startTime: '00:00',
    endTime: '结束时间',
    car11:'',
    car12:'',
    car13:'',
    car1: '车型产量',
    car2: '车型产量',
    car3: '车型产量',
    timeList:['请选择开始时间','00:00:00','01:00:00','02:00:00','03:00:00','04:00:00',
    '05:00:00','06:00:00','07:00:00','08:00:00','09:00:00','10:00:00','11:00:00','12:00:00',
    '13:00:00','14:00:00','15:00:00','16:00:00','17:00:00','18:00:00','19:00:00','20:00:00',
    '21:00:00','22:00:00','23:00:00','24:00:00',],
    timeStartIndex:0,
    timeStrattimestamp:0,
    timeEndtimestamp:0

  },
  onLoad: function() {
   
    let that = this
    // 从后端获取工段列表，假设返回的列表为["A段", "B段", "C段"]
    wx.request({
      url: 'https://www.liuke.xyz/PMS/login',
        data:{
          code:'bigsection',
        },
        method:'POST',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res){
          var obj1 = res.data;
          let obj = JSON.parse(obj1);
          console.log(obj)
          obj.splice(0,0,'请选择工段')
          that.setData({
            sectionList:obj
          })
          console.log(that.data.sectionList)
        }
    })
  },

  onSectionChange: function(e) {
    if(e.detail.value > 0){
      let section = this.data.sectionList[e.detail.value]
      if(section.substring(0,3) == '2.1'){
        this.setData({
          car11:'Teramont',
          car12:'TeramontX',
          car13:'Viloran',
          car1: 'BSUV产量',
          car2: 'COUPE产量',
          car3: 'BMPV产量',
        });
      }
      else{
        this.setData({
          car11:'Tharu',
          car12:'AudiQ6',
          car13:'Karoq',
          car1: 'Tharu产量',
          car2: 'Audi产量',
          car3: 'Karoq产量',
        });
      }
      this.setData({
        sectionIndex: e.detail.value
      });
    }
    
  },
  calculateAverageOutput(){
    if(this.data.totalOutput != 0 & this.data.workingHours != 0){
      this.setData({
        averageOutput:(parseFloat(this.data.totalOutput) / parseFloat(this.data.workingHours)).toFixed(1)
      })
    }

  },
  totalOutput(){
    // if(this.data.car11Output != '' & this.data.car12Output != '' & this.data.car13Output != '' ){
      this.setData({
        totalOutput:(this.data.car11Output + this.data.car12Output + this.data.car13Output)
      })
     
    // }
  
  },
  car11OutputChange: function(e) {
    this.setData({
      car11Output: parseInt(e.detail.value)
    });
    this.calculateAverageOutput();
    this.totalOutput();
  },
  car12OutputChange: function(e) {
    this.setData({
      car12Output: parseInt(e.detail.value)
    });
    this.calculateAverageOutput();
    this.totalOutput();
  },
  car13OutputChange: function(e) {
    this.setData({
      car13Output: parseInt(e.detail.value)
    })
    this.calculateAverageOutput();
    this.totalOutput();
    
    
  },
  onWorkingHoursChange: function(e) {
  
      this.setData({
        workingHours: parseFloat(e.detail.value),
      });
      var date = new Date(); 
      // console.log(date.toLocaleDateString())
      var startTime = date.toLocaleDateString() + ' ' + this.data.timeList[this.data.timeStartIndex]
      var startTimestamp = new Date(startTime).getTime();
      // console.log(timestamp)
      if(parseFloat(e.detail.value) > 0 & this.data.timeStartIndex != 0){
        let endTimestamp = startTimestamp + 3600000 * parseFloat(e.detail.value) + 1800000
        console.log(util.formatDate(endTimestamp))
        this.setData({
          endTime:util.formatDate(endTimestamp).substring(11,20),
          timeStrattimestamp:startTimestamp,
          timeEndtimestamp:endTimestamp
        })
      }
      this.calculateAverageOutput();
    
 
    },
  bindStartTimeChange: function (e) {
    this.setData({
      timeStartIndex: e.detail.value
    })
    var date = new Date(); 
      // console.log(date.toLocaleDateString())
      var startTime = date.toLocaleDateString() + ' ' + this.data.timeList[this.data.timeStartIndex]
      var startTimestamp = new Date(startTime).getTime();
      // console.log(timestamp)
      if(e.detail.value != 0 & this.data.workingHours != 0){
        let endTimestamp = startTimestamp + 3600000 * this.data.workingHours + 1800000
        console.log(util.formatDate(endTimestamp))
        this.setData({
          endTime:util.formatDate(endTimestamp).substring(11,20),
          timeStrattimestamp:startTimestamp,
          timeEndtimestamp:endTimestamp
        })
      }
  },
  onAttendanceChange(e){
    this.setData({
      attendance: e.detail.value
    })
  },

  insertOutput: utiltap.throttle(function(){
    let that = this
    if(that.data.sectionIndex == 0){
      wx.showToast({
        title: '请选择工段',
        icon:'error',
        duration:3000
      })
    }else if(that.data.car11Output == '' || that.data.car12Output == '' || that.data.car13Output == ''){
      wx.showToast({
        title: '请输入车型产量',
        icon:'error',
        duration:3000
      })
    }
    else if(that.data.timeStartIndex == 0){
      wx.showToast({
        title: '请输入开始时间',
        icon:'error',
        duration:3000
      })
    }
    else if(that.data.workingHours == ''){
      wx.showToast({
        title: '请输入工时',
        icon:'error',
        duration:3000
      })
    }
    else if(that.data.attendance == ''){
      wx.showToast({
        title: '请输入出勤人数',
        icon:'error',
        duration:3000
      })
    }else{
      wx.showModal({
        title: '总产数据提交框',
        content: '总产数据',
        success:function(res){    
          if (res.confirm) {
            wx.request({
              url: 'https://www.liuke.xyz/PMS/login',
              method:'POST',
              header:{'content-type': 'application/x-www-form-urlencoded'},
              data:{
                code:'totalOutputInfoInsert',
                section:that.data.sectionList[that.data.sectionIndex],
                car11:that.data.car11,
                car12:that.data.car12,
                car13:that.data.car13,
                car11Output:that.data.car11Output,
                car12Output:that.data.car12Output,
                car13Output:that.data.car13Output,
                startTime:that.data.timeStrattimestamp/1000,
                startTimeDate:util.formatDate(that.data.timeStrattimestamp),
                workingHours:that.data.workingHours,
                endTime:that.data.timeEndtimestamp/1000,
                endTimeDate:util.formatDate(that.data.timeEndtimestamp),
                attendance: that.data.attendance,
                averageOutput: that.data.averageOutput,
                totalOutput:that.data.totalOutput,
                employeeName:App.userinfo.employeeName,
                employeeId:App.userinfo.employeeId
              },
              success: function(res){
                if(res.data.status == true){
                  wx.showToast({
                    title: '总产量信息录入成功',
                    icon: 'none',
                    duration: 1000
                  })
                  that.setData({
                    totalOutput: 0,
                    car11Output:'',
                    car12Output:'',
                    car13Output:'',
                    workingHours: '',
                    attendance: '',
                    averageOutput: 0,
                
                    sectionIndex: 0,
                    startTime: '00:00',
                    endTime: '结束时间',
                    car11:'',
                    car12:'',
                    car13:'',
                    car1: '车型产量',
                    car2: '车型产量',
                    car3: '车型产量',
                    timeList:['请选择开始时间','00:00:00','01:00:00','02:00:00','03:00:00','04:00:00',
                    '05:00:00','06:00:00','07:00:00','08:00:00','09:00:00','10:00:00','11:00:00','12:00:00',
                    '13:00:00','14:00:00','15:00:00','16:00:00','17:00:00','18:00:00','19:00:00','20:00:00',
                    '21:00:00','22:00:00','23:00:00','24:00:00',],
                    timeStartIndex:0,
                    timeStrattimestamp:0,
                    timeEndtimestamp:0
                  })
                }
                else{
                  wx.showToast({
                    title: '总产量信息未录入成功，请重试',
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
  })

  })
