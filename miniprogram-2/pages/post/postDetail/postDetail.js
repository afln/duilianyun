// pages/post/postDetail/postDetail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    post: '',
    author: '',
    postType: '',
    isLike: false,
    isCollection: false,
    commentInput: '',
    pageStart: 0,
    comments: [],
    show: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.globalData.serverIp + '/post-server/post/post/' + options.postId,
      header: {
        token: app.globalData.token.token
      },
      method: 'GET',
      success(res) {
        that.setData({
          post: res.data.post,
          author: res.data.author,
          postType: res.data.postType,
          isLike: res.data.isLike,
          isCollection: res.data.isCollection
        });
        that.getComment();
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
  like() {
    var that = this;
    var temp = that.data.post;
    if (that.data.isLike != true) {
      wx.request({
        url: app.globalData.serverIp + '/post-server/post/likePost',
        header: {
          token: app.globalData.token.token,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
          postId: that.data.post.postId
        },
        method: 'Post',
        success(res) {
          if (res.data == true) {
            temp.postLike = temp.postLike + 1;
            that.setData({
              isLike: true,
              post: temp
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
        url: app.globalData.serverIp + '/post-server/post/cancelLikePost',
        header: {
          token: app.globalData.token.token,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
          postId: that.data.post.postId
        },
        method: 'Post',
        success(res) {
          if (res.data == true) {
            temp.postLike = temp.postLike - 1;
            that.setData({
              isLike: false,
              post: temp
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

  collect() {
    var that = this;
    var temp = that.data.post;
    if (that.data.isCollection != true) {
      wx.request({
        url: app.globalData.serverIp + '/post-server/post/collectPost',
        header: {
          token: app.globalData.token.token,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
          postId: that.data.post.postId
        },
        method: 'Post',
        success(res) {
          if (res.data == true) {
            temp.postCollect = temp.postCollect + 1;
            that.setData({
              isCollection: true,
              post: temp
            })
            wx.showToast({
              title: '收藏成功',
              icon: 'none',
              duration: 1000
            })
          }
        }
      })
    }
    else {
      wx.request({
        url: app.globalData.serverIp + '/post-server/post/cancelCollectPost',
        header: {
          token: app.globalData.token.token,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
          postId: that.data.post.postId
        },
        method: 'Post',
        success(res) {
          if (res.data == true) {
            temp.postCollect = temp.postCollect - 1;
            that.setData({
              isCollection: false,
              post: temp
            })
            wx.showToast({
              title: '取消收藏',
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
  comment() {
    var that = this;
    if (that.data.commentInput == '') {
      wx.showToast({
        title: '评论不能为空',
        icon: 'none',
        duration: 1000
      })
    }
    else {
      wx.request({
        url: app.globalData.serverIp + '/post-server/post/commentPost',
        header: {
          token: app.globalData.token.token,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
          commentContent: that.data.commentInput,
          postId: that.data.post.postId
        },
        method: 'Post',
        success(res) {
          if (res.data == true) {
            that.setData({
              commentInput: '',
            })
            wx.showToast({
              title: '评论成功',
              icon: 'none',
              duration: 1000
            })
            that.getComment();
          }
          else {
            wx.showToast({
              title: '评论失败',
              icon: 'none',
              duration: 1000
            })
          }
        }
      })
    }
  },
  getComment() {
    var that = this;
    that.setData({
      show: true
    });
    wx.request({
      url: app.globalData.serverIp + '/post-server/post/getComment',
      header: {
        token: app.globalData.token.token,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        postId: that.data.post.postId,
        pageStart: that.data.pageStart
      },
      method: 'GET',
      success(res) {
        that.setData({
          comments: that.data.comments.concat(res.data),
          pageStart: that.data.comments.length + res.data.length
        });
        that.setData({
          show: false
        });
      }
    })
  },

  viewOtherInfo(e) {
    var userId = e.currentTarget.dataset.userid;
    wx.navigateTo({
      url: '../../myInfo/otherInfo/otherInfo?userId=' + userId
    })
  },

  likeComment(e) {
    var commentId = e.currentTarget.dataset.commentid;
    var that = this;
    var temp = that.data.comments;
    var index = e.currentTarget.dataset.idx;
    if (that.data.comments[index].isLike == false) {
      wx.request({
        url: app.globalData.serverIp + '/post-server/post/likePostComment',
        header: {
          token: app.globalData.token.token,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
          postCommentId : commentId
        },
        method: 'Post',
        success(res) {
          if (res.data == true) {
            temp[index].isLike = true;
            temp[index].postComment.postCommentLike = temp[index].postComment.postCommentLike + 1;
            that.setData({
              comments: temp
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
        url: app.globalData.serverIp + '/post-server/post/cancelLikePostComment',
        header: {
          token: app.globalData.token.token,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
          postCommentId: commentId
        },
        method: 'Post',
        success(res) {
          if (res.data == true) {
            temp[index].isLike = false;
            temp[index].postComment.postCommentLike = temp[index].postComment.postCommentLike - 1;
            that.setData({
              comments: temp
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
  viewResponse(e) {
    var index = e.currentTarget.dataset.idx;
    var that = this;
    wx.navigateTo({
      url: '../commentResponse/commentResponse?comment=' + JSON.stringify(that.data.comments[index]) + '&index=' + index
    })
  },
  viewAuthorInfo() {
    var that = this;
    var userId = that.data.author.userId;
    wx.navigateTo({
      url: '../../myInfo/otherInfo/otherInfo?userId=' + userId
    })
  }
})