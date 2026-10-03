```javascript
// ================================
// SUPABASE CONFIGURATION
// ================================

const SUPABASE_URL = "PASTE_YOUR_SUPABASE_URL_HERE";
const SUPABASE_ANON_KEY = "PASTE_YOUR_SUPABASE_ANON_KEY_HERE";


// ================================
// SUBMIT MESSAGE
// ================================

async function submitMessage() {

    const name = document.getElementById("name").value.trim();
    const message = document.getElementById("message").value.trim();
    const favorite = document.getElementById("favorite").value.trim();
    const memory = document.getElementById("memory").value.trim();

    if (!name || !message) {
        alert("Please enter your name and birthday message ❤️");
        return;
    }

    const button = document.querySelector("button");

    button.disabled = true;
    button.textContent = "Saving... 💌";

    try {

        const response = await fetch(
            `${SUPABASE_URL}/rest/v1/birthday_messages`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "apikey": SUPABASE_ANON_KEY,
                    "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
                    "Prefer": "return=minimal"
                },

                body: JSON.stringify({
                    name: name,
                    message: message,
                    favorite: favorite,
                    memory: memory
                })
            }
        );

        if (!response.ok) {
            throw new Error("Could not save message");
        }

        document.getElementById("messageForm").style.display = "none";
        document.getElementById("success").classList.remove("hidden");

    } catch (error) {

        console.error(error);

        alert(
            "Something went wrong while saving your message. Please try again."
        );

        button.disabled = false;
        button.textContent = "Send Birthday Wish 💌";
    }
}
```
