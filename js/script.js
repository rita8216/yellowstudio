//對於捲軸滑動進行透明度的變化效果
$(window).scroll(function(){
  if($(window).scrollTop()<=0){

  $(".explore").addClass("at_top")
    $(".navbar").addClass("at_top")
  }else{ $(".explore").removeClass("at_top")
        $(".navbar").removeClass("at_top")
  }
});

//點擊a標籤，滑動移入
$(document).on('click','a',function(event){

  event.preventDefault();
  //先把預設的點擊方法取消
  var target = $(this).attr("href");
  $('html,body').animate({
    scrollTop: $(target).offset().top
  },500)

});

//滑鼠移動造成移動的效果
$(window).mousemove(function(evt){
  var pagex=evt.pageX;
  var pagey=evt.pageY;

//1.冰山移動
  $(".mountain").css("transform","translateX("+pagex/20+"px)");

//2.#section_works 文字及三角形移動
var y= pagey-$("#section_about").offset().top;
  var x= pagex-$("#section_about").offset().left;
 //x,y純計算＃section_about距離左邊以及上面的距離
 $(".r1text").css("transform","translateX("+y/-5+"px)"); $(".r2text").css("transform","translateX("+y/-10+"px)"); $(".r3text").css("transform","translateX("+y/-15+"px)");
  $(".tri1").css("transform","translateX("+pagex/5+"px)"); $(".tri2").css("transform","translateX("+pagex/10+"px)"); $(".tri3").css("transform","translateX("+pagex/15+"px)"); $(".tri4").css("transform","translateX("+pagex/17+"px)"); $(".tri5").css("transform","translateX("+pagex/19+"px)");

//3.#cross的移動
   $("#cross").css("left",x+"px");
  $("#cross").css("top",y+"px");
  //限定#cross只在#section_about出現
  if(y<0||y>$("#section_about").outerHeight()){
    $("#cross").css("opacity","0");
  }else{
     $("#cross").css("opacity","1");
  }
//4.控制貓看的方向
  var catplace=$("#cat").offset().left+$("#cat").width()/2;
  var cattop=$("#cat").offset().top;

  //定位貓的中心位置(貓距離左邊加貓本身寬度的一半)
  var img_url="https://awiclass.monoame.com/catpic/cat_";
  if(pagex<catplace-50){
    $("#cat").attr("src",img_url+"left.png")
  }else if(pagex>catplace+50){
     $("#cat").attr("src",img_url+"right.png")
  }else{
     $("#cat").attr("src",img_url+"top.png")
  }

  if(pagex<catplace-50 && pagey<cattop){
    $("#cat").attr("src",img_url+"lefttop.png")
  };
  if(pagex>catplace+50 && pagey<cattop){
    $("#cat").attr("src",img_url+"righttop.png")
  };
//5.控制貓蘿菠蹲

function detect_cat(catid,x){
    var colorcatplace=$(catid).offset().left+$(catid).width()/2;
    if(Math.abs(x-colorcatplace)<80){
      $(catid).css("bottom","0px")
    }else{
      $(catid).css("bottom","-20px")
    }
  };
  //Math.abs是取絕對值的意思
  detect_cat("#cat_blue",x);
  detect_cat("#cat_yellow",x);
  detect_cat("#cat_grey",x);

});

var vm = new Vue({

  el: "#app",
  data:{
    works: []
  },
  mounted: function(){
   $.ajax({
      url:"https://awiclass.monoame.com/api/command.php?type=get&name=projects",
      success: function(res){
        vm.works=JSON.parse(res);
      }
   });
  }
});

//vue1.0 是用ready 2.0 是用mounted
