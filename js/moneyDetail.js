$(function () {  
    // srcoll初始化
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    options = {
        scrollY: true, //是否竖向滚动
        scrollX: false, //是否横向滚动
        startX: 0, //初始化时滚动至x
        startY: 0, //初始化时滚动至y
        indicators: true, //是否显示滚动条
        deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
        bounce: true//是否启用回弹
       };


 
  // 使用网上封装好的正则的方式完成url参数的值的获取
    function getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            // 默认使用encodeURI去对中文进行的加密  使用decodeURI解密
            return decodeURI(r[2]);
        }
        return null;
    }
    var id = getQueryString('productid');
    console.log(id);


//调用接口渲染数据
  $.ajax({
      url:"http://localhost:9090/api/getmoneyctrlproduct",
      data:{productid:id} ,
      success:function (data) { 
          console.log(data);
          var html = template('moneyDetailTpl',data);
          console.log(html)
          $('.mui-scroll').html(html)


       }
  })

    //  点击返回  返回顶部事件  
    $('.foot_top>a:nth-of-type(3)').on('tap',function () {
    
       mui('.mui-scroll-wrapper').scroll().scrollTo(0,0,1000);//100毫秒滚动到顶
      })


    })