/* =========================================
   AGI – PROFESSIONAL LOGIC ENGINE v2.2
   UI Lock + QR + Premium Badge + Payment Ready
========================================= */

const AGI = {
    premium: false,
    premiumCode: "INDIA49",
    docPrefix: "IND-AFF-"
};

/* ===============================
   INIT SYSTEM
=============================== */
(function initAGI(){
    AGI.premium = localStorage.getItem("agiPremium") === "true";
    restoreDraft();
    updateUI();
})();

/* ===============================
   PREMIUM UNLOCK / PAYMENT
=============================== */
function unlockPremium(){

    // Payment redirect (Replace with real Razorpay link later)
    window.open("https://rzp.io/l/YOUR_PAYMENT_LINK","_blank");

    alert("Complete payment. After confirmation, Premium will be activated manually.");
}

/* Manual activation fallback */
function activatePremiumManually(){
    let code = prompt("Enter Admin Premium Code:");
    if(code === AGI.premiumCode){
        AGI.premium = true;
        localStorage.setItem("agiPremium","true");
        alert("Premium Activated ✔");
        location.reload();
    } else {
        alert("Invalid Code ❌");
    }
}

/* ===============================
   UPDATE UI STATE
=============================== */
function updateUI(){

    const badge = document.getElementById("premiumStatus");
    const downloadBtn = document.getElementById("downloadBtn");
    const witnessToggle = document.getElementById("addWitness");

    if(AGI.premium){
        if(badge) badge.innerHTML = `<div class="premium-active">Premium Active ✔</div>`;
        if(downloadBtn) downloadBtn.classList.remove("locked");
    } else {
        if(badge) badge.innerHTML = "";
        if(downloadBtn) downloadBtn.classList.add("locked");
        if(witnessToggle) witnessToggle.checked = false;
    }
}

/* ===============================
   SAVE & RESTORE DRAFT
=============================== */
const fieldIDs = [
    "lang","template","gender","name","father","age",
    "address","purpose","state","stamp","place",
    "date","customParagraph"
];

function restoreDraft(){
    fieldIDs.forEach(id=>{
        const el = document.getElementById(id);
        if(!el) return;

        const saved = localStorage.getItem("agi_"+id);
        if(saved) el.value = saved;

        el.addEventListener("input",()=>{
            localStorage.setItem("agi_"+id, el.value);
        });
    });
}

/* ===============================
   DOC ID GENERATOR
=============================== */
function generateDocID(){
    return AGI.docPrefix + Math.random().toString(36).substring(2,8).toUpperCase();
}

/* ===============================
   GENDER SMART TEXT
=============================== */
function genderText(gender){
    if(gender==="male") return { relation:"Son of", verb:"do hereby solemnly affirm" };
    if(gender==="female") return { relation:"Daughter of", verb:"do hereby solemnly affirm" };
    return { relation:"Child of", verb:"do hereby solemnly affirm" };
}

/* ===============================
   WATERMARK
=============================== */
function getWatermark(){
    return AGI.premium ? "" : `<div class="watermark">FREE VERSION</div>`;
}

/* ===============================
   QR GENERATOR (Premium Only)
=============================== */
function generateQR(docID,name,date){

    if(!AGI.premium) return;

    const container = document.getElementById("qrCodeContainer");
    if(!container) return;

    container.innerHTML = "";

    new QRCode(container,{
        text: `AGI Verification\nID:${docID}\nName:${name}\nDate:${date}`,
        width:100,
        height:100
    });
}

/* ===============================
   VALIDATION
=============================== */
function validateRequired(data){

    const required = ["name","father","age","address","purpose","place","date"];

    for(let key of required){
        if(!data[key] || data[key].trim()===""){
            alert("Please fill all required fields.");
            return false;
        }
    }
    return true;
}

