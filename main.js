"use strict;"

let player;
let opp;
let card = document.getElementById('card');
let intervals = [];
let write = document.getElementById('write');
let timer = document.getElementById('timer');
let start = document.getElementById('start');
let reset = document.getElementById('reset');

fetch('cards.json')
  .then(res => res.json())
  .then(cards => {

    pickAndMatch();

    function pickAndMatch() {

      start.style.display = 'inline';

      let rand = Math.floor(Math.random() * (cards.length - 1));

      if (rand % 2 !== 0) rand = rand + 1;

      card.innerHTML = `
        <p>This is your card</p>
        <img id="${cards[rand].id}" src="${cards[rand].img}" width="300" height="300">
        <p>Convince your opponent to agree with you on your opinion on this topic. You have 5 minutes.</p>
      `;

      start.addEventListener('click', function() {
        startGame();
      })

    }

    function startGame() {
      startTimer(300, timer);
      start.style.display = 'none';
      write.innerHTML = `
        <form>
          <textarea id="opinion" rows="14" cols="50"></textarea>
          <button id="submit">Submit</button>
        </form>
      `;
    }

    document.addEventListener('click', function(e) {
      if (e.target && e.target.id == "submit") handleOpinion();
    });

    function handleOpinion() {
      clearTimeout(intervals);
      write.innerHTML = `
        <p>This is your opinion.</p>
        <p>${opinion.value}</p>
      `;
    }

    function startTimer(duration, display) {
      let time = duration, minutes, seconds;
      intervals.push(setInterval(function () {
          minutes = parseInt(time / 60, 10)
          seconds = parseInt(time % 60, 10);

          minutes = minutes < 10 ? "0" + minutes : minutes;
          seconds = seconds < 10 ? "0" + seconds : seconds;

          display.textContent = minutes + ":" + seconds;

          if (--time < 0) {
            time = duration;
            handleOpinion();
          }
      }, 1000));
    }

    reset.addEventListener('click', resetGame);

    function resetGame() {
      location.reload();
    }

  })
  .catch(err => console.error(err));
