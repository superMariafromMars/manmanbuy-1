$(function() {
    //渲染海淘折扣页面
    queryMoneyctrl();
    //声明变量记录总页数
    var totalPage;

    function queryMoneyctrl(pageid) {
        $.ajax({
            url: 'http://localhost:9090/api/getmoneyctrl',
            data: { pageid: pageid },
            success: function(data) {
                console.log(data);
                var html = template('productListTpl', data);
                $('.product-list').html(html);
                //计算出总页数
                totalPage = Math.ceil(data.totalCount / data.pagesize);
                // console.log(totalPage);
                //初始化区域滚动
                mui('.mui-scroll-wrapper').scroll({
                    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
                });
            }
        })

    }

    //上一页
    var pageid = 0;
    $('#previous').on('tap', function() {
        pageid--;
        if (pageid <= 0) {
            pageid = 0;
        }
        queryMoneyctrl(pageid);
        $('#selectAge option:selected').prev().prop('selected', true);
    })

    //下一页
    $('#below').on('tap', function() {
        pageid++;
        if (pageid >= totalPage - 1) {
            pageid = totalPage - 1;
        }
        queryMoneyctrl(pageid);
        $('#selectAge option:selected').next().prop('selected', true);
    })

    //中间的页码
    $('#selectAge').on('change', function() {
        console.log(this);
        pageid = $(this).val() - 1;
        queryMoneyctrl(pageid);
    })

    // 拼接页面和id  通过点击传到详情页面,
    $('.product-list').on('tap', '.mui-media', function() {
        var id = $(this).data('id');
        console.log(id);
        location = 'haiTaoDetail.html?productid=' + id;
    })


    //  点击返回  返回顶部事件  
    $('.foot_top>a:nth-of-type(3)').on('tap', function() {
        mui('.mui-scroll-wrapper').scroll().scrollTo(0, 0, 1000); //100毫秒滚动到顶
    })

})