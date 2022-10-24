let sesId;
let ppp=9;


function ceksession(){
  if(sessionStorage.getItem("sesId")==undefined){
  window.location="login.html";
}
}

function logout(){
  sessionStorage.removeItem("sesId")
  window.location="login.html"
}

async function login() {
    let login_status = false;
    let inemail = document.getElementById("email").value;
    let inpassword = document.getElementById("password").value;
  
    const USER_URL = "https://634e44b7f34e1ed82686e4e4.mockapi.io/user";
  
    let response = await fetch(USER_URL);
    let result = await response.json();
    result.forEach((item) => {
      if (item.password == inpassword && item.email == inemail) {
        loginId = item.id
        login_status = true;
      }
    });
  
    if (login_status) {
        sessionStorage.setItem('sesId',loginId)
        console.log(sessionStorage.getItem('sesId'))
       alert("Anda berhasil login");
        window.location = 'index.html';
    } else {
        alert("Email/password salah");
    }
  }
  
  async function register() {
    const USER_URL = "https://634e44b7f34e1ed82686e4e4.mockapi.io/user";
    let register_status = true;
    let inemail = document.getElementById("email").value;
    let inpassword = document.getElementById("password").value;
    let inname = document.getElementById("name").value;
  
    let response = await fetch(USER_URL);
    let result = await response.json();
    result.forEach((item) => {
      if (item.email == inemail) {
        register_status = false;
      }
    });
    
    if (register_status) {
        addUser(inemail, inname, inpassword)
        alert("Anda berhasil register");
        window.location = 'login.html';
      } else {
        alert("Email telah digunakan! Silakan login")
      }
  }
  
  function addUser(email, name, password) {
    const data = {
      name: name,
      email:email,
    password:password,
    };
    fetch("https://634e44b7f34e1ed82686e4e4.mockapi.io/user", {
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
