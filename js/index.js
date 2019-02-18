$(function () {

    // 初始化轮播图
    var gallery = mui('.mui-slider');
    gallery.slider({
        interval: 5000 //自动轮播周期，若为0则不自动播放，默认为0；
    });
    // 发送请求渲染导航栏
    $.ajax({
        url: 'http://localhost:9090/api/getindexmenu',
        success: function (data) {
            console.log(data);
            var html = template('navTpl', data)
            // console.log(html);
            $('.nav-row').html(html)
        }
    });

    $('.nav-row').on('tap', 'a.more', function () {
        var box = document.querySelector(".nav-row")
        box.classList.toggle('active')
        return false
    });
    // 发送请求渲染商品列表
    $.ajax({
        url: 'http://localhost:9090/api/getmoneyctrl',
        success: function (data) {
            console.log(data);
            var html = template('productListTpl', data)
            $('.content>.mui-table-view').html(html)
            
        }
    });
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    
})