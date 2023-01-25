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
  const timeblocks = $('.time-block');
  const currentDay = dayjs().format('MMM D, YYYY');

  renderStorage(currentDay);
  
  timeblocks.on('click', '.btn', function(e) {
    e.preventDefault();
    console.log(currentDay);
    const targetDivId = $(this).parent().attr('id');
    const targetTextArea = $(this).parent().children('.description');
    const targetText = targetTextArea.val();
    const localStorageArr = getLocalStorage(currentDay);
    
    const dataObj = {id: targetDivId, text: targetText};
    const ifIdExist = localStorageArr.find((el) => el.id === dataObj.id);
    if(!ifIdExist) {
      localStorageArr.push(dataObj);
      setLocalStorage(currentDay, localStorageArr);
    } else {
      localStorageArr.find((el) => el.id === dataObj.id).text = targetText;
      setLocalStorage(currentDay, localStorageArr);
    }

    renderStorage(currentDay);
  })
  
  function renderStorage(currentDay) {
    const localStorageArr = getLocalStorage(currentDay);
    const textArea = timeblocks.children('textarea');

    textArea.each(function(i) {
      const parentId = $(this).parent().attr('id');
      console.log(parentId);
      console.log(localStorageArr);
      const targetObj = localStorageArr.find(function(el) {
        return el.id === parentId;
      }); 
      console.log(targetObj);
      if(targetObj) {
        $(this).val(targetObj.text)
      }
    })
  }



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
  
  function getLocalStorage(currentDay) {
    return localStorage.getItem(currentDay) === null ? [] : JSON.parse(localStorage.getItem(currentDay));
  }
  
  function setLocalStorage(currentDay, localStorageArr) {
    localStorage.setItem(currentDay, JSON.stringify(localStorageArr));
  }

  //
  // TODO: Add code to display the current date in the header of the page.
  const setHeaderTime = () => {
    const dateObj = dayjs();
    const hour = dateObj.$H % 12 || 12;
    const hourPaddedStart = hour.toString().padStart(2, '0');
    const amOrPm = dateObj.$H > 12 ? 'PM' : 'AM';
    const stOrthOrRd = dateObj.$D == 1 || dateObj.$D == 21 || dateObj.$D == 31 ? 'st' : dateObj.$D == 3 || dateObj.$D == 23 ? 'rd': 'th';
    $('#currentDay').text(`${dateObj.format('dddd')}, ${dateObj.format('MMMM')} ${dateObj.format('DD')}${stOrthOrRd} --- ${hourPaddedStart}:${dateObj.$m.toString().padStart(2, '0')}:${dateObj.$s.toString().padStart(2, '0')} ${amOrPm}`) ;
  }
  setHeaderTime();
  setInterval(setHeaderTime, 1000);
});
