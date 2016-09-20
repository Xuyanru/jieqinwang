$(function(){
	$("#header").load("data/header.php",function(){
        $("#idx").on("mouseover","li",
            function(){
                clearInterval(slide.timer);
                slide.timer=null;
                if(!($(this).hasClass("active"))){
                    var inx=$("#idx li.active").index()+1;
                    console.log($("#idx li.active").index());
                    $("#slider li:nth-child("+inx+")").animate({
                        opacity:0
                    },1000);
                    $("#idx .active").removeClass("active");
                    $(this).addClass("active");
                    var ind=$("#idx li").index(this)+1;
                    console.log(ind);
                    $(`#slider :nth-child(${ind})`).animate({
                        opacity:1
                    },1000);

                }
            }
        )
        $("#slider").mouseover(function(){
            clearInterval(slide.timer);
            slide.timer=null;
        });
        $("#slider").on("mouseout",
            function(){
                slide.init();
            }
        );
    });
	$("#footer").load("data/footer.php");
});
//轮播图
var slide={
    i:1,
    timer:null,
    init:function(){
        this.timer=setInterval(this.ops.bind(this),6000);
    },
    ops:function(){
        $(`#slider li:nth-child(${this.i})`).animate({
            opacity:"0"
        },1000,function(){
            $("#idx .active").removeClass("active");
        });
        this.i++;
        if(this.i>3){
            this.i=1;
        }
        $(`#slider li:nth-child(${this.i})`).animate({
            opacity:"1"
        },1000,function(){
            $($(this).children("img").attr("alt")).addClass("active");
        });
    }
}
slide.init();
//导航部分
$(".top_nav>li").hover(function(){
	$(this).children("ul").slideDown();
	$(this).addClass("active");
},function(){
	$(this).children("ul").slideUp();
	$(this).removeClass("active");
});
//点击车辆品牌弹出框
$(document).ready(function($) {
    var bd;
    $('#show_brand').click(function(e) {
        e.preventDefault();
        $('.mask').fadeIn(200);
        $('.choose_brand').slideDown(200);
    });
    $('.mask').click(function() {
        $('.mask').fadeOut(200);
        $('.choose_brand').slideUp(200);
    });
    $(".bd_close").click(function(){
        $(".mask").click();
    });
    $(".choose_brand_content li a").click(function() {
        bd = $(this).html();
        brand = $(this).attr("brand");
        $("#brand").val(brand);
        $("#brand_pinyin").val($(this).attr("pinyin"));
        $('.choose_brand').slideUp(200);
        $('.mask').fadeOut(200);
        $("#show_brand").html(bd);
    });
    $(".choose_brand_title a").each(function(index){

        if(index!=0&&$("."+$(this).html()).size()<=0) $(this).remove();
    });
    $(".choose_brand_title a").click(function(){
        $(this).addClass("in").siblings().removeClass("in");
        var c=$(this).attr("attr");
        if(c=="0"){
            $('#bd_1 li').each(function()
            {
                if($(this).attr('hot')<80) $(this).hide();
                else $(this).show();
            });
        }else{
            var a=$(this).html();
            $("#bd_1 li").hide();
            $("."+a).show();
        }

    });
    $(".choose_brand_title a").eq(0).click();

});
//推荐婚车
    var recommend_slide={
        moved:0,
        timer:null,
        init:function(){
            this.timer=setInterval(this.move.bind(this),10);
            $(".recommend_car_content").mouseover(
                function(){
                    clearInterval(this.timer);
                    this.timer=null;
                }.bind(this)
            );
            $(".recommend_car_content").mouseout(
                function(){
                    this.timer=setInterval(this.move.bind(this),10);
                }.bind(this)
            );
        },
        move:function(){
            var left= parseInt($(".recommend_car_content").css("left"));
            $(".recommend_car_content").css("left",left-1+"px");
            this.moved++;
            if(this.moved==271){
                this.moved=0;
                $(".recommend_car_content").append($(".recommend_car_content li:nth-child(1)")).css("left","0px");

            }
        }
    }
recommend_slide.init();

//用户留言消息滚动
var user_slide={
		 moved:0,
        timer:null,
		timer2:null,
        init:function(){
            this.timer=setInterval(this.move.bind(this),3000);
            $(".comment_ul").mouseover(
                function(){
                    clearInterval(this.timer);
                    this.timer=null;
                }.bind(this)
            );
            $(".comment_ul").mouseout(
                function(){
                    this.timer=setInterval(this.move.bind(this),3000);
                }.bind(this)
            );
        },
        move:function(){
			clearInterval(this.timer2);
			this.timer2=null;
			this.timer2=setInterval(function(){
				var left= parseInt($(".comment_ul").css("left"));
				$(".comment_ul").css("left",left-1+"px");
				this.moved++;
				if(this.moved==275){
					this.moved=0;
					$(".comment_ul").append($(".comment_ul li:nth-child(1)")).css("left","0px");
					clearInterval(this.timer2);
					this.timer2=null;
				}
			}.bind(this),5);
           
        }
}
user_slide.init();