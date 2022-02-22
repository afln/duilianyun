// pages/myInfo/collection/collection.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 'couplet',
    couplets: [],
    posts: [],
    documents: [],
    pageStart: 0,
    pageStartPost: 0,
    show: false,
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
    that.getHistory();
    that.getHistoryPost();
    that.getHistoryDocument();
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
    if(that.data.current == 'couplet'){
      that.getHistory();
    }
    else if(that.data.current == 'post') {
      that.getHistoryPost();
    }
    else {
      that.getHistoryDocument();
    }
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
  getHistory () {
    var that = this;
    that.setData({
      show: true
    });
    wx.request({
      url: app.globalData.serverIp + '/couplet-server/couplet/getHistory',
      header: {
        token: getApp().globalData.token.token
      },
      data: {
        pageStart: that.data.pageStart
      },
      method: 'GET',
      success(res) {
        that.setData({
          couplets: that.data.couplets.concat(res.data),
          pageStart: that.data.couplets.length + res.data.length,
          show: false
        })
      }
    })
  },
  getHistoryPost () {
    var that = this;
    that.setData({
      show: true
    });
    wx.request({
      url: app.globalData.serverIp + '/post-server/post/getHistory',
      header: {
        token: getApp().globalData.token.token
      },
      data: {
        pageStart: that.data.pageStartPost
      },
      method: 'GET',
      success(res) {
        that.setData({
          posts: that.data.posts.concat(res.data),
          pageStartPost: that.data.posts.length + res.data.length,
          show: false
        })
      }
    })
  },
  getHistoryDocument () {
    var that = this;
    that.setData({
      show: true
    });
    wx.request({
      url: app.globalData.serverIp + '/file-server/document/getHistory',
      header: {
        token: getApp().globalData.token.token
      },
      data: {
        pageStart: that.data.documents.length
      },
      method: 'GET',
      success(res) {
        that.setData({
          documents: that.data.documents.concat(res.data),
          show: false
        })
      }
    })
  },
  showPostDetail(e) {
    var postId = e.currentTarget.dataset.postid;
    wx.navigateTo({
      url: '../../post/postDetail/postDetail?postId=' + postId,
    })
  },
  documentDetail(e) {
    wx.navigateTo({
      url: '/pages/study/documentDetail/documentDetail?documentid=' + e.currentTarget.dataset.documentid
    })
  } 
})