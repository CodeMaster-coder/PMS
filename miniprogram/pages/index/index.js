// index.js


// 获取应用实例
const app = getApp()

const db = wx.cloud.database()


Page({
  data: {
    name:'',

    num:null,

    array:['请选择工种','A','B','常白班'],

    index1:0,

    openid:'',

    registerShow:true
  },

  
  nameInput(e){
    this.setData({
      name:e.detail.value
    })
    console.log("data里的name",this.data.name)
    console.log("e里面的name",e.detail.value)
  },


  numInput(e){
    this.setData({
      num:e.detail.value
    })
    console.log(this.data.num)
  },
  
  select(e){
    this.setData({
      index1:e.detail.value
    })
  },

  logup(){
    
    let that = this

    if(that.data.name == ''){
      wx.showToast({
        title: '姓名不能为空！！！',
        icon: 'error',
        duration: 3000
      })
    }
    else if(this.data.num == null){
      wx.showToast({
        title: '工号不能为空！！！',
        icon: 'error',
        duration: 3000
      })
    }
    else if(this.data.index1 == 0){
      wx.showToast({
        title: '工种不能为空！！！',
        icon: 'error',
        duration: 3000
      })
    }
    else if(this.data.openid == ''){
      wx.showToast({
        title: '获取openid失败！！！',
        icon: 'error',
        duration: 3000
      })
    }
    else{
     
      console.log('数据全了，可以插入后端')

      db.collection('workerinfo').add({
        data:{
          name:this.data.name,
          num:this.data.num,
          gongzhong:this.data.array[this.data.index1],
          openid:this.data.openid,
          auth:0
        },

        success:function(res){
          console.log(res)

          if(res.errMsg == 'collection.add:ok'){
            wx.showToast({
              title: '授权注册成功！！！',
              icon: 'success',
              duration: 3000
            })
            
            that.setData({
              name:'',
              num:null,
              index1:0,
              registerShow:false
            })
           
          }

        },
        fail:function(res){
          console.log(res)
        }
        

      })
     
    }
  },

  onLoad:function(){
   
    console.log('111')
    wx.cloud.callFunction({
      name:'getOpenid',
    })
    .then(res=>{
      console.log("简单路径取openid",res.result.openid)
      this.setData({
        openid:res.result.openid
      })
    })

  }, 


})
