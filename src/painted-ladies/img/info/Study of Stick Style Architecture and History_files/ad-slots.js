!function(){"use strict";window.googletag=window.googletag||{cmd:[]};const e=(i=location.pathname,t="/"==i.charAt(0)?1:0,g=i.length,"/"==i.charAt(g-1)&&(g-=1),i.substring(t,g));var i,t,g;const a="/"===e?"home":e,o=[],n=[],d={},s=["","7222","OHO",a].join("/");function p(e,i,t){const g=googletag.defineSlot(s,t.s,e);void 0!==t.d&&g.defineSizeMapping(t.d),g.addService(googletag.pubads()),g.setTargeting("pos",[i])}function l(e,i,t=!1){d[e]={repeat:t,pos:e,mapping:i}}function r(e){var i=document.getElementById(e);return i&&null!==i.offsetParent}googletag.cmd.push((function(){const e=googletag.pubads();e.enableSingleRequest(),e.collapseEmptyDivs(),e.setTargeting("page",[a]),e.setTargeting("category",o),e.setTargeting("tag",n);const i={s:[[970,90],[728,90],[970,250],[320,50]],d:googletag.sizeMapping().addSize([1200,200],[[970,90],[970,250],[728,90]]).addSize([768,200],[728,90]).addSize([0,0],[320,50]).build()},t={s:[[970,90],[728,90],[320,50]],d:googletag.sizeMapping().addSize([1200,200],[[970,90],[728,90]]).addSize([768,200],[728,90]).addSize([0,0],[320,50]).build()},g={s:[[300,600],[300,250]],d:googletag.sizeMapping().addSize([1200,200],[[300,600],[300,250]]).addSize([768,200],[300,250]).addSize([0,0],[]).build()};l("header",i),l("footer",t),l("gallery-top",i),l("gallery-right",g),l("right-rail",g,!0),l("right-rail-sticky",g,!0),l("instream",{s:[300,250]},!0),googletag.enableServices()})),window.addEventListener("load",(function(){for(const e of function*(){for(var e in d){let t=d[e];if(t.repeat)for(var i=1;;){let g="gpt-"+e+"-"+i;if(!r(g))break;yield{id:g,pos:t.pos,mapping:t.mapping},i+=1}else{let i="gpt-"+e;r(i)&&(yield{id:i,pos:t.pos,mapping:t.mapping})}}}())p(e.id,e.pos,e.mapping),googletag.cmd.push((function(){googletag.display(e.id)}))}))}();