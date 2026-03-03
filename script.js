/* =========================================
   AGI – PROFESSIONAL LOGIC ENGINE
========================================= */

let premiumUnlocked = false;

/* ===============================
   PREMIUM UNLOCK
=============================== */
function unlockPremium(){
let code = prompt("Enter Premium Access Code:");

if(code === "INDIA49"){
premiumUnlocked = true;
localStorage.setItem("agiPremium","true");
alert("Premium Activated ✔");
}else{
alert("Invalid Code ❌");
}
}

if(localStorage.getItem("agiPremium") === "true"){
premiumUnlocked = true;
}

/* ===============================
   SAVE DRAFT SYSTEM
=============================== */
const fields = ["lang","template","gender","name","father","age","address","purpose","state","stamp","place","date","customParagraph"];

fields.forEach(id=>{
let el=document.getElementById(id);
if(el){
el.addEventListener("input",()=>{
localStorage.setItem(id,el.value);
});
if(localStorage.getItem(id)){
el.value=localStorage.getItem(id);
}
}
});

/* ===============================
   DOC ID GENERATOR
=============================== */
function generateDocID(){
return "IND-AFF-" + Math.random().toString(36).substr(2,6).toUpperCase();
}

/* ===============================
   GENDER SMART LOGIC
=============================== */
function genderText(gender){
if(gender==="male") return {relation:"Son of", verb:"do hereby solemnly affirm"};
if(gender==="female") return {relation:"Daughter of", verb:"do hereby solemnly affirm"};
return {relation:"Child of", verb:"do hereby solemnly affirm"};
}

