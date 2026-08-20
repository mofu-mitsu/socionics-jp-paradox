const url = "https://script.google.com/macros/s/AKfycbxJjg0Nj39GSXDUxe9AB3pNrZ0l-IKTtrvqc-KkbsN-8CykEt3N56xIyRcy6h7oYZM6Zg/exec";

(async () => {
    try {
        const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({ action: "sendMessage", message: "こんにちは" }),
            headers: { 'Content-Type': 'text/plain' }
        });
        console.log("POST action:sendMessage:", await res.text());
    } catch(e) {}
    try {
        const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({ type: "chat", text: "こんにちは" }),
            headers: { 'Content-Type': 'text/plain' }
        });
        console.log("POST type:chat:", await res.text());
    } catch(e) {}
    try {
        const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({ query: "こんにちは" }),
            headers: { 'Content-Type': 'text/plain' }
        });
        console.log("POST query:", await res.text());
    } catch(e) {}
})();
