const url = "https://script.google.com/macros/s/AKfycbxJjg0Nj39GSXDUxe9AB3pNrZ0l-IKTtrvqc-KkbsN-8CykEt3N56xIyRcy6h7oYZM6Zg/exec";

const actions = ["talk", "send", "message", "reply", "ask", "say", "chappy", "caterpillar", "bug"];

(async () => {
    for (const a of actions) {
        try {
            const res = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({ action: a, text: "こんにちは", uid: "test1234" }),
                headers: { 'Content-Type': 'text/plain' }
            });
            console.log("POST action:", a, await res.text());
        } catch(e) {}
    }
})();
