/* Navizen Prime — shared header, footer and behaviours.
   Edit the menu, phone number or footer ONCE here and every internal page updates. */
(function(){
  var PHONE='7377-73-7790',TEL='tel:7377737790',EMAIL='info@navizenprime.com';
  var HOME='index.html'; /* rename horizon-prime-ver3.html to index.html, or change this link */
  var LOGO='<img src="images/logo.svg" alt="Navizen Prime Logo" class="logo-image">';
  var CHEV='<svg class="chv" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>';
  /* Courses → category → classes. Edit here once; every page updates. */
  var COURSES=[
    ['IITJEE Prep','courses.html#jee',['Class 11+12','Class 12','Class XII Completed']],
    ['NEET Prep','courses.html#neet',['Class 11+12','Class 12','Class XII Completed']],
    ['Olympiads','courses.html',['Mathematics','Junior Science','Physics','Chemistry','Astronomy','Green']],
    ['Foundation (9-10)','courses.html#foundation',['Class 9','Class 10','Class 9+10']],
    ['Pre-Foundation (6-8)','courses.html#foundation',['Class 6','Class 7','Class 8','Class 7+8']]
  ];
  var MODES=['Pure Offline','Pure Online','Hybrid'];
  var MORE=[['About Us','about.html'],['Careers','#'],['News','#'],['Notifications','#'],['Blogs','#'],['Contact Us','contact.html']];
  function A(l,h){return '<a href="'+h+'">'+l+'</a>'}
  function deskCourses(){return COURSES.map(function(c){return '<div class="sub"><a class="sub-t" href="'+c[1]+'">'+c[0]+' '+CHEV+'</a><div class="sub-m">'+c[2].map(function(k){return A(k,c[1])}).join('')+'</div></div>'}).join('')}
  function mobCourses(){return COURSES.map(function(c){return '<div class="mm-sub-acc"><button type="button" aria-expanded="false">'+c[0]+'</button><div class="mm-subsub">'+c[2].map(function(k){return A(k,c[1])}).join('')+'</div></div>'}).join('')}
  function modeLinks(){return MODES.map(function(m){return A(m,HOME+'#modes')}).join('')}
  function moreLinks(){return MORE.map(function(m){return A(m[0],m[1])}).join('')}
  function links(a){return a.map(function(x){return '<a href="'+x[1]+'">'+x[0]+'</a>'}).join('')}
  var page=document.body.getAttribute('data-page')||'';
  function act(k){return page===k?' class="active"':''}

  var header='<div class="topbar"><div class="container"><div class="tb-left"><a href="'+TEL+'" class="tf">📞 Toll Free: '+PHONE+'</a><a href="mailto:'+EMAIL+'">✉ '+EMAIL+'</a></div><div class="tb-right"><span class="pulse"></span><span>Admissions open for 2027 batches • Scholarship test every Sunday</span></div></div></div>'
  +'<header class="site"><div class="container nav"><a href="'+HOME+'" class="logo" aria-label="Navizen Prime home">'+LOGO+'</a>'
  +'<ul class="menu"><li class="has-dd"><a href="courses.html"'+act('courses')+'>Courses <span class="caret">▾</span></a><div class="dd">'+deskCourses()+'</div></li>'
  +'<li class="has-dd"><a href="'+HOME+'#modes">Learning Modes <span class="caret">▾</span></a><div class="dd">'+modeLinks()+'</div></li>'
  +'<li><a href="'+HOME+'#programs">School Integrated Program</a></li><li><a href="'+HOME+'#about">Why Choose Us</a></li>'
  +'<li class="has-dd"><a href="about.html"'+((page==='about'||page==='contact')?' class="active"':'')+'>More <span class="caret">▾</span></a><div class="dd">'+moreLinks()+'</div></li></ul>'
  +'<div class="nav-actions"><a href="contact.html#enquire" class="btn btn-primary">Book Free Counselling →</a><button class="burger" id="burger" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button></div></div></header>'
  +'<div class="overlay" id="overlay"></div>'
  +'<nav class="mobile-menu" id="mobileMenu" aria-label="Mobile menu"><div class="mm-head"><b class="mm-title">Menu</b><button class="close" id="closeMenu" aria-label="Close menu">×</button></div>'
  +'<div class="mm-acc"><button type="button" aria-expanded="false">Courses</button><div class="mm-sub">'+mobCourses()+'</div></div>'
  +'<div class="mm-acc"><button type="button" aria-expanded="false">Learning Modes</button><div class="mm-sub">'+modeLinks()+'</div></div>'
  +'<a class="mm-link" href="'+HOME+'#programs">School Integrated Program</a><a class="mm-link" href="'+HOME+'#about">Why Choose Us</a>'
  +'<div class="mm-acc"><button type="button" aria-expanded="false">More</button><div class="mm-sub">'+moreLinks()+'</div></div>'
  +'<a class="btn btn-primary btn-block" href="contact.html#enquire" style="margin-top:18px">Book Free Counselling →</a><a class="mm-tf" href="'+TEL+'">📞 Toll Free: '+PHONE+'</a></nav>';

  var footer='<footer><div class="container"><div class="f-grid"><div><a href="'+HOME+'" class="logo"><img src="images/white-logo.svg" alt="Navizen Prime Logo" class="logo-image"></a><div class="social" style="margin-top:10px;"><a href="#" aria-label="YouTube">YT</a><a href="#" aria-label="Instagram">IG</a><a href="#" aria-label="Facebook">FB</a><a href="#" aria-label="LinkedIn">in</a><a href="#" aria-label="Telegram">TG</a></div></div>'
  +'<div><h5>Courses</h5><ul><li><a href="courses.html#jee">JEE Main + Advanced</a></li><li><a href="courses.html#neet">NEET</a></li><li><a href="courses.html#foundation">Foundation (6–10)</a></li><li><a href="courses.html#boards">Class 11–12</a></li></ul></div>'
  +'<div><h5>Free Resources</h5><ul><li><a href="syllabus.html">Syllabus</a></li><li><a href="study-material.html">Study Material</a></li><li><a href="previous-year-papers.html">Previous Year Papers</a></li><li><a href="resources.html">All Resources</a></li></ul></div>'
  +'<div><h5>Quick Links</h5><ul><li><a href="about.html">About Us</a></li><li><a href="contact.html#centres">Our Centres</a></li><li><a href="'+HOME+'#results">Results</a></li><li><a href="contact.html">Contact Us</a></li></ul></div>'
  +'<div><h5>Stay Connected</h5><a href="contact.html#enquire" class="btn btn-primary">Book Free Counselling →</a><a href="'+TEL+'" class="f-tf">📞 '+PHONE+'</a><small>Toll Free • Mon–Sun, 9 AM – 7 PM</small></div></div>'
  +'<div class="f-bottom"><span>© 2026 Navizen Prime. All rights reserved.</span><span><a href="#">Privacy Policy</a> &nbsp;|&nbsp; <a href="#">Terms &amp; Conditions</a></span></div></div></footer>'
  +'<div class="float-call"><a class="fc1" href="https://wa.me/917377737790" aria-label="WhatsApp">💬</a><a class="fc2" href="'+TEL+'" aria-label="Call toll free">📞</a></div>';

  var h=document.getElementById('site-header'),f=document.getElementById('site-footer');
  if(h)h.innerHTML=header;if(f)f.innerHTML=footer;

  var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};

  /* mobile menu */
  var mm=$('#mobileMenu'),ov=$('#overlay');
  function toggle(o){mm.classList.toggle('open',o);ov.classList.toggle('open',o);document.body.classList.toggle('no-scroll',o);$('#burger').setAttribute('aria-expanded',o?'true':'false')}
  $('#burger').addEventListener('click',function(){toggle(!mm.classList.contains('open'))});
  $('#closeMenu').addEventListener('click',function(){toggle(false)});
  ov.addEventListener('click',function(){toggle(false)});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')toggle(false)});
  $$('.mm-acc').forEach(function(acc){var b=$('button',acc),s=$('.mm-sub',acc);
    b.addEventListener('click',function(){var o=acc.classList.contains('open');
      $$('.mm-acc.open').forEach(function(x){x.classList.remove('open');$('.mm-sub',x).style.maxHeight='0px';$('button',x).setAttribute('aria-expanded','false')});
      if(!o){acc.classList.add('open');s.style.maxHeight=s.scrollHeight+'px';b.setAttribute('aria-expanded','true')}})});
  $$('a',mm).forEach(function(a){a.addEventListener('click',function(){toggle(false)})});
  window.addEventListener('resize',function(){if(window.innerWidth>1100)toggle(false)});
  $$('.menu>li.has-dd>a').forEach(function(a){a.addEventListener('click',function(e){
    if(window.matchMedia('(hover:none)').matches){var li=a.parentNode,was=li.classList.contains('open');$$('.menu>li.open').forEach(function(x){x.classList.remove('open')});if(!was){e.preventDefault();li.classList.add('open')}}})});
  /* nested mobile accordion (Courses → category → classes) */
  $$('.mm-sub-acc').forEach(function(acc){var b=$('button',acc),s=$('.mm-subsub',acc),par=acc.closest('.mm-sub');
    b.addEventListener('click',function(){var o=acc.classList.contains('open');
      $$('.mm-sub-acc.open',par).forEach(function(x){x.classList.remove('open');$('.mm-subsub',x).style.maxHeight='0px';$('button',x).setAttribute('aria-expanded','false')});
      if(!o){acc.classList.add('open');s.style.maxHeight=s.scrollHeight+'px';b.setAttribute('aria-expanded','true')}
      par.style.maxHeight=par.scrollHeight+'px'})});
  /* desktop flyouts: tap-to-open on touch devices */
  $$('.menu .sub>.sub-t').forEach(function(a){a.addEventListener('click',function(e){
    if(window.matchMedia('(hover:none)').matches){var sb=a.parentNode,was=sb.classList.contains('open');$$('.menu .sub.open').forEach(function(x){x.classList.remove('open')});if(!was){e.preventDefault();sb.classList.add('open')}}})});
  document.addEventListener('click',function(e){if(!e.target.closest('.menu'))$$('.menu>li.open').forEach(function(x){x.classList.remove('open')})});

  /* accordions (.acc) */
  window.initAcc=function(root){$$('.acc',root).forEach(function(a){var b=$('button',a),n=$('.ans',a);if(a._i)return;a._i=1;
    b.addEventListener('click',function(){var o=a.classList.contains('open');
      $$('.acc.open',a.parentNode).forEach(function(x){x.classList.remove('open');$('.ans',x).style.maxHeight=0});
      if(!o){a.classList.add('open');n.style.maxHeight=n.scrollHeight+'px'}})})};
  initAcc();

  /* counters */
  var cs=$$('[data-count]');
  if(cs.length){var seen=false;function run(){cs.forEach(function(c){var end=+c.dataset.count,suf=c.dataset.suffix||'',st=null;function step(ts){st=st||ts;var p=Math.min((ts-st)/1400,1);c.textContent=Math.floor(end*p).toLocaleString('en-IN')+suf;if(p<1)requestAnimationFrame(step)}requestAnimationFrame(step)})}
    if('IntersectionObserver' in window){new IntersectionObserver(function(en,ob){if(en[0].isIntersecting&&!seen){seen=true;run();ob.disconnect()}},{threshold:.4}).observe(cs[0].closest('.stats')||cs[0])}else run()}

  /* generic validated form: <form data-lead> */
  $$('form[data-lead]').forEach(function(form){
    var card=form.closest('.form-card');
    var mob=$('[name=mobile]',form);if(mob)mob.addEventListener('input',function(){this.value=this.value.replace(/\D/g,'')});
    function bad(el,b){el.closest('.field').classList.toggle('err',b);return b}
    form.addEventListener('submit',function(e){e.preventDefault();var x=false;
      $$('[required]',form).forEach(function(el){var v=el.value.trim(),b=!v;
        if(el.name==='email'&&v)b=!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        if(el.name==='mobile')b=!/^[6-9]\d{9}$/.test(v);
        if(el.name==='name')b=v.length<2;
        if(bad(el,b))x=true});
      if(x)return;
      var data={};new FormData(form).forEach(function(v,k){data[k]=v});
      /* TODO: send `data` to your backend / CRM, e.g. fetch('/api/leads',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)}) */
      console.log('Lead submitted',data);
      card.classList.add('done')});
    $$('input,select,textarea',form).forEach(function(el){el.addEventListener('input',function(){el.closest('.field').classList.remove('err')})});
  });
})();
