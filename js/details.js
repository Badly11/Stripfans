document.addEventListener("DOMContentLoaded", () => {
    // Preuzimanje ID-a stripa iz URL-a
    const urlParams = new URLSearchParams(window.location.search);
    const stripId = urlParams.get("id");

    if (!stripId || isNaN(stripId)) {
        document.body.innerHTML = "<p>Greška: ID stripa nije prosleđen ili je nevažeći!</p>";
        return;
    }

    fetch("data/strips.json")
        .then((response) => response.json())
        .then((data) => {
            // Pronađi strip sa odgovarajućim ID-jem
            const strip = data.find((s) => s.id === parseInt(stripId));

            if (!strip) {
                document.body.innerHTML = "<p>Strip nije pronađen!</p>";
                return;
            }

            // Popunjavanje detalja o stripu
            document.getElementById("strip-image").src = strip.image;
            document.getElementById("strip-image").alt = strip.title;
            document.getElementById("strip-title").textContent = strip.title;
            document.getElementById("strip-author").textContent = strip.author;
            document.getElementById("strip-price").textContent = `${strip.price} RSD`;
            document.getElementById("strip-description").textContent = strip.description || "Nema opisa.";
        })
        .catch((error) => {
            console.error("Greška prilikom učitavanja podataka:", error);
            document.body.innerHTML = `<p>Došlo je do greške prilikom učitavanja podataka.</p>`;
        });

    // Ocenjivanje
    const ratingsContainer = document.getElementById("ratings-container");
    const ratingForm = document.getElementById("rating-form");
    const userRating = document.getElementById("user-rating");

    // Prikaz prosečne ocene
    function displayAverageRating() {
        const ratings = JSON.parse(localStorage.getItem(`ratings_${stripId}`)) || [];
        if (ratings.length > 0) {
            const average = ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
            ratingsContainer.textContent = `Prosečna ocena: ${average.toFixed(1)} / 5 (${ratings.length} ocena)`;
        } else {
            ratingsContainer.textContent = "Još nema ocena.";
        }
    }

    ratingForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const rating = parseInt(userRating.value);
        const ratings = JSON.parse(localStorage.getItem(`ratings_${stripId}`)) || [];
        ratings.push(rating);
        localStorage.setItem(`ratings_${stripId}`, JSON.stringify(ratings));
        displayAverageRating();
        alert("Vaša ocena je uspešno dodata!");
        ratingForm.reset();
    });

    // Komentarisanje
    const commentsList = document.getElementById("comments-list");
    const commentForm = document.getElementById("comment-form");
    const userComment = document.getElementById("user-comment");

    function displayComments() {
        const comments = JSON.parse(localStorage.getItem(`comments_${stripId}`)) || [];
        commentsList.innerHTML = "";
        comments.forEach((comment) => {
            const li = document.createElement("li");
            li.textContent = comment;
            commentsList.appendChild(li);
        });
    }

    commentForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const comment = userComment.value.trim();
        if (comment) {
            const comments = JSON.parse(localStorage.getItem(`comments_${stripId}`)) || [];
            comments.push(comment);
            localStorage.setItem(`comments_${stripId}`, JSON.stringify(comments));
            displayComments();
            alert("Vaš komentar je uspešno dodat!");
            commentForm.reset();
        }
    });

    // Inicijalno prikazivanje ocena i komentara
    displayAverageRating();
    displayComments();
});
