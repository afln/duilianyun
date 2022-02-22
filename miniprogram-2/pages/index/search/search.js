// pages/index/search/search.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue: '' ,
    couplets: [],
    coupletNum: 0,
    postNum: 0,
    users: [],
    posts: [],
    current: 'couplets',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      searchValue: options.searchValue
    })
    that.searchUsers();
    that.searchCouplet();
    that.searchPosts();
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
    if(that.data.current == 'couplets'){
      that.searchCouplet();
    }
    if(that.data.current == 'users'){
      that.searchUsers();
    }
    if(that.data.current == 'posts'){
      that.searchPosts();
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
  change(e) {
    var that = this;
    that.setData({
      searchValue: e.detail
    })
  },
  searchUsers() {
    var that = this;
    wx.request({
      url: app.globalData.serverIp + '/user-server/user/search',
      header: {
        token: app.globalData.token.token,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        searchContent: that.data.searchValue,
        pageStart: that.data.users.length
      },
      method: 'GET',
      success(res) {
        that.setData({
          users: that.data.users.concat(res.data)
        })
        that.setData({
          show: false
        });
      }
    })
  },
  searchCouplet() {
    var that = this;
    wx.request({
      url: app.globalData.serverIp + '/couplet-server/couplet/getSearchNum',
      header: {
        token: app.globalData.token.token,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        searchContent: that.data.searchValue,
      },
      method: 'GET',
      success(res) {
        that.setData({
          coupletNum: res.data
        })
        that.setData({
          show: false
        });
      }
    })
    wx.request({
      url: app.globalData.serverIp + '/couplet-server/couplet/search',
      header: {
        token: app.globalData.token.token,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        searchContent: that.data.searchValue,
        pageStart: that.data.couplets.length
      },
      method: 'GET',
      success(res) {
        that.setData({
          couplets: that.data.couplets.concat(res.data)
        })
        that.setData({
          show: false
        });
      }
    })
  },
  searchPosts() {
    var that = this;
    wx.request({
      url: app.globalData.serverIp + '/post-server/post/getSearchNum',
      header: {
        token: app.globalData.token.token,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        searchContent: that.data.searchValue,
      },
      method: 'GET',
      success(res) {
        that.setData({
          postNum: res.data
        })
        that.setData({
          show: false
        });
      }
    })
    wx.request({
      url: app.globalData.serverIp + '/post-server/post/search',
      header: {
        token: app.globalData.token.token,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        searchContent: that.data.searchValue,
        pageStart: that.data.posts.length
      },
      method: 'GET',
      success(res) {
        that.setData({
          posts: that.data.posts.concat(res.data)
        })
        that.setData({
          show: false
        });
      }
    })
  },
  showPostDetail(e) {
    var postId = e.currentTarget.dataset.postid;
    wx.navigateTo({
      url: '../../post/postDetail/postDetail?postId=' + postId,
    })
  },
  viewOtherInfo(e) {
    var userId = e.currentTarget.dataset.userid;
    wx.navigateTo({
      url: '../../myInfo/otherInfo/otherInfo?userId=' + userId
    })
  },
  coupletDetail(e) {
    var coupletId = e.currentTarget.dataset.coupletid;
    wx.navigateTo({
      url: '../couplet/coupletDetail?coupletId=' + coupletId,
    })
  },
  search() {
    var that = this;
    that.setData({
      couplets: [],
      posts: [],
      users: []
    })
    if(that.data.searchValue != ''){
      that.searchCouplet();
      that.searchPosts();
      that.searchUsers();
    }
    else{
      wx.showToast({
        title: '搜索内容不能为空',
        icon: 'none',
        duration: 1000
      })
    }
  }
})