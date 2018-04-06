/**
 * Created by Jepson on 2018/3/29.
 */

$(function() {
  /*
   * 1. 校验表单
   * 要求:
   *   1. 用户名不能为空, 且长度 2-6 位
   *   2. 密码不能为空, 密码的长度为 6-12 位
   * */
  $("#form").bootstrapValidator({
    
    // 配置校验字段
    fields: {
      // 校验用户名
      username: {
        // 校验规则
        validators: {
          
          // 非空校验
          notEmpty: {
            message: "用户名不能为空"
          },
          // 长度校验
          stringLength: {
            min: 2,
            max: 6,
            message: "用户名长度必须是2-6位"
          },
          // callback 专门用于提示
          callback: {
            message: "用户名不存在"
          }
        }
      },
      // 校验密码
      password: {
        validators: {
          
          notEmpty: {
            message: "用户名不能为空"
          },
          stringLength: {
            min: 6,
            max: 12,
            message: "密码长度必须是6-12位"
          },
          // callback 专门用于提示
          callback: {
            message: "密码错误"
          }
          
        }
      }
    },
    
    // 配置小图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    }
    
  });
  
  // 2. 给表单注册一个校验成功的事件, 成功的时候阻止表单的默认提交
  //    使用 ajax 进行提交
  $("#form").on("success.form.bv", function( e ) {
    // 阻止浏览器默认行为
    e.preventDefault();
    
    // 发送 ajax 请求登录
    // dataType: "json"
    // 如果没设置 jQuery 会自动识别  text/html, text/json
    $.ajax({
      type: "post",
      url: "/employee/employeeLogin",
      data: $("#form").serialize(),
      dataType: "json",
      success: function( data ) {
        // console.log(data);
        if ( data.error === 1000 ) {
          // alert( "用户名错误" );
          // updateStatus( 校验字段, 状态, 哪个规则的message )
          $("#form").data("bootstrapValidator").updateStatus("username", "INVALID", "callback");
        }
        
        if ( data.error === 1001 ) {
          // alert( "密码错误" );
          $("#form").data("bootstrapValidator").updateStatus("password", "INVALID", "callback");
        }
        
        if ( data.success ) {
          location.href="index.html";
        }
      }
    })
    
  })
  
  // 3. 重置表单功能
  $("[type='reset']").on("click", function( e ) {
    // resetForm 传 true 表示不仅验证重置, 表单内容也重置
    $("#form").data('bootstrapValidator').resetForm(true);
  })
})
