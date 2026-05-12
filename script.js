/* =========================================
   AGI ULTRA PRO v16 AI 🚀
   COMPLETE FINAL SCRIPT
========================================= */

const AGI = {

premium:false,
premiumCode:"INDIA49",
docPrefix:"IND-AFF-",
premiumDays:30,
version:"v16 AI"

};

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
"I hereby declare that I have changed my name for official purposes.",
"My old and new names belong to the same person.",
"All future records may use my updated name."
],

"Address Proof":[
"I currently reside at the mentioned address.",
"This affidavit is submitted as address proof."
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
"میرا پرانا اور نیا نام ایک ہی شخص کے ہیں۔",
"آئندہ تمام ریکارڈ میں نیا نام استعمال کیا جائے۔"
],

"Address Proof":[
"میں مذکورہ پتے پر رہائش پذیر ہوں۔",
"یہ حلف نامہ بطور ثبوتِ رہائش پیش کیا جا رہا ہے۔"
]

}

},

Hindi:{
title:"शपथ पत्र",
subtitle:"नोटरी पब्लिक के समक्ष",

intro:(d)=>`
मैं
<b>${d.name}</b>,
पुत्र
<b>${d.father}</b>,
आयु
<b>${d.age}</b>
वर्ष,
निवासी
<b>${d.address}</b>.
`,

place:"स्थान",
date:"दिनांक",

templates:{

"Name Change":[
"मैं शपथपूर्वक घोषित करता हूँ कि मैंने अपना नाम बदल लिया है।",
"मेरा पुराना और नया नाम एक ही व्यक्ति के हैं।"
]

}

},

Arabic:{
title:"إقرار خطي",
subtitle:"أمام الكاتب بالعدل",

intro:(d)=>`
أنا
<b>${d.name}</b>
ابن
<b>${d.father}</b>
عمري
<b>${d.age}</b>
سنة،
المقيم في
<b>${d.address}</b>.
`,

place:"المكان",
date:"التاريخ",

templates:{

"Name Change":[
"أقر بأنني قمت بتغيير اسمي للأغراض الرسمية.",
"الاسم القديم والجديد يعودان لنفس الشخص."
]

}

},

French:{
title:"DÉCLARATION SOUS SERMENT",
subtitle:"DEVANT LE NOTAIRE",

intro:(d)=>`
Je,
<b>${d.name}</b>,
fils de
<b>${d.father}</b>,
âgé de
<b>${d.age}</b>
ans,
résidant à
<b>${d.address}</b>.
`,

place:"Lieu",
date:"Date",

templates:{

"Name Change":[
"Je déclare avoir changé mon nom à des fins officielles.",
"L'ancien et le nouveau nom appartiennent à la même personne."
]

}

}

};

/* =========================================
   SAFE GET
========================================= */

function getVal(id){

let el =
document.getElementById(id);

if(!el) return "";

return String(
el.value || ""
).trim();

}

/* =========================================
   INIT
========================================= */

(function(){

restoreDraft();
loadHistory();
updateUI();
updateAnalytics();

if(
localStorage.getItem(
"agiDarkMode"
)==="true"
){

document.body.classList.add(
"dark-mode"
);

}

})();

/* =========================================
   PREMIUM
========================================= */

function activatePremiumManually(){

let code =
prompt("Enter Premium Code");

if(!code) return;

if(code.trim()===AGI.premiumCode){

AGI.premium = true;

localStorage.setItem(
"agiPremium",
"true"
);

updateUI();

alert(
"Premium Activated ✔"
);

}else{

alert(
"Invalid Code ❌"
);

}

}

function unlockPremium(){

window.open(
"https://yourwebsite.com/premium",
"_blank"
);

}

/* =========================================
   UI
========================================= */

function updateUI(){

let badge =
document.getElementById(
"premiumStatus"
);

if(!badge) return;

AGI.premium =
localStorage.getItem(
"agiPremium"
)==="true";

badge.innerHTML =
AGI.premium
?
"🟢 Premium Active"
:
"🔴 Free Version";

}

/* =========================================
   DARK MODE
========================================= */

function toggleDarkMode(){

document.body.classList.toggle(
"dark-mode"
);

localStorage.setItem(
"agiDarkMode",
document.body.classList.contains(
"dark-mode"
)
);

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
"purposeType"

];

