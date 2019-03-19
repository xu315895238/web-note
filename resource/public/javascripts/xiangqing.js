class xiangqing {
    constructor() {
        this.add = document.querySelector(".add");
        this.clears = document.querySelector(".clear");
        this.inputs = [...document.querySelectorAll(".inps")];
        this.flex=null;
        this.init()
    }

    init() {
        var _this = this;
        this.add.ontouchend = function () {
            if (this.innerHTML == "确定") {
                _this.inps();
               
            }
            if (this.innerHTML == "修改") {
                _this.flex = document.querySelector(".flex");
                _this.flex.style.display = "block";
                var input=document.querySelector(".flex input");
                input.value="";
                _this.keyss();
            }
        }

        //取消按钮
        this.clears.ontouchend = function () {

            if (this.innerHTML == "取消") {
                var inputs = [...document.querySelectorAll(".xinxi input")];
                inputs.forEach(function (e) {
                    e.disabled = true
                })
                _this.add.innerHTML = "修改";
                this.innerHTML = "返回";
                return
            }
            if (this.innerHTML == "返回") {
                location.href = "http://192.168.137.44:3000/"
            }

        }
    }
    //添加信息
    inps() {
        var _this=this;
        var x = this.inputs.every(function (e) {
            return e.value.trim() !== "";
        })
        if (!x) {
            return alert("信息不能为空");
        }
        var arr = [];
        this.inputs.forEach(function (e) {
            var val = e.value.trim();
            arr.push(val)
        })
        var [name, age, coll, dorm, tel, tels, address] = arr;
        var sexs = [...document.querySelectorAll("input[name=sex]")];
        var sex = sexs.filter(function (e) {
            return e.checked == true;
        })[0].value;
        var id=location.search.split("=")[1];
        axios.post("/users/xiugai", {
            id,
            name,
            age,
            sex,
            coll,
            dorm,
            tel,
            tels,
            address
        }).then(function (e) {
            alert("修改成功")
            _this.clears.innerHTML = "返回";
            _this.add.innerHTML="修改";
            console.log(e.data)
        })
    }
    //修改信息列表
    xiugai() {
        var inputs = [...document.querySelectorAll("input")];
        inputs.forEach(function (e) {
            e.disabled = false;
        })

    }
    //判断是知道修改秘钥
    keyss() {
        var _this = this;
        var yess = document.querySelector(".yes");
        var nos = document.querySelector(".no");
        var inputs = document.querySelector(".flex input");
        yess.ontouchend = function () {
            var val = inputs.value.trim();
            if (val == "") {
                return
            }
            axios.post("/users/isyesno", {
                password: val,
                id: location.search.split("=")[1]
            }).then(function (pas) {
                var data = pas.data;
                if (data.code == 1) {
                    _this.flex.style.display = "none";
                    _this.xiugai();
                    _this.add.innerHTML = "确定";
                    _this.clears.innerHTML = "取消";

                }
                alert(data.mge);
            })
        }
        nos.ontouchend=function(){
            _this.flex.style.display="";
        }


    }
}
new xiangqing()