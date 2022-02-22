// pages/index/couplet/coupletDetail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    introduction:{
      avatarUrl:'',
      nickName:''
    },
    token: {
      
    },
    couplet: {
      
    },
    author: {

    },
    authorUser: {

    },
    authorUser: {

    },
    isLike: false,
    isCollection: false,
    current: 'introduction',
    commentInput: '',
    pageStart: 0,
    comments: [],
    show: false,
    Information:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app = getApp();
    var that = this;
    that.setData({
      token: app.globalData.token
    });
    wx.request({
      url: app.globalData.serverIp + '/couplet-server/couplet/couplet/' + options.coupletId,
      header: {
        token: that.data.token.token,
      },
      method: 'GET',
      success(res) {
        console.log(res);
        that.setData({
          couplet : res.data.couplet,
          author: res.data.author,
          coupletType:res.data.coupletType,
          isLike: res.data.isLike,
          isCollection: res.data.isCollection,
          Information:res.data.author.authorIntroduction
        })
        that.getComment();
        if(that.data.author.authorUser != null){
          wx.request({
            url: app.globalData.serverIp + '/user-server/user/baseInfo/' + that.data.author.authorUser,
            header: {
              token: that.data.token.token,
            },
            method: 'GET',
            success(res) {
              that.setData({
                authorUser: res.data
              })
            }
          })
        }
        // if(that.data.downAuthor.authorUser != null){
        //   wx.request({
        //     url: app.globalData.serverIp + '/user-server/user/baseInfo/' + that.data.downAuthor.authorUser,
        //     header: {
        //       token: that.data.token.token,
        //     },
        //     method: 'GET',
        //     success(res) {
        //       that.setData({
        //         downAuthorUser: res.data
        //       })
        //     }
        //   })
        // }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
this.get_introduction();
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
  get_introduction:function(){
    let that=this
    wx.getUserInfo({
      success:function(res){
        console.log(res)
        let form={
          nickName:res.userInfo.nickName,
          avatarUrl:res.userInfo.avatarUrl
        }
        that.setData({
          ['introduction.nickName']:form.nickName,
          ['introduction.avatarUrl']:form.avatarUrl
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  console.log(this.data)
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
    that.getComment();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onChange(e){
    this.setData({
      current: e.detail.name
    })
  },
  bindAuthor(e){
    var that=this
    wx.showModal({
      title:that.data.author.authorName+"的个人简介",
      content:that.data.Information,
      showCancel:false
    })
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

  like () {
    var that = this;
    var temp = that.data.couplet;
    var app = getApp();
    if(that.data.isLike != true){
      wx.request({
        url: app.globalData.serverIp + '/couplet-server/couplet/like/' + that.data.couplet.coupletId,
        header: {
          token: that.data.token.token,
        },
        method: 'Post',
        success(res){
          if(res.data == true){
            temp.coupletLike = temp.coupletLike + 1;
            that.setData({
              isLike: true,
              couplet: temp
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
        url: app.globalData.serverIp + '/couplet-server/couplet/cancelLike/' + that.data.couplet.coupletId,
        header: {
          token: that.data.token.token,
        },
        method: 'Post',
        success(res) {
          if (res.data == true) {
            temp.coupletLike = temp.coupletLike - 1;
            that.setData({
              isLike: false,
              couplet: temp
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

  collect () {
    var that = this;
    var temp = that.data.couplet;
    var app = getApp();
    if (that.data.isCollection != true) {
      wx.request({
        url: app.globalData.serverIp + '/couplet-server/couplet/collection/' + that.data.couplet.coupletId,
        header: {
          token: that.data.token.token,
        },
        method: 'Post',
        success(res) {
          if (res.data == true) {
            temp.coupletCollect = temp.coupletCollect + 1;
            that.setData({
              isCollection: true,
              couplet: temp
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
        url: app.globalData.serverIp + '/couplet-server/couplet/cancelCollection/' + that.data.couplet.coupletId,
        header: {
          token: that.data.token.token,
        },
        method: 'Post',
        success(res) {
          if (res.data == true) {
            temp.coupletCollect = temp.coupletCollect - 1;
            that.setData({
              isCollection: false,
              couplet: temp
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
  comment () {
    var that = this;
    if(that.data.commentInput == '')
    {
      wx.showToast({
        title: '评论不能为空',
        icon: 'none',
        duration: 1000
      })
    }
    else{
      wx.request({
        url: app.globalData.serverIp + '/couplet-server/couplet/comment/' + that.data.couplet.coupletId,
        header: {
          token: that.data.token.token,
          'Content-Type' : 'application/x-www-form-urlencoded'
        },
        data: {
          coupletCommentContent: that.data.commentInput
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
  getComment () {
    var that = this;
    that.setData({
      show: true
    });
    wx.request({
      url: app.globalData.serverIp + '/couplet-server/couplet/getComment/' + that.data.couplet.coupletId,
      header: {
        token: that.data.token.token,
      },
      data: {
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

  likeComment (e) {
    var commentId = e.currentTarget.dataset.commentid;
    var that = this;
    var temp = that.data.comments;
    var index = e.currentTarget.dataset.idx;
    if(that.data.comments[index].isLike == false){
      wx.request({
        url: app.globalData.serverIp + '/couplet-server/couplet/likeComment/' + commentId,
        header: {
          token: that.data.token.token,
        },
        method: 'Post',
        success(res) {
          if (res.data == true) {
            temp[index].isLike = true;
            temp[index].coupletComment.coupletCommentLikes = temp[index].coupletComment.coupletCommentLikes + 1;
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
    else{
      wx.request({
        url: app.globalData.serverIp + '/couplet-server/couplet/cancelLikeComment/' + commentId,
        header: {
          token: that.data.token.token,
        },
        method: 'Post',
        success(res) {
          if (res.data == true) {
            temp[index].isLike = false;
            temp[index].coupletComment.coupletCommentLikes = temp[index].coupletComment.coupletCommentLikes - 1;
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
  viewResponse (e) {
    var index = e.currentTarget.dataset.idx;
    var that = this;
    wx.navigateTo({
      url: '../commentResponse/commentResponse?comment=' + JSON.stringify(that.data.comments[index]) + '&index=' + index
    })
  },
  viewAuthor (e){
    var currentChoose = e.currentTarget.dataset.current;
    var that = this;
    var authorId = currentChoose=="up"?that.data.upAuthor.authorId:that.downAuthor.authorId;
    wx.navigateTo({
      url: '../author/author?authorId=' + authorId
    })
  }
})