"use strict";!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version="2.0";n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,"script","https://connect.facebook.net/en_US/fbevents.js");fbq("init","1397247997268188");fbq("init","1567222666695693");var pixels={"www.woodsmithplans.com":"1594260177336074","woodsmithplans.foxycart.com":"1594260177336074","www.cabinlife.com":"836042587360126"};if(pixels.hasOwnProperty(window.location.hostname)){fbq("init",pixels[window.location.hostname])}fbq("track","PageView");function getURLParameter(name){return decodeURIComponent((new RegExp("[?|&]"+name+"="+"([^&;]+?)(&|#|;|$)").exec(location.search)||[,""])[1].replace(/\+/g,"%20"))||null}function fbqTrackPurchases(){if(typeof fbq!=="undefined"){if(window.location.pathname=="/cart"&&typeof fc_json!=="undefined"&&fc_json.hasOwnProperty("products")){fbq("track","AddToCart",{content_ids:fc_json.products[fc_json.products.length-1]["code"],content_type:"product",value:fc_json.products[fc_json.products.length-1]["price_each"],currency:"USD"})}else if(window.location.pathname=="/cart"&&typeof FC!=="undefined"&&FC.hasOwnProperty("json")&&FC.json.hasOwnProperty("items")){fbq("track","AddToCart",{content_ids:FC.json.items[FC.json.items.length-1]["code"],content_type:"product",value:FC.json.items[FC.json.items.length-1]["price_each"],currency:"USD"})}else if(window.location.pathname=="/checkout.php"||getURLParameter("sectionId")=="ysco.shipping"){fbq("track","InitiateCheckout")}else if(window.location.pathname=="/receipt"&&typeof fc_json!="undefined"&&fc_json.hasOwnProperty("products")&&fc_json.hasOwnProperty("total_price")){fbq("track","Purchase",{content_ids:Object.keys(fc_json.products).map(function(key){return fc_json.products[key]["code"]}),content_type:"product",value:fc_json.total_price,currency:"USD"})}else if(window.location.pathname=="/receipt"&&typeof FC!="undefined"&&FC.hasOwnProperty("json")&&FC.json.hasOwnProperty("items")&&FC.json.hasOwnProperty("total_order")){fbq("track","Purchase",{content_ids:Object.keys(FC.json.items).map(function(key){return FC.json.items[key]["code"]}),content_type:"product",value:FC.json.total_order,currency:"USD"})}else if(getURLParameter("sectionId")=="ysco.confirm"&&typeof codes!=="undefined"&&typeof orderTotal!=="undefined"){fbq("track","Purchase",{content_ids:codes,content_type:"product",value:orderTotal,currency:"USD"})}else if(typeof orderTotal!="undefined"&&typeof productSkus!="undefined"){var value=orderTotal;if(typeof cds_pay_type!=="undefined"&&cds_pay_type=="6"){value=0}fbq("track","Purchase",{content_ids:productSkus,content_type:"product",value:value,currency:"USD"})}}}if(["interactive","complete","loaded"].indexOf(document.readyState)!=-1){fbqTrackPurchases()}else{window.addEventListener("DOMContentLoaded",function(event){fbqTrackPurchases()})}