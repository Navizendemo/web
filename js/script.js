/* Navizen Prime website interactions — extracted from the original HTML. */
(function(){
  var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};

  /* mobile menu (drawer + accordions) */
  var mm=$('#mobileMenu'),ov=$('#overlay');
  function toggle(o){mm.classList.toggle('open',o);ov.classList.toggle('open',o);document.body.classList.toggle('no-scroll',o);$('#burger').setAttribute('aria-expanded',o?'true':'false')}
  $('#burger').addEventListener('click',function(){toggle(!mm.classList.contains('open'))});
  $('#closeMenu').addEventListener('click',function(){toggle(false)});
  ov.addEventListener('click',function(){toggle(false)});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')toggle(false)});
  $$('.mm-acc').forEach(function(acc){
    var btn=$('button',acc),sub=$('.mm-sub',acc);
    btn.addEventListener('click',function(){
      var open=acc.classList.contains('open');
      $$('.mm-acc.open').forEach(function(o){o.classList.remove('open');$('.mm-sub',o).style.maxHeight='0px';$('button',o).setAttribute('aria-expanded','false')});
      if(!open){acc.classList.add('open');sub.style.maxHeight=sub.scrollHeight+'px';btn.setAttribute('aria-expanded','true')}
    });
  });
  $$('a',mm).forEach(function(a){a.addEventListener('click',function(){toggle(false)})});
  window.addEventListener('resize',function(){if(window.innerWidth>1100)toggle(false)});

  /* desktop dropdowns: tap-to-open on touch devices */
  $$('.menu>li.has-dd>a').forEach(function(a){a.addEventListener('click',function(e){
    if(window.matchMedia('(hover:none)').matches){var li=a.parentNode,was=li.classList.contains('open');$$('.menu>li.open').forEach(function(o){o.classList.remove('open')});if(!was){e.preventDefault();li.classList.add('open')}}
  })});
  /* nested mobile accordion */
  $$('.mm-sub-acc').forEach(function(acc){
    var btn=$('button',acc),sub=$('.mm-subsub',acc),parent=acc.closest('.mm-sub');
    btn.addEventListener('click',function(){
      var open=acc.classList.contains('open');
      $$('.mm-sub-acc.open',parent).forEach(function(o){o.classList.remove('open');$('.mm-subsub',o).style.maxHeight='0px';$('button',o).setAttribute('aria-expanded','false')});
      if(!open){acc.classList.add('open');sub.style.maxHeight=sub.scrollHeight+'px';btn.setAttribute('aria-expanded','true')}
      parent.style.maxHeight=parent.scrollHeight+'px';
    });
  });
  /* desktop flyouts: tap-to-open on touch devices */
  $$('.menu .sub>.sub-t').forEach(function(a){a.addEventListener('click',function(e){
    if(window.matchMedia('(hover:none)').matches){var sb=a.parentNode,was=sb.classList.contains('open');$$('.menu .sub.open').forEach(function(o){o.classList.remove('open')});if(!was){e.preventDefault();sb.classList.add('open')}}
  })});
  document.addEventListener('click',function(e){if(!e.target.closest('.menu'))$$('.menu>li.open').forEach(function(o){o.classList.remove('open')})});


  /* hero slider */
  var slides=$$('.slide'),dots=$('#hDots'),idx=0,timer;
  var banner=$('.banner');
  var sliderPaused=false;

  // Create pagination dots
  slides.forEach(function(_,i){
    var b=document.createElement('button');
    b.setAttribute('aria-label','Slide '+(i+1));
    b.onclick=function(){go(i,true)};
    dots.appendChild(b);
  });

  // Change slide
  function go(i,reset){
    idx=(i+slides.length)%slides.length;

    slides.forEach(function(s,k){
      s.classList.toggle('active',k===idx);
    });

    $$('#hDots button').forEach(function(b,k){
      b.classList.toggle('active',k===idx);
    });

    if(reset) start();
  }

  // Start autoplay (8 seconds)
  function start(){
    clearInterval(timer);

    if(sliderPaused) return;

    timer=setInterval(function(){
      go(idx+1);
    },8000);
  }

  // Pause autoplay
  function pause(){
    sliderPaused=true;
    clearInterval(timer);
  }

  // Resume autoplay
  function resume(){
    sliderPaused=false;
    start();
  }

  // Previous and next buttons
  $('#hPrev').onclick=function(){
    go(idx-1,true);
  };

  $('#hNext').onclick=function(){
    go(idx+1,true);
  };

  // Pause carousel on mouse hover
  banner.addEventListener('mouseenter',pause);
  banner.addEventListener('mouseleave',resume);

  // Pause when keyboard focus enters banner
  banner.addEventListener('focusin',pause);
  banner.addEventListener('focusout',function(e){
    if(!banner.contains(e.relatedTarget)){
      resume();
    }
  });

  // Initialize slider
  go(0);
  start();

  /* swipe on touch screens */
  (function(){
    var bn=banner,x0=null;

    bn.addEventListener('touchstart',function(e){
      x0=e.touches[0].clientX;
    },{passive:true});

    bn.addEventListener('touchend',function(e){
      if(x0===null)return;

      var dx=e.changedTouches[0].clientX-x0;

      if(Math.abs(dx)>40){
        go(idx+(dx<0?1:-1),true);
      }

      x0=null;
    },{passive:true});
  })();



  /* form validation */
  var form=$('#leadForm');
  function setErr(el,bad){el.closest('.field').classList.toggle('err',bad);return bad}
  $('#fMobile').addEventListener('input',function(){this.value=this.value.replace(/\D/g,'')});
  form.addEventListener('submit',function(e){
    e.preventDefault();
    var bad=false;
    bad=setErr($('#fName'),$('#fName').value.trim().length<2)||bad;
    bad=setErr($('#fEmail'),!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($('#fEmail').value.trim()))||bad;
    bad=setErr($('#fMobile'),!/^[6-9]\d{9}$/.test($('#fMobile').value))||bad;
    bad=setErr($('#fClass'),!$('#fClass').value)||bad;
    bad=setErr($('#tmode'),!$('#tmode').value)||bad;
    bad=setErr($('#fPrep'),!$('#fPrep').value)||bad;
    bad=setErr($('#fcity'),$('#fcity').value.trim().length<2)||bad;
    if(bad)return;
    var data={};new FormData(form).forEach(function(v,k){data[k]=v});
    /* TODO: send `data` to your backend / CRM here, e.g. fetch('/api/leads',{method:'POST',body:JSON.stringify(data)}) */
    console.log('Lead submitted',data);
    $('#okMsg').textContent='Your '+data.test_mode+' request is received. Our counsellor will call you shortly.';
    $('.lead-card').classList.add('done');
  });
  $$('input,select',form).forEach(function(el){el.addEventListener('input',function(){el.closest('.field')&&el.closest('.field').classList.remove('err')})});

  /* course tabs */
  $$('.tab').forEach(function(tb){tb.onclick=function(){$$('.tab').forEach(function(x){x.classList.remove('active')});tb.classList.add('active');$$('.tab-panel').forEach(function(p){p.classList.remove('active')});$('#p-'+tb.dataset.t).classList.add('active')}});

  /* menu links that jump to a specific course tab */
  $$('a[data-tab]').forEach(function(a){a.addEventListener('click',function(){var t=$('.tab[data-t="'+a.dataset.tab+'"]');if(t)t.click()})});

  /* five pillars */
  $$('.pil-tab').forEach(function(tb){tb.addEventListener('click',function(){
    $$('.pil-tab').forEach(function(x){x.classList.remove('active')});tb.classList.add('active');
    $$('.pil-panel').forEach(function(x){x.classList.remove('active')});$('#pil-'+tb.dataset.p).classList.add('active');
  })});

  /* results slider */
  var tr=$('#rTrack');
  if(tr&&$('#rNext')&&$('#rPrev')){
    $('#rNext').onclick=function(){tr.scrollBy({left:tr.clientWidth*.6,behavior:'smooth'})};
    $('#rPrev').onclick=function(){tr.scrollBy({left:-tr.clientWidth*.6,behavior:'smooth'})};
  }

  /* testimonials */
  var ti=$$('.t-item'),td=$('#tDots'),tIdx=0;
  ti.forEach(function(_,i){var b=document.createElement('button');b.setAttribute('aria-label','Testimonial '+(i+1));b.onclick=function(){showT(i)};td.appendChild(b)});
  function showT(i){tIdx=i;ti.forEach(function(x,k){x.classList.toggle('active',k===i)});$$('button',td).forEach(function(b,k){b.classList.toggle('active',k===i)})}
  showT(0);setInterval(function(){showT((tIdx+1)%ti.length)},6000);

  /* FAQ accordion */
  $$('.faq').forEach(function(f){var a=$('.ans',f);$('button',f).onclick=function(){var open=f.classList.contains('open');$$('.faq.open').forEach(function(o){o.classList.remove('open');$('.ans',o).style.maxHeight=0});if(!open){f.classList.add('open');a.style.maxHeight=a.scrollHeight+'px'}}});

  /* counters */
  var cs=$$('[data-count]'),seen=false;
  function run(){cs.forEach(function(c){var end=+c.dataset.count,suf=c.dataset.suffix||'',st=null;function step(ts){st=st||ts;var p=Math.min((ts-st)/1400,1);c.textContent=Math.floor(end*p).toLocaleString('en-IN')+suf;if(p<1)requestAnimationFrame(step)}requestAnimationFrame(step)})}
  if('IntersectionObserver' in window){new IntersectionObserver(function(en,ob){if(en[0].isIntersecting&&!seen){seen=true;run();ob.disconnect()}},{threshold:.4}).observe($('.stats'))}else{run()}

  var CFG={testHourLocal:10}; /* test start hour (24h, local) – edit as needed */
/* next 4 Sundays */
  var days=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],mons=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  function nextSunday(from){var d=new Date(from);d.setHours(CFG.testHourLocal,0,0,0);var add=(7-d.getDay())%7;d.setDate(d.getDate()+add);if(d<=from)d.setDate(d.getDate()+7);return d}
  var first=nextSunday(new Date()),sel=$('#dt');
  for(var i=0;sel&&i<4;i++){var d=new Date(first);d.setDate(first.getDate()+7*i);var lab=days[d.getDay()]+', '+d.getDate()+' '+mons[d.getMonth()]+' '+d.getFullYear();var o=document.createElement('option');o.value=lab;o.textContent=lab+' • '+CFG.testHourLocal+':00 AM';sel.appendChild(o)}
})();
