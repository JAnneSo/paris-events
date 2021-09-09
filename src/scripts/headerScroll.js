let departScroll = window.pageYOffset;
window.onscroll = function () {
  let currentScrollpos = window.pageYOffset;
  if (window.pageYOffset == 0) {
    document.getElementById("header").style.top = "0";
  } else if (departScroll > currentScrollpos) {
    document.getElementById("header").style.top = "0";
  } else {
    document.getElementById("header").style.top = "-53px";
  }
  departScroll = currentScrollpos;
};
