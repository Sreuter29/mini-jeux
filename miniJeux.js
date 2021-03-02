//VAISSEAU
$(function() {
  var stopDetection = 0;
  $(document).keydown(function(e){
    if (e.which == 39) // Vers la droite
    {
      posX = parseInt($('#soucoupe').css('left'));
      if (posX < 470)
      $('#soucoupe').css('left', posX+30);
    }
    if (e.which == 37) // Vers la gauche
    {
      posX = parseInt($('#soucoupe').css('left'));
      if (posX > 20)
      $('#soucoupe').css('left', posX-30);
    }
    if (e.which == 40) // Vers le bas
    {
      posY = parseInt($('#soucoupe').css('top'));
      if (posY < 230)
      $('#soucoupe').css('top', posY+30);
    }
    if (e.which == 38) // Vers le haut
    {
      posY = parseInt($('#soucoupe').css('top'));
      if (posY > 20)
      $('#soucoupe').css('top', posY-30);
    }
    if (e.which == 36) // Vers le haut et la gauche
    {
      posX = parseInt($('#soucoupe').css('left'));
      posY = parseInt($('#soucoupe').css('top'));
      if ((posY > 20) && (posX > 20))
      $('#soucoupe').css('left', posX-30).css('top', posY-30);
    }
    if (e.which == 33) // Vers le haut et la droite
    {
      posX = parseInt($('#soucoupe').css('left'));
      posY = parseInt($('#soucoupe').css('top'));
      if ((posY > 20) && (posX < 470))
      $('#soucoupe').css('left', posX+30).css('top', posY-30);
    }
    if (e.which == 35) // Vers le bas et la gauche
    {
      posX = parseInt($('#soucoupe').css('left'));
      posY = parseInt($('#soucoupe').css('top'));
      if ((posX > 20) && (posY < 230))
      $('#soucoupe').css('left', posX-30).css('top', posY+30);
    }
    if (e.which == 34) // Vers le bas et la droite
    {
      posX = parseInt($('#soucoupe').css('left'));
      posY = parseInt($('#soucoupe').css('top'));
      if ((posY < 230) && (posX < 470))
      $('#soucoupe').css('left', posX+30).css('top', posY+30);
    }
  });

  function afficheElements()
  {
    stopDetection = 0;
    var elemX = Math.floor(Math.random()*500)+20;
    var elemY = Math.floor(Math.random()*300)+20;
    var elemType = Math.floor(Math.random()*2);
    if (elemType == 0)
    {
      $('#bon').css('top',elemY).css('left',elemX);
      $('#bon').show();
      $('#mauvais').css('display','none');
    }
    else
    {
      $('#mauvais').css('top',elemY).css('left',elemX);
      $('#mauvais').show();
      $('#bon').css('display','none');
    }
  }

  function collisions()
  {
    posX = parseInt($('#soucoupe').css('left'));
    posY = parseInt($('#soucoupe').css('top'));
    if ($('#bon').css('display') == 'none')
    {
      elemType = 'mauvais';
      elemX = parseInt($('#mauvais').css('left'));
      elemY = parseInt($('#mauvais').css('top'));
    }
    else
    {
      elemType = 'bon';
      elemX = parseInt($('#bon').css('left'));
      elemY = parseInt($('#bon').css('top'));
    }
    // le vaisseau a une largeur de 125 pixels et les éléments à collecter une largeur d'environ 50 pixels
    // Lorsqu'une collision est détectée, la valeur 1 est stockée dans la variable stopDetectionpour indiquer qu'il ne faut plus détecter de collisions.Pour qu'une collision soit effective, la variable stopCollisiondoit être égale à 0.
    if ((elemX>posX-20) && (elemX<(posX+125-50+20)) && (elemY>posY-20) && (elemY<(posY+177-116+20)) && (stopDetection == 0))
    {
      stopDetection = 1;
      if (elemType=='bon')
      {
        var nbBon = parseInt($('#info1').text())+1;
        $('#info1').text(nbBon);
        var score = parseInt($('#info3').text())+5;
        $('#info3').text(score);
        $('#bon').css('display', 'none');
      }
      else
      {
        var nbMauvais = parseInt($('#info2').text())+1;
        $('#info2').text(nbMauvais);
        var score = parseInt($('#info3').text())-5;
        $('#info3').text(score);
        $('#mauvais').css('display', 'none');
      }
    }
  }

  setInterval(afficheElements, 2000);
  setInterval(collisions, 200);
});

//Le Juste Prix
let secondes = 30;
let prix = 0;
let paris = null;
let prixMax = 20;
let isPlay = true;
$(function() {
  $(".prixMax").text(prixMax);
  $("#commencer").click(function(){
    $("#nombre").val('');
    secondes = 30;
    $(".chrono").text(secondes);
    prix = Math.floor(Math.random() * prixMax);
    isPlay = true;
    $(".reponse").text("Trouvez le juste prix !");
    $("#paris").css({
      'visibility': 'visible',
      'opacity': '1'
    });
    let chrono = setInterval(function(){
      if (secondes == 0){
        clearInterval(chrono);
        $(".reponse").text("Perdu !");
        $("#paris").css({
          'visibility': 'hidden',
          'opacity': '0'
        });
        isPlay = false;
      } else if(isPlay) {
        secondes--;
        $(".chrono").text(secondes);
      } else {
        clearInterval(chrono);
        $("#paris").css({
          'visibility': 'hidden',
          'opacity': '0'
        });
      }
    }, 1000)
  })
  $("#paris").submit(function(e){
    if(isPlay) {
      paris = $("#nombre").val();
      if (paris == prix) {
        $(".reponse").text("C'est gagné !");
        isPlay = false;
      } else if (paris < prix) {
        $(".reponse").text("Plus grand !");
      } else {
        $(".reponse").text("Plus petit !");
      }
      $("#nombre").val('');
    }
    e.preventDefault();
  })
})
