// pages/post/post.js
const app = getApp();
var util=require('../../utils/util');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 'attention',
    attentions: [],
    news: [],
    pageStartNew: 0,
    pageStartAttention: 0,
    show: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(util.checkLogin()){
      util.login();
  }else{
    var that = this;
    wx.stopPullDownRefresh();
    that.getNew();
    that.getAttention();
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
     var that = this;
     that.setData({
       attentions: [],
       news: [],
       pageStartNew: 0,
       pageStartAttention: 0
     })
    that.onLoad();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    that.getNew();
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
  getNew () {
    var that = this;
    that.setData({
      show: false
    });
    wx.request({
      url: app.globalData.serverIp + '/post-server/post/getNew',
      header: {
        token: app.globalData.token.token,
      },
      data: {
        pageStart: that.data.pageStartNew
      },
      method: 'GET',
      success(res) {
        that.setData({
          news: that.data.news.concat(res.data),
          pageStartNew: that.data.news.length + res.data.length
        })
        that.setData({
          show: false
        });
      },
      fail() {
        wx.showToast({
          title: '获取失败',
          icon: 'none',
          duration: 1000,
          mask: true
        })
      }
    })
  },
  getAttention () {
    var that = this;
    that.setData({
      show: false
    });
    wx.request({
      url: app.globalData.serverIp + '/post-server/post/getAttentionPost',
      header: {
        token: app.globalData.token.token,
      },
      data: {
        pageStart: that.data.pageStartAttention
      },
      method: 'GET',
      success(res) {
        that.setData({
          attentions: that.data.attentions.concat(res.data),
          pageStartAttention: that.data.attentions.length + res.data.length
        })
        that.setData({
          show: false
        });
      },
      fail() {
        wx.showToast({
          title: '获取失败',
          icon: 'none',
          duration: 1000,
          mask: true
        })
      }
    })
  },
  showPostDetail (e) {
    var postId = e.currentTarget.dataset.postid;
    wx.navigateTo({
      url: 'postDetail/postDetail?postId=' + postId,
    })
  }

})