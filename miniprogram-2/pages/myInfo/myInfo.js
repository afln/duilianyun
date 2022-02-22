// pages/myInfo/myInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: {
      token: '',
      expirationTime: ''
    },
    userInfo: {
      nickName: '',
      avatarUrl: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if (getApp().globalData.token.token == '') {
      wx.redirectTo(
        {
          url:'login/login'
        }
      )
    }
    else{
      that.setData({
        userInfo:getApp().globalData.userInfo,
        token:getApp().globalData.token
      })
    }
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
  /**
   * 查看我关注的人
   */
  myAttention: function () {
    wx.navigateTo({
      url: "attentionandfans/attentionandfans?tab=attention"
    })
  },
  mysubmit:function(){
    wx.navigateTo({
      url: "submit_history/submit_history?tab=fans"
    })
  },
  /**
   * 查看我的粉丝
   */
  myFans: function () {
    wx.navigateTo({
      url: "attentionandfans/attentionandfans?tab=fans"
    })
  },
  /**
   * 
   */
  myCollection: function () {
    wx.navigateTo({
      url: "collection/collection"
    })
  },
  myHistory: function () {
    wx.navigateTo({
      url: "history/history"
    })
  },
  myIntroduction:function () {
    wx.navigateTo({
      url: "introduction/introduction"
    })
  },
  myPost: function () {
    wx.navigateTo({
      url: "myPost/myPost"
    })
  },
  myBook: function () {
    wx.navigateTo({
      url: "myBook/myBook"
    })
  }
})