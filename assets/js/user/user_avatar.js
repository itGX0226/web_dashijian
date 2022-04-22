$(function() {
    // 1.1 获取裁剪区域的 DOM 元素
    let $image = $('#image')
        // 1.2 配置选项
    const options = {
        // 纵横比 裁剪框形状
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)


    //为上传按钮点击事件
    $('#btnChoseImages').click(function() {
        $('#file').click()
    })

    //为上传文件添加 change 函数
    $('#file').change(function(e) {
        // //获取用户选择的文件
        // e.target.files是在e这个事件里面的
        // let filelist = e.target.files
        // console.log(filelist);

        //拿到用户选择的文件
        let file = e.target.files[0]

        //将文件转化为路径
        let newImgURL = URL.createObjectURL(file)

        //初始化裁剪区域
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域



    })

    $('#btnUpload').click(function() {
        let dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            //大文件不适合base64 格式
            .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

        $.ajax({
            method: 'post',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('更换头像失败')
                }
                layui.layer.msg('更换头像成功')
                window.parent.get()
            }
        })
    })


})