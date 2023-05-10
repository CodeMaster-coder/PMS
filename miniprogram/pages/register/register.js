Page({
  data: {
    typeRange: ['请选择工种','维修', '生产', '技术'],
    typeIndex: 0,
    shiftRange: ['请选择班次','A', 'B','技术员'],
    shiftIndex: 0,
    // roleRange: ['请选择角色'],
    // roleIndex:0
    name:'',
    nummber:'',
    type:'',
    shift:'',
    avatarUrl:'',
    nickName:'',
    logShow:true

  },
  
  bindPickerChange: function (e) {
    this.setData({
      typeIndex: e.detail.value,
    });
  },
  bindShiftChange(e){
    this.setData({
      shiftIndex: e.detail.value,
    });
  },

  formSubmit: function (e) {
    console.log(e.detail.value);
    let that = this
    if(e.detail.value.name == ''){
      wx.showToast({
        title: '姓名不能为空！！！',
        icon:'error',
        duration:3000
      })
    }
    else if(e.detail.value.number == ''){
      wx.showToast({
        title: '工号不能为空！！！',
        icon:'error',
        duration:3000
      })
    }
    else if(this.data.typeIndex == 0){
      wx.showToast({
        title: '工种不能为空！！！',
        icon:'error',
        duration:3000
      })
    }
    else if(this.data.shiftIndex == 0){
      wx.showToast({
        title: '班次不能为空！！！',
        icon:'error',
        duration:3000
      })
    }else{
      
      wx.getUserProfile({
        desc:'用于完善客户信息',
        success: function(res){
          console.log(res)
          let user = res.userInfo;
          let encryptedData = res.encryptedData;
          let iv = res.iv;
          let nickName = res.userInfo.nickName;
          let avatarUrl = res.userInfo.avatarUrl;
          that.setData({
            avatarUrl:avatarUrl,
            nickName:nickName
          })
          wx.login({
            success: function(res){
              console.log(res)
              let code = res.code              
                that.setData({
                  code: code
                })

            wx.request({
              url: 'https://www.liuke.xyz/PMS/login',
              method:'POST',
              header:{'content-type': 'application/x-www-form-urlencoded'},
              data:{
                demo: code,
                code:'register',
                encryptedData: encryptedData,
                iv: iv,
                employeeId: e.detail.value.number,
                employeeName:e.detail.value.name,
                wokertype: that.data.typeRange[that.data.typeIndex],
                shift:that.data.shiftRange[that.data.shiftIndex],
                nickName:nickName,
                avatarUrl:avatarUrl
              },
              success: function(res){
               
                if(res.data.status == true){
                  that.setData({
                    logShow:false
                  })
                  wx.showToast({
                    title: '注册信息已提交，请等待审核',
                    icon: 'none',
                    duration: 1000
                  })
                }
                else{
                  wx.showToast({
                    title: '未注册成功，请重试',
                    icon: 'none',
                    duration: 1000
                  })
                }
              }
            })
          
        }})
        }
          
        
      })
    }
  },
  onLoad(){
    console.log(App.userinfo)
    if(App.userinfo != undefined){
      if(App.userinfo.auth == '0'){
        this.setData({
          logShow:false,
          avatarUrl:App.userinfo.avatarUrl,
          nickName:App.userinfo.nickName
        })
      }
    }
    
  }
});
