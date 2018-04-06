/**
 * Created by Jepson on 2018/3/31.
 */
$(function() {
  var currentPage = 1;
  var pageSize = 5;
  
  render();
  function render() {
    $.ajax({
      type: "GET",
      url: "/category/queryTopCategoryPaging",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function( data ) {
        console.log(data);
        var htmlStr = template( "firstTpl", data );
        $('.main_body tbody').html( htmlStr );
        $('#paginator').bootstrapPaginator({
          // 指定版本号
          bootstrapMajorVersion: 3,
          // 当前页
          currentPage: data.page,
          // 总页数
          totalPages: Math.ceil( data.total / data.size ),
          onPageClicked: function( a, b, c, page ) {
            currentPage = page;
            render();
          }
        })
      }
    })
  }
  
  // 显示添加模态框
  $('#addBtn').click(function() {
    $("#addFirstModal").modal();
  });
  
  // 表单校验
  $("#form").bootstrapValidator({
    // 小图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    // 校验字段
    fields: {
      categoryName: {
        validators: {
          notEmpty: {
            message: "请输入一级分类名称"
          }
        }
      }
    }
  });
  
  // 注册表单校验成功事件
  $("#form").on('success.form.bv', function( e ) {
    // 校验成功时, 阻止默认的表单提交, 进行 ajax 请求
    e.preventDefault();
    
    $.ajax({
      type: "POST",
      url: "/category/addTopCategory",
      data: $("#form").serialize(),
      success: function( data ) {
        console.log(data);
        if ( data.success ) {
          $("#addFirstModal").modal("hide");
          // 重置表单
          $('#form').data("bootstrapValidator").resetForm( true );
          
          // 重新渲染时, 渲染第一页比较好看
          currentPage = 1;
          render();
        }
      }
    })
  })
})