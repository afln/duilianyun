// pages/myInfo/otherInfo/otherInfo.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    otherInfo: {
      
    },
    buttonContent: '',
    buttonLoading: false,
    buttonType: '',
    posts: [],
    couplets: [],
    current: 'posts',
    author: null
  },
  handleClick() {
    var that = this;
    var app = getApp();
    var temp = that.data.otherInfo;
    if(that.data.otherInfo.relationship == 'Attention'){
      that.setData({
        buttonLoading: true
      });
      wx.request({
        url: app.globalData.serverIp + '/user-server/user/cancelAttention/' + that.data.otherInfo.userId,
        header: {
          token: getApp().globalData.token.token
        },
        method: 'Post',
        success(res){
          if(res.data == true){
            temp.relationship = 'None';
            that.setData({
              buttonLoading: false,
              buttonContent: '+关注',
              buttonType: 'primary',
              otherInfo: temp
            })
          }
          else{
            that.setData({
              buttonLoading: false
            })
          }
        }
      })
    }
    else{
      that.setData({
        buttonLoading: true
      });
      wx.request({
        url: app.globalData.serverIp + '/user-server/user/attention/' + that.data.otherInfo.userId,
        header: {
          token: getApp().globalData.token.token
        },
        method: 'Post',
        success(res) {
          if (res.data == true) {
            temp.relationship = 'Attention';
            that.setData({
              buttonLoading: false,
              buttonContent: '已关注',
              buttonType: 'ghost',
              otherInfo: temp
            })
          }
          else {
            that.setData({
              buttonLoading: false
            })
          }
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var app = getApp();
    wx.request({
      url: app.globalData.serverIp + '/user-server/user/other/' + options.userId,
      method: 'Get',
      header: {
        token: getApp().globalData.token.token
      },
      success(res) {
        that.setData({
          otherInfo: res.data
        });
        if(res.data.relationship == 'Attention'){
          that.setData({
            buttonContent: '已关注',
            buttonType: 'ghost'
          });
        }
        else{
          that.setData({
            buttonContent: '+关注',
            buttonType: 'primary'
          });
        }
        wx.request({
          url: app.globalData.serverIp + '/post-server/post/getPostByUserId',
          header: {
            token: getApp().globalData.token.token
          },
          data: {
            userId: that.data.otherInfo.userId
          },
          method: 'GET',
          success(res) {
            that.setData({
              posts: res.data
            })
          }
        })
        that.initAuthor();
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
    var that = this;
    that.getCouplet();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  showPostDetail(e) {
    var postId = e.currentTarget.dataset.postid;
    wx.navigateTo({
      url: '../../post/postDetail/postDetail?postId=' + postId,
    })
  },
  initAuthor(){
    var that = this;
    wx.request({
      url: app.globalData.serverIp + '/couplet-server/author/getAuthorInfoByUserId/' + that.data.otherInfo.userId,
      header: {
        token: app.globalData.token.token,
      },
      method: 'GET',
      success: function (res) {
        that.setData({
          author: res.data
        })
        that.getCouplet();
      }
    })
  },
  getCouplet() {
    var that = this;
    wx.request({
      url: app.globalData.serverIp + '/couplet-server/couplet/getCoupletsByAuthor',
      header: {
        token: app.globalData.token.token,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        authorId: that.data.author.authorId,
        pageStart: that.data.couplets.length
      },
      method: 'GET',
      success: function (res) {
        that.setData({
          couplets: that.data.couplets.concat(res.data),
        })
      }
    })
  }
})