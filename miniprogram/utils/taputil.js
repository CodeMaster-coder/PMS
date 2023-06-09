// 点击时间限制
function throttle(fn, gapTime) {
    if (gapTime == null || gapTime == undefined) {
      gapTime = 5000//这是设置的时间间隔
    }
  
    let _lastTime = null
  
    // 返回新的函数
    return function () {
      let _nowTime = + new Date()
      if (_nowTime - _lastTime > gapTime || !_lastTime) {
        fn.apply(this, arguments)   //将this和参数传给原函数
        _lastTime = _nowTime
      }
    }
  }


  // 抛出函数使用
module.exports = {
    throttle: throttle,
  }