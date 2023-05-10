// pages/login/login.js
// 数据库初始化
const DB = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    workerName:'',
    workerNumber:'',
    workerType:'',
    workerOpenid:'',
    typesIndex:0,
    workerTypeSelect:['请选择工种','A','B','技术员']
  },

  workerNameInput(e){
    this.setData({
      workerName:e.detail.value
    })
    // console.log(this.data.workerName)
  },
  workerNumberInput(e){
    this.setData({
      workerNumber:e.detail.value
    })
  },
  workerTypeSelect(e){
this.setData({
  typesIndex:e.detail.value,
  workerType:this.data.workerTypeSelect[e.detail.value]
})
  },
  registerBtn(){
    if(this.data.workerName == ''){
      wx.showToast({
        title: '提示：姓名不能为空！',
        icon: 'none',
        duration: 1500
      })
    }
    else if(this.data.workerType == ''){
      wx.showToast({
        title: '提示：工号不能为空！',
        icon: 'none',
        duration: 1500
      })
    }
    else if(this.data.typesIndex == 0){
      wx.showToast({
        title: '提示：工种不能为空！',
        icon: 'none',
        duration: 1500
      })
    }
    else if(this.data.workerOpenid == ''){
      wx.showToast({
        title: '提示：未获取到openid！',
        icon: 'none',
        duration: 1500
      })
    }
    else{
      DB.collection('userinfotest').add({
        data:{
          workerName:this.data.workerName,
          workerNumber:this.data.workerNumber,
          workerType:this.data.workerType,
          workerOpenid:this.data.workerOpenid,
        }
      })
      .then(
        res =>{
          console.log(res)
          if(res.errMsg == "collection.add:ok"){
            wx.showToast({
              title: '提示：授权注册成功！',
              icon: 'none',
              duration: 1500
            })
          }else{
            wx.showToast({
              title: '提示：授权注册失败！',
              icon: 'none',
              duration: 1500
            })
          }
        }
     
      )
      .catch(err=>{
        console.log(err)
        wx.showToast({
          title: "数据插入失败！！！",
          icon: "error",
          duration: 1500
        })
      })
    }
  },
   /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function(){
   
    console.log('111')
    wx.cloud.callFunction({
      name:'getOpenid',
    })
    .then(res=>{
      
        console.log(res)
    })

  }, 
  
})