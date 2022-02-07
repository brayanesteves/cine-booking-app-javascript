const container     = document.querySelector('.container');
const seats          = document.querySelectorAll('.row .seat:not(.occupied)');
const countOccupied = document.getElementById('count-occupied');
const count         = document.getElementById('count');
const total         = document.getElementById('total');
const movieSelect   = document.getElementById('movie');

populateUI();
let ticketPrice = +movieSelect.value;

/**
 * Seave selected movie 'index' and 'price'
 */
function setMovieData(index, price) {
    localStorage.setItem('selectedMovieIndex', index);
    localStorage.setItem('selectedMoviePrice', price)
}

/**
 * Update total and count
 */
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    /**
     * Selected '<div class="seat selected"></div>' position
     */
    const seatsIndex = [...selectedSeats].map(function (seat) {
        return [...seats].indexOf(seat);
    });

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;
    count.innerText          = selectedSeatsCount;
    total.innerText          = selectedSeatsCount * ticketPrice;
}

/**
 * Count '<div class="seat occupied"></div>'
 */
function updateOccupiedCount() {
    const selectedSeats      = document.querySelectorAll('.row .seat.occupied');
    const selectedSeatsCount = selectedSeats.length;
    countOccupied.innerText  = selectedSeatsCount;
}
updateOccupiedCount();

/**
 * Get data 'localStorage' and populate the UI
 */
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if(selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                /**
                 * Add class 'selected' to tag '<div class="seat"></div>'
                 * Result:
                 * '<div class="seat selected"></div>'
                 */
                seat.classList.add('selected');
            }
        });
    }
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if(selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

/**
 * Movie selected
 */
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});

container.addEventListener('click', (e) => {
    /**
     * <div class="seat"></div>
     */
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        /**
         * Add class 'seleted'
         * <div class="seat selected"></div>
         */
        e.target.classList.toggle('selected');
    }

    updateSelectedCount();
});
updateSelectedCount();