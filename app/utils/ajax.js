//        ajaxServer.get('http://123.56.205.244:8111/plantconsus/person?name=' + $inp.val(), _this.qqq,_this.ppp);


var ajaxServer = {
    rootUrl: '',
    get: function(options,success,failure){
        $.ajax({
            type: 'get',
            url: options.url
        }).done(function(data){
            console.log(data);
                success(data);
        }).fail(function(xhr, status, error){
            if(failure){
                failure(xhr);
            }else {
                errorServer.http(xhr,status, error);
            }
        });
    },
    put: function(options, success, failure){

    },
    post: function(options, success, failure){

    },
    delete: function(options, success, failure){

    }

    //TODO when方法 多个ajax请求
    


};

module.exports = ajaxServer;