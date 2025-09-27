const params = new URLSearchParams(window.location.search);
const id = params.get("id");

fetch("family.json")
  .then(res => res.json())
  .then(data => {
    const person = data.find(p => p.id == id);
    const container = document.getElementById("profile");

    if (!person) {
      container.innerHTML = "<p>Person not found.</p>";
      return;
    }

    // Main profile
    let html = `
      <h1>${person.name}</h1>
      <img src="${person.photo}" alt="${person.name}" width="200">
      <p>${person.bio}</p>
    `;

    // Extra pictures
    if (person.pictures && person.pictures.length > 0) {
      html += "<h3>Pictures</h3>";
      html += person.pictures.map(pic => `<img src="${pic}" width="200">`).join("");
    }

    // Videos
    if (person.videos && person.videos.length > 0) {
      html += "<h3>Videos</h3>";
      html += person.videos.map(v => `<video src="${v}" controls width="300"></video>`).join("");
    }

    container.innerHTML = html;
  });
