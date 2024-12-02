document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("register-form");

    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Sprečava ponovno učitavanje stranice

        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!username || !email || !password) {
            alert("Molimo popunite sva polja.");
            return;
        }

        // Uzimanje postojećih korisnika iz LocalStorage
        const users = JSON.parse(localStorage.getItem("users")) || [];

        // Provera da li korisničko ime ili email već postoji
        if (users.some(user => user.username === username)) {
            alert("Korisničko ime je već zauzeto!");
            return;
        }

        if (users.some(user => user.email === email)) {
            alert("Ovaj email je već registrovan!");
            return;
        }

        // Dodavanje novog korisnika
        users.push({ username, email, password });
        localStorage.setItem("users", JSON.stringify(users));

        alert("Uspešno ste se registrovali!");
        window.location.href = "login.html"; // Preusmeravanje na stranicu za prijavu
    });
});
