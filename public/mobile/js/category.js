/**
 * Created by Jepson on 2018/4/2.
 */
$(function() {
  // 渲染一级分类
  $.ajax({
    type: "get",
    url: "/category/queryTopCategory",
    success: function( data ) {
      console.log(data);
      $('#ul_left').html( template( "tpl_left", data ) );
      renderById(data.rows[0].id)
    }
  });
  
  // 左侧的事件委托
  $('#ul_left').on("click", "li", function() {
    $(this).addClass("current").siblings().removeClass("current");
    renderById($(this).data("id"));
  });
  
  function renderById( id ) {
    $.ajax({
      type: "get",
      url: "/category/querySecondCategory",
      data: { id : id },
      success: function( data ) {
        console.log(data);
        $('#ul_right').html( template( "tpl_right", data ) );
      }
    })
  }
})