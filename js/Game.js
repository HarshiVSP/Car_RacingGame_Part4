class Game {
  constructor() {

  }

  getState() {
    var gameStateRef = database.ref("gameState")
    gameStateRef.on("value", (data) => {
      gameState = data.val()
      console.log(gameState)
    })

  }

  updateState(state) {
    database.ref("/").update({
      gameState: state
    })
  }



  start() {
    form = new Form();
    form.display();

    player = new Player();
    playerCount = player.getCount()

    car1 = createSprite(width / 2 - 50, height - 100);
    car1.addImage("car1", car1_img);
    car1.scale = 0.07;

    car2 = createSprite(width / 2 + 100, height - 100);
    car2.addImage("car2", car2_img);
    car2.scale = 0.07;

    cars = [car1, car2];
fuelGroup= new Group()
goldCoinGroup= new Group()
    this.addSprites(fuelGroup, 30, fuelImg, 0.02)
    this.addSprites(goldCoinGroup, 20, goldCoinImg, 0.15)
  }
  //BP
  addSprites(spriteGroup, numSprites, SpriteImg, SpriteScale) {
    for (var i = 0; i < numSprites; i++) {
      var x, y
      y = random(-height * 5, height - 100)
      x = random(width / 2 + 150, width / 2 - 100)
      var Sprite = createSprite(x, y)
      Sprite.addImage("Sprite", SpriteImg)
      Sprite.scale = SpriteScale
      spriteGroup.add(Sprite)


    }

  }
  handleFuel(carsIndex) {
    cars[carsIndex - 1].overlap(fuelGroup, function (collector, collider) {
    collider.remove()
    console.log("fuelremove")
    })
  }

  handleGoldCoins(carsIndex) {
    cars[carsIndex - 1].overlap(goldCoinGroup, function (collector, collider) {
    collider.remove()
    console.log("goldCoin remove")
    })
  }
  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");
  }

  play() {
    this.handleElements();

    Player.getPlayersInfo()
    if (allPlayers !== "undefined") {
      image(track, 0, -height * 5, width, height * 6)
      var index = 0
      for (var i in allPlayers) {
        // console.log(i)
        var x = allPlayers[i].positionX
        var y = height - allPlayers[i].positionY

        index = index + 1
        cars[index - 1].position.x = x
        cars[index - 1].position.y = y
        if (index === player.index) {
          stroke(10)
          fill("red")
          ellipse(x, y, 60, 60)
          textSize(30)
          fill("black")
          textAlign(CENTER)
          text(player.name, x, y + 80)
          this.handleFuel(index)
          this.handleGoldCoins(index)
        }
      }
    }
    if (keyIsDown(UP_ARROW)) {
      player.positionY += 10
      player.update()
    }

    if (keyIsDown(DOWN_ARROW)) {
      player.positionY -= 10
      player.update()
    }

    if (keyIsDown(LEFT_ARROW)) {
      player.positionX -= 10
      player.update()
    }

    if (keyIsDown(RIGHT_ARROW)) {
      player.positionX += 10
      player.update()
    }
    drawSprites();
  }


}
