$(function() {
    //国内折扣商品列表数据 
    $.ajax({
        url: 'http://localhost:9090/api/getinlanddiscount',
        success: function(data) {
            //调用模板渲染到页面上
            console.log(data);
            var html = template('productListTpl', data);
            console.log(html);
            $('.product-content').html(html);

            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });

        }
    })



    //定击任意的商品跳到相对应的详情页面 并且传递当前的商品id过去
    // 1. 把商品id绑定到按钮的自定义属性上
    // 2. 添加点击事件获取当前id
    // 3. 使用location跳转页面 并且传递id参数
    // 因为按钮动态添加的元素使用委托方式添加
    // 用事件委托
    $('.product-content').on('tap', '.product', function() {
        var id = $(this).data('id');
        // console.log(id);
        location = 'domesticDetail.html?productid=' + id;
    })

    //  点击返回  返回顶部事件  
    $('.foot_top>a:nth-of-type(3)').on('tap', function() {
        mui('.mui-scroll-wrapper').scroll().scrollTo(0, 0, 1000); //100毫秒滚动到顶
    })
})