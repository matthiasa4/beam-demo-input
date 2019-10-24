var button = document.getElementById("submitButton");

// function createFingerprint() {
//     var options = {};
//     Fingerprint2.getPromise(options).then(function (components) {
//         var values = components.map(function (component) { return component.value })
//         var murmur = Fingerprint2.x64hash128(values.join(''), 31)
//         console.log(components); // an array of FP components
//     });
// }

const getFingerprint = () => new Promise(resolve => {
    Fingerprint2.get((components) => {
        var values = components.map(function (component) { return component.value });
        const key = Fingerprint2.x64hash128(values.join(''), 31);

        resolve(key);
    })
})

const main = async () => {
    // Get fingerprint
    const fingerPrint = await getFingerprint();

    // Get sentence
    var sentence = document.getElementById("sentence").value;

    // Construct request    
    const http = new XMLHttpRequest();
    http.open('POST', '/api/test');
    http.setRequestHeader("Content-Type", "application/json");
    var body = JSON.stringify({
        "sentence": sentence,
        "fingerprint": fingerPrint
    });

    // Send request
    http.send(body);
}

button.addEventListener('click', main);