/**
 * Created by Jepson on 2018/3/31.
 */

$(function() {

  var currentPage = 1;
  var pageSize = 5;
  var imgArr = [];
  
  render();
  function render() {
    $.ajax({
      type: "get",
      url: "/product/queryProductDetailList",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function( data ) {
        console.log(data);
        var htmlStr = template( "productTpl", data );
        $('.main_body tbody').html( htmlStr );
        
        // 分页初始化
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: data.page,
          totalPages: Math.ceil( data.total / data.size ),
          onPageClicked: function( a, b, c, page ) {
            currentPage = page;
            render();
          },
          // 配置分页item的文本
          itemTexts: function( type, page, current ) {
            switch ( type ) {
              case "next":
                return "下一页";
              case "prev":
                return "上一页";
              case "last":
                return "尾页";
              case "first":
                return "首页";
              default:
                return page;
            }
          },
          // 配置提示框信息
          tooltipTitles: function( type, page, current ) {
            switch ( type ) {
              case "next":
                return "下一页";
              case "prev":
                return "上一页";
              case "last":
                return "尾页";
              case "first":
                return "首页";
              default:
                return "前往第" + page + "页";
            }
          },
          useBootstrapTooltip: true
        })
      }
    });
  };
  
  
  
  // 1. 点击按钮显示模态框
  $('#addBtn').click(function() {
    // 显示模态框
    $('#addProductModal').modal();
    
    // 请求二级分类
    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data: {
        page: 1,
        pageSize: 1000
      },
      success: function( data ) {
        console.log( data )
        var htmlStr = template( "dropdownTpl", data );
        $('#dropdownMenu').html( htmlStr );
      }
    });
  });
  
  // 2. 通过委托给 a 设置点击事件
  $('#dropdownMenu').on("click", "a", function() {
    // 获取 id
    var id = $(this).data("id");
    var selectText = $(this).text();
    // 设置内容
    $("#dropdownText").text( selectText );
    // 设置 id 给隐藏域
    $('[name="brandId"]').val(id);
    
    // 重置校验状态为 VALID
    // updateStatus( "字段", "状态", "规则" )
    $('#form').data("bootstrapValidator").updateStatus("brandId", "VALID")
  });
  
  // 3. 图片上传
  $('#fileUpload').fileupload({
    dataType: "json",
    done: function( e, data ) {
      console.log( data.result );
      // 由于上传图片接口, 需要 picName1 图片名称 picAddr1 图片地址...
      var imgObj = data.result;
      
      // 请求, 必须上传 3 张图片
      if ( imgArr.length >= 3 ) {
        // 删除最老的
        imgArr.shift();
        // 删除最老的图片, 找到最后一个 img 元素, 自杀
        $('#imgBox img:last-of-type').remove();
      }
      // 将上传的图片, 渲染到页面中
      $("#imgBox").prepend('<img src="' + imgObj.picAddr + '" width="100" height="100" alt="">')
      imgArr.push( imgObj );
      
      
      if ( imgArr.length === 3 ) {
        // 说明已经上传 3 张图片了
        $('#form').data("bootstrapValidator").updateStatus("picFlag", "VALID");
      }
    }
  });
  
  // 4. 表单校验
  $('#form').bootstrapValidator({
    // 重置排除项
    excluded: [],
  
    // 指定校验小图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    
    // 指定校验字段
    fields: {
      // 二级分类 id
      brandId: {
        validators: {
          notEmpty: {
            message: "请选择二级分类"
          }
        }
      },
      proName: {
        validators: {
          notEmpty: {
            message: "请输入商品名称"
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: "请输入商品描述"
          }
        }
      },
      // 库存, 只能是数字且不能以 0 开头
      num: {
        validators: {
          notEmpty: {
            message: "请输入商品库存"
          },
          // regexp 正则校验
          regexp: {
            // 正则规则
            regexp: /^[1-9]\d*$/,
            message: "请输入有效的商品库存"
          }
        }
      },
      // 尺码, 32-46
      size: {
        validators: {
          notEmpty: {
            message: "请输入商品尺码"
          },
          // regexp 正则校验
          regexp: {
            // 正则规则
            regexp: /^\d{2}-\d{2}$/,
            message: "请输入一个合法的尺码, 例如 32-44 "
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: "请输入商品原价"
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: "请输入商品现价"
          }
        }
      },
      // 校验是否上传满三张图片了
      picFlag: {
        validators: {
          notEmpty: {
            message: "请上传 3 张图片"
          }
        }
      }
    }
    
  });
  
  
  // 5. 验证通过, 阻止默认提交
  $("#form").on("success.form.bv", function( e ) {
    e.preventDefault();
    // 还需要 picName1 picAddr1 picName2 picAddr2 picName3 picAddr3

    var paramsStr = $('#form').serialize();
    paramsStr += "&picName1=" + imgArr[0].picName + "&picAddr1=" + imgArr[0].picAddr;
    paramsStr += "&picName2=" + imgArr[1].picName + "&picAddr2=" + imgArr[1].picAddr;
    paramsStr += "&picName3=" + imgArr[2].picName + "&picAddr3=" + imgArr[2].picAddr;
    
    $.ajax({
      type: "post",
      url: "/product/addProduct",
      data: paramsStr,
      success: function( data ) {
        console.log(data);
        if ( data.success ) {
          // 添加成功
          // 1. 关闭模态框
          $('#addProductModal').modal("hide");
          
          // 2. 重新渲染第一个页面
          currentPage = 1;
          render();
          
          // 3. 重置表单内容, 不仅校验重置, 内容也重置
          $("#form").data("bootstrapValidator").resetForm(true);
          // 4. 重置下拉框文本
          $('#dropdownText').text("请选择二级分类");
          // 5. 删除所有图片
          $('#imgBox img').remove();
        }
      }
    })
    
  })
  
})
