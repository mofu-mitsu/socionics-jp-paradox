const url = "https://script.google.com/macros/s/AKfycbxJjg0Nj39GSXDUxe9AB3pNrZ0l-IKTtrvqc-KkbsN-8CykEt3N56xIyRcy6h7oYZM6Zg/exec";

(async () => {
    try {
        const res = await fetch(url + "?uid=test1234&action=load");
        console.log("GET action=load:", await res.text());
        
        const res2 = await fetch(url + "?uid=test1234&action=save");
        console.log("GET action=save:", await res2.text());
        
        const res3 = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({ action: "save", uid: "test1234", history: [] }),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        console.log("POST action=save:", await res3.text());
    } catch(e) {}
})();
