// pages/index/author/author.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    couplets: [],
    author:{

    },
    authorId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      authorId: options.authorId
    });
    that.getCouplet();
    that.getAuthor();
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
    var that = this;
    that.getCouplet();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  coupletDetail(e){
    var coupletId = e.currentTarget.dataset.coupletid;
    wx.navigateTo({
      url: '../couplet/coupletDetail?coupletId=' + coupletId,
    })
  },
  getCouplet(){
    var that = this;
    wx.request({
      url: app.globalData.serverIp + '/couplet-server/couplet/getCoupletsByAuthor',
      header: {
        token: app.globalData.token.token,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        authorId: that.data.authorId,
        pageStart: that.data.couplets.length
      },
      method: 'GET',
      success: function (res) {
        that.setData({
          couplets: that.data.couplets.concat(res.data),
        })
      }
    })
  },
  getAuthor(){
    var that = this;
    wx.request({
      url: app.globalData.serverIp + '/couplet-server/author/getAuthorInfo/' + that.data.authorId,
      header: {
        token: app.globalData.token.token,
      },
      method: 'GET',
      success: function (res) {
        that.setData({
          author: res.data
        })
      }
    })
  }
})