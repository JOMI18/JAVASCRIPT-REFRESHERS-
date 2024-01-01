'use strict';
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('.show-modal');
console.log(btnsOpenModal);

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

const openModal = function () {
  modal.classList.remove('hidden');
  // modal.classList.remove('.hidden'); // not this
  // modal.classList.remove('hidden',"toggle"); // to add multiple clases
  overlay.classList.remove('hidden');
  //its better to manipulate with classes not the actual styles
};

for (let i = 0; i < btnsOpenModal.length; i++) {
  console.log(btnsOpenModal[i].textContent);
  btnsOpenModal[i].addEventListener('click', openModal);
}

btnCloseModal.addEventListener('click', closeModal); // note that youre not calling the function
overlay.addEventListener('click', closeModal);

//////////////// Handling an "Esc" Keypress Event////////////////////
// you listen for keyboard events on the document, usually cos its global

document.addEventListener('keydown', function (e) {
  console.log(e);
  console.log(e.key);
  //   if (e.key === 'Escape') {
  //     if (!modal.classList.contains('hidden')) {
  //       closeModal();
  //     }
  //   }
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  } // more concise
});

// there are 3 types
// 1. keyup -- when we lift our finger off they key
//2. keypress is fired consistently as we keep our hands on the keys
// 3. keydown- activates as soon as any key is hit{thats the used one}
