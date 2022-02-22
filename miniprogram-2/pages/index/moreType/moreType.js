// pages/index/moreType/moreType.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollTop: '5%',  //用作跳转后右侧视图回到顶部
    scrollLeft:'15%',
    coupletTypes: [], //左侧导航栏内容
    coupletTypesItems:[
      {
        coupleType:"山林类"
      },
      {
        coupleType:"山水类"
      },
      {
        coupleType:"石头类"
      },
      {
        coupleType:"树木类"
      },
      {
        coupleType:"区块链"
      },
      {
        coupleType:"比特币"
      }
    ],//顶侧导航栏内容
    currentTypeId: '山水类',  //当前查看的类别
    currentTypeIdItem:'',//当前子类的类别,
    currentTypeName:'',
    couplets: [], //右侧内容
    token: null,
    pageStart: 0,
    show: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var app = getApp();
    //获取楹联类型
    wx.request({
      url: app.globalData.serverIp + '/couplet-server/couplet/parType',
      header: {
        token: app.globalData.token.token,
      },
      method: 'GET',
      success(res) {
        console.log("父类请求成功")
        that.setData({
          coupletTypes : res.data,
          currentTypeId: options.typeid,
          currentTypeName:options.name
        })
        if (that.data.currentTypeId == '') {
          that.setData({
            currentTypeId: that.data.coupletTypes[0].coupletTypeId,
            currentTypeName:that.data.coupletTypes[0].coupleType
          });
        }
        that.getItemCoupletByType();
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
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getItemCoupletByType(){
    console.log(this.data.currentTypeName)
    var that = this;
    var app = getApp();
    wx.request({
      url: app.globalData.serverIp + '/couplet-server/couplet/parKidsType/'+that.data.currentTypeName,
      header:{
        token: app.globalData.token.token
      },
      method:'GET',
      success(res){
        console.log("子类请求成功")
        that.setData({
          coupletTypesItems:res.data,
          currentTypeIdItem:that.data.coupletTypesItems[0].coupletType
        })
        console.log(that.data.coupletTypesItems)
        that.getCoupletByType()
      },
      fail(err){
        console.log(err)
      }
    })
  },
  getCoupletByType () {
    var that = this;
    var app = getApp();
    that.setData({
      show: true
    });
    wx.request({
      url: app.globalData.serverIp + '/couplet-server/couplet/parKidsType/byType/' + that.data.currentTypeIdItem,
      header:{
        token: app.globalData.token.token
      },
      data: {
        pageStart : that.data.pageStart
      },
      success(res){
        that.setData({
          couplets: that.data.couplets.concat(res.data),
          pageStart: that.data.couplets.length + res.data.length + 1
        })
        that.setData({
          show: false
        });
      }
    })
  },
  coupletDetail(e) {
    var coupletId = e.currentTarget.dataset.coupletid;
    wx.navigateTo({
      url: '../couplet/coupletDetail?coupletId=' + coupletId,
    })
  },
  navbarTap: function (e) {
    this.setData({
      couplets: []
    });
    var that = this;
    this.setData({
      currentTypeId: e.currentTarget.dataset.currenttypeid,   //按钮CSS变化
      scrollTop: 0,   //切换导航后，控制右侧滚动视图回到顶部
    });
    that.getItemCoupletByType();
  },
  leftbarTap:function(e){
    var that = this;
    this.setData({
      currentTypeIdItem: e.currentTarget.dataset.currenttypeid,   //按钮CSS变化
      scrollTop: 0,   //切换导航后，控制右侧滚动视图回到顶部
    });
    that.getCoupletByType();
  }
})