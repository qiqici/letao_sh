/**
 * Created by Jepson on 2018/4/3.
 */

$(function() {
  
  // 1. 获取地址栏参数, 设置到文本框 search_input 中
  var key = tools.getSearch("key");
  $(".search_input").val(key);
  
  
  // 2. 进入页面渲染
  render();
  
  // 3. 点击按钮，需要渲染一次
  $(".search_btn").on("click", function () {
    render();
  });
  
  //4. 点击排序的时候，
  $(".sort [data-type]").on("click", function () {
    
    var $this = $(this);
    if ($this.hasClass("current")) {
      //如果有current这个类，换箭头
      $this.find("i").toggleClass("fa-angle-down").toggleClass("fa-angle-up");
    } else {
      //如果没有current这个类，移除别人，添加自己, 让所有箭头都向下
      $this.addClass("current").siblings().removeClass("current");
      $(".sort i").removeClass("fa-angle-up").addClass("fa-angle-down");
    }
    render();
  })
  
  
  // 需要发送 ajax 请求, 获取后台的数据, 把数据渲染到页面中
  function render() {
    $(".product").html('<div class="loading"></div>');
    
    // 这个就是参数对象
    var params = {};
    params.page = 1;
    params.pageSize = 100;
    // 文本框的值是啥, 就发送什么
    params.proName = $(".search_input").val().trim();
  
    //对于price和num， 如果价格被点了，需要发送price  如果库存被点了，需要发送num, 如果都没被点，都不发送
    var $current = $(".sort a.current");
    if ($current.length > 0) {
      //说明有一个被点击了，说明需要排序, 需要给param设置参数，可能是price，也可能是num,需要获取到$current这个元素是price或者type
      var type = $current.data("type");//price num
      var value = $current.find("i").hasClass("fa-angle-down") ? 2 : 1;
      params[type] = value;
    }
    
    $.ajax({
      type: "get",
      url: "/product/queryProduct",
      data: params,
      success: function( data ) {
        
        setTimeout(function () {
          $(".product").html(template("tpl", data) );
        }, 1000);
        
      }
    })
  }
})