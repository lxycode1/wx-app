import CheckAuth from "../../util/auth"
import request from "../../util/request"

// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: { 
     info:{},
     current:0,
     commentlist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // console.log("基于上个列表页传递过来的id,跟后端取当前页面id对应的详细信息",options)
    wx.setNavigationBarTitle({
      title: options.name,
    })
    this.getDetailInfo(options.id)
    this.getCommentInfo()
  },
  getDetailInfo(id){
    request({
      url:`/goods/${id}`
    }).then(res=>{
      console.log(res)
      this.setData({
        info:res
      })
    })
  },
  getCommentInfo(){
    request({
      url:'/comments'
    }).then(res=>{
      this.setData({
        commentlist:res
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  handleTap(evt){
    // console.log("1111")

    wx.previewImage({
      current:evt.currentTarget.dataset.current, // 当前显示图片的http链接
      urls: this.data.info.slides.map(item=>`http://localhost:3000${item}`) // 需要预览的图片http链接列表
    })
  },
  handleActive(evt){
    this.setData({
      current:evt.currentTarget.dataset.index
    })
  },
  handleAdd(){
     // console.log("add")

    /*
      1. 判断本地存储是否有手机号信息，如果有直接加入
      2. 没有手机号，判断是否有token信息，如果有，引导调整手机号绑定
      3 没有token授权信息， 我们引导用户授权页面
    */
    CheckAuth(() => {
      console.log("准备加入购物车")
      let {
        nickName
      } = wx.getStorageSync('token')
      let tel = wx.getStorageSync('tel')
      var goodId = this.data.info.id
      // console.log(nickName,tel,goodId)

      request({
        url: "/carts",
        data: {
          tel,
          goodId,
          nickName
        }
      }).then(res => {
        console.log(res)

        if (res.length === 0) {
          return request({
            url: "/carts",
            method: "post",
            data: {
              "username": nickName,
              "tel": tel,
              "goodId": goodId,
              "number": 1,
              "checked": false
            }
          })
        }else{
          return request({
            url: `/carts/${res[0].id}`,
            method: "put",
            data: {
              ...res[0],
              number:res[0].number+1
            }
          })
        }
      }).then(res=>{
        wx.showToast({
          title: '加入购物车成功',
        })
      })
    })
  },
  handleChange(){
    wx.switchTab({
      url: '/pages/shopcar/shopcar',
    })

  }
})