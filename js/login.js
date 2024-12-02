document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("login-form");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Dohvati korisnike iz LocalStorage
        const users = JSON.parse(localStorage.getItem("users")) || [];

        // Proveri da li korisnik postoji
        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            alert(`Dobrodošli, ${username}!`);
            localStorage.setItem("loggedInUser", JSON.stringify(user)); // Čuva podatke o prijavljenom korisniku
            window.location.href = "index.html"; // Preusmeravanje na početnu stranicu
        } else {
            alert("Neispravno korisničko ime ili lozinka!");
        }
    });
});
