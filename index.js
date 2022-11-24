function add(accumulator, a) {
  return accumulator + a;
}
var n = 0;

var form = document.querySelector("#form");
var button = document.querySelector("button");
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#n").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      n = parseInt(document.querySelector("#n").value);
      for (var i = 1; i <= n; i++) {
        form.innerHTML +=
          "<p class='cost-fn' > \\(C_{" +
          i +
          "} = \\) <input type='text' id='alpha" +
          i +
          "' class='inline alpha' /></span> " +
          "\\(+\\)" +
          "<input type='text' id='beta" +
          i +
          "' class='inline beta' /></span> \\( P_{" +
          i +
          "}+  \\) <input type='text' id='gamma" +
          i +
          "' class='inline gamma' /></span> \\(P_{" +
          i +
          "}^{2}\\) </p>";
        form.innerHTML +=
          "<p class='cost-fn'> <input type='text' id='pmin" +
          i +
          "' class='inline ' /></span> \\( \\le P_{" +
          i +
          "} \\le \\) <input type='text' id='pmax" +
          i +
          "' class='inline' /></span>  </p>";
      }
      setTimeout(function () {
        MathJax.typeset();
        syncTypeset.appendChild(done.cloneNode(true));
      }, 0);
    }
  });
});
button.addEventListener("click", () => {
  var gamma = [];
  var alpha = [];
  var beta = [];
  var Pmin = [];
  var Pmax = [];
  for (let i = 1; i <= n; i++) {
    let curr = parseFloat(document.querySelector("#alpha" + i).value);
    alpha.push(curr);
  }
  for (let i = 1; i <= n; i++) {
    let curr = parseFloat(document.querySelector("#beta" + i).value);
    beta.push(curr);
  }
  for (let i = 1; i <= n; i++) {
    let curr = parseFloat(document.querySelector("#gamma" + i).value);
    gamma.push(curr);
  }
  for (let i = 1; i <= n; i++) {
    let curr = parseFloat(document.querySelector("#pmin" + i).value);
    Pmin.push(curr);
  }
  for (let i = 1; i <= n; i++) {
    let curr = parseFloat(document.querySelector("#pmax" + i).value);
    Pmax.push(curr);
  }
  console.log(alpha);
  console.log(beta);
  console.log(gamma);
  console.log(Pmin);
  console.log(Pmax);
  var PD = document.querySelector("#pd").value;
  var lmda = Math.max(...beta);
  var delp = -1;
  var iteration = 0;
  var P = [];

  while (delp != 0) {
    var pp = 0;
    var x = 0;
    for (var i = 0; i < n; i++) {
      P[i] = (lmda - beta[i]) / (2 * gamma[i]);

      if (P[i] < Pmin[i]) {
        P[i] = Pmin[i];
      }
      if (P[i] > Pmax[i]) {
        P[i] = Pmax[i];
      } else {
        P[i] = P[i];
      }
      x = x + 1 / (2 * gamma[i]);
      pp = pp + P[i];
    }
    delp = PD - pp;
    var dellam = delp / x;
    lmda = lmda + dellam;
    iteration = iteration + 1;
    if (iteration === 1000) {
      break;
    }
  }
  console.log("P= " + P.map((x) => Math.round(x)));
  console.log("lambda= " + lmda);

  var c = [];

  for (var i = 0; i < n; i++) {
    c[i] = alpha[i] + beta[i] * P[i] + gamma[i] * Math.pow(P[i], 2);
  }

  const cost = c.reduce(add, 0);
  console.log(Math.round(cost));

  var given = document.querySelector(".given");
  given.innerHTML = "";
  given.innerHTML += "<p>Number of generators,</p>";
  given.innerHTML += "<p class='cost-fn'> \\(M = " + n + "\\) </p>";
  given.innerHTML += "<p>Cost characteristics,</p>";
  for (let i = 1; i <= n; i++) {
    given.innerHTML +=
      "<p class='cost-fn' > \\(C_{" +
      i +
      "} = \\) \\(" +
      alpha[i - 1] +
      "\\) " +
      "\\(+\\) \\(" +
      beta[i - 1] +
      "\\) \\( P_{" +
      i +
      "}+  \\) \\(" +
      gamma[i - 1] +
      "\\) \\(P_{" +
      i +
      "}^{2} Rs/h\\) </p>";
  }
  given.innerHTML += "<p>Generating limits,</p>";
  for (let i = 1; i <= n; i++) {
    given.innerHTML +=
      "<p class='cost-fn'> \\(" +
      Pmin[i - 1] +
      " MW\\) \\( \\le P_{" +
      i +
      "} \\le \\) \\(" +
      Pmax[i - 1] +
      " MW\\)  </p>";
  }
  given.innerHTML += "<p>Power demand,</p>";
  given.innerHTML += "<p class='cost-fn'> \\(D = " + PD + "  MW\\) </p>";
  given.innerHTML += "<br/>";
  given.innerHTML += "<hr/>";
  given.innerHTML += "<br/>";
  given.innerHTML += "<p>Incremental cost,</p>";
  for (let i = 1; i <= n; i++) {
    given.innerHTML +=
      "<p class='cost-fn' > \\( \\frac{dC_{" +
      i +
      "}}{dP_{" +
      i +
      "}} = " +
      beta[i - 1] +
      " + " +
      gamma[i - 1] * 2 +
      "P_{" +
      i +
      "} Rs/MWh \\)  </p>";
  }
  console.log(P);
  given.innerHTML += "<p>Lagrange Multiplier,</p>";
  given.innerHTML +=
    "<p class='cost-fn bigger'>$$ \\lambda = \\frac{D - \\Sigma_{i=1}^{n}\\frac{\\beta_{i}}{2\\gamma_{i}} }{\\Sigma_{i=1}^{n}\\frac{1}{2\\gamma_{i}}} $$ $$ = " +
    Math.round((lmda + Number.EPSILON) * 100) / 100 +
    "$$</p>";
  given.innerHTML += "Power allocated,";
  for (let i = 1; i <= n; i++) {
    given.innerHTML +=
      "<p class='cost-fn'>\\( P_{" +
      i +
      "} = \\frac{\\lambda - \\beta_{" +
      i +
      "}}{2\\gamma_{" +
      i +
      "}} = " +
      Math.round((P[i - 1] + Number.EPSILON) * 100) / 100 +
      " MW\\)</p>";
  }
  given.innerHTML += "Total cost of generation,<br/>";
  given.innerHTML += "<p class='costs' ></p>";
  var costs = document.querySelector(".costs");
  costs.innerHTML += "<p class='linela'> \\(C_{T} = \\)</p>";
  for (let i = 1; i < n; i++) {
    costs.innerHTML += "<p class='linela'> \\(C_{" + i + "} + \\)</p>";
  }
  costs.innerHTML +=
    "<p class='linela'> \\(C_{" +
    n +
    "} = " +
    Math.round((cost + Number.EPSILON) * 100) / 100 +
    " Rs\\) </p>";
  setTimeout(function () {
    MathJax.typeset();
    syncTypeset.appendChild(done.cloneNode(true));
  }, 0);
});
