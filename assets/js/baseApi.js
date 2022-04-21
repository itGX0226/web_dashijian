//每次调用$.get()或$.post()或$.ajax()的时候
//会先调用 ajaxPrefilter这个函数
//在这个函数中可以拿到我们给ajax提供的配置对象
//options这个形参就是调用ajax是传入配置对象
$.ajaxPrefilter(function(options) {

    options.url = 'http://www.liulongbin.top:3007' + options.url
    console.log(options.url);
    //indexof('')是查找字符串的位置 如果不存在则返回-1
    if (options.url.indexOf('/my' !== -1)) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    //全局统一complete回调函数
    //无论成功和失败都可以调用的函数
    options.complete = function(res) {

        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //强制清空本地存储里的
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }

})