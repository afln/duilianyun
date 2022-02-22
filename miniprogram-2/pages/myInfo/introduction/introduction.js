// pages/myInfo/introduction/introduction.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      introduction:{
        userNickname:'',
        userId:'',
        userName:'',
        userIntroduction:'',
        userPhone:'',
        userEmail:'',
        userPortrait:'',
        modifyCount:0
      }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  var that=this
  var app = getApp();
   wx.request({
     url: app.globalData.serverIp + '/user-server/user/myInfo',
     header:{
      token: app.globalData.token.token
    },
    method:"GET",
    success(res){
      that.setData({
        introduction:res.data
      })
      console.log(res)
    },
    fail(err){
      console.log(err)
    }
   })
  },
  namechange(){
    wx.showModal({
      title: '警告',
      content:'姓名只允许改变一次，请仔细核对并且输入正确的姓名'
    })
  },
  change_value(e){
    var change=e.target.dataset.sum
    var value=e.detail.value
    var that=this
    var introduction=this.data.introduction
    let k=0
    //console.log(e)
    if (change==="userName"&&introduction.modifyCount==0&&value!=introduction.userName){
      that.setData({
        ['introduction.userName']:value,
        ['introduction.modifyCount']:1
      })
      k=1
    }
    else if(change=="userPhone"&&value!=introduction.userPhone){
      that.setData({
        ['introduction.userPhone']:value
      })
      k=1
    }
    else if(change=="userEmail"&&value!=introduction.userEmail){
      that.setData({
        ['introduction.userEmail']:value
      })
      k=1
    }
    else if(change=="userIntroduction"&&value!=introduction.userIntroduction){
      that.setData({
        ['introduction.userIntroduction']:value
      })
      k=1
    }
    if(k==1){
    wx.showToast({
      title: '数据更改成功',
    })
    that.submit_change();
    console.log(that.data.introduction)
  }
  },
  submit_change(){
    var that=this
    wx.request({
      url: app.globalData.serverIp + '/user-server/user/setMyInfo',
      header:{
        token: app.globalData.token.token
      },
      method:"POST",
      data:{
        User:that.data.introduction
      },
      success(res){
        that.setData({
          introduction:res.data
        })
        console.log(that.data.introduction)
      },
      fail(err){
        console.log(err)
      }
    })
  },
  // get_introduction:function(){
  //   let that=this
  //   wx.getUserInfo({
  //     success:function(res){
  //       console.log(res)
  //       let form={
  //         nickName:res.userInfo.nickName,
  //         avatarUrl:res.userInfo.avatarUrl
  //       }
  //       that.setData({
  //         ['introduction.nickName']:form.nickName,
  //         ['introduction.avatarUrl']:form.avatarUrl
  //       })
  //     }
  //   })
  // },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if(this.data.introduction.modifyCount==0)
    {
    wx.showModal({
      title: '警告',
      content:'姓名只允许改变一次，请仔细核对并且输入正确的姓名'
    })
  }
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

  }
})