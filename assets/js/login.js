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
})