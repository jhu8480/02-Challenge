// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
    $('.time-block').on('click', '.btn', (e) => {
      e.preventDefault();
      console.log('Listener working');
    })

  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

  const setTimeBlockClass = () => {
    const regex = /[0-9]/g;
    const timeBlocks = $('.time-block');
    const currentHour = dayjs().$H;
    for (let i = 0; i < timeBlocks.length; i++) {
      const idNumber = timeBlocks[i].id.match(regex).join('');
      if(idNumber * 1 < currentHour) {
        timeBlocks[i].classList.add('past');
      } else if (idNumber * 1 == currentHour) {
        timeBlocks[i].classList.add('present');
      } else {
        timeBlocks[i].classList.add('future');
      }
    }
  }
  setTimeBlockClass();
  setInterval(setTimeBlockClass, 1000);
  

  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  
  function getLocalStorage() {
    return localStorage.getItem('dayschedule') === null ? [] : JSON.parse(localStorage.getItem('dayschedule'));
  }

  function setlocalStorage() {

  }

  //
  // TODO: Add code to display the current date in the header of the page.

  console.log(dayjs());
  const monthsArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Otc', 'Nov', 'Dec'];
  const weekDaysArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const setHeader = () => {
    const dateObj = dayjs();
    $('#currentDay').text(`${weekDaysArr[dateObj.$W]}, ${monthsArr[dateObj.$M]} ${dateObj.$y}  ${dateObj.$H.toString().padStart(2, '0')}:${dateObj.$m.toString().padStart(2, '0')}:${dateObj.$s.toString().padStart(2, '0')}`) ;
  }
  
  setHeader();
  setInterval(setHeader, 1000);
});
