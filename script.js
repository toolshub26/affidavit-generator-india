/* =========================================
AGI ULTRA PRO v18 ENTERPRISE 🚀
FULL FIXED ENTERPRISE SCRIPT
ULTIMATE FINAL VERSION
PWA + SIGNATURE + PURPOSE + MOBILE FIX
========================================= */

/* =========================================
GLOBAL CONFIG
========================================= */

const AGI = {

premium:false,
premiumCode:"INDIA49",
docPrefix:"IND-AFF-",
version:"v18 ENTERPRISE FINAL"

};

/* =========================================
GLOBAL VARIABLES
========================================= */

let signaturePad = null;
let deferredPrompt = null;

/* =========================================
GET ELEMENT VALUE
========================================= */

function getVal(id){

const el =
document.getElementById(id);

if(!el) return "";

return String(el.value || "").trim();

}

/* =========================================
TOAST
========================================= */

function showToast(msg){

const oldToast =
document.querySelector(".agi-toast");

if(oldToast){
oldToast.remove();
}

const toast =
document.createElement("div");

toast.className =
"agi-toast";

toast.innerText = msg;

toast.style.position = "fixed";
toast.style.bottom = "20px";
toast.style.left = "20px";
toast.style.background = "#111827";
toast.style.color = "white";
toast.style.padding = "14px 18px";
toast.style.borderRadius = "14px";
toast.style.zIndex = "999999";
toast.style.fontWeight = "700";
toast.style.boxShadow =
"0 10px 25px rgba(0,0,0,.3)";
toast.style.maxWidth = "300px";

document.body.appendChild(toast);

setTimeout(()=>{

toast.remove();

},3000);

}

/* =========================================
LOADER
========================================= */

function showLoader(){

const loader =
document.getElementById(
"globalLoader"
);

if(loader){

loader.style.display =
"flex";

}

}

function hideLoader(){

const loader =
document.getElementById(
"globalLoader"
);

if(loader){

loader.style.display =
"none";

}

}

/* =========================================
CLOCK
========================================= */

function startClock(){

const clock =
document.getElementById(
"liveClock"
);

if(!clock) return;

setInterval(()=>{

clock.innerHTML =
new Date()
.toLocaleString();

},1000);

}

/* =========================================
SIGNATURE PAD PERFECT FIX
========================================= */

function resizeSignatureCanvas(){

const canvas =
document.getElementById(
"signaturePad"
);

if(!canvas) return;

const ratio =
Math.max(window.devicePixelRatio || 1,1);

canvas.width =
canvas.offsetWidth * ratio;

canvas.height =
220 * ratio;

canvas.style.width =
"100%";

canvas.style.height =
"220px";

const ctx =
canvas.getContext("2d");

ctx.scale(ratio,ratio);

}

function initializeSignaturePad(){

const canvas =
document.getElementById(
"signaturePad"
);

if(
canvas &&
typeof SignaturePad !==
"undefined"
){

resizeSignatureCanvas();

signaturePad =
new SignaturePad(canvas,{

backgroundColor:
"white",

penColor:
"black",

minWidth:1,
maxWidth:2.5

});

window.addEventListener(
"resize",
()=>{

const data =
signaturePad.toData();

resizeSignatureCanvas();

signaturePad.clear();

signaturePad.fromData(data);

});

}

}

function clearSignaturePad(){

if(signaturePad){

signaturePad.clear();

showToast(
"Signature Cleared ✔"
);

}

}

/* =========================================
DOC ID
========================================= */

function generateDocID(){

const d =
new Date()
.toISOString()
.slice(0,10)
.replace(/-/g,"");

const r =
Math.random()
.toString(36)
.substring(2,7)
.toUpperCase();

return `${AGI.docPrefix}${d}-${r}`;

}

/* =========================================
GENERATE AFFIDAVIT
========================================= */

