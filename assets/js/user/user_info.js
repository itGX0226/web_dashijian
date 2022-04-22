$(function() {
    layui.form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在1-6个字符之间'
            }
        }
    })

    csh()



    //初始化用户信息
    function csh() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取用户信息失败!')
                }
                console.log(res);
                //调用form.val()快速为表单赋值
                layui.form.val('formUserInfo', res.data)
            }
        })
    }




    //重置表单的数据
    $('#btncz').click(function(e) {
        e.preventDefault()
        csh()
    })


    $('.layui-form').submit(function(e) {
        //阻止表单默认提交
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('更新用户信息失败')
                }
                layui.layer.msg('更新用户信息成功')

                //调用index.js里面的get()方法
                //从子页面调用父页面的方法 window.parent.方法
                window.parent.get()
            }
        })
    })
})