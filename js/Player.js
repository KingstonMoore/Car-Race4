class Player{
  constructor(){
    this.name = null
    this.idx = null
    this.posx = 0
    this.posy = 0 
    this.rank = 0
    this.score = 0
  }
  //adds the players in the database
  addPlayer(){
    if (this.idx===1){
      this.posx = width/2 - 150
    } else {
      this.posx = width/2 + 150
    }
    db.ref("players/player" + this.idx).set({
      name: this.name, 
      posx: this.posx,
      posy: this.posy,
      rank: this.rank,
      score: this.score
    })
  }
// collect playerCount value from d
  getCount(){
    db.ref("playerCount").on("value", data=>{
      playerCount = data.val()
    })
  }
//write the playerCount to the database
  updateCount(count){
    db.ref("/").update({
      playerCount: count
    })
  }
  getInfo(){
    db.ref("players/player" + this.idx).on("value", data=>{
     var distance = data.val()
     this.posx = distance.posx
     this.posy = distance.posy
    })
  }
//write the playerCount to the database
  updateInfo(){
    db.ref("players/player" + this.idx).update({
      posx: this.posx,
      posy: this.posy,
      rank: this.rank,
      score: this.score
    })
  }
 static getPlayers(){
    db.ref("players").on("value", data =>{
      players = data.val()
    })
  }
}