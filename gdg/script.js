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
  if (list.length === 0) {
    hotelList.innerHTML = '<p>No hotels found matching your criteria.</p>';
    return;
  }
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

function closeBooking() { bookingModal.style.display = 'none'; }
function closeAuth() { authModal.style.display = 'none'; }

function confirmBooking() {
  if (!selectedHotel) return alert("No hotel selected!");
  const booking = {
    hotel: selectedHotel,
    checkin: document.getElementById("checkin").value,
    checkout: document.getElementById("checkout").value,
    guests: document.getElementById("guests").value,
    user: JSON.parse(localStorage.getItem("user"))?.username || "guest"
  };
  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  bookings.push(booking);
  localStorage.setItem("bookings", JSON.stringify(bookings));
  alert("Booking saved successfully!");
  closeBooking();
}

function loadBookings() {
  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  const container = document.getElementById("bookingList");
  if (!container) return;
  container.innerHTML = '';
  bookings.forEach((b, index) => {
    container.innerHTML += `
      <div class="hotel-card">
        <div class="info">
          <h3>${b.hotel}</h3>
          <p>${b.checkin} → ${b.checkout}</p>
          <p>Guests: ${b.guests}</p>
          <p>User: ${b.user}</p>
          <button onclick="deleteBooking(${index})">Cancel Booking</button>
        </div>
      </div>`;
  });
}

function deleteBooking(index) {
  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  bookings.splice(index, 1);
  localStorage.setItem("bookings", JSON.stringify(bookings));
  loadBookings();
}

document.addEventListener("DOMContentLoaded", () => {
  displayHotels(hotels);
  loadBookings();
});

document.getElementById('openAuth').onclick = () => authModal.style.display = 'flex';
document.getElementById('searchBtn').onclick = () => {
  const loc = document.getElementById("location").value.toLowerCase();
  const max = document.getElementById("maxPrice").value || Infinity;
  displayHotels(hotels.filter(h => h.location.toLowerCase().includes(loc) && h.price <= max));
};
document.getElementById('sortPriceBtn').onclick = () => {
  const sorted = [...hotels].sort((a, b) => a.price - b.price);
  displayHotels(sorted);
};
document.getElementById('themeToggle').onclick = toggleTheme;
