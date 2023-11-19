import{a as d}from"./assets/vendor-a61d8330.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function n(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(e){if(e.ep)return;e.ep=!0;const o=n(e);fetch(e.href,o)}})();const u="29782836-0cb6e5c5167e525a8102df66c";d.defaults.baseURL="https://pixabay.com/api/";async function f(s){const t=`?key=${u}&q=${s}&image_type=photo&orientation=horizontal&safesearch=true
  `,{data:n}=await d.get(t);return n}const m=document.querySelector("form#search-form"),i=document.querySelector(".gallery"),a=document.querySelector(".loader"),l=document.querySelector(".error");m.addEventListener("submit",p);async function y(s){try{i.classList.add("hidden"),l.classList.add("hidden"),a.classList.remove("hidden");const t=await f(s);return t&&i.classList.remove("hidden"),t}catch(t){console.log(t),l.classList.remove("hidden")}finally{a.classList.add("hidden")}}function p(s){var n;s.preventDefault();const t=(n=s.target[0])==null?void 0:n.value;console.log("query: ",t),y(t).then(r=>{console.log("photosData by query: ",r),r.hits.map(e=>{const o=`<div class="photo-card">
    <img src=${e.webformatURL} alt=${e.tags} loading="lazy" style={{
        display: block,
        width: 350px, 
        hight: 'auto'}}/>
    <div class="info">
        <p class="info-item">
            <b>Likes</b>
            <p>${e.likes}</p>
        </p>
            <p class="info-item">
        <b>Views</b>
        <p>${e.views}</p>
        </p>
        <p class="info-item">
            <b>Comments</b>
            <p>${e.comments}</p>
        </p>
        <p class="info-item">
            <b>Downloads</b>
            <p>${e.downloads}</p>
        </p>
    </div>
</div>`;e&&i.classList.remove("hidden"),i.insertAdjacentHTML("afterend",o)})}).catch(r=>{console.log(r)})}
//# sourceMappingURL=commonHelpers.js.map
