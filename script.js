function randomCard(){
    let cards = ["arbre", "bague", "chat", "soleil",
        "cheval", "coeur", "escargot", "etoile",
        "fleur", "maison", "pomme", "smiley",
        "arbre", "bague", "chat","soleil",
        "cheval", "coeur", "escargot", "etoile",
        "fleur", "maison", "pomme", "smiley"];
    for (let i of divCase) {
        let rng = Math.trunc(Math.random()*cards.length);
        i.dataset.img = cards[rng];
        cards.splice(rng, 1);
    }
}

function changeCards(){
    if (flag){
        this.style.borderRadius = "0 2.5rem 0 2.5rem";
        this.style.backgroundImage = "url(carte/"+ this.dataset.img +".png)";
        checkCards(this);
    }
}

function start(){
    randomCard();
    for (let i of divCase){
        i.style.borderRadius = "2.5rem 0 2.5rem 0";
        i.style.backgroundImage = "none";
        i.style.backgroundColor = "#000458";
        i.style.visibility = "visible";
        i.addEventListener("click", changeCards);
    }
    score = 0;
    document.getElementById("score").innerHTML = "Score: " + score;
    errorCount = 0
    document.getElementById("error").innerHTML = "Nbr erreur: " + errorCount;
}

let flag = true
function checkCards(card){
    cardsArray.push(card.dataset.img);
    if (cardsArray.length === 2){
        flag = false;
        if (cardsArray[0] === cardsArray[1]){
            score += 2;
            document.getElementById("score").innerHTML = "Score: " + score;
            setTimeout(()=>{
                document.querySelectorAll("div[data-img="+cardsArray[0]+"]").forEach((u)=>{
                    u.style.visibility = "hidden"
                    flag = true;
                    cardsArray = [];
                    if (score===24){
                        alert("Gagné, n'hesitez pas à recommencer ;)");
                        start();
                }
                })
            }, 1000)
        }
        else {
            setTimeout(()=>{
                document.querySelectorAll("div[data-img="+cardsArray[0]+"]").forEach((u)=>{
                    u.style.borderRadius = "2.5rem 0 2.5rem 0";
                    u.style.backgroundImage = "none";
                    u.style.backgroundColor = "#000458";
                })
                document.querySelectorAll("div[data-img="+cardsArray[1]+"]").forEach((u)=>{
                    u.style.borderRadius = "2.5rem 0 2.5rem 0";
                    u.style.backgroundImage = "none";
                    u.style.backgroundColor = "#000458";
                    flag = true;
                })
                cardsArray = [];
            }, 1000)
            errorCount++;
            document.getElementById("error").innerHTML = "Nbr erreur: " + errorCount;
        }

    }
}

let divCase = document.getElementsByClassName("case");
let cardsArray = [];
let score = 0;
let errorCount = 0;
document.getElementById("start").addEventListener("click", start)