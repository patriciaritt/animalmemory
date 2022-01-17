"use strict";

/*Creator: Patricia Ritt
* Created: 20.05.2021
* Changed: 22.05.2021
* Changed: 25.05.2021
* */

$(document).ready(function () {
    console.log("jQuery works");

    $("#startbutton").on("click", function (e) {
        e.preventDefault();
        let gameSize = $("input[name='size']:checked").val();
        console.log(gameSize);
        let cards;
        if (gameSize == "4x4")
            cards = 16;
        else if (gameSize == "4x6")
            cards = 24;
        else {
            cards = 36;
            $("body").css("width", "800px");
        }
        buildBoard(cards);
    });
});

let openCards = 0;
let memoryCardPairs;

function buildBoard(cards) {
    //clear memory field
    //---------------------------------------------------
    $("#memoryField").children().remove();

    //counter "memoryCardPairs" --> damit wir mitzählen und überprüfen können,
    //falls der user mit dem game fertig ist
    //---------------------------------------------------
    memoryCardPairs = cards / 2;

    //code von angabe
    //---------------------------------------------------
    let arr = new Array();
    for (let i = 0; i < cards; i++) {
        arr.push(i);
        $("#memoryField").append("<div><img width='100' src='imgs/img_' id='i" + i + "' /></div>");
    }
    let r;
    for (let i = 0; i < (cards / 2); i++) {
        r = getRandom(0, arr.length - 1);
        $("#memoryField div #i" + arr[r]).attr(
            "src", "imgs/img_" + i + ".jpg");
        arr.splice(r, 1); //deletes the element on index r
        r = getRandom(0, arr.length - 1);
        $("#memoryField div #i" + arr[r]).attr(
            "src", "imgs/img_" + i + ".jpg"
        );
        arr.splice(r, 1);
    }

    //hide the elements and add click handler
    //---------------------------------------------------
    for (let i = 0; i < cards; i++) {
        //versteckt alle karten zu beginn
        $("#memoryField div #i" + i).addClass("hideCard");
        $("#memoryField div #i" + i).on("click", function (e) {
            if (openCards < 2) {
                flipCards(e);
            }

                //nicht-matchende karten wieder umdrehen
            //---------------------------------------------------
            else {
                $('.show').addClass("hideCard").removeClass("show");
                let currentCardId = $(e.currentTarget).first().attr('id');
                currCard = $("#" + currentCardId).attr('id');
                $("#" + currCard).removeClass("hideCard").addClass("show");
                prevCard = $("#" + currCard).attr('id');
                console.log("else if zweig prev card: " + prevCard);
                openCards = 1;
            }
        });
    }
}

//globale variablen für die vorherige karte und die aktuelle karte
//---------------------------------------------------
let prevCard;
let currCard;

function flipCards(e) {
    //aktuelle karten-id speichern, karte aufdecken und die offenen karten um 1 erhöhen
    //---------------------------------------------------
    let currentCardId = $(e.currentTarget).first().attr('id');
    currCard = $("#" + currentCardId).attr('id');
    $("#" + currCard).removeClass("hideCard").addClass("show");
    openCards++;

    //wenn zwei karten offen sind, werden die links ausgelesen und verglichen
    //wenn sie gleich sind, verschwinden die karten aus dem spiel,
    //wenn die counter variable "memoryCardPairs" null ist, dann bekommt der
    //user einen altert angezeigt, der über einen sieg informiert
    //---------------------------------------------------
    if (openCards === 2) {
        let srcFirstCard = $("#" + prevCard).attr("src");
        let srcSecondCard = $("#" + currCard).attr("src");
        console.log("source prev card " + srcFirstCard);
        console.log("source curr card " + srcSecondCard);

        if (srcFirstCard === srcSecondCard) {
            console.log("Match gefunden - if zweig mit == geht");
            $("#" + currCard).removeClass("hideCard").addClass("show");
            window.setTimeout(function () {
                $("#" + prevCard).removeClass("show").addClass("match");
                $("#" + currCard).removeClass("show").addClass("match");
                memoryCardPairs--;
                if (memoryCardPairs === 0) {
                    alert("Du hast Gewonnen! Herzlichen Glückwunsch!");
                }
            }, 500);
        }
    }

    //speichern der ersten aufgedeckten karte in prevCard
    //---------------------------------------------------
    else {
        prevCard = $("#" + currCard).attr('id');
        console.log("letzter else zweig prev card " + prevCard);
    }
}

//code von angabe
//---------------------------------------------------
function getRandom(min, max) {
    if (min > max) return -1;
    if (min == max) return min;
    return min + parseInt(Math.random() * (max - min + 1));
}