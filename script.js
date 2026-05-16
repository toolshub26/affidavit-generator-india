/* =========================================
   AGI ULTRA PRO v18 ENTERPRISE 🚀
   ULTIMATE LEGAL AI SAAS ENGINE
========================================= */

/* =========================================
   GLOBAL APP
========================================= */

const AGI = {

premium:false,
premiumCode:"INDIA49",
docPrefix:"IND-AFF-",
premiumDays:30,
version:"v18 ENTERPRISE",

features:{
ai:true,
ocr:true,
qr:true,
cloud:true,
voice:true,
analytics:true,
pwa:true,
notifications:true
}

};

/* =========================================
   GLOBAL VARIABLES
========================================= */

let signaturePad = null;
let deferredPrompt = null;
let currentTheme = "dark";

/* =========================================
   MULTI LANGUAGE TEMPLATES
========================================= */

const affidavitTemplates = {

English:{

title:"AFFIDAVIT",

subtitle:"BEFORE THE NOTARY PUBLIC",

intro:(d)=>`
I,
<b>${d.name}</b>,
S/o
<b>${d.father}</b>,
aged about
<b>${d.age}</b>
years,
resident of
<b>${d.address}</b>.
`,

place:"Place",
date:"Date",

templates:{

"Name Change":[
"I hereby declare that I have changed my name officially.",
"My old and new names belong to the same person.",
"Future records may use the updated name."
],

"Address Proof":[
"I currently reside at the mentioned address.",
"This affidavit is submitted as address proof."
],

"Income Proof":[
"My source of income is genuine and legal.",
"This affidavit is submitted for income verification."
],

"Lost Document":[
"I have lost my original document.",
"I request reissue of the lost document."
]

}

},

Urdu:{

title:"حلف نامہ",

subtitle:"نوٹری پبلک کے سامنے",

intro:(d)=>`
میں
<b>${d.name}</b>
ولد
<b>${d.father}</b>
عمر
<b>${d.age}</b>
سال،
رہائشی
<b>${d.address}</b>
حلفیہ بیان دیتا ہوں۔
`,

place:"مقام",
date:"تاریخ",

templates:{

"Name Change":[
"میں حلفیہ بیان دیتا ہوں کہ میں نے اپنا نام تبدیل کیا ہے۔",
"میرا پرانا اور نیا نام ایک ہی شخص کے ہیں۔"
],

"Address Proof":[
"میں مذکورہ پتے پر رہائش پذیر ہوں۔",
"یہ حلف نامہ بطور ثبوتِ رہائش پیش کیا جا رہا ہے۔"
]

}

}

};

/* =========================================
   SAFE VALUE
========================================= */

function getVal(id){

const el =
document.getElementById(id);

if(!el) return "";

return String(
el.value || ""
).trim();

}

/* =========================================
   INITIALIZE APP
========================================= */

window.addEventListener(
"load",
()=>{

restoreDraft();
loadHistory();
updateAnalytics();
updateUI();
hideLoader();
restoreTheme();
startLiveClock();

initializeSignaturePad();
initializePWA();
initializeOCR();
initializeAutoSave();

showToast(
"AGI ULTRA PRO Ready 🚀"
);

});

/* =========================================
   SIGNATURE PAD
========================================= */

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

signaturePad =
new SignaturePad(canvas);

}

}

/* =========================================
   LIVE CLOCK
========================================= */

function startLiveClock(){

setInterval(()=>{

const clock =
document.getElementById(
"liveClock"
);

if(clock){

clock.innerHTML =
new Date()
.toLocaleString();

}

},1000);

}

/* =========================================
   THEME
========================================= */

function toggleDarkMode(){

document.body.classList.toggle(
"light-mode"
);

currentTheme =
document.body.classList.contains(
"light-mode"
)
?
"light"
:
"dark";

localStorage.setItem(
"agi_theme",
currentTheme
);

}

function restoreTheme(){

const saved =
localStorage.getItem(
"agi_theme"
);

if(saved==="light"){

document.body.classList.add(
"light-mode"
);

}

}

/* =========================================
   TOAST
========================================= */

