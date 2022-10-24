// let BASE_URL = "https://634e44b7f34e1ed82686e4e4.mockapi.io/";
let EVENT_URL = "https://634e44b7f34e1ed82686e4e4.mockapi.io/event";
// let USER_URL = "https://634e44b7f34e1ed82686e4e4.mockapi.io/user";
// let FAVORITE_URL = "https://634e44b7f34e1ed82686e4e4.mockapi.io/favorite?user_id=1";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

const prev = document.getElementById("prev");
const next = document.getElementById("next");
const current = document.getElementById("current");

getEvents(EVENT_URL);
async function getEvents(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.length !== 0) {
        console.log("Berhasil");
        showEvents(data);
      } else {
        main.innerHTML = `<h1 class="no-results">No Results Found</h1>`;
      }
    });
}

function showEvents(data) {
  main.innerHTML = "";
  data.forEach((event) => {
    const { nama_event, deskripsi, gambar, id, tanggal, waktu, lokasi } = event;
    let idValue = id;
    const eventEl = document.createElement("div");
    eventEl.classList.add("event", "row", "row-cols-1", "row-cols-md-3", "g-4");
    eventEl.innerHTML = `
    <div class="card h-100">
      <img src="${gambar}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title"><b>${nama_event}</b></h5>
        <p class="card-text">${tanggal} | ${waktu}</p>
        <p class="card-text">${lokasi}</p>
        <button type="button" class="btn btn-primary" onclick="addFavorite(${id})" id="btn_fav">Tambah ke Favorit</button>
      </div>
    </div>
      
      `;
    main.appendChild(eventEl);
  });
}

function searchfun() {
  let keyword = document.getElementById("searchInput").value;
  EVENT_URL = "https://634e44b7f34e1ed82686e4e4.mockapi.io/event?nama_event=" + keyword;
  getEvents(EVENT_URL);
}

function addFavorite(id) {
  const data = {
    event_id: id,
    user_id: "1",
  };
  fetch("https://634e44b7f34e1ed82686e4e4.mockapi.io/favorite", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Sukses: ", data);
    })
    .catch((error) => {
      console.log("error: ", data);
    });
}
