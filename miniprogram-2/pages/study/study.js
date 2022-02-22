// pages/study/study.js
const app = getApp();
var util=require('../../utils/util');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    current: 'new',
    newDocuments: [],
    goodDocuments: [],
    serverUrl: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(util.checkLogin()){
      util.login();
  }else{
    wx.stopPullDownRefresh();
    var that = this;
    that.getNewDocuments();
    that.getGoodDocuments();
    that.setData({
      serverUrl: app.globalData.serverIp + '/file-server/viewFile/'
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
    var that = this;
    that.setData({
      newDocuments: [],
      goodDocuments: []
    })
    that.onLoad();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    if(that.data.current == 'new'){
      that.getNewDocuments();
    }
    else {
      that.getGoodDocuments();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getNewDocuments () {
    var that = this;
    wx.request({
      url: app.globalData.serverIp + '/file-server/document/getNew',
      method: 'GET',
      header: {
        token: app.globalData.token.token
      },
      data: {
        pageStart: that.data.newDocuments.length
      },
      success: function (res) {
        that.setData({
          newDocuments: that.data.newDocuments.concat(res.data)
        })
      }
    })
  },
  getGoodDocuments() {
    var that = this;
    wx.request({
      url: app.globalData.serverIp + '/file-server/document/getByRate',
      method: 'GET',
      header: {
        token: app.globalData.token.token
      },
      data: {
        pageStart: that.data.goodDocuments.length
      },
      success: function (res) {
        that.setData({
          goodDocuments: that.data.goodDocuments.concat(res.data)
        })
      }
    })
  },
  documentDetail (e){
    wx.navigateTo({
      url: 'documentDetail/documentDetail?documentid=' + e.currentTarget.dataset.documentid
    }) 
  },
  onChange(e) {
    this.setData({
      current: e.detail.name
    })
  }
})