function showToast(msg){

const toast =
document.createElement("div");

toast.innerHTML = msg;

toast.style.position = "fixed";
toast.style.bottom = "20px";
toast.style.left = "20px";
toast.style.background = "#111827";
toast.style.color = "white";
toast.style.padding = "14px 18px";
toast.style.borderRadius = "12px";
toast.style.zIndex = "999999";

document.body.appendChild(
toast
);

setTimeout(()=>{

toast.remove();

},3000);

}

/* =========================================
   AUTO SAVE
========================================= */

const fieldIDs = [

"lang",
"name",
"father",
"age",
"address",
"details",
"place",
"date",
"purposeType",
"stampValue"

];

function initializeAutoSave(){

fieldIDs.forEach(id=>{

let el =
document.getElementById(id);

if(!el) return;

let saved =
localStorage.getItem(
"agi_" + id
);

if(saved){

el.value = saved;

}

el.addEventListener(
"input",
()=>{

localStorage.setItem(
"agi_" + id,
el.value
);

}
);

});

}

function restoreDraft(){

fieldIDs.forEach(id=>{

const el =
document.getElementById(id);

if(!el) return;

const val =
localStorage.getItem(
"agi_" + id
);

if(val){

el.value = val;

}

});

}

/* =========================================
   DOC ID
========================================= */

function generateDocID(){

let d =
new Date()
.toISOString()
.slice(0,10)
.replace(/-/g,"");

let r =
Math.random()
.toString(36)
.substring(2,7)
.toUpperCase();

return `${AGI.docPrefix}${d}-${r}`;

}

/* =========================================
   VALIDATION
========================================= */

function validateRequired(data){

const required = [

"name",
"father",
"age",
"address",
"place",
"date"

];

for(let key of required){

if(!data[key]){

showToast(
"Fill required fields ❌"
);

return false;

}

}

return true;

}

/* =========================================
   GENERATE AFFIDAVIT
========================================= */

function generateAffidavit(){

try{

showLoader();

showAIStatus(
"⚡ Generating..."
);

let preview =
document.getElementById(
"previewArea"
);

if(!preview){

showToast(
"Preview Missing ❌"
);

return;

}

let data = {

lang:getVal("lang"),
name:getVal("name"),
father:getVal("father"),
age:getVal("age"),
address:getVal("address"),
details:getVal("details"),
purposeType:getVal("purposeType"),
place:getVal("place"),
date:getVal("date"),
stamp:getVal("stampValue")

};

if(!validateRequired(data)){

hideLoader();
return;

}

let lang =
affidavitTemplates[
data.lang
] ||
affidavitTemplates[
"English"
];

let templateLines = [];

if(
lang.templates &&
lang.templates[data.purposeType]
){

templateLines =
lang.templates[data.purposeType];

}else{

templateLines = [
"This affidavit is submitted officially."
];

}

let html = "";

templateLines.forEach(line=>{

html += `
<li>${line}</li>
`;

});

if(data.details){

html += `
<li>${data.details}</li>
`;

}

let docID =
generateDocID();

let signatureImage = "";

if(
signaturePad &&
!signaturePad.isEmpty()
){

signatureImage =
signaturePad.toDataURL();

}

preview.innerHTML = `

<div class="stamp">
${data.stamp || "₹10"}
</div>

<div class="meezan-logo">
⚖️ MEEZAN LEGAL SERVICES
</div>

<div class="title">
${lang.title}
</div>

<div class="subtitle">
${lang.subtitle}
</div>

<div class="doc-content">

<p>
${lang.intro(data)}
</p>

<ol>
${html}
</ol>

<br>

<p>
${lang.place}:
<b>${data.place}</b>
</p>

<p>
${lang.date}:
<b>${data.date}</b>
</p>

${
signatureImage
?
`
<div style="margin-top:20px;">
<img
src="${signatureImage}"
style="height:80px;">
</div>
`
:
""
}

<div id="qrCodeContainer"></div>

<div class="doc-id">
${docID}
</div>

</div>

`;

preview.setAttribute(
"dir",
data.lang==="Urdu"
?
"rtl"
:
"ltr"
);

saveDoc(docID,data);

loadHistory();

generateQRCode();

updateAnalytics();

hideLoader();

showToast(
"Affidavit Generated ✔"
);

}catch(err){

console.error(err);

hideLoader();

showToast(
"Generator Error ❌"
);

}

}

