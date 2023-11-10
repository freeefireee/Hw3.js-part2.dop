let usersWrapper = document.getElementById('users-list');
let modal = document.getElementById('modal');
let preloader = document.getElementById('preloader');
let lastClickedButton = null; 

fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(data => {
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
    console.log(data);
    data.forEach(item => {
      const button = document.createElement('button');
      button.textContent = item.name;
      button.onclick = () => {
        handleButtonClick(item.id, button);
      };
      const li = document.createElement('li');
      li.appendChild(button);
      usersWrapper.appendChild(li);
    });
  });

const handleButtonClick = (id, button) => {
  preloader.style.display = 'block';

  if (lastClickedButton) {
    lastClickedButton.style.backgroundColor = ''; 
  }

  lastClickedButton = button; 

  fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then(response => response.json())
    .then(data => {
      modal.innerHTML = `<div class="modal-row"> 
        <div class="modal-col">
          <h2>${data.name}</h2> 
          <h2>${data.username}</h2>
          <p><b>address</b>${data.address.city}, ${data.address.street}</p> 
        </div> 
        <div class="modal-col"> 
          <h2>${data.company.name}</h2> 
          <a href="mailto:${data.email}"> email: ${data.email} </a> 
          <a href="tel:${data.phone}"> phone: ${data.phone}</a>
          <button onclick="closeModal()">close</button> 
        </div> 
      </div>`;

      preloader.style.display = 'none';
      modal.style.display = 'block';

      
      button.style.backgroundColor = 'red';
    });
};

const closeModal = () => {
    modal.innerHTML = '';
    modal.style.display = 'none';
    if (lastClickedButton) {
      lastClickedButton.style.backgroundColor = ''; 
    }
};

