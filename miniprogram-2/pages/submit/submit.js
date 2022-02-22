// pages/submit/submit.js
const app = getApp();
var util=require('../../utils/util');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form:{
      name:'',
      city:'',
      address:'',
      postcode:'',
      phone:0,
      email:'',
      title:'',
      content:'',
      index:-1,
      type:-1
    },
    introduction:{    },
    array:[],
    TypeArray:[],
    selectNull:null,
    TypeSelect:null,
    WhatDo:false
  },
  checkEmail(email) {
    let str = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
    if (str.test(email)) {
    return true
    } else {
    wx.showToast({
    title: '请填写正确的邮箱号',
    icon: 'none',
    duration: 1000
    })
    return false 
    }
    },
    checkPhoneNum: function (phoneNumber) {
      let str = /^1\d{10}$/
      if (str.test(phoneNumber)) {
      return true
      } else {
      wx.showToast({
        title: '请填写正确的手机号',
        icon: 'none',
        duration: 1000
      })
      return false
       }
      },
    select_city(e){
console.log(e)
wx.navigateTo({
  url: '../switchcity/switchcity',
})
    },
    getTime(data){
      const year=data.getFullYear()
      const month=data.getMonth()+1
      const day=data.getDate()
      return year+'-'+month+'-'+day
    },
  submit(e){
    let form=e.detail.value;
    let array=this.data.array;
    let TypeArray=this.data.TypeArray
    let time=this.getTime(new Date());
    if(this.checkPhoneNum(form.phone)&&(this.checkEmail(form.email)||form.email==''))
    {
    for(let j in form)
    {
      if(form[j]==""&&j=="name")
      {
        wx.showToast({
          title: '姓名不能为空',
          icon: 'none',
          duration: 1000
        })
      }
      else if(form[j]==""&&j=="city")
      {
        wx.showToast({
          title: '城市不能为空',
          icon: 'none',
          duration: 1000
        })
      }
      else if(form[j]==""&&j=="title")
      {
        wx.showToast({
          title: '文章标题不能为空',
          icon: 'none',
          duration: 1000
        })
      }
      else if(form[j]==-1&&j=="index")
      {
        wx.showToast({
          title: '投稿栏目不能为空',
          icon: 'none',
          duration: 1000
        })
      }
      else if(form[j]==""&&j=="content")
      {
        wx.showToast({
          title: '文章内容不能为空',
          icon: 'none',
          duration: 1000
        })
      }
    }
    wx.request({
      url:  app.globalData.serverIp + '/post-server/competition/addManuscript',
      header: {
        token: app.globalData.token.token
      },
      method:"POST",
      data:{
        ManuscriptDTO:{
          manuscript:{
            competitionId:array[form.index],
            manuscriptTitle:form.title,
            manuscriptContent:form.content,
            manuscriptUserId:that.data.introduce.userId,
            manuscriptAuthorName:that.data.introduce.userName,
            manuscriptAuthorCity:form.city,
            manuscriptAuthorAddress:form.address,
            manuscriptAuthorPostcode:form.postcode,
            manuscriptAuthorPhone:form.phone,
            createTime:time,
            updateTime:time
          },
          competition:TypeArray[form.type],
        }
      },
      success(res){
        console.log(res)
        if(res.data==true)
        {
          wx.showToast({
            title: '提交成功',
          })
        }
        else{
          wx.showToast({
            title: '提交失败',
          })
        }
      }
    })
    console.log(form)
  }
  },
  Update(e){
    let form=e.detail.value;
    let array=this.data.array;
    let TypeArray=this.data.TypeArray
    let time=this.getTime(new Date());
    if(this.checkPhoneNum(form.phone)&&(this.checkEmail(form.email)||form.email==''))
    {
    for(let j in form)
    {
      if(form[j]==""&&j=="name")
      {
        wx.showToast({
          title: '姓名不能为空',
          icon: 'none',
          duration: 1000
        })
      }
      else if(form[j]==""&&j=="city")
      {
        wx.showToast({
          title: '城市不能为空',
          icon: 'none',
          duration: 1000
        })
      }
      else if(form[j]==""&&j=="title")
      {
        wx.showToast({
          title: '文章标题不能为空',
          icon: 'none',
          duration: 1000
        })
      }
      else if(form[j]==-1&&j=="index")
      {
        wx.showToast({
          title: '投稿栏目不能为空',
          icon: 'none',
          duration: 1000
        })
      }
      else if(form[j]==""&&j=="content")
      {
        wx.showToast({
          title: '文章内容不能为空',
          icon: 'none',
          duration: 1000
        })
      }
    }
    wx.request({
      url:  app.globalData.serverIp + '/post-server/competition/updateManuscript',
      header: {
        token: app.globalData.token.token
      },
      method:"POST",
      data:{
        ManuscriptDTO:{
          manuscript:{
            competitionId:array[form.index],
            manuscriptTitle:form.title,
            manuscriptContent:form.content,
            manuscriptUserId:that.data.introduce.userId,
            manuscriptAuthorName:that.data.introduce.userName,
            manuscriptAuthorCity:form.city,
            manuscriptAuthorAddress:form.address,
            manuscriptAuthorPostcode:form.postcode,
            manuscriptAuthorPhone:form.phone,
            createTime:time,
            updateTime:time
          },
          competition:TypeArray[form.type]
        }
      },
      success(res){
        console.log(res)
        if(res.data==true)
        {
          wx.showToast({
            title: '提交成功',
          })
        }
        else{
          wx.showToast({
            title: '提交失败',
          })
        }
      }
    })
    console.log(form)
  }
  },
  reset(e){
    this.setData({
      form:{
        name:'',
        city:'',
        address:'',
        postcode:'',
        phone:'',
        email:'',
        title:'',
        content:'',
        index:0,
        type:0
      },
      selectNull:null
    })
    console.log(e)
  },
  picker_change(e){
    this.setData({
    selectNull:'0',
    index:e.detail.value
    })
  },
  type_change(e){
    this.setData({
    TypeSelect:'0',
    type:e.detail.value
    })
  },
  textarea_cin(e){
// console.log(e);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  getMatchArray(){
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
        that.setData({
          TypeArray : res.data,
        })
      }
    });
  },
  getTypeArray(){
    var that = this;
    var app = getApp();
    //获取楹联类型
    wx.request({
      url: app.globalData.serverIp + '/post-server/competition/getCompetitionNow',
      header: {
        token: app.globalData.token.token,
      },
      method: 'GET',
      success(res) {
        console.log(res)
        that.setData({
          array : res.data,
        })
      }
    });
  },
  onLoad: function (options) {
    var that=this
    var app = getApp();
    this.getMatchArray();
    this.getTypeArray();
     wx.request({
       url: app.globalData.serverIp + '/user-server/user/myInfo',
       header:{
        token: app.globalData.token.token
      },
      method:"GET",
      success(res){
        this.setData({
          introduce:res.data,
          ['form.name']:res.data.userName,
        })
      }
     })
    if(util.checkLogin()){
      util.login();
    }else{
      if(options.name!='')
      {
        that.setData({
          ['form.name']:options.name,
          ['form.city']:options.city,
          ['form.address']:options.address,
          ['form.postcode']:options.postcode,
          ['form.phone']:options.phone,
          ['form.email']:options.email,
          ['form.title']:options.title,
          WhatDo:true
      })
      }
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

  }
})