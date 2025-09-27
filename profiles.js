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

    container.innerHTML = `
      <h1>${person.name}</h1>
      <img src="${person.photo}" alt="${person.name}" width="200">
      <p>${person.bio}</p>
      <h3>Videos</h3>
      ${person.videos.map(v => `<video src="${v}" controls width="300"></video>`).join("")}
    `;
  });
