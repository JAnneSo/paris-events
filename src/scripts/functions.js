const dateDetails = {
  day: {
    0: "Dim",
    1: "Lun",
    2: "Mar",
    3: "Mer",
    4: "Jeu",
    5: "Ven",
    6: "Sam"
  },
  month: {
    0: "Jan",
    1: "Fev",
    2: "Mars",
    3: "Avr",
    4: "Mai",
    5: "Juin",
    6: "Juil",
    7: "Août",
    8: "Sep",
    9: "Oct",
    10: "Nov",
    11: "Dec"
  }
};

export default function formatDate(date) {
  const tempDate = new Date(date);
  let res = `${dateDetails.day[tempDate.getDay()]} 
  ${tempDate.getDate()} 
  ${dateDetails.month[tempDate.getMonth()]} 
    ${tempDate.getFullYear()} ${
    tempDate.getHours() ? ", " + formatHours(tempDate) : ""
  }`;
  return res;
}

/**
 * @function formatHours
 * @description format hours
 * @param {date} date
 * @returns {string}
 */
function formatHours(date) {
  const hh = formatTwoDigitsNumber(date.getHours());
  const mm = formatTwoDigitsNumber(date.getMinutes());

  return `${hh}h${mm}`; // 09h30
}

function formatTwoDigitsNumber(nb) {
  if (nb < 10) {
    return "0" + nb;
  }
  return nb;
}

export function headerScroll() {
  let departScroll = window.pageYOffset;
  window.onscroll = function () {
    let currentScrollpos = window.pageYOffset;
    if (window.pageYOffset === 0) {
      document.getElementById("header").style.top = "0";
    } else if (departScroll > currentScrollpos) {
      document.getElementById("header").style.top = "0";
    } else {
      document.getElementById("header").style.top = "-53px";
    }
    departScroll = currentScrollpos;
  };
}
