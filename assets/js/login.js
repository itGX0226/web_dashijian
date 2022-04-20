$(function() {
    //点击去注册账号的链接
    $('#link_reg').click(function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    //点击去登录的链接
    $('#link_login').click(function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })


    //正则
    $('.layui-form').submit(function(e) {
        let input = $('.layui-input').val()
        let str = /\d{6,}/
        if (input.length <= 0) {
            e.preventDefault()
        }

    })
})