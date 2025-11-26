const API = "https://script.google.com/macros/s/AKfycby-BeO2xEDOSLsiUmYguj6RzE1GlURzmBnA5xn_aadndvcvM1olUHDx-KONV6fKBgSZ/exec";

function toast(msg){
    const t=document.getElementById("toast");
    t.innerText=msg;
    t.style.display="block";
    setTimeout(()=> t.style.display="none",3000);
}

// LOGIN
document.getElementById("login-btn").onclick = async ()=>{
    let nome = document.getElementById("login-nome").value.trim();
    let pin  = document.getElementById("login-pin").value.trim();

    if(!nome || !pin){
        toast("Inserisci nome e PIN");
        return;
    }

    let res = await fetch(API+"?action=login&nome="+nome+"&pin="+pin);
    let data = await res.json();

    if(data.status=="OK"){
        toast("Accesso ok");
        window.user = nome;
        document.getElementById("login-box").style.display="none";
        document.getElementById("main-box").style.display="block";
    } else {
        toast("PIN errato");
    }
};

// SALVA PRESENZA
document.getElementById("salva-btn").onclick = async ()=>{
    let payload = {
        action: "salvaPresenza",
        autista: window.user,
        data: document.getElementById("data").value,
        oraInizio: document.getElementById("oraInizio").value,
        oraFine: document.getElementById("oraFine").value,
        tipo: document.getElementById("tipo").value,
        descrizione: document.getElementById("descrizione").value
    };

    let res = await fetch(API, {
        method:"POST",
        body: JSON.stringify(payload)
    });

    let out = await res.json();
    
    if(out.status=="OK"){
        toast("Presenza Salvata");
    } else {
        toast("Errore salvataggio");
    }
};
