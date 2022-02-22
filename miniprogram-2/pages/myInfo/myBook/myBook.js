// pages/myInfo/myBook/myBook.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    documents: [],
    serverUrl: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      serverUrl: app.globalData.serverIp + "/file-server/viewFile/"
    })
    wx.request({
      url: app.globalData.serverIp + '/file-server/document/getCollection',
      method: 'GET',
      header: {
        token: app.globalData.token.token
      },
      success: function (res) {
        that.setData({
          documents: res.data
        })
      }
    })
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

  documentDetail(e) {
    wx.navigateTo({
      url: '/pages/study/documentDetail/documentDetail?documentid=' + e.currentTarget.dataset.documentid
    })
  } 
})