
function formatDate(value) {
  　　//不能使用 new Date()
  　　var time = new Date(value);
  　　var year = time.getFullYear();
  　　var month = time.getMonth() + 1;
  　　var date = time.getDate();
  　　var hour = time.getHours();
  　　var minute = time.getMinutes();
  　　var second = time.getSeconds();
  　　month = month < 10 ? "0" + month : month;
  　　date = date < 10 ? "0" + date : date;
  　　hour = hour < 10 ? "0" + hour : hour;
  　　minute = minute < 10 ? "0" + minute : minute;
  　　second = second < 10 ? "0" + second : second;
  　　return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
  }
  module.exports = {
  　　formatDate: formatDate
  }
  