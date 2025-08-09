const tasks = [
    { question: "Kennst du Frau Adams? Ich habe mich so _____ geärgert.", answer: "über sie" },
    { question: "So eine unhöfliche Kellnerin! Ich möchte mich _____ beschweren.", answer: "über sie" },
    { question: "Danke für die E-Mail. Ich habe mich sehr _____ gefreut.", answer: "darüber" },
    { question: "Der Kurs ist sehr gut. Ich bin wirklich zufrieden _____.", answer: "damit" },
    { question: "Nächste Woche fahren wir nach London. Ich freue mich schon _____.", answer: "darauf" },
    { question: "Wir brauchen noch Getränke. Könntest du dich _____ kümmern?", answer: "darum" },
    { question: "Leo und Ilse sind wieder zurück. Ich habe jeden Tag _____ gedacht.", answer: "an sie" },
    { question: "Um 21 Uhr ist Sylvia gekommen. Ich habe eine Stunde _____ gewartet.", answer: "auf sie" },
    { question: "Das ist ein großes Problem. Lass uns morgen _____ sprechen.", answer: "darüber" },
    { question: "Sofia ist sehr nett. Ich möchte mich gern mal _____ treffen.", answer: "mit ihr" },
    { question: "Ich brauche kein Auto. _____ kann ich verzichten.", answer: "Darauf" },
    { question: "Du warst eine große Hilfe für mich. Wie kann ich dir _____ danken?", answer: "dafür" },
    { question: "Der Unfall war so schlimm, dass ich nachts _____ geträumt habe.", answer: "davon" },
    { question: "Immer redest du über Politik. Ich interessiere mich einfach nicht _____.", answer: "dafür" },
    { question: "Romeo ist so süß. Ich habe mich _____ verabredet.", answer: "mit ihm" },
    { question: "Bitte denk _____, dass Sara morgen Geburtstag hat.", answer: "daran" },
    { question: "Oma ist krank. Kannst du dich _____ kümmern?", answer: "um sie" },
    { question: "Endlich Sommer! Wir haben so lange _____ gewartet.", answer: "darauf" }
];

const container = document.getElementById("cardsContainer");
const fireworks = document.getElementById("fireworks");

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createCards(tasks) {
    container.innerHTML = "";

    shuffle(tasks).forEach(task => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">${task.question}</div>
                <div class="card-back">
                    <p>${task.answer}</p>
                    <div>
                        <button class="correctBtn">✅</button>
                        <button class="wrongBtn">❌</button>
                    </div>
                </div>
            </div>
        `;

        // Klicken auf die Karte dreht sie um, wenn sie noch nicht umgedreht ist
        card.addEventListener("click", () => {
            if (!card.classList.contains("flipped")) {
                card.classList.add("flipped");
            }
        });

        // Beim "Richtig"-Button entfernen wir die Karte
        card.querySelector(".correctBtn").onclick = (e) => {
            e.stopPropagation(); // Verhindert, dass das Klicken auf den Button auch das Klicken auf die Karte auslöst
            card.remove();
            checkEnd();
        };

        // Beim "Falsch"-Button soll die Karte nach 1 Sekunde wieder umgedreht und neu positioniert werden
        card.querySelector(".wrongBtn").onclick = (e) => {
            e.stopPropagation();
            setTimeout(() => {
                card.classList.remove("flipped");
                repositionCard(card);
            }, 1000);
        };

        container.appendChild(card);
    });
}

// Diese Funktion entfernt die Karte aus dem Container und fügt sie an einer zufälligen Position wieder ein.
function repositionCard(card) {
    // Zuerst entfernen wir die Karte aus dem Container
    container.removeChild(card);
    // Bestimme die Anzahl der aktuell vorhandenen Karten
    const children = container.children;
    // Wähle einen zufälligen Index zwischen 0 und der Anzahl der vorhandenen Karten (inklusive Möglichkeit, am Ende einzufügen)
    const randomIndex = Math.floor(Math.random() * (children.length + 1));
    if (randomIndex === children.length) {
        container.appendChild(card);
    } else {
        container.insertBefore(card, children[randomIndex]);
    }
}

// Überprüft, ob alle Karten entfernt wurden und das Feuerwerk angezeigt werden soll.
function checkEnd() {
    if (container.children.length === 0) {
        fireworks.style.display = "block";
        setTimeout(() => { fireworks.style.display = "none"; }, 4000);
    }
}

createCards(tasks);