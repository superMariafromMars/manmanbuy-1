$(function(){
   

    // $('.list').on('tap','.btn-list',function () {  
        $.ajax({
            url:'http://localhost:9090/api/getcoupon',
            success:function(data){
             console.log(data);
             var html = template('coupontpi',data);
             $('.mui-row').html(html);
            }
        })
    // })

  
})