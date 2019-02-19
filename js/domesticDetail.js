$(function() {

    //根据商品id获取国内折扣商品的详细信息 并渲染到页面  
    // 1. 根据当前url中的id参数的值
    var id = getQueryString('productid');
    console.log(id);

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

    $.ajax({
        url: 'http://localhost:9090/api/getdiscountproduct',
        data: { productid: id },
        success: function(data) {
            console.log(data);
            var html = template('productListTpl', data);
            $('.productDetail').html(html);
            //初始化区域滚动
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
        }
    })

    //注册返回顶部点击事件
    $('.upTop').on('tap', function() {
        mui('.mui-scroll-wrapper').scroll().scrollTo(0, 0, 1000); //100毫秒滚动到顶

    })
})