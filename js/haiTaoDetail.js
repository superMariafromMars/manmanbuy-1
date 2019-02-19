$(function() {
    $.ajax({
        url: 'http://localhost:9090/api/getmoneyctrlproduct',
        data: { productid: 22 },
        success: function(data) {
            console.log(data);
        }
    })
})