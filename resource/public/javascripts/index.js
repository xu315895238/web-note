class but {
    constructor() {
        this.adds = document.querySelector(".adds");
        this.baba = document.querySelector(".main");
        this.clicks();
        this.adddata();
    }
    clicks() {
        var _this = this;
        this.baba.ontouchstart = function (e) {
            var el = e.target;
            if (el.tagName == "BUTTON") {
                var val = el.innerHTML;
                var ids = el.getAttribute("data-id");

                if (val == "详情") {
                    //跳转详情
                    _this.dlis(ids)
                }
                if (val == "删除") {
                    //删除信息

                    _this.clears(ids)

                }
            }
        }
    }
    //详情页
    dlis(ids) {
        location.href = "http://192.168.137.44:3000/xiangqings?id=" + ids;
    }

    //删除请求
    clears(ids) {

        var _this = this;
        var flex = document.querySelector(".flex");
        flex.style.display = "block";
        //取消按钮
        var nos = document.querySelector(".no");
        nos.ontouchstart = function () {
            flex.style.display = "";
        }

        //确定删除按钮
        var yess = document.querySelector(".yes");
        var inps = document.querySelector(".flex input");
       
        inps.value="";
        yess.ontouchstart = function () {
            var val = inps.value.trim();
            if (val == "") {
                return alert("请输入验证秘钥")
            }
            axios.post("/clears", {
                password: val,
                id: ids
            }).then(function (e) {
                _this.clearyes(e.data)
            })
        }
    }
    //添加信息
    adddata() {
        this.adds.ontouchstart = function () {
            location.href = "http://192.168.137.44:3000/tianjia";

        }
    }
    clearyes(e) {
        alert(e.mge)
        if(e.code==1){
            location.href = "http://192.168.137.44:3000/"
        }
      
    }



}
new but()