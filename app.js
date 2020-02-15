const minMove = document.createElement("p");
minMove.innerText = "Min Moves:";
const minMoveText = document.createElement("p");
minMoveText.innerText = localStorage.getItem("minMove") || 20000;
document.body.appendChild(minMove);
document.body.appendChild(minMoveText);

const resetBtn = document.createElement("button");
resetBtn.innerHTML = "reset game";
document.body.appendChild(resetBtn);

resetBtn.addEventListener("click", function(e) {
  e.preventDefault();
  cardContainer = document.querySelector("#cardContainer");
  document.body.removeChild(cardContainer);
  game();
});

game();

function game() {
  let numSet = new Set();

  while (numSet.size < 12) {
    numSet.add(Math.floor(Math.random() * 100));
  }

  let numArray = [...numSet, ...numSet];

  let shuffledArray = numArray
    .map(num => ({ sort: Math.random(), val: num }))
    .sort((a, b) => a.sort - b.sort)
    .map(a => a.val);

  shuffledArray = [
    ...shuffledArray.slice(0, 12),
    "counter",
    ...shuffledArray.slice(12, 25)
  ];

  let totalClicks = 0;
  let totalMatches = 0;
  let matchA;

  const cardContainer = document.createElement("div");
  cardContainer.id = "cardContainer";
  document.body.appendChild(cardContainer);
  const counter = document.createElement("div");

  for (num of shuffledArray) {
    if (num === "counter") {
      counter.innerHTML = `<p> ${totalClicks}</p>`;
      counter.classList.add("block", "counter", "unclickable");
      cardContainer.appendChild(counter);
    } else {
      const card = document.createElement("div");
      card.innerHTML = `<p> ${num}</p>`;
      card.classList.add("block", "card", "hidden");
      cardContainer.appendChild(card);
    }
  }

  cardContainer.addEventListener("click", function(e) {
    if (e.target.classList.contains("block", "card")) {
      totalClicks++;
      counter.innerHTML = `<p> ${totalClicks}</p>`;
      e.target.classList.toggle("hidden");

      if (totalClicks % 2 === 0 && totalClicks !== 0) {
        cardContainer.classList.add("unclickable");
        if (
          matchA.querySelector("p").innerText ===
          e.target.querySelector("p").innerText
        ) {
          cardContainer.classList.remove("unclickable");
          totalMatches++;
          if (totalMatches === 12) {
            alert("win");
            if (totalClicks < minMoveText.innerText) {
              minMoveText.innerText = totalClicks;
              localStorage.setItem("minMove", totalClicks);
            }
          }
        } else {
          setTimeout(function() {
            matchA.classList.toggle("hidden");
            e.target.classList.toggle("hidden");
            cardContainer.classList.remove("unclickable");
          }, 1000);
        }
      } else matchA = e.target;
      console.log(totalClicks);
      console.log(totalMatches);
      console.log(e.target.querySelector("p"));
    }
  });
  console.log(numSet);
  console.log(numArray);
  console.log(shuffledArray);
}
