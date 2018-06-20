"use strict;"

let player;
let opp;
let card = document.getElementById('card');
let timer = document.getElementById('timer');

fetch('cards.json')
  .then(res => res.json())
  .then(cards => {

    shuffle(cards);

    card.innerHTML = `
      <p>This is your card</p>
      <img id="${cards[0].id}" src="${cards[0].img}">
    `
    let i = 1;

    pickAndMatch();

    function shuffle(arr) {
      var current = arr.length, temp, rand;

      while (0 !== current) {

        rand = Math.floor(Math.random() * current);
        current -= 1;

        temp = arr[current];
        arr[current] = arr[rand];
        arr[rand] = temp;
      }

      return arr;
    }

    function pickAndMatch() {

      card.addEventListener('click', function() {

        card.innerHTML = `
          <p>Here's your opponent's card</p>
          <img id="${comp.id}" src="${comp.img}">
        `

      });

      player = cards[0];
      comp = cards[i];
      console.log(player);
      if (player.id % 2 === 0) {
        // while (comp.id !== player.id - 1) {
        //   setTimeout(() => {
        //     i++;
        //   }, 500);
        // }
        convince(comp);
      } else {
        // while (comp.id !== player.id + 1) {
        //   setTimeout(() => {
        //     i++;
        //   }, 500);
        // }
        convince(player);
      }
      console.log(comp);

    }

    function convince(currentCard) {
      card.removeEventListener('click', function() {});
      startTimer(500, timer);
      card.innerHTML = `
        <img id="${currentCard.id}" src="${currentCard.img}">
        <p>Convince your opponent to agree with your opinion on this topic.</p>
      `;
    }

    function startTimer(duration, display) {
      let time = duration, minutes, seconds;
      setInterval(function () {
          minutes = parseInt(timer / 60, 10)
          seconds = parseInt(timer % 60, 10);

          minutes = minutes < 10 ? "0" + minutes : minutes;
          seconds = seconds < 10 ? "0" + seconds : seconds;

          display.textContent = minutes + ":" + seconds;

          if (--time < 0) {
              time = duration;
          }
      }, 1000);
    }

    // function compPick(divCards) {
    //   comp = divCards[].id + 1;
    //   console.log(comp);
    // }

  })
  .catch(err => console.error(err));
