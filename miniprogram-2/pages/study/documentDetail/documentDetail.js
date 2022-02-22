// pages/study/documentDetail/documentDetail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    document: '',
    userInfo: '',
    myComment: '',
    commentContent: '',
    comment: [],
    documentPicture: '',
    isCollect: false,
    serverUrl: '',
    open:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      serverUrl: app.globalData.serverIp + '/file-server/viewFile/'
    })
    wx.request({
      url: app.globalData.serverIp + '/file-server/document/getCurrentUserComment',
      header: {
        token: app.globalData.token.token,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        documentId: options.documentid
      },
      method: 'Get',
      success(res) {
        that.setData({
          userInfo: res.data.commenter,
          myComment: res.data.documentComment
        })
      }
    });
    wx.request({
      url: app.globalData.serverIp + '/file-server/document/getDocumentById',
      header: {
        token: app.globalData.token.token,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        documentId: options.documentid
      },
      method: 'Get',
      success(res) {
        that.setData({
          document: res.data.document,
          documentPicture: res.data.documentPicture,
          isCollect: res.data.isCollect
        })
        that.getComments();
      }
    });
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
    that.getComments();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onChange(event) {
    var that = this;
    that.data.myComment.documentCommentScore = event.detail
    this.setData({
      myComment: that.data.myComment
    });
  },
  getInput(e) {
    var that = this;
    that.data.myComment.documentCommentContent = e.detail.value
    that.setData({
      myComment: that.data.myComment
    })
  },
  commentDocument () {
    var that = this;
    wx.request({
      url: app.globalData.serverIp + '/file-server/document/commentDocument',
      header: {
        token: app.globalData.token.token,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        documentId: that.data.document.documentId,
        commentContent: that.data.myComment.documentCommentContent,
        rate: that.data.myComment.documentCommentScore
      },
      method: 'Post',
      success(res) {
        if (res.data == true) {
          that.setData({
            open: false
          })
          wx.showToast({
            title: '评论成功',
            icon: 'none',
            duration: 1000
          })
          var tmp=that.data.document;
          tmp.documentid=tmp.documentId;
          that.onLoad(tmp);
        }
      }
    })
  },
  openFile () {
    var that = this;
    wx.request({
      url: app.globalData.serverIp + '/file-server/file/getFileInfoById',
      header: {
        token: app.globalData.token.token,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        documentId: that.data.document.documentId
      },
      method: 'Get',
      success(res) {
        var file = res.data;
        if(file.fileType == 'mp4'){
          wx.navigateTo({
            url: 'openVideo/openVideo?fileId=' + file.fileId + '&fileType=' + file.fileType
          }) 
        }
        else if(file.fileType == 'jpg' || file.fileType == 'png'){
          wx.navigateTo({
            url: 'openPicture/openPicture?fileId=' + file.fileId + '&fileType=' + file.fileType
          }) 
        }
        else{
          wx.downloadFile({
            url: app.globalData.serverIp +'/file-server/viewFile/' + file.fileType + '/' + file.fileId + '.' + file.fileType,
            success: function (res) {
              const filePath = res.tempFilePath
              wx.openDocument({
                filePath: filePath,
                success: function (res) {
                  
                }
              })
            },
            fail: function(res){
              wx.showToast({
                title: '下载失败',
              })
            }
          })
        }
      }
    });
  },
  getComments () {
    var that = this;
    wx.request({
      url: app.globalData.serverIp + '/file-server/document/getDocumentComment',
      header: {
        token: app.globalData.token.token,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        documentId: that.data.document.documentId,
        pageStart: that.data.comment.length
      },
      method: 'Get',
      success(res) {
        that.setData({
          comment: that.data.comment.concat(res.data)
        })
      }
    });
  },
  collectDocument () {
    var that = this;
    wx.request({
      url: app.globalData.serverIp + '/file-server/document/collectDocument',
      header: {
        token: app.globalData.token.token,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        documentId: that.data.document.documentId,
      },
      method: 'Post',
      success(res) {
        if (res.data == true) {
          that.setData({
            isCollect: true
          });
          wx.showToast({
            title: '加入书架成功',
            icon: 'none',
            duration: 1000
          })
        }
      }
    })
  },
  cancelCollectDocument() {
    var that = this;
    wx.request({
      url: app.globalData.serverIp + '/file-server/document/cancelCollectDocument',
      header: {
        token: app.globalData.token.token,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        documentId: that.data.document.documentId,
      },
      method: 'Post',
      success(res) {
        if (res.data == true) {
          that.setData({
            isCollect: false
          });
          wx.showToast({
            title: '加入书架成功',
            icon: 'none',
            duration: 1000
          })
        }
      }
    })
  },
  commetToggle() {

    var that = this;
    var flag=that.data.open;
    that.setData({
      open: !flag
    })
  }
})