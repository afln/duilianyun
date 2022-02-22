// pages/post/commentResponse/commentResponse.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commentInput: '',
    pageStart: 0,
    responses: [],
    show: false,
    comment: '',
    commentIndex: -1,
    pageStart: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      comment: JSON.parse(options.comment),
      commentIndex: options.index
    });
    that.getResponse();
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
    that.setData({
      show: true
    });
    that.getResponse();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  response() {
    var that = this;
    var pages = getCurrentPages();
    var lastpage = pages[pages.length - 2];
    var temp = lastpage.data.comments;
    if (that.data.commentInput == '') {
      wx.showToast({
        title: '回复不能为空',
        icon: 'none',
        duration: 1000
      })
    }
    else {
      wx.request({
        url: app.globalData.serverIp + '/post-server/post/responsePostComment',
        header: {
          token: app.globalData.token.token,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
          postCommentId: that.data.comment.postComment.postCommentId,
          postCommentResponseContent: that.data.commentInput
        },
        method: 'Post',
        success(res) {
          if (res.data == true) {
            that.setData({
              commentInput: '',
            })
            temp[that.data.commentIndex].postComment.postCommentResponse = temp[that.data.commentIndex].postComment.postCommentResponse + 1;
            lastpage.setData({
              comments: temp
            })
            wx.showToast({
              title: '回复成功',
              icon: 'none',
              duration: 1000
            })
            that.getResponse();
          }
          else {
            wx.showToast({
              title: '回复失败',
              icon: 'none',
              duration: 1000
            })
          }
        }
      })
    }
  },
  getInput(e) {
    var that = this;
    that.setData({
      commentInput: e.detail.value
    })
  },
  getResponse() {
    var that = this;
    wx.request({
      url: app.globalData.serverIp + '/post-server/post/getResponse',
      header: {
        token: app.globalData.token.token,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        pageStart: that.data.pageStart,
        postCommentId: that.data.comment.postComment.postCommentId
      },
      method: 'GET',
      success(res) {
        that.setData({
          responses: that.data.responses.concat(res.data),
          pageStart: that.data.responses.length + res.data.length,
          show: false
        })
      }
    })
  },
  likeResponse(e) {
    var responseId = e.currentTarget.dataset.responseid;
    var that = this;
    var temp = that.data.responses;
    var index = e.currentTarget.dataset.idx;
    if (that.data.responses[index].isLike == false) {
      wx.request({
        url: app.globalData.serverIp + '/post-server/post/likePostCommentResponse',
        header: {
          token: app.globalData.token.token,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data:{
          postCommentResponseId: responseId
        },
        method: 'Post',
        success(res) {
          if (res.data == true) {
            temp[index].isLike = true;
            temp[index].response.postCommentResponseLike = temp[index].response.postCommentResponseLike + 1;
            that.setData({
              responses: temp
            })
            wx.showToast({
              title: '点赞成功',
              icon: 'none',
              duration: 1000
            })
          }
        }
      })
    }
    else {
      wx.request({
        url: app.globalData.serverIp + '/post-server/post/cancelLikePostCommentResponse',
        header: {
          token: app.globalData.token.token,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
          postCommentResponseId: responseId
        },
        method: 'Post',
        success(res) {
          if (res.data == true) {
            temp[index].isLike = false;
            temp[index].response.postCommentResponseLike = temp[index].response.postCommentResponseLike - 1;
            that.setData({
              responses: temp
            })
            wx.showToast({
              title: '取消点赞',
              icon: 'none',
              duration: 1000
            })
          }
        }
      })
    }
  },
  viewOtherInfo(e) {
    var userId = e.currentTarget.dataset.userid;
    wx.navigateTo({
      url: '../../myInfo/otherInfo/otherInfo?userId=' + userId
    })
  }
})