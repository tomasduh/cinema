const btn = document.getElementById("next");
const app = document.querySelectorAll(".container-switcher");
const padre = document.querySelector(".container-info");

let init = 0;

setTimeout(() => {
  padre.removeChild(app[1]);
  padre.removeChild(app[2]);
  padre.removeChild(app[3]);
}, 01);

btn.addEventListener("click", () => {
  if (init <= 2) {
    padre.removeChild(app[init]);
    init++;
    padre.appendChild(app[init]);
  } else {
    padre.removeChild(app[init]);
    init = 0;
    padre.appendChild(app[init]);
  }
});