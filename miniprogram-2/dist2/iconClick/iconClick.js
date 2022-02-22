 
Component({
 
  /**
   * 页面的初始数据
   */
  data: {
      isPopping: false,//是否已经弹出
      animPlus: {},//旋转动画
      animCollect: {},//item位移,透明度
      animTranspond: {},//item位移,透明度
      animInput: {},//item位移,透明度
      iconA: "",
      iconB: "",
      iconC: ""
  },

  properties: {
      iconA: {
          type: String,
          value: ""
      },
      iconB: {
          type: String,
          value: ""
      },
      iconC: {
          type: String,
          value: ""
      }
  },
  attached: function(){
      let that = this;
      this.setData({
          iconA: that.properties.iconA,
          iconB: that.properties.iconB,
          iconC: that.properties.iconC
      })
  },

  methods: {

      _moreBtn: function () {
          this._plus();
      },

      //点击弹出
      _plus: function () {
          if (!this.data.isPopping) {
              this._popp();
              this.setData({
                  isPopping: true
              })
          }
          else {
              this._takeback();
              this.setData({
                  isPopping: false
              });
          }
      },
      _clickA: function (e) {
          this.triggerEvent("clickA");
          this._plus();
      },
      _clickB: function (e) {
          this.triggerEvent("clickB");
          this._plus();
      },
      _clickC: function (e) {
          this.triggerEvent("clickC");
          this._plus();
      },

      //弹出动画
      _popp: function () {
          //plus顺时针旋转
          let animationPlus = wx.createAnimation({
              duration: 500,
              timingFunction: 'ease'
          })
          let animationcollect = wx.createAnimation({
              duration: 500,
              timingFunction: 'ease'
          })
          let animationTranspond = wx.createAnimation({
              duration: 500,
              timingFunction: 'ease'
          })
          let animationInput = wx.createAnimation({
              duration: 500,
              timingFunction: 'ease'
          })
          animationPlus.rotateZ(180).step();
          animationcollect.translate(-25, 0).rotateZ(0).opacity(1).step();
          animationTranspond.translate(-15, 0).rotateZ(0).opacity(1).step();
          animationInput.translate(-5, 0).rotateZ(0).opacity(1).step();
          this.setData({
              animPlus: animationPlus.export(),
              animCollect: animationcollect.export(),
              animTranspond: animationTranspond.export(),
              animInput: animationInput.export(),
          })
      },
      //收回动画
      _takeback: function () {
          //plus逆时针旋转
          var animationPlus = wx.createAnimation({
              duration: 500,
              timingFunction: 'ease-out'
          })
          var animationcollect = wx.createAnimation({
              duration: 500,
              timingFunction: 'ease-out'
          })
          var animationTranspond = wx.createAnimation({
              duration: 500,
              timingFunction: 'ease-out'
          })
          var animationInput = wx.createAnimation({
              duration: 500,
              timingFunction: 'ease-out'
          })
          animationPlus.rotateZ(0).step();
          animationcollect.translate(0, 0).rotateZ(0).opacity(0).step();
          animationTranspond.translate(0, 0).rotateZ(0).opacity(0).step();
          animationInput.translate(0, 0).rotateZ(0).opacity(0).step();
          this.setData({
              animPlus: animationPlus.export(),
              animCollect: animationcollect.export(),
              animTranspond: animationTranspond.export(),
              animInput: animationInput.export(),
          })
      },
  }
})