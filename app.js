// Selectors for Setlist Name 
const setlistNameButton = document.querySelector('#submit-btn'); 
const userInputSetlist = document.querySelector('#setlist-name-input');
const setlistName = document.querySelector('.setlistname'); 
const setlistContainer = document.querySelector('.setlist-name-container'); 

// Create Element for Setlist Name 
const newSetlist = document.createElement('h3');
newSetlist.classList.add('setlistname'); 



// Setlist Name Function
function newSetlistName (event) {
  event.preventDefault()
    newSetlist.innerHTML = userInputSetlist.value; 

    setlistContainer.appendChild(newSetlist); 


    // Local Storage
     localStorage.setItem('setlist-title', newSetlist.innerHTML); 
 
}; 

// Setlist Name Add Button
setlistNameButton.addEventListener('click', newSetlistName); 

// Selectors for Song Names
const songNameButton = document.querySelector('#add-btn'); 
const userInputSongName = document.querySelector('#song-list-input'); 
const songNamesUl = document.querySelector('.song-names'); 

// Song Names Storage
const songNamesArray = []; 

// Song Names Funciton
function newSongNames (event) {
  event.preventDefault()

  // Create li
  const newSong = document.createElement('li'); 
  newSong.classList.add('song-name-list'); 
  newSong.innerHTML = userInputSongName.value;  

  // Local Storage
  songNamesArray.push(newSong.innerHTML); 
  localStorage.setItem('song-names', JSON.stringify(songNamesArray)); 

  // Add Song Names to DOM
  songNamesUl.appendChild(newSong);

      // Remove Button
      const removeButton = document.createElement('button');
      removeButton.innerHTML = '<i class="fa-solid fa-minus"></i>';
      removeButton.classList.add('remove-btn'); 
      songNamesUl.appendChild(removeButton); 
  
      removeButton.addEventListener('click', (event) => {
          event.preventDefault()
          newSong.remove('li');
          removeButton.classList.add('remove-display'); 

          const index = songNamesArray.indexOf(newSong.innerHTML);
          if(index > -1) {
            songNamesArray.splice(index, 1); 
          }

          localStorage.setItem('song-names', JSON.stringify(songNamesArray)); 
          
      });
}

// Add Song Button 
songNameButton.addEventListener('click', newSongNames); 


// Retrieve Data from Local Storage 
const setlistTitle = localStorage.getItem('setlist-title'); 

if(setlistTitle) {
  newSetlist.innerHTML = setlistTitle; 

  setlistContainer.appendChild(newSetlist)
}

const storedSongNames = localStorage.getItem('song-names');
if (storedSongNames) {
  const songNamesArray = JSON.parse(storedSongNames);
  for (let i = 0; i < songNamesArray.length; i++) {
    const newSong = document.createElement('li');
    newSong.classList.add('song-name-list');
    newSong.innerHTML = songNamesArray[i];
    songNamesUl.appendChild(newSong);
  }
};



// jsPDF Library 
const pdfBtn = document.querySelector('#pdf-btn');

function savePDF(event) {
  event.preventDefault();

  const doc = new jsPDF();

  // Setlist name and songs list selectors
  const setlistNamePdf = document.querySelector(".setlistname").textContent;
  const songsList = document.querySelectorAll(".song-names li");

  // Setlist name to the PDF
  doc.setFontSize(24);
  const setlistNameDims = doc.getTextDimensions(setlistNamePdf);
  const setlistNameX = (doc.internal.pageSize.width - setlistNameDims.w) / 2;
  const setlistNameY = 20;
  doc.text(setlistNamePdf, setlistNameX, setlistNameY);

  // Added songs to the PDF
  doc.setFontSize(14);
  let y = 40;
  for (let i = 0; i < songsList.length; i++) {
    const songName = songsList[i].textContent;
    const songNameDims = doc.getTextDimensions(songName);
    const songNameX = (doc.internal.pageSize.width - songNameDims.w) / 2;
    doc.text(songName, songNameX, y);
    y += 10;
  }; 

  // Save PDF
  doc.save(`${setlistNamePdf}.pdf`);
}

// Save PDF Button 
pdfBtn.addEventListener('click', savePDF); 

// Clear Button 
const clearBtn = document.querySelector('.clear-btn'); 

clearBtn.addEventListener('click', () => {

    localStorage.removeItem('setlist-title');
    localStorage.removeItem('song-names'); 

    location.reload(); 
  
}); 


