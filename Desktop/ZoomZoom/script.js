function Enemy(num) {
    this.baddy = 1;
    this.hp = 10;
    this.attack = 1;
    this.num = num;
    $("body").append("<div id='bad"+num+"' class='enemy'></div>");
    this.obj = $("#bad"+this.num);
    var wheredasummon = Math.floor(Math.random()*(580))-20
    this.obj.css({top:wheredasummon});
}

var player = {
    hp: 10,
    attack: 1,
    obj: $(".player")
};

var timing = 1;

function Collide(sub1, sub2) {
    var a = Number(sub1.css("left").match(/\d+/)[0]);
    var b = Number(sub2.css("left").match(/\d+/)[0]);
    var c = Number(sub1.css("top").match(/\d+/)[0]);
    var d = Number(sub2.css("top").match(/\d+/)[0]);
    var dx = Math.abs(a-b);
    var dy = Math.abs(c-d);
    if (dx < 60 && dy < 60){
        $(".player").remove();
        $("body").append("GAME OVER!");
    }
}

function Charge() {
    for (i = 1; i < $(".enemy").length + 1; i++) {
        Collide($(".player"), $("#bad"+i+".enemy"));
        $("#"+i+".enemy").animate({left: "-=1200px"}, 8000)
    }
}

function Update() {
    Enemy(timing);
    Charge();
    timing++;
    setTimeout(Update, 50);
}

$(document).mousemove(function(e){
    $(".player").css({left:e.pageX-20, top:e.pageY-20});
});

$(document).ready(function(){
    Update();
});
