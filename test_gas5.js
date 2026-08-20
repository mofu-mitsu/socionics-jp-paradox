const url = "https://script.google.com/macros/s/AKfycbxJjg0Nj39GSXDUxe9AB3pNrZ0l-IKTtrvqc-KkbsN-8CykEt3N56xIyRcy6h7oYZM6Zg/exec";

(async () => {
    try {
        const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({ message: "こんにちは", text: "こんにちは", history: [] }),
            headers: { 'Content-Type': 'application/json' }
        });
        console.log("POST json:", await res.text());
    } catch(e) {}
    
    try {
        const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({ message: "こんにちは", history: [] }),
            headers: { 'Content-Type': 'text/plain' }
        });
        console.log("POST plain msg:", await res.text());
    } catch(e) {}
})();
