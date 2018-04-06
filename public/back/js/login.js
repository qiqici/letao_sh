/**
 * Created by 10764 on 2018/4/6.
 */
//防止全局变量污染，等待dom渲染再执行
$(function(){
  //1、进行表单校验
  //    校验要求：(1)用户名不能为空
  //             (2)密码不能为空，且必须是6-12位
  $("#form").bootstrapValidator({
    //配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

   //对字段进行校验
    fields:{
      username:{
        //校验的规则
        validators:{
          //非空校验
          notEmpty:{
            //为空时显示的提示信息
            message:"用户名不能为空"
          },
          stringLength:{
            min:2,
            max:6,
            message:"用户名长度必须是2-6位"
          },
          callback:{
            message:"用户名不存在"
          }
        }
      },
      password:{
        validators:{
          notEmpty:{
            message:"密码不能为空"
          },
          //长度校验
          stringLength:{
            max:12,
            min:6,
            message:"密码长度必须是6-12位"
          },
          //专门用于配置回调提示信息的校验规则
          callback:{
            message:"密码错误"
          }
        }
      }
    }
  });


  //2、进行登陆请求
  //    通过ajax进行登陆请求

  //表单校验插件有一个特点，在表单提交的时候进行校验
  //如果校验成功，继续提交，需要阻止这次默认的提交，通过ajax进行请求提交
  //如果校验失败，阻止默认的提交

  $("#form").on("success.form.bv",function(e){
    //阻止默认的表单提交
    e.preventDefault();
    //通过ajax进行登陆请求
    $.ajax({
      type:'POST',
      data:$('#form').serialize(),
      dateType:'json',
      url:'/employee/employeeLogin',
      success:function(info){
        console.log(info);
        if(info.success){
          //alert("登陆成功");
          location.href="index.html";
        }
        if(info.error===1000){
          //alert("用户名不存在");
          $("#form").data('bootstrapValidator').updateStatus("username","INVALID","callback");
        }
        if(info.error===1001){
          //alert("密码错误");
          //参数1：字段名称
          //参数2：校验状态
          //参数3：校验规则,可以设置提示文本
          $('#form').data('bootstrapValidator').updateStatus("password","INVALID","callback");
        }
      }
    })
  })


  //3、重置功能实现
  $('[type="reset"]').click(function(){
    //console.log(1111);
    $("#form").data('bootstrapValidator').resetForm();
  })

});