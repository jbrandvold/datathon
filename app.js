document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("#uploadForm"); // Reference the form using ID
  const fileInput = document.querySelector("#myFile");
  const submitButton = document.querySelector(".btn-submit");

  submitButton.addEventListener("click", async function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Get user-selected values from radio buttons
    const temperature = document.querySelector(
      'input[name="temperature"]:checked'
    );
    const humidity = document.querySelector('input[name="humidity"]:checked');
    const location = document.querySelector('input[name="location"]:checked');

    if (!temperature || !humidity || !location) {
      alert("Please select all options before submitting.");
      return;
    }

    const tempValue = temperature.nextElementSibling.textContent;
    const humidValue = humidity.nextElementSibling.textContent;
    const locValue = location.nextElementSibling.textContent;

    let stateId = -1;

    // Assign stateId based on user selections
    if (
      humidValue === "More Humid" &&
      locValue === "Coastal" &&
      tempValue === "More Hot"
    ) {
      stateId = 0;
    } else if (
      humidValue === "More Humid" &&
      locValue === "Coastal" &&
      tempValue === "More Cold"
    ) {
      stateId = 1;
    } else if (
      humidValue === "More Humid" &&
      locValue === "Inland" &&
      tempValue === "More Hot"
    ) {
      stateId = 2;
    } else if (
      humidValue === "More Humid" &&
      locValue === "Inland" &&
      tempValue === "More Cold"
    ) {
      stateId = 3;
    } else if (
      humidValue === "More Dry" &&
      locValue === "Coastal" &&
      tempValue === "More Hot"
    ) {
      stateId = 4;
    } else if (
      humidValue === "More Dry" &&
      locValue === "Coastal" &&
      tempValue === "More Cold"
    ) {
      stateId = 5;
    } else if (
      humidValue === "More Dry" &&
      locValue === "Inland" &&
      tempValue === "More Hot"
    ) {
      stateId = 6;
    } else if (
      humidValue === "More Dry" &&
      locValue === "Inland" &&
      tempValue === "More Cold"
    ) {
      stateId = 7;
    } else {
      alert("Invalid selection combination.");
      return;
    }

    // Create feature array
    let features = new Array(96).fill(0);

    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const reader = new FileReader();

      reader.onload = function (e) {
        const csvData = e.target.result;
        const csvArray = parseCSV(csvData);

        for (let i = 0; i < csvArray.length && i + 24 < features.length; i++) {
          if (i > 55) {
            features[i + 16] = csvArray[i];
          } else if (i > 23) {
            features[i + 8] = csvArray[i];
          } else {
            features[i] = csvArray[i];
          }
        }

        // One-hot encode the selected state
        for (let i = 24; i < 32; i++) {
          features[i] = i - 24 === stateId ? 1 : 0;
        }
        for (let i = 56; i < 64; i++) {
          features[i] = i - 24 === stateId ? 1 : 0;
        }
        for (let i = 88; i < 96; i++) {
          features[i] = i - 24 === stateId ? 1 : 0;
        }

        sendData(features);
      };

      reader.readAsText(file);
    } else {
      alert("Input File Must Be Of Length 72");
    }
  });

  function parseCSV(csvString) {
    return csvString
      .trim()
      .split(/\s*,\s*/)
      .map(Number)
      .filter((n) => !isNaN(n));
  }

  async function sendData(features) {
    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ features: features }),
      });

      const result = await response.json();

      if (response.ok) {
        alert(`Prediction: ${result.prediction}`);
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error("Error connecting to server:", error);
      alert("Failed to connect to the server.");
    }
  }
});
