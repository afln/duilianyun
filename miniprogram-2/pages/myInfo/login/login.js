// pages/myInfo/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getUser(e) {
    console.log(e)
    wx.showToast({
      title: '登录中',
      icon: 'loading',
      duration: 10000,
      mask: true
    })
    if (e.detail.errMsg === 'getUserInfo:ok') {
      console.log(e.detail.userInfo)
      var app = getApp()
      wx.login({
        success(res) {
          if (res.code) {
            // 发起网络请求
            wx.request({
              url: app.globalData.serverIp + '/user-server/user/login',
              data: {
                code: res.code,
                wxNickname: e.detail.userInfo.nickName,
                wxPortrait: e.detail.userInfo.avatarUrl
              },
              method: 'POST',
              success: function (res1) {
                // console.log(res1)
                if (res1.data.message == "登录失败"){
                  wx.showToast({
                    title: '登录失败',
                    icon: 'none',
                    duration: 1000,
                    mask: true
                  })
                }
                else{
                  wx.showToast({
                    title: '登录成功',
                    icon: 'succes',
                    duration: 1000,
                    mask: true
                  }) 
                  
                  wx.request({
                    url: app.globalData.serverIp + '/user-server/user/login',
                    data: {
                      code: res1.code,
                      wxNickname: e.detail.userInfo.nickName,
                      wxPortrait: e.detail.userInfo.avatarUrl
                    },
                    method:'POST',
                    success:function(res2){
                      console.log("111")
                      console.log(res2)
                    app.globalData.token = res2.data.token;
                    app.globalData.userInfo.userId = res2.data.user.userId
                    app.globalData.userInfo.avatarUrl = res2.data.user.userPortrait
                    app.globalData.userInfo.nickName = res2.data.user.userNickname
                    wx.switchTab(
                      {
                        // url: '../myInfo'
                        url:getApp().globalData.backUrl
                      }
                    )
                    },
                  })
                }
              },
              fail: function (res1) {
                wx.showToast({
                  title: '登录失败',
                  icon: 'none',
                  duration: 1000,
                  mask: true
                })
              }
            })
          } else {
            wx.showToast({
              title: '登录失败',
              icon: 'none',
              duration: 1000,
              mask: true
            })
          }
        }
      })
    }
  }
})