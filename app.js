const toggleBtn = document.querySelector('.navbar__toggleBtn');
const menu = document.querySelector('.navbar__menu');
const icons = document.querySelector('.navbar__icons');

toggleBtn.addEventListener('click', () => {
    menu.classList.toggle('active');
    icons.classList.toggle('active');
})

// document.getElementById('codeForm').addEventListener('submit', function(e) {
//     e.preventDefault();
    
//     const code = document.getElementById('codeInput').value;
    
//     fetch('http://localhost:8000/analyze/', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ code: code }),
//     })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       return response.json();
//     })
//     .then(data => {
//       if (data.error) {
//         document.getElementById('result').textContent = 'Error: ' + data.error;
//       } else {
//         document.getElementById('result').textContent = data.analysis;
//       }
//     })
//     .catch((error) => {
//       console.error('Error:', error);
//       document.getElementById('result').textContent = 'An error occurred during analysis. Error: ' + error.message;
//     });
//   });
const demoButton = document.querySelector('#demoButton');
const modalOverlay = document.querySelector('#modalOverlay');
const closeModal = document.querySelector('#closeModal');

demoButton.addEventListener('click', () => {
  modalOverlay.style.display = 'flex';
});

closeModal.addEventListener('click', () => {
  modalOverlay.style.display = 'none';
});

document.querySelector('#codeForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const code = document.querySelector('#codeInput').value;
  
  fetch('http://localhost:8000/analyze/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code: code }),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    if (data.error) {
      document.querySelector('#result').textContent = 'Error: ' + data.error;
    } else {
      document.querySelector('#result').textContent = data.analysis;
    }
  })
  .catch((error) => {
    console.error('Error:', error);
    document.querySelector('#result').textContent = 'An error occurred during analysis. Error: ' + error.message;
  });
});