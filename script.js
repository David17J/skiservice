function calculatePickupDate() {
    const priority = document.getElementById("priority").value;
    const currentDate = new Date();
    let pickupDate;

    if (priority === "low") {
        pickupDate = new Date(currentDate.getTime());
        pickupDate.setDate(pickupDate.getDate() + 12);  // 12 Tage für "Tief"
    } else if (priority === "standard") {
        pickupDate = new Date(currentDate.getTime());
        pickupDate.setDate(pickupDate.getDate() + 7);  // 7 Tage für "Standard"
    } else if (priority === "express") {
        pickupDate = new Date(currentDate.getTime());
        // 5 Tage für "Express", aber sicherstellen, dass es nicht in die Vergangenheit geht
        pickupDate.setDate(pickupDate.getDate() + 5);  // 5 Tage nach vorne
    }

    // Datum im Format DD.MM.YYYY anzeigen
    const options = {day: '2-digit', month: '2-digit', year: 'numeric'};
    document.getElementById("pickupDate").value = pickupDate.toLocaleDateString('de-DE', options);
}

function sendInformation() {
    let valid = validateForm();
    console.log("valid=" + valid);
    if (valid) {
        console.log("valid=" + valid);
        register();
    }
}

// Funktion zur Formularvalidierung
function validateForm() {
    // Vorname und Name
    const email = document.getElementById("email");
    const emailMessage = document.getElementById("emailMessage");
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const phone = document.getElementById("phone").value;
    const offer = document.getElementById("offer").value;
    const priority = document.getElementById("priority").value;
    const pickupDate = document.getElementById("pickupDate").value;

    let isValid = true;  // Standardmäßig annehmen, dass das Formular gültig ist
    let errorMessage = "";  // Fehlernachricht

    // Vorname und Nachname Validierung
    if (!firstName.match(/^[A-Za-zÄÖÜäöüß]+$/)) {
        isValid = false;
        errorMessage += "Der Vorname ist ungültig. Nur Buchstaben sind erlaubt.\n";
    }
    if (!lastName.match(/^[A-Za-zÄÖÜäöüß]+$/)) {
        isValid = false;
        errorMessage += "Der Nachname ist ungültig. Nur Buchstaben sind erlaubt.\n";
    }

    // Telefon (optional, aber wenn ausgefüllt, dann 10 Ziffern)
    if (phone && !phone.match(/^\d{10}$/)) {
        isValid = false;
        errorMessage += "Die Telefonnummer ist ungültig. Sie muss 10 Ziffern enthalten.\n";
    }

    // E-Mail Validierung
    email.setAttribute("style", "border-color: grey");
    if (!email.value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
        isValid = false;
        errorMessage += "Die E-Mail-Adresse ist ungültig.\n";
        email.setAttribute("style", "border-color: red");
        // emailMessage.set("text", errorMessage);
    }

    // Auswahl des Angebots
    if (offer === "") {
        isValid = false;
        errorMessage += "Bitte wählen Sie ein Angebot aus.\n";
    }

    // Priorität auswählen
    if (priority === "") {
        isValid = false;
        errorMessage += "Bitte wählen Sie eine Priorität aus.\n";
    }

    // Abholdatum (falls notwendig)
    if (!pickupDate) {
        isValid = false;
        errorMessage += "Bitte geben Sie das Abholdatum ein.\n";
    }

    // Fehlernachricht anzeigen, wenn Formular ungültig ist
    return isValid;  // Gibt true zurück, wenn alle Validierungen bestanden sind, sonst false
}

function register(form2) {
    const url = "http://localhost:5000/api/registration"
    const email = document.getElementById("email").value;
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const phone = document.getElementById("phone").value;
    const offer = document.getElementById("offer").value;
    const priority = document.getElementById("priority").value;
    const pickupDate = document.getElementById("pickupDate").value;
    const response = document.getElementById("response");

    let form = {
        name: firstName + " " + lastName,
        email: email,
        phone: phone,
        priority: priority,
        service: offer,
        pickup_date: pickupDate
    }
    let fetchData = {
        method: "POST",
        body: form,
    };
    console.log("form" + JSON.stringify(form));

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(form),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then(function (data) {
            console.log("Registration successful=" + JSON.stringify(data));
            alert("Registration succeed " + JSON.stringify(data))
            // Das Promise ist resolve -> Empfangene Daten abarbeiten
        })
        .catch(function (err) {
            console.log("Err=" + err);
            // Das Promise is reject -> Fehler behandeln
        });


}
