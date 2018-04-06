/**
 * Created by Jepson on 2018/4/3.
 */
$(function () {
  
  //需要发送ajax请求，获取到用户的信息
  $.ajax({
    type:"get",
    url:"/user/queryUserMessage",
    success:function (data) {
      
      if(data.error=== 400){
        location.href = "login.html";
      }
      
      //直接渲染用户信息
      console.log(data);
      $(".userinfo").html( template("tpl", data) );
      
      
    }
  });
  
  
  
  //退出功能
  $(".btn_logout").on("click", function () {
    
    $.ajax({
      type:"get",
      url:"/user/logout",
      success:function (data) {
        if(data.success) {
          location.href = "login.html";
        }
      }
    });
    
  })
});
