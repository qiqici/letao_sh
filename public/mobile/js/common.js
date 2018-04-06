/**
 * Created by Jepson on 2018/4/2.
 */

mui('.mui-scroll-wrapper').scroll({
  // 不显示滚动条
  indicators: false
});

mui(".mui-slider").slider({
  interval: 1000
});

var tools = {
  getSearchObj: function() {
    // 获取地址栏参数, 封装一个对象
    var search = location.search;
    // 对 search 字符串解析
    search = decodeURI( search );
    // 去掉 ?  name=zs&age=18&desc=呵呵呵
    search = search.slice(1);
    
    // 将 search 切割成一个数组
    var arr = search.split("&");
    var obj = {};
    // 遍历数组
    arr.forEach(function( v ) {
      var key = v.split("=")[0];
      var value = v.split("=")[1];
      obj[key] = value;
    });
    
    return obj;
  },
  
  getSearch: function( key ) {
    return this.getSearchObj()[ key ];
  }
}