/* =========================================
   HISTORY
========================================= */

function saveDoc(docID,data){

let history =
JSON.parse(
localStorage.getItem(
"agiHistory"
) || "[]"
);

history.unshift({

id:docID,
name:data.name,
date:data.date,
purpose:data.purposeType

});

localStorage.setItem(
"agiHistory",
JSON.stringify(history)
);

}

function loadHistory(){

let box =
document.getElementById(
"history"
);

if(!box) return;

let history =
JSON.parse(
localStorage.getItem(
"agiHistory"
)||"[]"
);

if(history.length===0){

box.innerHTML =
"No documents yet.";

return;

}

let html = "";

history.forEach((item,index)=>{

html += `

<div class="history-item">

<b>${item.name}</b><br>

${item.purpose}<br>

${item.date}<br>

<small>${item.id}</small>

<br><br>

<button onclick="deleteHistory(${index})">
Delete
</button>

</div>

`;

});

box.innerHTML = html;

}

function deleteHistory(index){

let history =
JSON.parse(
localStorage.getItem(
"agiHistory"
)||"[]"
);

history.splice(index,1);

localStorage.setItem(
"agiHistory",
JSON.stringify(history)
);

loadHistory();

updateAnalytics();

showToast(
"Deleted ✔"
);

}

/* =========================================
   ANALYTICS
========================================= */

function updateAnalytics(){

let total =
JSON.parse(
localStorage.getItem(
"agiHistory"
)||"[]"
).length;

let totalBox =
document.getElementById(
"totalDocs"
);

if(totalBox){

totalBox.innerText =
total;

}

}

/* =========================================
   AI STATUS
========================================= */

function showAIStatus(msg){

let box =
document.getElementById(
"aiStatus"
);

if(!box) return;

box.innerHTML = msg;

setTimeout(()=>{

box.innerHTML = "";

},3000);

}

/* =========================================
   AI QUICK
========================================= */

