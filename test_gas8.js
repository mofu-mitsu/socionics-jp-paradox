const url = "https://script.google.com/macros/s/AKfycbxJjg0Nj39GSXDUxe9AB3pNrZ0l-IKTtrvqc-KkbsN-8CykEt3N56xIyRcy6h7oYZM6Zg/exec";

(async () => {
    try {
        const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({ action: "save", uid: "test1234", text: "こんにちは" }),
            headers: { 'Content-Type': 'text/plain' }
        });
        console.log("POST action:save:", await res.text());
    } catch(e) {}
    try {
        const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({ action: "chat-messages", query: "こんにちは" }),
            headers: { 'Content-Type': 'text/plain' }
        });
        console.log("POST action:chat-messages:", await res.text());
    } catch(e) {}
})();
