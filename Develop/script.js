
$(function () {
  // The storage is based on days, the key to the storage is the currentDay string; When it moves to the next day, the app will save data to a new key based on changed currentDay value, so users will be able to use it the next without having to manually clean up the textarea; And the data will still be available in the local storage
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
  // Here I use regular expression to get the numbers from time block's id string and compare it to current hour. Based on the comparison result, the past, present and future class are added to the timeblock elements. A setInterval function is set to automatically update the class when current hour changes;

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
  // Here are the functions to get local storage and set local storage; the currentDay variable will be passed in to be set as the key
  
  function getLocalStorage(currentDay) {
    return localStorage.getItem(currentDay) === null ? [] : JSON.parse(localStorage.getItem(currentDay));
  }
  
  function setLocalStorage(currentDay, localStorageArr) {
    localStorage.setItem(currentDay, JSON.stringify(localStorageArr));
  }

  //
  // Set the currentDay p element's inner text. It is updated every second
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
