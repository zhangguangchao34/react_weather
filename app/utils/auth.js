/**
 * Created by tracy on 16/8/9.
 */
module.exports = {
    token: false,

    loginUrl: 'http://portal.gagogroup.cn',

    authLogin: function (type, loginName, pwd) {
        var miyeToken = getCookie('miye_token'),
            serverIp = 'http://123.56.205.244:8022',
            _this = this;

        type = type || 'dev';
        loginName = loginName || 'miye2';
        pwd = pwd || 'miye456';

        // 判断是什么环境，如果生产环境，没有token或者token过期，跳转到登录页面
        if (type === 'product') {
            if (!miyeToken) {
                window.location.href = this.loginUrl;
                return;
            }

            $.ajax({
                url: serverIp + "/api/v1/user/info",
                dataType: 'json',
                type: 'get',
                async: false,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', "BEARER" + " " + miyeToken);
                },
                error: function (error) {
                    window.location.href = _this.loginUrl;
                }
            }).done(function (data) {
                if (data.status !== 0) {
                    window.location.href = _this.loginUrl;
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
                    document.cookie = "miye_token=" + data.accessToken + "; expires=" + nowDate.toUTCString();
                }
            });
        }

        function getCookie(name) {
            var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            if (document.cookie.indexOf('miye_token=') != -1 && (arr = document.cookie.split('miye_token='))) {
                return unescape(arr[1].split(';')[0]);
            }
            else
                return null;
        }
    },

    // 删除cookie，退出登录
    loginOut: function () {
        DelCookie('miye_token');
        window.location.href = this.loginUrl;
    },

    getToken: function (name) {
        name = name || 'miye_token';

        return document.cookie.split(name + '=')[1].split(';')[0];
    }
}

function loginRequest(email, pass, cb) {
    var info = {};
    info.username = email;
    info.password = pass;
    var someurl = "http://123.56.205.244:8025/api/authentication";
    var option = {
        type: "post",
        data: info,
    };
    if (info.username && info.password) {
        $.ajax(someurl, option).done(function (data) {
            if (data.status == 1) {
                cb({
                    authenticated: true,
                    token: data.accessToken
                })
            } else if (data.status == -1) {
                cb({ authenticated: false })
            } else {
                console.log(data)
            }
        }).fail(function (xhr, status) {
            alert();
            // console.log(status);
            //ajaxLog('失败: ' + xhr.status + ', 原因: ' + status);
        }).always(function () {
            // console.log("成功");
            // ajaxLog('请求完成: 无论成功或失败都会调用');
        });
    }
}

function DelCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    document.cookie = name + "=; expires=" + exp.toGMTString();
}