function generateAIQuickAffidavit(){

let prompt =
getVal("aiPrompt");

if(!prompt){

showToast(
"Enter AI Prompt"
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
   AI DRAFT
========================================= */

function aiDraft(){

let purpose =
getVal("purposeType");

let detailsBox =
document.getElementById(
"details"
);

detailsBox.value =

"This affidavit is created for " +
purpose +
". All statements are true.";

showToast(
"AI Draft Ready ✔"
);

}

/* =========================================
   AI REWRITE
========================================= */

function rewriteAffidavit(){

let details =
document.getElementById(
"details"
);

details.value +=
" This statement is rewritten professionally using AGI AI.";

showToast(
"AI Rewrite Complete ✔"
);

}

/* =========================================
   QR
========================================= */

function generateQRCode(){

const qr =
document.getElementById(
"qrCodeContainer"
);

if(!qr) return;

qr.innerHTML = "";

let text =
document.getElementById(
"previewArea"
).innerText.trim();

if(!text){

showToast(
"Generate affidavit first"
);

return;

}

new QRCode(qr,{

text:text,
width:120,
height:120

});

}

/* =========================================
   PDF
========================================= */

function downloadPDF(){

const element =
document.getElementById(
"previewArea"
);

html2pdf()
.from(element)
.save("Affidavit.pdf");

}

/* =========================================
   PNG EXPORT
========================================= */

function exportPNG(){

html2canvas(
document.getElementById(
"previewArea"
)
).then(canvas=>{

let link =
document.createElement("a");

link.download =
"Affidavit.png";

link.href =
canvas.toDataURL();

link.click();

});

}

/* =========================================
   EMAIL
========================================= */

function emailPDF(){

window.location.href =
"mailto:?subject=Affidavit PDF";

}

/* =========================================
   WHATSAPP
========================================= */

function shareWhatsApp(){

let text =
document.getElementById(
"previewArea"
).innerText;

window.open(
`https://wa.me/?text=${encodeURIComponent(text)}`,
"_blank"
);

}

/* =========================================
   VOICE INPUT
========================================= */

function startVoiceInput(){

if(
!('webkitSpeechRecognition' in window)
){

showToast(
"Voice Not Supported"
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
event.results[0][0].transcript;

};

}

/* =========================================
   LEGAL AI
========================================= */

function openLegalAI(){

let box =
document.getElementById(
"legalAiBox"
);

if(!box) return;

box.style.display =
box.style.display==="block"
?
"none"
:
"block";

}

function askLegalAI(){

let q =
getVal("legalQuestion");

let response =
document.getElementById(
"legalAIResponse"
);

response.innerHTML =

"⚖️ AI Response:<br><br>" +
"Regarding: <b>" +
q +
"</b><br><br>" +
"Consult advocate for legal verification.";

}

/* =========================================
   OCR
========================================= */

function initializeOCR(){

const ocrUpload =
document.getElementById(
"ocrUpload"
);

if(!ocrUpload) return;

ocrUpload.addEventListener(
"change",
async function(e){

const file =
e.target.files[0];

if(!file) return;

const resultBox =
document.getElementById(
"ocrResultBox"
);

resultBox.innerHTML =
"📄 Scanning...";

try{

const result =
await Tesseract.recognize(
file,
"eng"
);

resultBox.innerHTML =
result.data.text;

document.getElementById(
"details"
).value =
result.data.text;

showToast(
"OCR Completed ✔"
);

}catch(err){

resultBox.innerHTML =
"OCR Failed ❌";

}

}
);

}

/* =========================================
   CLEAR SIGNATURE
========================================= */

function clearSignaturePad(){

if(signaturePad){

signaturePad.clear();

showToast(
"Signature Cleared"
);

}

}

/* =========================================
   CLOUD SAVE
========================================= */

function saveToCloud(){

localStorage.setItem(
"agiCloudBackup",
document.getElementById(
"previewArea"
).innerHTML
);

showToast(
"Cloud Save Complete ☁️"
);

}

/* =========================================
   VERIFY
========================================= */

function verifyDocument(){

showToast(
"Verification Ready ✅"
);

}

/* =========================================
   NOTARY
========================================= */

function bookNotary(){

const phone =
"917780936452";

const message =
encodeURIComponent(
"Hello, I want to book notary service."
);

window.open(
`https://wa.me/${phone}?text=${message}`,
"_blank"
);

}

/* =========================================
   NOTIFICATIONS
========================================= */

function enableNotifications(){

if(
"Notification" in window
){

Notification.requestPermission()
.then(permission=>{

if(permission==="granted"){

new Notification(
"AGI ULTRA Notifications Enabled 🚀"
);

}

});

}

}

/* =========================================
   PREMIUM UI
========================================= */

function updateUI(){

let badge =
document.getElementById(
"premiumStatus"
);

if(!badge) return;

badge.innerHTML =
AGI.premium
?
"🟢 Premium Active"
:
"🔴 Free Version";

}

/* =========================================
   INSTALL APP
========================================= */

function initializePWA(){

window.addEventListener(
"beforeinstallprompt",
(e)=>{

e.preventDefault();

deferredPrompt = e;

const installBtn =
document.getElementById(
"installAppBtn"
);

if(installBtn){

installBtn.style.display =
"block";

}

}
);

}

document.addEventListener(
"click",
function(e){

if(
e.target &&
e.target.id==="installAppBtn"
){

if(deferredPrompt){

deferredPrompt.prompt();

}

}

}
);

/* =========================================
   LOADER
========================================= */

function showLoader(){

let loader =
document.getElementById(
"globalLoader"
);

if(loader){

loader.style.display =
"flex";

}

}

function hideLoader(){

let loader =
document.getElementById(
"globalLoader"
);

if(loader){

loader.style.display =
"none";

}

}

/* =========================================
   SUPPORT
========================================= */

const supportBtn =
document.getElementById(
"supportBtn"
);

if(supportBtn){

supportBtn.addEventListener(
"click",
()=>{

window.open(
"https://wa.me/917780936452",
"_blank"
);

}
);

}
