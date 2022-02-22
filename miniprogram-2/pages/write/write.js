// pages/write/write.js
const app = getApp();
var util=require('../../utils/util');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postTypes: [],
    postType: 0,
    postTitle: '',
    UpContent:'',
    DownContent:'',
    postAnnotation:'',
    postAuthor:'',
    postAppreciation:'',
    postCategory:'',
    postCategorys:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(util.checkLogin()){
      util.login();
    }else{
      var that = this;
      //获取楹联类型
      wx.request({
        url: app.globalData.serverIp + '/post-server/post/getPostType',
        header: {
          token: app.globalData.token.token,
        },
        method: 'GET',
        success(res) {
          var temp = [res.data.length];
          for(let i = 0; i < res.data.length; i++){
            temp[i]={
              text: res.data[i].postType,
              value: res.data[i].postTypeId
            }
          }
          that.setData({
            postTypes: temp,
            postType: res.data[0].postTypeId
          })
        }
      });
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
  change (options) {
    var that = this;
    that.setData({
      postType: options.detail
    })
  },
  Categorychange(options){
    var that = this;
    that.setData({
      postCategory: options.detail
    })
  },
  publicPost () {
    var that = this;
    let str = that.data.postTitle.trim();
    let str2 = that.data.postContent.trim();
    if(str.length == 0){
      wx.showToast({
        title: '标题不能为空',
        icon: 'none',
        duration: 1000
      })
    }
    else if (str2.length == 0){
      wx.showToast({
        title: '内容不能为空',
        icon: 'none',
        duration: 1000
      })
    }
    else{
      wx.request({
        url: app.globalData.serverIp + '/post-server/post/publicPost',
        header: {
          token: app.globalData.token.token,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
          postTitle: that.data.postTitle,
          postContent: that.data.postUpContent+ "_" +that.data.postDownContent,

          postType: that.data.postType,
          postAuthor:that.data.postAuthor,
          postCategory:that.data.postCategory,
          postAppreciation:that.data.postAppreciation,
          postAnnotation:that.data.postAnnotation
        },
        method: 'Post',
        success(res) {
          if(res.data == true){
            that.setData({
              postTitle: '',
              postContent: ''
            })
            wx.showToast({
              title: '发布成功',
              icon: 'success',
              duration: 1000
            })
          }
          else{
            wx.showToast({
              title: '发布失败',
              icon: 'none',
              duration: 1000
            })
          }
        },
        fail(){
          wx.showToast({
            title: '发布失败',
            icon: 'none',
            duration: 1000
          })
        }
      })
    }
  },
  getTitle (e) {
    var that = this;
    that.setData({
      postTitle: e.detail.value
    })
  },
  getUpContent (e) {
    var that = this;
    that.setData({
      UpContent: e.detail.value
    })
  },
  getDownContent (e) {
    var that = this;
    that.setData({
      DownContent: e.detail.value
    })
  },
  getappreciation(e){
    var that=this;
    that.setData({
      postAppreciation:e.detail.value
    })
  },
  getannotation(e){
    var that=this;
    that.setData({
      postAnnotation:e.detail.value
    })
  }
})