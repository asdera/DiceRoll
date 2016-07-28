
var dices = 6;

var die = 5;

var win = 1;

var score = 0;

var rolls = 0;

var bonus = 0;

var bonusbar = "Made By Andrew Wang";

var straights = ["1,1,2,3,4,5", "1,2,2,3,4,5", "1,2,3,3,4,5" , "1,2,3,4,4,5" , "1,2,3,4,5,5", "2,2,3,4,5,6", "2,3,3,4,5,6", "2,3,4,4,5,6" , "2,3,4,5,5,6" , "2,3,4,5,6,6"]

var i;

function Start() {
    $(".badge").fadeOut();
    for (i = 1; i <= dices; i++) {
        //j = i % 6;
        $("table").append("<td><div id='place"+i+"' class='value"+i+"'></div></td>");
    } 
    ScoreSet();
}

function BonusCheck(num, lel, plzdontbe) {
  switch(num) {
    case 4:
      bonusbar = "Pair";
      bonus += 10;
      break;
    case 8:
      bonusbar = "Two Pair";
      bonus += 20;
      break;
    case 9:
      bonusbar = "Three of a Kind";
      bonus += 60;
      break;
    case 12:
      bonusbar = "Three Pair";
      bonus += 150;
      break;
    case 13:
      bonusbar = "Full House";
      bonus += 80;
      break;
    case 16:
      bonusbar = "Four of a Kind";
      bonus += 200;
      break;
    case 18:
      bonusbar = "Twin Triples";
      bonus += 300;
      break;
    case 20:
      bonusbar = "Quadruple and a Pair";
      bonus += 400;
      break;
    case 25:
      if (lel > 30 && plzdontbe !== "5,5,5,5,5,6") {
          bonusbar = "Ultimate Quintuple Yahtzee";
          bonus += 1000;
          alert("You just rolled an Ultimate Quintuple Yahtzee! That's a 1 in 1296 chance!")
      } else {
          bonusbar = "Quintuple Yahtzee!";
          bonus += 600;
      }
      break;
    case 36:
      if (lel === 36) {
          bonusbar = "ULTIMATE SEXTUPLE YAHTZEE!!!";
          bonus += 10000;
          alert("You just rolled an ULTIMATE SEXTUPLE YAHTZEE!!! That's a CRAZY 1 in 46656 chance! AWESOME!!!")
      } else {
          bonusbar = "SEXUPLE YAHTZEE!";
          bonus += 3000;
          alert("You just rolled an SEXTUPLE YAHTZEE!!! That's a 1 in 7776 chance! Nice!")
      }
      $(".badge").fadeIn();
      break;
    default:
      bonusbar = "Ultimate Straight!";
      bonus += 250;
  }
}

function ScoreSet() {
    $(".score").empty();
    $(".rolls").empty();
    $(".bonus").empty();
    $(".bonusbar").empty();
    $(".score").append(score);
    $(".rolls").append(rolls);
    $(".bonus").append(bonus);
    $(".bonusbar").append(bonusbar);
}

function Combinations(numbers, lel) {
    if (straights.indexOf(numbers.toString()) !== -1) {
        bonus += 100;
        bonusbar = "Straight"
    } else {
        var dupenum = 0;
        for (i = 1; i <= dices; i++) {
            var macnum = 0;
            for (j = 1; j <= dices; j++) {
                if ($("#place" + i).attr("class") === $("#place" + j).attr("class")) {
                    macnum++
                }
            }
            if (macnum !== 1) {
                    dupenum += macnum;
            }
        }
        BonusCheck(dupenum, lel, numbers.toString());
    } 
}

function Scan() {
    rolls++;
    var numbers = [];
    var haddix = 0;
    for (i = 1; i <= dices; i++) {
        var land = Number($("#place" + i).attr("class").match(/\d+/)[0]);
        haddix += land;
        numbers.push(land);
        //$("body").append(array)
    }
    Combinations(numbers.sort(), haddix);
    score += haddix;
}

function Dice() {
    var datnum = Math.floor(Math.random() * 6 + 1)
    $("#place" + i).attr("class", "value" + datnum);
    //$("body").append(datnum);
}

function Roll() {
    for (i = 1; i <= dices; i++) {
        Dice()
    }
    Scan();
    ScoreSet();
}

function Reset() {
    for (i = 1; i <= dices; i++) {
        $("#place" + i).attr("class", "value" + i);
    }
    score = 0;
    rolls = 0;
    bonus = 0;
    bonusbar = "New Game"
    ScoreSet();
} 

$(document).ready(function() {
    Start(); 
    $(".roll").click(function() {
        Roll();
    });
    $(".reset").click(function() {
        Reset();
    });
    $(".counter").click(function() {
        var tots = bonus + score;
        alert("You rolled " + rolls + " times and earn a score of " + score + " with a " + bonus +" bonus which totals to "+ tots + "!");
    });
});