/* ===============================
   MAIN GENERATOR
=============================== */
function generateAffidavit(){

    const preview = document.getElementById("previewArea");

    const data = {
        lang: document.getElementById("lang")?.value,
        template: document.getElementById("template")?.value,
        gender: document.getElementById("gender")?.value,
        name: document.getElementById("name")?.value,
        father: document.getElementById("father")?.value,
        age: document.getElementById("age")?.value,
        address: document.getElementById("address")?.value,
        purpose: document.getElementById("purpose")?.value,
        state: document.getElementById("state")?.value,
        stamp: document.getElementById("stamp")?.value,
        place: document.getElementById("place")?.value,
        date: document.getElementById("date")?.value,
        custom: document.getElementById("customParagraph")?.value,
        addWitness: document.getElementById("addWitness")?.checked
    };

    if(!validateRequired(data)) return;

    if(!AGI.premium && data.template !== "general"){
        alert("This template is Premium. Unlock to use.");
        return;
    }

    const docID = generateDocID();
    const g = genderText(data.gender);
    let content = getWatermark();

    preview.removeAttribute("dir");

    /* ENGLISH */
    if(data.lang==="english"){
        content+=`
        <div class="title">AFFIDAVIT</div>
        <p>I, <strong>${data.name}</strong>, ${g.relation} <strong>${data.father}</strong>, aged about <strong>${data.age}</strong> years, residing at <strong>${data.address}</strong>, ${g.verb} as follows:</p>
        <p>1. That I am a citizen of India.</p>
        <p>2. That this affidavit is executed for the purpose of <strong>${data.purpose}</strong>.</p>
        <p>3. Executed in the State of <strong>${data.state}</strong>.</p>
        <p>4. To be executed on <strong>${data.stamp}</strong> Non-Judicial Stamp Paper.</p>
        <p><br>Verified at <strong>${data.place}</strong> on <strong>${data.date}</strong>.</p>`;
    }

    /* HINDI */
    if(data.lang==="hindi"){
        content+=`
        <div class="title">शपथ पत्र</div>
        <p>मैं <strong>${data.name}</strong>, पिता <strong>${data.father}</strong>, आयु <strong>${data.age}</strong> वर्ष, निवासी <strong>${data.address}</strong>, शपथपूर्वक घोषणा करता/करती हूँ कि:</p>
        <p>1. मैं भारत का नागरिक हूँ।</p>
        <p>2. यह शपथ पत्र <strong>${data.purpose}</strong> हेतु बनाया गया है।</p>
        <p><br>स्थान <strong>${data.place}</strong>, दिनांक <strong>${data.date}</strong></p>`;
    }

    /* URDU */
    if(data.lang==="urdu"){
        preview.setAttribute("dir","rtl");
        content+=`
        <div class="title">حلف نامہ</div>
        <p>میں <strong>${data.name}</strong>, ولد <strong>${data.father}</strong>, عمر <strong>${data.age}</strong> سال، ساکن <strong>${data.address}</strong>، حلفاً بیان کرتا/کرتی ہوں کہ:</p>
        <p>1. میں بھارت کا شہری ہوں۔</p>
        <p>2. یہ حلف نامہ <strong>${data.purpose}</strong> کے لئے ہے۔</p>
        <p><br>مقام <strong>${data.place}</strong>, تاریخ <strong>${data.date}</strong></p>`;
    }

    content+=`
    <div class="signature-section">
        <div class="signature-block">_________________________<br>Signature</div>
        <div class="signature-block">_________________________<br>Notary</div>
    </div>
    `;

    if(AGI.premium){
        content+=`<div class="doc-id">Document ID: ${docID}</div>
                  <div id="qrCodeContainer"></div>`;
    }

    preview.innerHTML = content;

    if(AGI.premium){
        generateQR(docID,data.name,data.date);
    }
}

/* ===============================
   PRINT
=============================== */
function printAffidavit(){
    window.print();
}

/* ===============================
   DOWNLOAD PDF
=============================== */
function downloadPDF(){
    if(!AGI.premium){
        alert("Premium Required for PDF Download");
        return;
    }
    window.print();
}
