//index.js
//获取应用实例
const app = getApp();
var util=require('../../utils/util');

Page({
  data: {
    couplets:[],
    oneCouplets:[],
    isshow:false,
    a:"b",
    b:"search_container",
    c:"/static/images/index/more.png",
    current:[],
    kda:-1,
    search:{
      keywords:'',
      range:'',
      author:'',
      UpWords:'',
      DownWords:'',
      dynasty:''
    },
    search_range:[
      {
        id:0,
        value:"全联",
        checked:false
      },
      {
        id:1,
        value:"联题",
        checked:false
      },
      {
        id:2,
        value:"联句",
        checked:false
      }
    ],
    coupletPageStart: 0,
    logos: [{
      image: "/static/images/index/ShanShui.png",
      coupletTypeId: "36c4cd60f0534f01bafd1f6ab322a4a9",
      title: "山水"
    },
    {
      image: "/static/images/index/YuanLing.png",
      coupletTypeId: "3a1df64cd736451c82eda5f155a89a28",
      title: "园林"
    },
    {
      image: "/static/images/index/GuJian.png",
      coupletTypeId: "44bf97cd9dd34ee1b0b3ca260e57229c",
      title: "古建"
    },
    {
      image: "/static/images/index/ZongJiao.png",
      coupletTypeId: "336c76387dbc47a18bee53bde2d0a3f1",
      title: "宗教"
    },
    {
      image: "/static/images/index/classify_more.png",
      coupletTypeId: "47c4e08eaa0c4667be63a89ca42d88af",
      title: "更多"
    }
    // ,
    // {
    //   image: "/static/images/index/HangYe.png",
    //   coupletTypeId: "47e28b03c42245a599fd50669e056a4d",
    //   title: "行业"
    // },
    // {
    //   image: "/static/images/index/TiZeng.png",
    //   coupletTypeId: "6ab7d32d5d4a4ad6bef636835945c67e",
    //   title: "题赠"
    // },
    // {
    //   image: "/static/images/index/XiQing.png",
    //   coupletTypeId: "",
    //   title: "喜庆"
    // },
    // {
    //   image: "/static/images/index/AiWan.png",
    //   coupletTypeId: "",
    //   title: "哀婉"
    // },
    // {
    //   image: "/static/images/index/ZuPu.png",
    //   coupletTypeId: "",
    //   title: "族谱"
    // },
    // {
    //   image: "/static/images/index/QiaoDui.png",
    //   coupletTypeId: "",
    //   title: "巧对"
    // },
    // {
    //   image: "/static/images/index/WenYi.png",
    //   coupletTypeId: "",
    //   title: "文艺"
    // },
    // {
    //   image: "/static/images/index/JiJu.png",
    //   coupletTypeId: "",
    //   title: "集句"
    // },
    // {
    //   image: "/static/images/index/JiuZai.png",
    //   coupletTypeId: "",
    //   title: "救灾"
    // },
    // {
    //   image: "/static/images/index/HuoJiang.png",
    //   coupletTypeId: "",
    //   title: "获奖"
    // }
    ],
    token: '',
    show: false,
    loading: true,
    searchValue: ''
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    wx.stopPullDownRefresh();
    var app = getApp();
    var that = this;
    that.setData({
      token:app.globalData.token
    })
    that.getCouplets();
    that.getoneday();
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
            current: temp,
            search:{
              dynasty: res.data[0].postTypeId
            }
          })
        }
      });
    }
  },
  onPullDownRefresh: function () {
    var that = this;
    that.setData({
      coupletPageStart: 0,
      couplets: []
    })
    that.onLoad();
  },
  onReachBottom: function () {
    var that = this;
    that.setData({
      show: true
    });
    var that = this;
    that.getCouplets();
  },
  form_change(e){
    let k=this.data.isshow
  this.setData({
  isshow:!k
})
  },
  getCouplets () {
    var that = this;
    wx.request({
      url: app.globalData.serverIp + '/couplet-server/couplet/getNewCouplet',
      header: {
        token: that.data.token.token,
      },
      data: {
        pageStart: that.data.coupletPageStart
      },
      method: 'GET',
      success(res) {
        that.setData({
          couplets: res.data,
          coupletPageStart: that.data.couplets.length + res.data.length
        })
        console.log(res)
        that.setData({
          show: false,
          loading: false
        });
      },
      fail() {
        wx.showToast({
          title: '获取失败',
          icon: 'none',
          duration: 1000,
          mask: true
        })
      }
    })
  },
  coupletDetail (e) {
    if(util.checkLogin()){
        util.login();
    }else{
      var coupletId = e.currentTarget.dataset.coupletid;
      wx.navigateTo({
        url: 'couplet/coupletDetail?coupletId=' + coupletId,
      })
    }
  },
  moreType (e) {
    if(util.checkLogin()){
      util.login();
    }else{
      var coupletTypeId = e.currentTarget.dataset.typeid;
      var name=e.currentTarget.dataset.name
      wx.navigateTo({
        url: 'moreType/moreType?coupletTypeId=' + coupletTypeId+'&name='+name,
      })
    }
  },
  match (e) {
    if(util.checkLogin()){
      util.login();
    }else{
      // var coupletTypeId = e.currentTarget.dataset.typeid;
      wx.navigateTo({
        url: '../submit/submit',
      })
    }
  },
  change_dynasty:function(options){
    var that = this;
    that.setData({
      ['search.dynasty']: options.detail
    })
  },
  bindmore:function(e){
    let s1=this.data.a;
    let s2=this.data.b;
    let s3=this.data.c;
    this.setData({
      a:s2,
      b:s1
    })
    if(s3=="/static/images/index/more.png")
    {
      this.setData({
        c:"/static/images/index/more1.png"
      })
    }
    else{
      this.setData({
        c:"/static/images/index/more.png"
      })
    }
  },
  search() {
      if(util.checkLogin()){
        util.login();
      }else{
        var that = this;
        wx.navigateTo({
          url: 'search/search?searchValue=' + that.data.searchValue,
        })
        that.setData({
          searchValue: ''
        })
      }
  },
  change(e) {
    var that = this;
    that.setData({
      searchValue: e.detail
    })
  },
  select_range(e){
    // console.log(e)
    let anwser=e.detail.value
    this.setData({
      ['search.range']:anwser
    })
  },
  change_value(e){
    let num=e.currentTarget.dataset.num
    if(this.data.kda!=num)
    {
      this.setData({
      kda:num
    })
    }
    else{
      this.setData({
        kda:-1,
        ['search.range']:""
      })
    }
  },
  getoneday(){
    var that=this
    wx.request({
      url: app.globalData.serverIp + '/couplet-server/couplet/getRecommendCouplet',
      method:'GET',
      header: {
        token: app.globalData.token.token,
      },
      success(res){
        console.log("没日")
        console.log(res)
        that.setData({
          oneCouplets:res.data
        })
      }
    })
  }
})
