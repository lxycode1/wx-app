import CheckAuth from "../../util/auth"

// pages/center/center.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    CheckAuth(()=>{
      // console.log("显示我的")
      this.setData({
        userInfo:wx.getStorageSync('token')
      })
    })
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
  handleTap(){
    //打开摄像头/相册
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success : (res) => {
        console.log(res,1111)
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        // console.log(tempFilePaths)

        this.setData({
          userInfo:{
            ...this.data.userInfo,
            avatarUrl:tempFilePaths[0]
          }
        })

        wx.setStorageSync('token', {
          ...wx.getStorageSync('token'),
          avatarUrl:tempFilePaths[0]
        })
      }
    })
    
  }
})