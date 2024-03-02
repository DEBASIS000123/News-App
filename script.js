const API_KEY="ce2023f1d56e42fdb2d9939836acc26f";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener("load",()=>displayNews("India"));

async function displayNews(about){
  const result=await fetch(`${url}${about}&apiKey=${API_KEY}`);
  const data=await result.json();
  renderdata(data.articles);
}

function reload(){
  window.location.reload;
}
function renderdata(article){
  const cardscontainer=document.getElementById("cards-container");
  const templatenewscard=document.getElementById("template-news-card");
  cardscontainer.innerHTML="";
  article.forEach((articles)=>{
    if(!articles.urlToImage){return};
    const cardClone=templatenewscard.content.cloneNode(true);
    cardCloneData(cardClone,articles);
    cardscontainer.appendChild(cardClone);
  })
}

function cardCloneData(cardClone,articles){
  const imageel=cardClone.getElementById("newsImage");
  const titleel=cardClone.getElementById("news-title");
  const newssourceel=cardClone.getElementById("news-source");
  const carddescel=cardClone.getElementById("news-desc");

  const date=new Date(articles.publishedAt).toLocaleString("en-US",{timeZone:"Asia/Jakarta"});

  imageel.src=articles.urlToImage;
  titleel.innerHTML=articles.title;
  newssourceel.innerHTML=`${articles.source.name} ⁌ ${date}`;
  carddescel.innerHTML=articles.description;

  cardClone.firstElementChild.addEventListener("click",()=>{
    window.open(articles.url,"_blank");
  });
}

let activeclass=null;
function createnews(id){
  displayNews(id);
  const navItem=document.getElementById(id);
  activeclass?.classList.remove('active');
  activeclass=navItem;
  navItem.classList.add('active');
}

const searchbtn=document.getElementById("search-btn");
const inputdata=document.getElementById("search-text");

searchbtn.addEventListener('click',()=>{
  const inputdatavalue=inputdata.value;
  if(!inputdatavalue){return};
  activeclass?.classList.remove('active');
  activeclass=null;
  displayNews(inputdatavalue);
});




