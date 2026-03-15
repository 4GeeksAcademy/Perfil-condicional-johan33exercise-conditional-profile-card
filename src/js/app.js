window.variables = {
  includeCover: false,
  background: null,
  avatarURL: "https://randomuser.me/api/portraits/women/44.jpg",
  socialMediaPosition: "right",
  twitter: null,
  github: null,
  linkedin: null,
  instagram: null,
  name: "Ramon",
  lastName: null,
  role: "Web Developer",
  country: "USA",
  city: "Miami"
};

function render(variables = {}) {
  const name = variables.name || "Your name";
  const lastName = variables.lastName || "Your lastname";
  const role = variables.role || "Web Developer";
  const city = variables.city || "Miami";
  const country = variables.country || "USA";

  const includeCover = variables.includeCover === true;

  const cover = includeCover
    ? `<div class="cover">
        <img src="${variables.background ||
          "https://images.unsplash.com/photo-1492724441997-5dc865305da7"}" />
      </div>`
    : `<div class="cover hidden"></div>`;

  const socialPosition =
    variables.socialMediaPosition === "left" ? "left" : "right";

  const twitter = variables.twitter
    ? `<a href="https://twitter.com/${variables.twitter}" target="_blank"><i class="fab fa-twitter"></i></a>`
    : `<a class="disabled"><i class="fab fa-twitter"></i></a>`;

  const github = variables.github
    ? `<a href="https://github.com/${variables.github}" target="_blank"><i class="fab fa-github"></i></a>`
    : `<a class="disabled"><i class="fab fa-github"></i></a>`;

  const linkedin = variables.linkedin
    ? `<a href="https://linkedin.com/in/${variables.linkedin}" target="_blank"><i class="fab fa-linkedin-in"></i></a>`
    : `<a class="disabled"><i class="fab fa-linkedin-in"></i></a>`;

  const instagram = variables.instagram
    ? `<a href="https://instagram.com/${variables.instagram}" target="_blank"><i class="fab fa-instagram"></i></a>`
    : `<a class="disabled"><i class="fab fa-instagram"></i></a>`;

  document.querySelector("#widget_content").innerHTML = `
    <div class="widget ${includeCover ? "has-cover" : ""}">
      ${cover}

      <div class="social-bar ${socialPosition}">
        ${twitter}
        ${github}
        ${linkedin}
        ${instagram}
      </div>

      <img src="${variables.avatarURL}" class="photo"/>

      <h1>${name} ${lastName}</h1>
      <h2>${role}</h2>
      <h3>${city}, ${country}</h3>
    </div>
  `;
}

window.onload = function() {
  render(window.variables);

  document.querySelectorAll(".picker").forEach(function(elm) {
    elm.addEventListener("change", function(e) {
      const attribute = e.target.getAttribute("for");

      let values = {};
      values[attribute] =
        this.value == "" || this.value == "null"
          ? null
          : this.value == "true"
          ? true
          : this.value == "false"
          ? false
          : this.value;

      render(Object.assign(window.variables, values));
    });
  });
};