function restoreDraft(){

fieldIDs.forEach(id=>{

let el =
document.getElementById(id);

if(!el) return;

let val =
localStorage.getItem(
"agi_" + id
);

if(val){

el.value = val;

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

updateAnalytics();

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

<button
onclick="deleteHistory(${index})">
Delete
</button>

</div>

`;

});

html += `

<button
class="btn-orange"
onclick="clearHistory()">

Clear All History

</button>

`;

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

}

function clearHistory(){

if(
!confirm(
"Delete all history?"
)
)return;

localStorage.removeItem(
"agiHistory"
);

loadHistory();

updateAnalytics();

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

alert(
"Fill all required fields ❗"
);

return false;

}

}

return true;

}

/* =========================================
   AI DRAFT
========================================= */

function aiDraft(){

if(!AGI.premium){

alert(
"AI Draft is Premium 🔒"
);

return;

}

let purpose =
getVal("purposeType");

let details =
document.getElementById(
"details"
);

details.value =
"Professional affidavit declaration regarding " +
purpose + ".";

}

/* =========================================
   AI QUICK GENERATOR
========================================= */

function generateAIQuickAffidavit(){

let prompt =
getVal("aiPrompt");

if(!prompt){

alert(
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
   MAIN GENERATOR
========================================= */

function generateAffidavit(){

let preview =
document.getElementById(
"previewArea"
);

let data = {

lang:getVal("lang"),
name:getVal("name"),
father:getVal("father"),
age:getVal("age"),
address:getVal("address"),
details:getVal("details"),
purposeType:getVal("purposeType"),
place:getVal("place"),
date:getVal("date")

};

if(!validateRequired(data)){
return;
}

let lang =
affidavitTemplates[
data.lang
]
||
affidavitTemplates[
"English"
];

let templateLines =
lang.templates[
data.purposeType
]
||
lang.templates[
"Name Change"
];

let templateHTML = "";

templateLines.forEach(line=>{

templateHTML += `
<li>${line}</li>
`;

});

if(data.details){

templateHTML += `
<li>${data.details}</li>
`;

}

let docID =
generateDocID();

let signatureURL = "";

let signatureInput =
document.getElementById(
"signatureUpload"
);

if(
signatureInput &&
signatureInput.files[0]
){

signatureURL =
URL.createObjectURL(
signatureInput.files[0]
);

}

let html = `

<div class="stamp">
₹10
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
${templateHTML}
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
signatureURL
?
`
<div style="margin-top:30px;">
<img
src="${signatureURL}"
style="
height:80px;
">
</div>
`
:
""
}

<div class="signature-section">

<div class="signature-block">

<div class="signature-line">
DEPONENT
</div>

</div>

<div class="signature-block">

<div class="signature-line">
NOTARY PUBLIC
</div>

</div>

</div>

<div class="doc-id">

${docID}

</div>

</div>

`;

preview.innerHTML = html;

if(
data.lang==="Urdu"
||
data.lang==="Arabic"
){

preview.setAttribute(
"dir",
"rtl"
);

}else{

preview.setAttribute(
"dir",
"ltr"
);

}

saveDoc(docID,data);

loadHistory();

alert(
"Affidavit Generated ✔"
);

}

/* =========================================
   QR
========================================= */

function generateQRCode(){

let qrBox =
document.getElementById(
"qrBox"
);

qrBox.innerHTML = "";

new QRCode(qrBox,{

text:
document.getElementById(
"previewArea"
).innerText,

width:180,
height:180

});

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
   PDF
========================================= */

function downloadPDF(){

window.print();

}

/* =========================================
   EMAIL PDF
========================================= */

function emailPDF(){

window.location.href =
"mailto:?subject=Affidavit&body=Generated using AGI ULTRA PRO";

}

/* =========================================
   VOICE INPUT
========================================= */

function startVoiceInput(){

if(
!('webkitSpeechRecognition' in window)
){

alert(
"Voice Input Not Supported"
);

return;

}

const recognition =
new webkitSpeechRecognition();

recognition.lang = "en-IN";

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

document.getElementById(
"legalAiBox"
).style.display = "block";

}

function askLegalAI(){

let q =
getVal("legalQuestion");

document.getElementById(
"legalAIResponse"
).innerHTML =
"AI Response:<br><br>" +
"Legal guidance regarding:<br>" +
q;

}
