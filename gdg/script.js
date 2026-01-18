const hotels = [
{ name: 'Ocean View Resort', location: 'Beach', price: 120, img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf' },
{ name: 'Mountain Inn', location: 'Mountain', price: 90, img: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511' },
{ name: 'City Lights Hotel', location: 'City', price: 150, img: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb' },
{ name: 'Luxury Palace', location: 'City', price: 220, img: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa' }
];


let selectedHotel = null;


const hotelList = document.getElementById('hotelList');
const bookingModal = document.getElementById('bookingModal');
const authModal = document.getElementById('authModal');


function displayHotels(list) {
hotelList.innerHTML = '';
list.forEach(h => {
hotelList.innerHTML += `
<div class="hotel-card">
<img src="${h.img}">
<div class="info">
<h3>${h.name}</h3>
<p>${h.location}</p>
<p>$${h.price}/night</p>
<button onclick="openBooking('${h.name}')">Book Now</button>
</div>
</div>`;
});
}


function openBooking(name) {
selectedHotel = name;
document.getElementById('bookingHotel').innerText = name;
bookingModal.style.display = 'flex';
}
function closeBooking(){ bookingModal.style.display='none'; }

function loadBookings() {
  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  const container = document.getElementById("bookingList");

  if (!container) return;

  bookings.forEach(b => {
    container.innerHTML += `
      <div class="card">
        <h3>${b.hotel}</h3>
        <p>${b.checkin} → ${b.checkout}</p>
        <p>Guests: ${b.guests}</p>
        <p>User: ${b.user}</p>
      </div>
    `;
  });
}

document.addEventListener("DOMContentLoaded", loadBookings);



function confirmBooking(hotelName) {
  const booking = {
    hotel: hotelName,
    checkin: document.getElementById("checkin").value,
    checkout: document.getElementById("checkout").value,
    guests: document.getElementById("guests").value,
    user: JSON.parse(localStorage.getItem("user"))?.username || "guest"
  };

  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  bookings.push(booking);
  localStorage.setItem("bookings", JSON.stringify(bookings));

  alert("Booking saved successfully!");
}



function login() {
localStorage.setItem('user', username.value);
alert('Logged in as ' + username.value);
closeAuth();
}
function closeAuth(){ authModal.style.display='none'; }
document.getElementById('openAuth').onclick=()=>authModal.style.display='flex';


searchBtn.onclick = () => {
const loc = location.value.toLowerCase();
const max = maxPrice.value || Infinity;
displayHotels(hotels.filter(h => h.location.toLowerCase().includes(loc) && h.price <= max));
};


displayHotels(hotels);