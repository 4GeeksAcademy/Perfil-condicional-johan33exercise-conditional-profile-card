import "../style/index.css";

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

function getValue(value, fallback) {
  return value === null || value === undefined || value === ""
    ? fallback
    : value;
}

function render(variables = {}) {
  const includeCover = variables.includeCover === true;
  const fullName = `${getValue(variables.name, "Your name")} ${getValue(
    variables.lastName,
    "Your lastname"
  )}`;
  const role = getValue(variables.role, "Web Developer");
  const city = getValue(variables.city, "Miami");
  const country = getValue(variables.country, "USA");
  const socialPosition =
    variables.socialMediaPosition === "left" ? "left" : "right";

  const coverHTML = includeCover
    ? `
      <div class="cover">
        <img
          src="${getValue(
            variables.background,
            "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80"
          )}"
          alt="cover"
        />
      </div>
    `
    : `<div class="cover hidden"></div>`;

  const twitterLink = variables.twitter
    ? `https://twitter.com/${variables.twitter}`
    : "#";
  const githubLink = variables.github
    ? `https://github.com/${variables.github}`
    : "#";
  const linkedinLink = variables.linkedin
    ? `https://linkedin.com/in/${variables.linkedin}`
    : "#";
  const instagramLink = variables.instagram
    ? `https://instagram.com/${variables.instagram}`
    : "#";

  document.querySelector("#widget_content").innerHTML = `
    <div class="widget ${includeCover ? "has-cover" : ""}">
      ${coverHTML}

      <div class="social-bar ${socialPosition}">
        <a href="${twitterLink}" class="${
    variables.twitter ? "" : "disabled"
  }" target="_blank" rel="noopener noreferrer">
          <i class="fab fa-twitter"></i>
        </a>
        <a href="${githubLink}" class="${
    variables.github ? "" : "disabled"
  }" target="_blank" rel="noopener noreferrer">
          <i class="fab fa-github"></i>
        </a>
        <a href="${linkedinLink}" class="${
    variables.linkedin ? "" : "disabled"
  }" target="_blank" rel="noopener noreferrer">
          <i class="fab fa-linkedin-in"></i>
        </a>
        <a href="${instagramLink}" class="${
    variables.instagram ? "" : "disabled"
  }" target="_blank" rel="noopener noreferrer">
          <i class="fab fa-instagram"></i>
        </a>
      </div>

      <img
        src="${getValue(
          variables.avatarURL,
          "https://randomuser.me/api/portraits/women/44.jpg"
        )}"
        class="photo"
        alt="profile"
      />

      <h1>${fullName}</h1>
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

    if (elm.tagName === "INPUT") {
      elm.addEventListener("input", function(e) {
        const attribute = e.target.getAttribute("for");
        let values = {};
        values[attribute] = this.value === "" ? null : this.value;
        render(Object.assign(window.variables, values));
      });
    }
  });
};
