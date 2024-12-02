document.addEventListener("DOMContentLoaded", () => {
    const itemsPerPage = 18; // Broj stripova po stranici
    let currentPage = 1;
    let strips = [];
    let filteredStrips = [];
    
    const container = document.getElementById("strip-container");
    const paginationContainer = document.getElementById("pagination-container");
    const searchBar = document.getElementById("search-bar");
    const findStripsButton = document.getElementById("find-strips-btn");

    // Učitaj podatke iz JSON fajla
    fetch("data/strips.json")
        .then(response => response.json())
        .then(data => {
            strips = data;
            filteredStrips = strips; // Prikazujemo sve stripove po default-u
            renderPage(currentPage);
            setupPagination(filteredStrips.length, itemsPerPage);
        })
        .catch(error => console.error("Greška pri učitavanju stripova:", error));

    // Funkcija za prikaz stripova na osnovu trenutne strane
    function renderPage(page) {
        const container = document.getElementById("strip-container");
        container.innerHTML = "";

        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const currentStrips = filteredStrips.slice(startIndex, endIndex);

        currentStrips.forEach(strip => {
            const stripCard = document.createElement("div");
            stripCard.classList.add("strip");

            // Generiši link ka details.html
            stripCard.innerHTML = `
                <a href="details.html?id=${strip.id}">
                    <img src="${strip.image}" alt="${strip.title}">
                    <div class="strip-info">
                        <h3>${strip.title}</h3>
                        <p><strong>Autor:</strong> ${strip.author}</p>
                        <p><strong>Cena:</strong> ${strip.price} RSD</p>
                    </div>
                </a>
            `;

            container.appendChild(stripCard);
        });
    }

    // Funkcija za kreiranje dugmića za strane
    function setupPagination(totalItems, itemsPerPage) {
        paginationContainer.innerHTML = "";

        const totalPages = Math.ceil(totalItems / itemsPerPage);

        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement("button");
            button.textContent = i;
            button.classList.add("pagination-btn");
            if (i === currentPage) button.classList.add("active");

            button.addEventListener("click", () => {
                currentPage = i;
                renderPage(currentPage);

                document.querySelectorAll(".pagination-btn").forEach(btn => btn.classList.remove("active"));
                button.classList.add("active");
            });

            paginationContainer.appendChild(button);
        }
    }

    // Pretraga stripova po naslovu
    searchBar.addEventListener("input", (event) => {
        const query = event.target.value.toLowerCase();
        filteredStrips = strips.filter(strip => strip.title.toLowerCase().includes(query));

        currentPage = 1;
        renderPage(currentPage);
        setupPagination(filteredStrips.length, itemsPerPage);
    });

    // Klik na dugme "Pronađite stripove"
    findStripsButton.addEventListener("click", () => {
        if (searchBar.style.display === "none") {
            searchBar.style.display = "block"; // Prikaz polja za pretragu
            searchBar.focus(); // Fokusiraj polje za unos
        } else {
            searchBar.style.display = "none"; // Sakrij polje za pretragu
            searchBar.value = ""; // Resetuj unos
            filteredStrips = strips; // Vrati sve stripove
            renderPage(currentPage);
            setupPagination(filteredStrips.length, itemsPerPage);
        }
    });

    // Provera da li je korisnik prijavljen
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (loggedInUser) {
        const header = document.querySelector("header");
        const logoutButton = document.createElement("button");
        logoutButton.textContent = "Odjavi se";
        logoutButton.style.marginLeft = "20px";
        logoutButton.style.backgroundColor = "#e50914";
        logoutButton.style.color = "white";
        logoutButton.style.border = "none";
        logoutButton.style.padding = "10px 15px";
        logoutButton.style.borderRadius = "5px";
        logoutButton.style.cursor = "pointer";

        logoutButton.addEventListener("click", () => {
            localStorage.removeItem("loggedInUser");
            alert("Uspešno ste se odjavili!");
            window.location.reload(); // Osveži stranicu
        });

        header.appendChild(logoutButton);

        logoutButton.classList.add("logout-button");
    }
});