function generateAffidavit(){

try{

showLoader();

const preview =
document.getElementById(
"previewArea"
);

if(!preview){

hideLoader();

showToast(
"Preview area missing ❌"
);

return;

}

const data = {

name:getVal("name"),
father:getVal("father"),
age:getVal("age"),
address:getVal("address"),
details:getVal("details"),
place:getVal("place"),
date:getVal("date"),
purpose:getVal("purposeType"),
lang:getVal("lang")

};

if(
!data.name ||
!data.father ||
!data.age
){

hideLoader();

showToast(
"Fill required fields ❌"
);

return;

}

const docID =
generateDocID();

let signatureHTML = "";

if(
signaturePad &&
!signaturePad.isEmpty()
){

signatureHTML = `

<div style="
margin-top:30px;
display:flex;
justify-content:flex-start;
align-items:flex-start;
">

<img
src="${signaturePad.toDataURL()}"
style="
height:90px;
max-width:240px;
object-fit:contain;
display:block;
">

</div>

`;

}

preview.innerHTML = `

<div class="stamp">
₹10
</div>

<div class="meezan-logo">
⚖️ MEEZAN LEGAL SERVICES
</div>

<div class="title">
AFFIDAVIT
</div>

<div class="subtitle">
BEFORE THE NOTARY PUBLIC
</div>

<div class="preview-content">

<p>

I,
<b>${data.name}</b>,
S/o
<b>${data.father}</b>,
aged about
<b>${data.age}</b>
years,
resident of
<b>${data.address}</b>.

</p>

<p>

${data.details || "Affidavit details not provided."}

</p>

<p>

Purpose:
<b>${data.purpose || "General Affidavit"}</b>

</p>

<p>

Place:
<b>${data.place}</b>

</p>

<p>

Date:
<b>${data.date}</b>

</p>

${signatureHTML}

<div id="qrCodeContainer"
style="
margin-top:30px;
display:flex;
justify-content:center;
">
</div>

<div class="doc-id">

${docID}

</div>

</div>

`;

generateQRCode(docID);

saveHistory(
docID,
data.name,
data.purpose,
data.date
);

updateAnalytics();

hideLoader();

showToast(
"Affidavit Generated ✔"
);

}catch(err){

console.log(err);

hideLoader();

showToast(
"Generation Failed ❌"
);

}

}

/* =========================================
QR CODE
========================================= */

function generateQRCode(docID){

const qr =
document.getElementById(
"qrCodeContainer"
);

if(!qr) return;

qr.innerHTML = "";

if(typeof QRCode==="undefined"){

showToast(
"QR Library Missing ❌"
);

return;

}

new QRCode(qr,{

text:
location.origin +
"/verify.html?id=" +
docID,

width:140,
height:140

});

}

/* =========================================
PDF
========================================= */

function downloadPDF(){

const area =
document.getElementById(
"previewArea"
);

if(!area){

showToast(
"Nothing to export ❌"
);

return;

}

html2pdf()
.set({

margin:5,
filename:"Affidavit.pdf",
image:{type:"jpeg",quality:1},
html2canvas:{scale:2},
jsPDF:{unit:"mm",format:"a4"}

})
.from(area)
.save();

}

/* =========================================
PNG EXPORT
========================================= */

function exportPNG(){

const area =
document.getElementById(
"previewArea"
);

if(!area){

showToast(
"Nothing to export ❌"
);

return;

}

html2canvas(area)
.then(canvas=>{

const link =
document.createElement("a");

link.download =
"affidavit.png";

link.href =
canvas.toDataURL();

link.click();

});

}

/* =========================================
WHATSAPP
========================================= */

function shareWhatsApp(){

const area =
document.getElementById(
"previewArea"
);

if(!area) return;

const text =
area.innerText;

window.open(

`https://wa.me/?text=${encodeURIComponent(text)}`,

"_blank"

);

}

/* =========================================
EMAIL
========================================= */

function emailPDF(){

window.location.href =
"mailto:?subject=Affidavit";

}

/* =========================================
VOICE INPUT
========================================= */

function startVoiceInput(){

if(
!("webkitSpeechRecognition"
in window)
){

showToast(
"Voice not supported ❌"
);

return;

}

const recognition =
new webkitSpeechRecognition();

recognition.lang =
"en-IN";

recognition.start();

recognition.onresult =
function(event){

document.getElementById(
"details"
).value =
event.results[0][0]
.transcript;

showToast(
"Voice Captured ✔"
);

};

}

/* =========================================
AI QUICK
========================================= */

function generateAIQuickAffidavit(){

const prompt =
getVal("aiPrompt");

if(!prompt){

showToast(
"Enter AI prompt ❌"
);

return;

}

document.getElementById(
"details"
).value =
prompt;

generateAffidavit();

}

/* =========================================
LEGAL AI
========================================= */

function openLegalAI(){

const box =
document.getElementById(
"legalAiBox"
);

if(!box) return;

if(
box.style.display === "block"
){

box.style.display = "none";

}else{

box.style.display = "block";

}

}

