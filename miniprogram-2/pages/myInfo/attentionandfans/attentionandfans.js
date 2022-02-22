// pages/myInfo/attentionandfans/attentionandfans.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 'attention',
    current_scroll: 'attention',
    attentions: [],
    fans: []
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

  viewOtherInfo(e) {
    var userId = e.currentTarget.dataset.userid;
    wx.navigateTo({
      url: '../otherInfo/otherInfo?userId=' + userId
    }) 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      current: options.tab
    });
    var that = this
    var app = getApp();
    wx.request({
      url: app.globalData.serverIp + '/user-server/user/attentions',
      header: {
        token: getApp().globalData.token.token
      },
      method: 'GET',
      success(res){
        that.setData({
          attentions: res.data
        })
      },
      fail(){
        wx.showToast({
          title: '获取失败',
          icon: 'none',
          duration: 1000,
          mask: true
        })
      }
    })
    wx.request({
      url: app.globalData.serverIp + '/user-server/user/fans',
      header: {
        token: getApp().globalData.token.token
      },
      method: 'GET',
      success(res) {
        that.setData({
          fans: res.data
        })
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
  }
})