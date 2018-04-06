/**
 * Created by Jepson on 2018/3/30.
 */

$(function() {

  // 发送 ajax 请求, 获取用户数据, 渲染到页面中
  var currentPage = 1;
  var pageSize = 5;
  
  // 页面一加载, 就渲染一次
  render();
  function render() {
    $.ajax({
      type: "get",
      url: "/user/queryUser",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function ( data ) {
        console.log( data );
        // template( "模板id", "数据对象" );
        // 在模板中可以直接使用数据对象中的所有属性
        var htmlStr = template("userTpl", data);
        $('.main_body tbody').html( htmlStr );
      
        // 渲染分页
        $('#paginator').bootstrapPaginator({
          // bootstrap使用的版本
          bootstrapMajorVersion: 3,
          currentPage: data.page, //当前页
          totalPages: Math.ceil( data.total / data.size ), //总页数
          onPageClicked:function(a, b, c, page){
            currentPage = page;
            render();
          }
        })
      }
    });
  }
  
  // 启用禁用功能
  $('.main_body tbody').on("click", ".btn", function() {
    // 1 表示用户启用  0 表示用户禁用
    var isDelete = $(this).hasClass("btn-success") ? 1 : 0;
    var userid = $(this).parent().data("id");
  
    // 显示模态框
    $('#userModal').modal();
    
    // 防止重复注册, 可以先解绑再注册
    $('#submitBtn').off().on("click", function() {
      $.ajax({
        type: "post",
        url: "/user/updateUser",
        data: {
          id: userid,
          isDelete: isDelete
        },
        success: function( data ) {
          if ( data.success ) {
            // 关闭模态框
            $('#userModal').modal("hide");
            // 重新渲染页面
            render();
          }
        }
      })
    })
  });
  
});
