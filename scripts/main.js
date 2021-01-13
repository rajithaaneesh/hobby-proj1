ScrollTrigger.getAll().forEach(ST => ST.disable());
document.addEventListener("DOMContentLoaded", function(){
  ScrollTrigger.getAll().forEach(ST => ST.enable());
  gsap.registerPlugin(ScrollTrigger,MotionPathPlugin);
  var fPath = [];
  let plusIcons = document.querySelectorAll(".plus"),
      svgIcons = document.querySelectorAll(".sec1Svg"),
      parallaxSections = gsap.utils.toArray(".parallax-section");
  
  iconsToPosition(svgIcons,plusIcons);
  function iconsToPosition(svgIcons,plusIcons){
    fPath = [];
    for(i=0;i<5;i++){
      eachPath = MotionPathPlugin.getRelativePosition(svgIcons[i],plusIcons[i],[0.5,0.5],[0.5,0.5]);
      fPath.push(eachPath);
    }
  }
  
  gsap.set(".section1 .gsap-aligned-icon", {autoAlpha:0});
  parallaxSections.forEach((parallaxSection , i )=> {
    parallaxSection.bg = parallaxSection.querySelector(".parallax-bg");
    if(i && parallaxSection.bg && parallaxSection.bg != null && parallaxSection.bg != undefined){
      parallaxSection.bg.style.backgroundPosition = '50% ${-innerHeight / 2}px';
      gsap.to(parallaxSection.bg, {
        backgroundPosition : '50% ${innerHeight / 2}px',
        ease : "none",
        scrollTrigger : {
          trigger : parallaxSection,
          scrub : true
        }
      });
    }
 });

  //Section1 animation
     let isAnimating = false;
    function zoomfn(){
      if(!isAnimating){
        isAnimating = true;
      var t1 = gsap.timeline({defaults : {duration:1 , ease : "expo",overwrite:"auto",delay:1}});
        t1.fromTo(".gs_zoom", {scaleX:1, scaleY:1},{scaleX:2, scaleY:2});
        t1.to(".gs_zoom", {scaleX:5, scaleY:5});
        t1.fromTo(".section1 .bbc-content", {autoAlpha:1},{autoAlpha:0});
        t1.fromTo(".section1 .gs_rotate.gsap-visible",{x:100,autoAlpha:0}, {x:0, autoAlpha:1});
        t1.call(changeIsAnimating);
      }
    }
    function changeIsAnimating(){
      isAnimating = false;
    }
    function zoomOutfn(){
      if(!isAnimating){
        gsap.set(".section1 .gs_rotate.gsap-visible",{autoAlpha:0});
        gsap.set(".section1 .bbc-content",{autoAlpha:1});
        gsap.set(".gs_zoom", {scaleX:1, scaleY:1});
      }
    }
    ScrollTrigger.create({
      trigger : ".section1",
      toggleClass : {className: 'gs_zoomed', targets: '.gs_zoom'},
      onEnter : 
        () => goNextAnimation = gsap.delayedCall(1,zoomfn),
      onEnterBack :
        () => goNextAnimation = gsap.delayedCall(1,zoomfn),
      onLeave : () => zoomOutfn(),
     /* onLeaveBack :  () => zoomOutfn(),*/
      onRefresh :  function(){
        gsap.delayedCall(1,zoomOutfn);
        gsap.delayedCall(2,zoomfn);
      }
    });

    //section1 Floating icons animation
    function floatIconsfn(icon,i){
       var t1 = gsap.timeline({defaults: {duration:3, ease:"expo",overwrite:"auto",delay:1}});
       t1.to(icon,{
           x: fPath[i].x,
           y: fPath[i].y
        });
      }
   function resetIconFloating(icon,i){
      gsap.set(icon,{x:0,y:0});
    }
    gsap.utils.toArray(".gs_float_inorder").forEach((icon,i) => {
      ScrollTrigger.create({
        trigger : ".section1",
        onEnter : function(){
          floatIconsfn(icon,i)},
        onEnterBack : function(){
          floatIconsfn(icon,i)},
        onLeave : function(){
          resetIconFloating(icon,i)},
        /*onLeaveBack : function(){
          resetIconFloating(icon,i)},*/
        onRefresh : function(){
          gsap.delayedCall(1,resetIconFloating(icon,i));
          gsap.delayedCall(1,iconsToPosition(svgIcons,plusIcons));
          gsap.delayedCall(2,floatIconsfn(icon,i));
        }
      });
  });

    
    
    //Section5 animation
    var t5 = gsap.timeline({
      defaults : {
        duration : 2 ,
        ease : "none",
        interval : 1
      },
      scrollTrigger : {
        trigger : ".section5",
        start : "top 127px",
        end : "bottom top",
        pin: true,
        scrub : true,
        smoothChildTiming : true
       }
    });
    t5.fromTo(".section5 .gs_first", {x:0, autoAlpha:1},{x:100,autoAlpha:0});
    t5.fromTo(".section5 .gs_second", {x:100,autoAlpha:0},{x:0,autoAlpha:1});
    
    
    //Section6 animation
    function animateScaleTo1(elem){
      gsap.fromTo(elem,{scaleX:0,scaleY:0},
        {
          duration:2,
          scaleX:1, 
          scaleY:1,
          ease : "expo",
          overwrite: "auto"
        });
    }
    function scaleBack(elem){
      gsap.set(elem,{scaleX:0,scaleY:0});
    }
    gsap.utils.toArray(".gs_scale").forEach(function(elem){
      ScrollTrigger.create({
        trigger : elem,
        onEnter : function() {
          animateScaleTo1(elem)},
        onEnterBack : function(){
          animateScaleTo1(elem)},
        onLeave : function(){
          scaleBack(elem)},
        onLeaveBack : function(){
          scaleBack(elem)},
        onRefresh: function(){
          scaleBack(elem)}
      });
    });

    //Section3,4,7,8,9,10,13,14 animation 
    function animateFrom(elem,direction){
      direction = direction | 1;
      var x = 0,
          y = direction * 100;
      
      if(elem.classList.contains("gs_reveal_fromLeft")){
        x = -100;
        y = 0;
      } else
      if(elem.classList.contains("gs_reveal_fromRight")){
        x = 100;
        y = 0;
      } 
      gsap.fromTo(elem,{x:x, y:y, autoAlpha:0},
        {
          duration:2,
          x: 0,
          y: 0,
          autoAlpha: 1,
          ease : "expo",
          overwrite: "auto"
        });
    }
    function hide(elem){
      gsap.set(elem,{autoAlpha:0});
    }
    gsap.utils.toArray(".gs_flow").forEach(function(elem){
      if(elem.classList.contains("gs_reveal_dir")){
        hide(elem);
        ScrollTrigger.create({
          trigger : elem,
          onEnter : function() {
            animateFrom(elem)},
          onEnterBack : function(){
            animateFrom(elem, -1)},
          onLeave : function(){
            hide(elem)},
          onLeaveBack : function(){
            hide(elem)},
          onRefresh: function(){
            gsap.delayedCall(1,hide(elem));
            gsap.delayedCall(2,animateFrom(elem))}
        });
      } 
    });

    //section 11,12,15 animation
    gsap.utils.toArray(".gs_show_inorder").forEach(function(elem){
      gsap.set(".gs_show_inorder", {autoAlpha:0,y:-35, ease : "expo",overwrite: true});
      ScrollTrigger.addEventListener("refreshInit",() => gsap.set(".gs_show_inorder", {autoAlpha:0,y:-35, ease : "expo",overwrite: true}));
      ScrollTrigger.batch(".gs_show_inorder",{
        trigger : elem,
        duration: 5,
        interval: 0.5,
        onEnter : batch => gsap.to(batch, {autoAlpha:1,y:0,stagger: 0.15,ease : "expo",overwrite:true}),
        onEnterBack : batch => gsap.to(batch, {autoAlpha:1,y:0,stagger: 0.15, ease : "expo",overwrite: true}),
        onLeave : batch => gsap.set(batch, {autoAlpha:0,y:35 ,ease : "expo",overwrite: true}),
        onLeaveBack : batch => gsap.set(batch, {autoAlpha:0,y:35 ,ease : "expo",overwrite: true}),
        onRefresh : batch => gsap.set(batch, {autoAlpha:0,y:-35, ease: "expo", overwrite: true})
      });
    });

     //section floating icons animation
     gsap.utils.toArray(".gs_icons_inorder").forEach(function(elem){
      gsap.set(".gs_icons_inorder", {autoAlpha:0,y:-100, ease : "expo",overwrite: true});
      ScrollTrigger.addEventListener("refreshInit",() => gsap.set(".gs_icons_inorder", {autoAlpha:0,y:-100, ease : "expo",overwrite: true}));
      ScrollTrigger.batch(".gs_icons_inorder",{
        trigger : elem,
        duration: 5,
        interval: 0.5,
        onEnter : batch => gsap.to(batch, {autoAlpha:1,y:0,stagger: 0.15,ease : "expo",overwrite:true}),
        onEnterBack : batch => gsap.to(batch, {autoAlpha:1,y:0,stagger: 0.15, ease : "expo",overwrite: true}),
        onLeave : batch => gsap.set(batch, {autoAlpha:0,y:100 ,ease : "expo",overwrite: true}),
        onLeaveBack : batch => gsap.set(batch, {autoAlpha:0,y:100 ,ease : "expo",overwrite: true}),
        onRefresh : batch => gsap.set(batch, {autoAlpha:0,y:-100, ease: "expo", overwrite: true})
      });
    });
    window.addEventListener("resize",function(){
      ScrollTrigger.matchMedia({
        "(max-width:991px)":function() {
          gsap.set(".arc-text",{transform: "none"});
        },
        "(min-width:992px)":function() {
          gsap.set(".right-transition-1",{transform: "translate(-80px, 0)"});
          gsap.set(".right-transition-2",{transform: "translate(-20px, 0)"});
          gsap.set(".right-transition-3",{transform: "translate(10px, 0)"});
          gsap.set(".right-transition-4",{transform: "translate(40px, 0)"});
          gsap.set(".right-transition-5",{transform: "translate(50px, 0)"});
          gsap.set(".left-transition-1",{transform: "translate(80px, 0)"});
          gsap.set(".left-transition-2",{transform: "translate(20px, 0)"});
          gsap.set(".left-transition-3",{transform: "translate(-10px, 0)"});
          gsap.set(".left-transition-4",{transform: "translate(-40px, 0)"});
        }
      });
      ScrollTrigger.clearMatchMedia( "(max-width:991px)" ,"(min-width:992px)") ;
      //ScrollTrigger.getAll().forEach(ST => ST.disable());
    });
    
});

 