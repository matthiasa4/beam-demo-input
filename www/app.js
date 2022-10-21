var button = document.getElementById("submitButton");

var numberOfMessages = 0;

const onLoadFunction = async () => {
  document.getElementById("numberOfMessages").textContent = numberOfMessages;
  document.getElementById("uuid").textContent = await getFingerprint();
};

const getFingerprint = () =>
  new Promise((resolve) => {
    Fingerprint2.get((components) => {
      var values = components.map(function (component) {
        return component.value;
      });
      const key = Fingerprint2.x64hash128(values.join(""), 31);

      resolve(key);
    });
  });

const main = async () => {
  // Get fingerprint
  const fingerPrint = await getFingerprint();

  // Get sentence
  var sentence = document.getElementById("sentence").value;

  if (numberOfMessages < 5) {
    // Construct request
    const http = new XMLHttpRequest();
    http.open("POST", "/api/test");
    http.setRequestHeader("Content-Type", "application/json");
    var body = JSON.stringify({
      sentence: sentence,
      fingerprint: fingerPrint,
    });

    numberOfMessages += 1;

    document.getElementById("numberOfMessages").textContent = numberOfMessages;

    // Send request
    console.log(
      "%s published sentence %s which is his %s message in total",
      fingerPrint,
      sentence,
      numberOfMessages
    );
    http.send(body);
  }
};

button.addEventListener("click", main);
