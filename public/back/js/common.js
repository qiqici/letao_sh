/**
 * Created by 10764 on 2018/4/6.
 */

//配置禁用小圆环
NProgress.configure({ showSpinner: false });

////开启进度条
//NProgress.start();
//
//setTimeout(function(){
//  //关闭进度条
//  NProgress.done();
//},500)

//ajaxStart所有的ajax开始调用
$(document).ajaxStart(function(){
  NProgress.start();
})
//ajaxStop所有的ajax结束调用
$(document).ajaxStop(function(){
  setTimeout(function(){
    NProgress.done();
  },5000);

})