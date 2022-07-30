const displayedImage = document.querySelector(".displayed-img");
const thumbBar = document.querySelector(".thumb-bar");

const btn = document.querySelector("button");
const overlay = document.querySelector(".overlay");

/* Looping through images */
images = ["pic1.jpg", "pic2.jpg", "pic3.jpg", "pic4.jpg", "pic5.jpg"];
for (let i = 0; i < images.length; i++) {
  const newImage = document.createElement("img");
  newImage.setAttribute("src", "images/" + images[i]);
  thumbBar.appendChild(newImage);
  newImage.addEventListener("click", (e) => {
    console.log(e.target.getAttribute("src"));
    displayedImage.setAttribute("src", e.target.getAttribute("src"));
  });
}

// thumbBar.addEventListener("click", (e) => {
//   console.log(e.target.getAttribute("src"));
//   displayedImage.setAttribute("src", e.target.getAttribute("src"));
// });

/* Wiring up the Darken/Lighten button */
btn.addEventListener("click", () => {
  if (btn.getAttribute("class") === "dark") {
    btn.setAttribute("class", "light");
    btn.textContent = "Lighten";
    overlay.style.backgroundColor = "rgba(0,0,0,0.5)";
  } else {
    btn.setAttribute("class", "dark");
    btn.textContent = "Darken";
    overlay.style.backgroundColor = "rgba(0,0,0,0)";
  }
});
