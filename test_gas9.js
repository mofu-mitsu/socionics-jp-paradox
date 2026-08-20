const url = "https://script.google.com/macros/s/AKfycbxJjg0Nj39GSXDUxe9AB3pNrZ0l-IKTtrvqc-KkbsN-8CykEt3N56xIyRcy6h7oYZM6Zg/exec";

(async () => {
    try {
        const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
              inputs: {},
              query: "こんにちは",
              response_mode: "blocking",
              user: "test1234"
            }),
            headers: { 'Content-Type': 'text/plain' }
        });
        console.log("POST dify format:", await res.text());
    } catch(e) {}
})();
