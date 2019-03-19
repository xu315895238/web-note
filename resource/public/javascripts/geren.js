class geren {
    constructor() {
        this.add = document.querySelector(".add");
        this.clears = document.querySelector(".clear");
        this.inputs = [...document.querySelectorAll(".inps")];
        this.init()
    }

    init() {
        var _this = this;
        this.add.ontouchstart = function () {
            _this.inps()

        }
        this.clears.ontouchstart = function () {
            location.href="http://192.168.137.44:3000/"
        }
    }
    inps() {
        var x=this.inputs.every(function (e) {
            return e.value.trim()!=="";
        })
        if(!x){
            return alert("信息不能为空");
        }
        var arr=[];
        this.inputs.forEach(function(e){
            var val=e.value.trim();
            arr.push(val)
        })
        var [name,age,coll,dorm,tel,tels,address,password]=arr;
        var sexs=[...document.querySelectorAll("input[name=sex]")];
        var sex=sexs.filter(function(e){
            return e.checked==true;
        })[0].value;
       
        axios.post("/users/add",{
            name,age,sex,coll,dorm,tel,tels,address,password
        }).then(function(){
            alert("添加成功")
            location.href="http://192.168.137.44:3000/"
        })
    }
}
new geren()