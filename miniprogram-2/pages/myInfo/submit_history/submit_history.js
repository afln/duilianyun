// pages/myInfo/submit_history/submit_history.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 'new',
    manuscriptId:'',
    newDocuments: [
      {
        manuscript:{
          manuscriptTitle:'桃花源记',
          updateTime:'2019-10-01',
          manuscriptId:'12345',
          status:'3'
        },
        competition:{
          competitionName:'第三次比赛'
        }
      },
      {
        manuscript:{
          manuscriptTitle:'桃花源记',
          updateTime:'2019-10-01',
          manuscriptId:'12345',
          status:'4'
        },
        competition:{
          competitionName:'第三次比赛'
        }
      },
      {
        manuscript:{
          manuscriptTitle:'桃花源记',
          updateTime:'2019-10-01',
          manuscriptId:'12345',
          status:'1'
        },
        competition:{
          competitionName:'第三次比赛'
        }
      }
    ],
    historyDocuments: [],
    serverUrl: ''
  },
  getOldSubmitHistory(){
    var that=this
    wx.request({
      url:  app.globalData.serverIp + '/post-server/competition/getReviewedManuscriptList',
      header: {
        token: app.globalData.token.token,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method:"GET",
      success(res){
        console.log(res)
        that.setData({
          historyDocuments:res.data
        })
      }
    })
  },
  getNewSubmitHistory(){
    var that=this
    wx.request({
      url:  app.globalData.serverIp + '/post-server/competition/getPendReviewManuscriptList',
      header: {
        token: app.globalData.token.token,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method:"GET",
      success(res){
        console.log(res)
        that.setData({
          newDocuments:res.data
        })
      }
    })
  },
  getSubmit(e){
    var manuscriptid=e.currentTarget.dataset.manuscriptid
    var that=this
    wx.request({
      url:  app.globalData.serverIp + '/post-server/competition/getManuscript',
      header: {
        token: app.globalData.token.token
      },
      method:"GET",
      data:{
        manuscriptid:manuscriptid
      },
      success(res){
        console.log(res)
        wx.navigateTo({
          url: '../../submit/submit?name='+res.data.manuscriptId.manuscript.manuscriptAuthorName+'&city='+res.data.manuscriptId.manuscript.manuscriptAuthorCity+'&address='+res.data.manuscriptId.manuscript.manuscriptAuthorAddress+'&postcode='+res.data.manuscriptId.manuscript.manuscriptAuthorPostcode+'&phone='+res.data.manuscriptId.manuscript.manuscriptAuthorPhone+'&email='+res.data.manuscriptId.manuscript.manuscriptAuthorEmail+'&title='+res.data.manuscriptId.manuscript.manuscriptTitle,
        })
      }
    })
  },
getNewcomponent(){
  
},
getHistorycomponent(){
  
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  var component=this.selectComponent("#iconClick")
  // this.getOldSubmitHistory()
  // this.getNewSubmitHistory()
  },
  _clickA(e){
    console.log("点击more")
  },
  _clickB(e){
    var manuscriptid=e.currentTarget.dataset.manuscriptid
    var that=this
    wx.request({
      url:  app.globalData.serverIp + '/post-server/competition/updateManuscript',
      header: {
        token: app.globalData.token.token
      },
      method:"GET",
      data:{
        manuscriptid:manuscriptid
      },
      success(res){
        console.log(res)
        wx.navigateTo({
          url: '../../submit/submit?name='+res.data.manuscriptId.manuscript.manuscriptAuthorName+'&city='+res.data.manuscriptId.manuscript.manuscriptAuthorCity+'&address='+res.data.manuscriptId.manuscript.manuscriptAuthorAddress+'&postcode='+res.data.manuscriptId.manuscript.manuscriptAuthorPostcode+'&phone='+res.data.manuscriptId.manuscript.manuscriptAuthorPhone+'&email='+res.data.manuscriptId.manuscript.manuscriptAuthorEmail+'&title='+res.data.manuscriptId.manuscript.manuscriptTitle,
        })
      }
    })
  },
  _clickC(e){
    var that=this
    var manuscriptid=e.currentTarget.dataset.manuscriptid
    console.log("点击删除")
      wx.showModal({
      title:'确定删除该条投稿吗？',
      success(res){
        if(res.cancel){
        return false;
      }
      if(res.confirm){
        wx.request({
          url:  app.globalData.serverIp + '/post-server/competition/deleteManuscript',
          header: {
            token: app.globalData.token.token
          },
          method:"GET",
          data:{
            manuscriptid:manuscriptid
          },
          success(res){
            console.log(res)
            if(res.data==true)
            {
              wx.showToast({
                title: '删除成功',
              })
            }
            else{
              wx.showToast({
                title: '删除失败',
              })
            }
          }
        })
      }
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

  }
})