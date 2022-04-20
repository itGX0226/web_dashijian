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


    //从layui中获取form对象
    let form = layui.form
    let layer = layui.layer

    //从form.verify自定义校验规则
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格'],
        //校验两次密码一致
        repwd: function(value) {
            //通过形参拿到的确认密码框的内容
            //还需要拿到密码框中的内容
            //然后进行一次等于判断
            //如果判断失败return一个失败提示消失即可
            //属性选择器[name=password]
            let pwd = $('.reg-box [name=password]').val()
            if (pwd != value) {
                return '两次密码不一致'
            }
        }
    })

    //注册表单的监听事件
    $('#form_reg').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            url: '/api/reguser',
            type: 'post',
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            },
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功');
                //模拟人的点击行为
                $('#link_login').click()
            }
        })
    })

    //登录表单的监听事件
    $('#form_login').submit(function(e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'post',
            // serialize()可以拿到表单里的数据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')

                //将登录成功得到的token值传到本地存储里面去
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })
})