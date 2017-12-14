
// type: dev or product
module.exports = function (type, loginName, pwd) {
    var miyeToken = getCookie('miyeye_token'),
        loginUrl = 'http://portal.gagogroup.cn',
        serverIp = 'http://123.56.205.244:8022';

    type = type || 'dev';
    loginName = loginName || 'gago';
    pwd = pwd || 'gagoadmin';

    // 判断是什么环境，如果生产环境，没有token或者token过期，跳转到登录页面
    if (type === 'product') {
        if (!shuyeToken) {
            window.location.href = loginUrl;
        }

        $.ajax({
            url: serverIp + "/api/userinfo",
            dataType: 'json',
            async: false,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', "BEARER" + " " + shuyeToken);
            }
        }).done(function (data) {
            if (!data.username) {
                window.location.href = loginUrl;
            }
        }).error(function (error) {
            if (error.status === 401) {
                window.location.href = loginUrl;
            }
        });
    } else if (type === 'dev') {
        // 如果开发环境，自动获取测试账号token, 并且写在cookie里面
        var postData = {
            action: 'login',
            username: loginName,
            password: pwd
        };

        $.ajax({
            url: serverIp + '/api/v1/user',
            dataType: 'json',
            data: postData,
            type: 'post',
            async: false
        }).done(function (data) {
            if (data.status === 0) {
                var nowDate = new Date();

                nowDate.setMinutes((nowDate.getMinutes() + data.expiresInMinutes));

                document.cookie = "shuye_token=" + data.accessToken + "; expires=" + nowDate.toUTCString();
            }
        }).error(function (error) {
            // if (error.status === 401) {
            //     window.location.href = loginUrl;
            // }
        });


    }

    function getCookie(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    }
};