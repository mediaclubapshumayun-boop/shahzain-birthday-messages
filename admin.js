```javascript
const SUPABASE_URL = "PASTE_YOUR_SUPABASE_URL_HERE";
const SUPABASE_ANON_KEY = "PASTE_YOUR_SUPABASE_ANON_KEY_HERE";

let allMessages = [];


// ================================
// ADMIN LOGIN
// ================================

function login() {

    const password =
        document.getElementById("adminPassword").value;

    // TEMPORARY
    // We will replace this with proper authentication.
    if (password === "CHANGE_THIS_PASSWORD") {

        document.getElementById("loginSection").style.display = "none";

        document
            .getElementById("adminContent")
            .classList.remove("hidden");

        loadMessages();

    } else {

        alert("Incorrect password.");

    }
}


// ================================
// LOAD MESSAGES
// ================================

async function loadMessages() {

    const response = await fetch(
        `${SUPABASE_URL}/rest/v1/birthday_messages?select=*&order=created_at.desc`,
        {
            headers: {
                "apikey": SUPABASE_ANON_KEY,
                "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
            }
        }
    );

    if (!response.ok) {

        alert("Could not load messages.");
        return;

    }

    allMessages = await response.json();

    displayMessages();
}


// ================================
// DISPLAY MESSAGES
// ================================

function displayMessages() {

    const container =
        document.getElementById("messages");

    container.innerHTML = "";

    if (allMessages.length === 0) {

        container.innerHTML =
            "<p>No messages yet.</p>";

        return;
    }

    allMessages.forEach(item => {

        const card = document.createElement("div");

        card.style.background = "#f8f8f8";
        card.style.padding = "20px";
        card.style.marginTop = "15px";
        card.style.borderRadius = "15px";

        card.innerHTML = `
            <strong>${escapeHTML(item.name)}</strong>

            <p style="margin-top:10px;">
                ${escapeHTML(item.message)}
            </p>

            ${
                item.favorite
                ? `<p><b>Favorite thing:</b>
                   ${escapeHTML(item.favorite)}</p>`
                : ""
            }

            ${
                item.memory
                ? `<p><b>Memory:</b>
                   ${escapeHTML(item.memory)}</p>`
                : ""
            }
        `;

        container.appendChild(card);

    });
}


// ================================
// CSV DOWNLOAD
// ================================

function downloadCSV() {

    if (!allMessages.length) {

        alert("There are no responses to download.");
        return;

    }

    let csv =
        "Name,Message,Favorite Thing,Memory,Date\n";

    allMessages.forEach(item => {

        csv += [
            item.name,
            item.message,
            item.favorite || "",
            item.memory || "",
            item.created_at || ""
        ]
        .map(value =>
            `"${String(value).replace(/"/g, '""')}"`
        )
        .join(",") + "\n";

    });

    const blob = new Blob(
        [csv],
        { type: "text/csv;charset=utf-8;" }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "shahzain-birthday-messages.csv";

    link.click();

    URL.revokeObjectURL(url);
}


// ================================
// SECURITY
// ================================

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
```