/* ===============================
   MAIN GENERATOR
=============================== */
function generateAffidavit(){

let lang=document.getElementById("lang").value;
let template=document.getElementById("template").value;
let gender=document.getElementById("gender").value;
let name=document.getElementById("name").value;
let father=document.getElementById("father").value;
let age=document.getElementById("age").value;
let address=document.getElementById("address").value;
let purpose=document.getElementById("purpose").value;
let state=document.getElementById("state").value;
let stamp=document.getElementById("stamp").value;
let place=document.getElementById("place").value;
let date=document.getElementById("date").value;
let custom=document.getElementById("customParagraph").value;
let addWitness=document.getElementById("addWitness").checked;

let docID=generateDocID();
let preview=document.getElementById("previewArea");

let watermark="";
if(!premiumUnlocked){
watermark='<div class="watermark">FREE VERSION</div>';
}

/* FREE restriction */
if(!premiumUnlocked && template !== "general"){
alert("Premium Template. Unlock to use.");
return;
}

/* Smart relation */
let g=genderText(gender);

/* ===============================
   ENGLISH TEMPLATE
=============================== */
let content="";

if(lang==="english"){

content=`
${watermark}
<div class="title">AFFIDAVIT</div>

<p>I, <strong>${name}</strong>, ${g.relation} <strong>${father}</strong>, aged about <strong>${age}</strong> years, residing at <strong>${address}</strong>, ${g.verb} as follows:</p>

<p>1. That I am a citizen of India.</p>
<p>2. That this affidavit is executed for the purpose of <strong>${purpose}</strong>.</p>
<p>3. That the statements made herein are true to the best of my knowledge.</p>
<p>4. Executed in the State of <strong>${state}</strong> under applicable Stamp Act.</p>
<p>5. To be executed on <strong>${stamp}</strong> Non-Judicial Stamp Paper.</p>
`;

if(custom && premiumUnlocked){
content+=`<p>6. ${custom}</p>`;
}

content+=`
<p><br>Verified at <strong>${place}</strong> on <strong>${date}</strong>.</p>
`;

/* Witness Section */
if(addWitness && premiumUnlocked){
content+=`
<div class="signature-section">
<div class="signature-block">
_________________________<br>
Witness 1
</div>
<div class="signature-block">
_________________________<br>
Witness 2
</div>
</div>
`;
}

content+=`
<div class="signature-section">
<div class="signature-block">
_________________________<br>
Signature of Deponent
</div>
<div class="signature-block">
_________________________<br>
Signature of Notary
</div>
</div>
`;

if(premiumUnlocked){
content+=`<div class="doc-id">Document ID: ${docID}</div>`;
}
}

/* ===============================
   HINDI
=============================== */
if(lang==="hindi"){
content=`
${watermark}
<div class="title">शपथ पत्र</div>

<p>मैं <strong>${name}</strong>, पिता <strong>${father}</strong>, आयु <strong>${age}</strong> वर्ष, निवासी <strong>${address}</strong>, शपथपूर्वक यह घोषणा करता/करती हूँ कि:</p>

<p>1. मैं भारत का नागरिक हूँ।</p>
<p>2. यह शपथ पत्र <strong>${purpose}</strong> के उद्देश्य से बनाया गया है।</p>
<p>3. यह <strong>${state}</strong> राज्य में लागू कानून के अनुसार निष्पादित किया गया है।</p>
<p>4. यह <strong>${stamp}</strong> के गैर-न्यायिक स्टाम्प पेपर पर तैयार किया गया है।</p>
`;

if(custom && premiumUnlocked){
content+=`<p>5. ${custom}</p>`;
}

content+=`
<p><br>स्थान <strong>${place}</strong>, दिनांक <strong>${date}</strong></p>
`;

if(addWitness && premiumUnlocked){
content+=`
<div class="signature-section">
<div class="signature-block">_________________________<br>गवाह 1</div>
<div class="signature-block">_________________________<br>गवाह 2</div>
</div>
`;
}

content+=`
<div class="signature-section">
<div class="signature-block">_________________________<br>हस्ताक्षर</div>
<div class="signature-block">_________________________<br>नोटरी</div>
</div>
`;
}

/* ===============================
   URDU
=============================== */
if(lang==="urdu"){
preview.setAttribute("dir","rtl");

content=`
${watermark}
<div class="title">حلف نامہ</div>

<p>میں <strong>${name}</strong>, ولد <strong>${father}</strong>, عمر <strong>${age}</strong> سال، رہائشی <strong>${address}</strong>، حلفاً بیان کرتا/کرتی ہوں کہ:</p>

<p>1. میں بھارت کا شہری ہوں۔</p>
<p>2. یہ حلف نامہ <strong>${purpose}</strong> کے لئے تیار کیا گیا ہے۔</p>
<p>3. یہ <strong>${state}</strong> کے قانون کے مطابق تیار کیا گیا ہے۔</p>
<p>4. یہ <strong>${stamp}</strong> کے نان جوڈیشل اسٹامپ پیپر پر تیار کیا گیا ہے۔</p>
`;

if(custom && premiumUnlocked){
content+=`<p>5. ${custom}</p>`;
}

content+=`
<p><br>مقام <strong>${place}</strong>، تاریخ <strong>${date}</strong></p>
`;

if(addWitness && premiumUnlocked){
content+=`
<div class="signature-section">
<div class="signature-block">_________________________<br>گواہ 1</div>
<div class="signature-block">_________________________<br>گواہ 2</div>
</div>
`;
}

content+=`
<div class="signature-section">
<div class="signature-block">_________________________<br>دستخط</div>
<div class="signature-block">_________________________<br>نوٹری</div>
</div>
`;
}

/* RESET RTL IF NOT URDU */
if(lang!=="urdu"){
preview.removeAttribute("dir");
}

preview.innerHTML=content;
}

/* ===============================
   PRINT
=============================== */
function printAffidavit(){
window.print();
}

/* ===============================
   PDF DOWNLOAD (PREMIUM)
=============================== */
function downloadPDF(){
if(!premiumUnlocked){
alert("Premium Required for PDF Download");
return;
}
window.print();
                  }
