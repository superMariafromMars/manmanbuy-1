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
       }

queryMoneyctrl(0);
var totalPage;
var pageid=0;

function  queryMoneyctrl(pageid) { 
    $.ajax({
        url:'http://localhost:9090/api/getmoneyctrl',
        data:{
            pageid:pageid,
            pagesize:10,
           
        },
        success:function(data){
            // console.log(data);
      totalPage = Math.ceil( data.totalCount/data.pagesize);
    
    

    // console.log(totalPage);
         var html =  template('moneyctrltpl',data);
          $('.mui-table-view').html(html); 
        }
    })
    
 }

//  上一页

$('.beforePage').on('tap',function () {  
    // console.log('阿西吧');
pageid--;
if(pageid<=0){
    pageid=0;
}
    queryMoneyctrl(pageid);
    $('#selectAge option:selected').prev().prop('selected',true);
})
//下一页
$('.afterPage').on('tap',function () {  
pageid++;
    if(pageid >= totalPage-1){
        pageid = totalPage-1;
       }
    queryMoneyctrl(pageid);
    $('#selectAge option:selected').next().prop('selected',true);
    
})



// 中间的页码
$('#selectAge').on('change',function () { 
    console.log(this);
   
//    console.log($(this).val())
pageid=$(this).val()-1;


  queryMoneyctrl(pageid);


})

// 拼接页面和id  通过点击传到下一页,在下一页获取到后面的id
$('.moneyUl').on('tap','.mui-media',function () { 
    var id = $(this).data('id');
    console.log(id);
    location = 'moneyDetail.html?productid='+id;
 })




//  点击返回  返回顶部事件  
    $('.foot_top>a:nth-of-type(3)').on('tap',function () {
    
        mui('.mui-scroll-wrapper').scroll().scrollTo(0,0,1000);//100毫秒滚动到顶
       })





     })



