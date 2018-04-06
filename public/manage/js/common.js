/**
 * Created by Jepson on 2018/3/29.
 */

// 禁用小环环
NProgress.configure({ showSpinner: false });

// ajax 开始
$( document ).ajaxStart(function() {
  // 进度条加载效果
  NProgress.start();
});

// ajax 结束
$( document ).ajaxStop( function() {
  // 模拟网络延迟
  setTimeout(function() {
    // 进度条关闭
    NProgress.done();
  }, 500);
});

// 二级分类显示隐藏效果
$('.aside_category').click(function() {
  $(this).next().stop().slideToggle();
});

// 菜单栏隐藏效果
$('.icon_menu').click(function() {
  $('.aside').toggleClass("menuchange");
  $(".main").toggleClass("menuchange");
});

// 显示退出模态框
$(".icon_logout").click(function() {
  $('#logoutModal').modal();
});

// 退出按钮退出功能
$('#logoutBtn').click(function() {
  // 发送退出 ajax 请求
  $.ajax({
    type: "get",
    url: "/employee/employeeLogout",
    success: function( data ) {
      console.log( data )
      if ( data.success ) {
        // 退出成功
        location.href = "login.html";
      }
    }
  })
});


// 登录页面不用判断
if ( location.href.indexOf("login.html") == -1 ) {
  // 查看用户是否登录
  $.ajax({
    type: "get",
    url: "/employee/checkRootLogin",
    success: function( data ) {
      if ( data.success ) {
        // 登录了, 啥也不用干
      }
      if ( data.error === 400 ) {
        // 没登陆
        location.href = "login.html";
      }
    }
  });
}
