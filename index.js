function add(accumulator, a) {
  return accumulator + a;
}
var n = 0;

var form = document.querySelector("#form");
var button = document.querySelector("button");
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#n").addEventListener("keypress", function (event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
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
          "<p clas='cost-fn'> <input type='text' id='pmin" +
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

  // const gamma = [0.008, 0.009];
  // const beta = [10, 8];
  // const alpha = [0, 0];
  // const Pmin = [100, 400];
  // const Pmax = [600, 1000];
  // const PD = 1500;
  // var lmda = Math.max(...beta);
  // var delp = -1;
  // var iteration = 0;
  // var P = [];

  // while (delp != 0) {
  //   var pp = 0;
  //   var x = 0;
  //   for (var i = 0; i < n; i++) {
  //     P[i] = (lmda - beta[i]) / (2 * gamma[i]);

  //     if (P[i] < Pmin[i]) {
  //       P[i] = Pmin[i];
  //     }
  //     if (P[i] > Pmax[i]) {
  //       P[i] = Pmax[i];
  //     } else {
  //       P[i] = P[i];
  //     }
  //     x = x + 1 / (2 * gamma[i]);
  //     pp = pp + P[i];
  //   }
  //   delp = PD - pp;
  //   var dellam = delp / x;
  //   lmda = lmda + dellam;
  //   iteration = iteration + 1;
  //   if (iteration === 1000) {
  //     break;
  //   }
  // }
  // console.log("P= " + P.map((x) => Math.round(x)));
  // console.log("lambda= " + lmda);

  // var c = [];

  // for (var i = 0; i < n; i++) {
  //   c[i] = alpha[i] + beta[i] * P[i] + gamma[i] * Math.pow(P[i], 2);
  // }

  // const cost = c.reduce(add, 0);
  // console.log(Math.round(cost));
});
button.addEventListener("click", () => {
  var gamma = [];
  var alpha = [];
  var beta = [];
  var Pmin = [];
  var Pmax = [];
  for (let i = 1; i <= n; i++) {
    let curr = parseInt(document.querySelector("#alpha" + i).value);
    alpha.push(curr);
  }
  for (let i = 1; i <= n; i++) {
    let curr = parseInt(document.querySelector("#beta" + i).value);
    beta.push(curr);
  }
  for (let i = 1; i <= n; i++) {
    let curr = parseFloat(document.querySelector("#gamma" + i).value);
    gamma.push(curr);
  }
  for (let i = 1; i <= n; i++) {
    let curr = parseInt(document.querySelector("#pmin" + i).value);
    Pmin.push(curr);
  }
  for (let i = 1; i <= n; i++) {
    let curr = parseInt(document.querySelector("#pmax" + i).value);
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
});
