$(function () {  

    // 定义一个全局变量titleId 默认等于0 ‘全部’
    var id = 0;

    // 页面一进来，默认是显示 ‘全部’ 下的商品列表，即titleId=1
    queryBaicaijiaproduct(id);

    // 页面一经加载，向接口发请求，获取所有的nav items
    $.ajax({
        url:'http://localhost:9090/api/getbaicaijiatitle',
        success:function (data) {  
            console.log(data);
            // 使用模板，渲染nav中所有title
            var html = template('titleTpl',data);
            $('.titleBox').html(html);
            // 动态设定title父盒子的宽度
            // 1.计算出总的宽度

            // 2.初始化 导航条 区域滚动组件
            mui('#nav .mui-scroll-wrapper').scroll({
                scrollY: false, //是否竖向滚动
                scrollX: true, //是否横向滚动
                startX: 0, //初始化时滚动至x
                startY: 0, //初始化时滚动至y
                indicators: false, //是否显示滚动条
                deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
                bounce: true //是否启用回弹
            });

            // 3.点击哪个菜菜单项，就:
                /* 1.给这个li添加active类，移除兄弟们的类 
                   2.获取自定义属性id，更新全局变量id
                   3.注册点击事件，委托注册，委托给ul
                */
            $('.titleBox').on('tap','.titleBox>li',function () {  
                $(this).addClass('active').siblings().removeClass('active');
                id = $(this).data('titleid');
                // 滚动高度归0
                $(window).scrollTop(0);
                // 刷新 渲染商品列表
                queryBaicaijiaproduct(id);
            });

        }
    });

    // 点击按钮 显示/隐藏搜索栏
    $('.showSearch').on('tap',function () {  
        $('.search-form').toggle();
    });

    // 点击头部 ‘向右’ 按钮，倒退的上一个页面
    $('#header .fa-angle-left').on('tap',function () {  
        location = 'index.html';
    });

    // 监测 当main部分滚动出去一定距离后，隐藏nav部分
    $(window).on('scroll',function (e) {  
        if($(this).scrollTop() > 300){
            $('#nav').hide();
            $('#backTop').show();
        }else{
            $('#nav').show();
            $('#backTop').hide();
        }
    });

    // 点击回到顶部按钮
    $('#backTop').on('tap',function () {  
        $(window).scrollTop(0);
    });

    // 封装 发送请求，渲染产品列表信息 的函数
    // 传参 titleId
    function queryBaicaijiaproduct(titleid) {  
        $.ajax({
            url:'http://localhost:9090/api/getbaicaijiaproduct',
            data:{titleid:titleid},
            success:function (data) {  
                console.log(data);
                var html = template('productTpl',data);
                $('.productLists').html(html);
            }
        });
    }

})