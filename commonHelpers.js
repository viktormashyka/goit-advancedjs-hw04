import{a as f,i as c,S as w}from"./assets/vendor-5f0e12e0.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const $="29782836-0cb6e5c5167e525a8102df66c";f.defaults.baseURL="https://pixabay.com/api/";async function k(n,t){const o=`?key=${$}&q=${n}&image_type=photo&orientation=horizontal&safesearch=true&page=${t}&per_page=40
  `,{data:s}=await f.get(o);return s}const g=document.querySelector("form#search-form"),h=document.querySelector(".gallery"),p=document.querySelector(".loader"),a=document.querySelector(".error"),d=document.querySelector(".load-more");var y;let l="",u=1,m=0;g.addEventListener("submit",S);d.addEventListener("click",q);async function b(n,t){try{return await k(n,t)}catch(o){console.log(o),a.classList.remove("hidden")}finally{p.classList.add("hidden")}}async function S(n){if(n.preventDefault(),l=n.target.elements.searchQuery.value.trim(),l===""){c.info({theme:"green",position:"topRight",message:"Input field couldn't be empty. Please, enter search name."});return}d.classList.add("hidden"),a.classList.add("hidden"),p.classList.remove("hidden"),h.innerHTML="",u=1;try{const o=await b(l,u),{hits:s,totalHits:e}=o;if(m=e-s.length,s.length<1){c.error({theme:"red",position:"topRight",message:"Sorry, there are no images matching your search query. Please try again."});return}m>0&&d.classList.remove("hidden"),c.success({theme:"green",position:"topRight",message:`Hooray! We found ${e} images.`}),o.hits.map(r=>{const i=L(r);h.insertAdjacentHTML("beforeend",i)}).join(""),y=new w(".gallery a",{captions:!0,captionPosition:"bottom",captionDelay:250}),g.reset()}catch(o){console.log(o),a.classList.remove("hidden")}}async function q(n){n.preventDefault(),a.classList.add("hidden"),p.classList.remove("hidden"),u+=1;try{const t=await b(l,u),{hits:o}=t;m-=o.length,m<=0&&(c.info({theme:"green",position:"topRight",message:"We're sorry, but you've reached the end of search results."}),d.classList.add("hidden")),t.hits.map(s=>{const e=L(s);h.insertAdjacentHTML("beforeend",e)}).join(""),y.refresh()}catch(t){console.log(t),a.classList.remove("hidden")}}function L(n){const{largeImageURL:t,webformatURL:o,tags:s,likes:e,views:r,comments:i,downloads:v}=n;return`
      <div class="photo-card">
        <a class="photo-link" href="${t}">
          <div class="photo-content-wrapper">
            <div photo-image-wrapper>
              <img
                class="photo-image"
                src="${o}"
                alt="${s}"
                title="${s}"
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
                ${r}
              </p>
              <p class="info-item">
                <b>Comments</b>
                <br />
                ${i}
              </p>
              <p class="info-item">
                <b>Downloads</b>
                <br />
                ${v}
              </p>
            </div>
          </div>
        </a>
      </div>
`}
//# sourceMappingURL=commonHelpers.js.map
