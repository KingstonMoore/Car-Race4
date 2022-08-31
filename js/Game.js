class Game{
  constructor(){
    this.leaderBoard = createElement("h2")
    this.l1 = createElement("h2")
    this.l2 = createElement("h2")
  }
  start(){
    form = new Form()
    form.display()
    player = new Player()
    player.getCount()
    car1 = createSprite(width/2 - 150, height - 100)
    car1.addImage(c1Img)
    car2 = createSprite(width/2 + 150, height - 100)
    car2.addImage(c2Img)
    car1.scale= 0.07
    car2.scale = 0.07
    cars = [car1, car2]
  }
  //collect gamestate value from db
  getState(){
    db.ref("gameState").on("value", data=>{
      gameState = data.val()
    })
  }
//write the gameState to the database
  updateState(count){
    db.ref("/").update({
      gameState: count
    })
  }

  play(){
    form.hide()
    form.title.size(500, 50)
    Player.getPlayers()
    this.leaderBoard.position(175, 100)
    this.leaderBoard.html("LEADERBOARD")
    this.l1.position(175, 150)
    this.l2.position(175, 200)
    
    if (players != undefined){
      var info = Object.values(players)
    this.l1.html(info[0].rank+"   "+info[0].name+"   "+info[0].score)
    this.l2.html(info[1].rank+"   "+info[1].name+"   "+info[1].score)
      background("blue")
      image(trackImg, 0, -height*5, width, height*6)
      var idx = 0
      for (var i in players){
        idx = idx + 1 
        cars[idx - 1].position.x = players[i].posx
        cars[idx - 1].position.y = players[i].posy + 500
        if (idx==player.idx){
          camera.position.y = cars[idx - 1].position.y
          fill("red")
          ellipse(players[i].posx, players[i].posy + 500, 60, 60)
        }
      }
      if (keyIsDown(UP_ARROW)){
        player.posy = player.posy - 20
        player.updateInfo()
      }
      if (keyIsDown(LEFT_ARROW) && player.posx>400){
        player.posx = player.posx - 20
        player.updateInfo()
      }
      if (keyIsDown(RIGHT_ARROW) && player.posx<width-400){
        player.posx = player.posx + 20
        player.updateInfo()
      }
       drawSprites()
    }
   
  }
}