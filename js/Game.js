class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    //Creamos sprites de autos
    car1 = createSprite(100,200);
    //Agreaga imagen
    
    /*car3 = createSprite(500,200);
    car3.addImage("car3",car3_img);
    car4 = createSprite(700,200);
    car4.addImage("car4",car4_img);
    cars = [car1, car2, car3, car4];*/
  }

  play(){
    form.hide();
    textSize(30);
    text("Game Start", 120, 100)
    Player.getPlayerInfo();

    if(allPlayers !== undefined){
     /* background(rgb(198,135,103));
      image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);*/
     // var display_position = 130;

     //variable de índice de la matríz
     var x=0;//175
     var y;
      for(var plr in allPlayers){
        //agrega 1 al índice para recorrer la matriz
        index=index+1

        //posición de los autos para x
        x=x+200

        //Para la posición y usamos los datos de la base de datos
        y=displayHeight-allPlayers[plr].distance;
        cars[index-1].x = x

        if(index)
        cars[index -1].shapeColor=red //el  jugador activo se colorea de rojo
        //Configuración de cámara del juego
        camera.position.x = displayWidth/2;


        if (plr === "player" + player.index)
          fill("red")
        else
          fill("black");

        display_position+=20;
        textSize(15);
        text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
    }
   /* if( > 3860){
      gameState = 2;
    }*/
    drawSprites();
  }
 /* end(){
    console.log("Juego terminado")
  }*/
}
