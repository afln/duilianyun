const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  login:login,
  checkLogin:checkLogin,
  getCurrentUrl:getCurrentUrl
}

function checkLogin(){
  if(getApp().globalData.token.token==""){
    return true;
  }else{
    return false;
  }
}

//登录辅助
function login(){
  // var that = this;
    wx.showModal({
      title: '登陆提示',
      content: '请登陆后再访问',
      success: function (res) {
          if (res.confirm) {
          getApp().globalData.backUrl = getCurrentUrl();
            wx.redirectTo(
              {
                url:'../myInfo/login/login'
              }
            )
          }
      }
  })
}
function getCurrentUrl(){//获取当前页面全路径
  var url=getCurrentPages()[getCurrentPages().length-1].__route__;
  // url=url.replace("eapdomain/src/pages/..");//替换路径全路径。修改该路径为相对路径
  return '/'+url;
}

function doLogin(app){
  wx.login({
    success: res => {
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
      wx.request({
        url: app.globalData.serverIp + '/user-server/user/login',
        method: 'POST',
        data: {
          code: res.code,
          wxNickname: null,
          wxPortrait: null
        },
        
        success: function (res1) {
          if (res1.data.message == '登录成功!') {
            console.log(res1)
            app.globalData.token = res1.data.token
            app.globalData.userInfo.userId = res1.data.user.userId
            app.globalData.userInfo.avatarUrl = res1.data.user.userPortrait
            app.globalData.userInfo.nickName = res1.data.user.userNickname
            wx.showToast({
              title: '登录成功',
              icon: 'success',
              duration: 2000
          })
          }
          else {
            wx.showToast({
              title: '登录失败',
              icon: 'none',
              duration: 2000
          })
            // wx.redirectTo(
            //   {
            //     url: '../myInfo/login/login'
            //   }
            // )
          }
          // that.setData({
          //   userInfo: app.globalData.userInfo,
          //   token: app.globalData.token
          // })
         
        }
      })
    }
  })
} 
  
  

