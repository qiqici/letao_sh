/**
 * Created by Jepson on 2018/4/2.
 */

$(function() {

  // 用户获取 search_history 的值, 并且转换成数组, 方便操作
  function getHistory() {
    // 得到 json 字符串
    var history = localStorage.getItem("search_history") || "[]";
    // 将 json 字符串转换成真正的数组
    var arr = JSON.parse( history );
    return arr;
  }
  
  // 1. 渲染搜索列表
  render();
  
  function render() {
    var arr = getHistory();
    $(".history").html( template("tpl", { arr: arr } ) );
  }
  
  
  // 2. 清空搜索列表
  $('.history').on("click", ".btn_empty", function() {
    mui.confirm("你是否要清空所有的历史记录?", "温馨提示", ["取消", "确定"], function( e ) {
      if ( e.index === 1 ) {
        localStorage.removeItem("search_history");
        render();
      }
    })
  });
  
  // 3. 删除搜索列表
  $('.history').on("click", ".btn_delete", function() {
    var index = $(this).data("index");
    var arr = getHistory();
    // splice( 位置, 删除几个, 添加的项1, 添加的项2 )
    arr.splice( index, 1 );
    // 修改完数组需要进行持久化
    localStorage.setItem( "search_history", JSON.stringify( arr ) );
    render();
  });
  
  // 4. 添加搜索列表
  $('.search_btn').click(function() {
    var key = $('.search_input').val().trim();
    if ( key === "" ) {
      mui.toast("请输入搜索关键字");
      return false;
    }
    // 获取本地存储中的数组
    var arr = getHistory();
    // (1) 如果有重复的, 需要删除掉旧的
    var index = arr.indexOf( key );
    if ( index != -1 ) { // 说明 key 在数组中存在
      arr.splice(index, 1);
    }
    
    // (2) 如果长度超过了 10, 删除最老的一项
    if ( arr.length >= 10 ) {
      arr.pop();
    }
    
    arr.unshift(key);
    localStorage.setItem("search_history", JSON.stringify( arr ) );
    render();
    
    // 清空 input 文本框
    $('.search_input').val("");
    
    // 跳转到 searchList 页面
    location.href = "searchList.html?key=" + key;
  })

})