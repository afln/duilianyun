// pages/myInfo/collection/collection.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 'couplet',
    couplets: [],
    posts: []
  },


  handleChange({ detail }) {
    this.setData({
      current: detail.key
    });
  },

  handleChangeScroll({ detail }) {
    this.setData({
      current_scroll: detail.key
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.globalData.serverIp + '/couplet-server/couplet/getCollection',
      header: {
        token: getApp().globalData.token.token
      },
      method: 'GET',
      success(res) {
        that.setData({
          couplets: res.data
        })
      }
    })
    wx.request({
      url: app.globalData.serverIp + '/post-server/post/getCollection',
      header: {
        token: getApp().globalData.token.token
      },
      method: 'GET',
      success(res) {
        that.setData({
          posts: res.data
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
  onChange(e) {
    this.setData({
      current: e.detail.name
    })
  },
  coupletDetail(e) {
    var coupletId = e.currentTarget.dataset.coupletid;
    wx.navigateTo({
      url: '../../index/couplet/coupletDetail?coupletId=' + coupletId,
    })
  },
  showPostDetail(e) {
    var postId = e.currentTarget.dataset.postid;
    wx.navigateTo({
      url: '../../post/postDetail/postDetail?postId=' + postId,
    })
  }
})