function askLegalAI(){

const q =
getVal("legalQuestion");

const res =
document.getElementById(
"legalAIResponse"
);

if(!q){

showToast(
"Enter question ❌"
);

return;

}

res.innerHTML = `

<b>AI Legal Assistant:</b>

<br><br>

Legal guidance regarding:

<br><br>

"${q}"

<br><br>

Please verify with legal authority.

`;

}

/* =========================================
HISTORY
========================================= */

function saveHistory(
id,
name,
purpose,
date
){

let history =
JSON.parse(
localStorage.getItem(
"agiHistory"
) || "[]"
);

history.unshift({

id,
name,
purpose,
date

});

localStorage.setItem(

"agiHistory",

JSON.stringify(history)

);

}

function updateAnalytics(){

const total =
JSON.parse(
localStorage.getItem(
"agiHistory"
)||"[]"
).length;

const totalBox =
document.getElementById(
"totalDocs"
);

if(totalBox){

totalBox.innerText =
total;

}

}

/* =========================================
PWA INSTALL PERFECT FIX
========================================= */

window.addEventListener(
"beforeinstallprompt",
(e)=>{

e.preventDefault();

deferredPrompt = e;

showToast(
"PWA Ready 🚀"
);

const installBtn =
document.getElementById(
"installAppBtn"
);

if(installBtn){

installBtn.style.display =
"block";

installBtn.style.position =
"fixed";

installBtn.style.bottom =
"90px";

installBtn.style.right =
"20px";

installBtn.style.zIndex =
"999999";

}

});

async function triggerInstallApp(){

try{

if(!deferredPrompt){

showToast(
"Chrome → Add to Home Screen"
);

return;

}

await deferredPrompt.prompt();

const choice =
await deferredPrompt.userChoice;

if(choice.outcome === "accepted"){

showToast(
"PWA Installed ✔"
);

}else{

showToast(
"Install Cancelled"
);

}

deferredPrompt = null;

const installBtn =
document.getElementById(
"installAppBtn"
);

if(installBtn){

installBtn.style.display =
"none";

}

}catch(err){

console.log(err);

showToast(
"PWA Failed ❌"
);

}

}

window.addEventListener(
"appinstalled",
()=>{

showToast(
"App Installed ✔"
);

});

/* =========================================
BACK BUTTON FIX
========================================= */

function goBackPage(){

if(window.history.length > 1){

window.history.back();

}else{

window.location.href =
"./index.html";

}

}

/* =========================================
SUPPORT BUTTON
========================================= */

function initializeSupport(){

const supportBtn =
document.getElementById(
"supportBtn"
);

if(!supportBtn) return;

supportBtn.style.position =
"fixed";

supportBtn.style.left =
"15px";

supportBtn.style.bottom =
"15px";

supportBtn.style.zIndex =
"999999";

supportBtn.addEventListener(
"click",
()=>{

window.open(
"https://wa.me/917780936452",
"_blank"
);

});

}

/* =========================================
ONLINE / OFFLINE
========================================= */

window.addEventListener(
"offline",
()=>{

showToast(
"Offline ⚠️"
);

});

window.addEventListener(
"online",
()=>{

showToast(
"Back Online ✔"
);

});

/* =========================================
PREVENT BUTTON HIDE BUG
========================================= */

window.addEventListener(
"scroll",
()=>{

const btn =
document.querySelector(
".main-generate"
);

if(btn){

btn.style.opacity = "1";
btn.style.visibility = "visible";
btn.style.display = "block";

}

});

/* =========================================
ANALYTICS CARD CLICK FIX
========================================= */

window.addEventListener(
"load",
()=>{

const cards =
document.querySelectorAll(
".analytics-box"
);

cards.forEach(card=>{

card.style.cursor =
"pointer";

card.style.zIndex =
"999";

});

});

/* =========================================
ON LOAD
========================================= */

window.addEventListener(
"load",
()=>{

initializeSignaturePad();

initializeSupport();

startClock();

hideLoader();

updateAnalytics();

showToast(
"AGI ULTRA Ready 🚀"
);

});

/* =========================================
SERVICE WORKER
========================================= */

if("serviceWorker" in navigator){

window.addEventListener(
"load",
async ()=>{

try{

await navigator.serviceWorker.register(
"./sw.js"
);

console.log(
"SW Registered"
);

}catch(err){

console.log(
"SW Failed",
err
);

}

});

}
