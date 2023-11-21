import{a as p,i as c,S as v}from"./assets/vendor-5f0e12e0.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const $="29782836-0cb6e5c5167e525a8102df66c";p.defaults.baseURL="https://pixabay.com/api/";async function w(n,o){const s=`?key=${$}&q=${n}&image_type=photo&orientation=horizontal&safesearch=true&page=${o}&per_page=40
  `,{data:r}=await p.get(s);return r}const g=document.querySelector("form#search-form"),h=document.querySelector(".gallery"),f=document.querySelector(".loader"),a=document.querySelector(".error"),l=document.querySelector(".load-more");var y;let k="",d=1,u=0;g.addEventListener("submit",q);l.addEventListener("click",S);async function b(n,o){try{return await w(n,o)}catch(s){console.log(s),a.classList.remove("hidden")}finally{f.classList.add("hidden")}}async function q(n){n.preventDefault();const s=n.target.elements.searchQuery.value;if(s===""){c.info({theme:"green",position:"topRight",message:"Input field couldn't be empty. Please, enter search name."});return}l.classList.add("hidden"),a.classList.add("hidden"),f.classList.remove("hidden"),h.innerHTML="",d=1,b(s,d).then(r=>{const{hits:e,totalHits:t}=r;if(u=t-e.length,e.length<1){c.error({theme:"red",position:"topRight",message:"Sorry, there are no images matching your search query. Please try again."});return}u>0&&l.classList.remove("hidden"),c.success({theme:"green",position:"topRight",message:`Hooray! We found ${t} images.`}),r.hits.map(i=>{const m=L(i);h.insertAdjacentHTML("beforeend",m)}).join(""),y=new v(".gallery a",{captions:!0,captionPosition:"bottom",captionDelay:250}),g.reset()}).catch(r=>{console.log(r),a.classList.remove("hidden")})}function S(n){n.preventDefault(),a.classList.add("hidden"),f.classList.remove("hidden"),d+=1,b(k,d).then(o=>{const{hits:s}=o;u-=s.length,u<=0&&(c.info({theme:"green",position:"topRight",message:"We're sorry, but you've reached the end of search results."}),l.classList.add("hidden")),o.hits.map(r=>{const e=L(r);h.insertAdjacentHTML("beforeend",e)}).join(""),y.refresh()}).catch(o=>{console.log(o),a.classList.remove("hidden")})}function L(n){const{largeImageURL:o,webformatURL:s,tags:r,likes:e,views:t,comments:i,downloads:m}=n;return`
      <div class="photo-card">
        <a class="photo-link" href="${o}">
          <div class="photo-content-wrapper">
            <div photo-image-wrapper>
              <img
                class="photo-image"
                src="${s}"
                alt="${r}"
                title="${r}"
                loading="lazy"
              />
            </div>
            <div class="info">
              <p class="info-item">
                <b>Likes</b>
                <br />
                ${e}
              </p>
              <p class="info-item">
                <b>Views</b>
                <br />
                ${t}
              </p>
              <p class="info-item">
                <b>Comments</b>
                <br />
                ${i}
              </p>
              <p class="info-item">
                <b>Downloads</b>
                <br />
                ${m}
              </p>
            </div>
          </div>
        </a>
      </div>
`}
//# sourceMappingURL=commonHelpers.js.map
