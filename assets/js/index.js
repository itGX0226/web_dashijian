$(function() {
    get()

    //点击按钮实现退出功能
    $('#btn_login').click(function() {
        layui.layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function(index) {
            //do something
            //清空本地存储token
            localStorage.removeItem('token')

            //重新跳转登录页
            location.href = '/login.html'

            //关闭confirm询问框
            layer.close(index);
        });
    })
})





//获取用户基本信息
function get() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            // 调用渲染头像函数
            renderAvatar(res.data)
        }

    })
}

// 渲染头像函数
function renderAvatar(user) {
    let name = user.nickname || user.username
        //设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        //按需渲染用户的头像
    if (user.user_pic !== null) {
        //渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    }
    //渲染文本头像
    $('.layui-nav-img').hide()

    //把拿到的字符转成大写toUpperCase()
    let first = name[0].toUpperCase()
    $('.text-avatar').html(first).show()
}