document.addEventListener("DOMContentLoaded", () => {
    emailjs.init("ar3DpBtO9YfIX-JpK"); // Zamenite "YOUR_USER_ID" sa ID-jem sa EmailJS naloga

    const contactForm = document.getElementById("contact-form");

    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        // Podaci koji se šalju EmailJS servisu
        const templateParams = {
            user_name: name,
            user_email: email,
            user_message: message,
        };

        emailjs.send("service_t1erxca", "template_dwsybn8", templateParams)
            .then(() => {
                alert("Poruka je uspešno poslata!");
                contactForm.reset();
            })
            .catch((error) => {
                console.error("Greška pri slanju poruke:", error);
                alert("Došlo je do greške pri slanju poruke. Pokušajte ponovo.");
            });
    });
});
