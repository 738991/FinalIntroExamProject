kaboom({
  background: [10, 150, 200],
  width: 1080,
  height: 720,
  font: "sink",
  stretch: true,
  letterbox: true,
})
//art from grafxkid on itch (https://grafxkid.itch.io)
//grassy terrain
loadSpriteAtlas("sprites/tilemap/grassland/terrain.png", "sprites/tilemap/grassland/terrainatlas.json")
//grassy objects
loadSpriteAtlas("sprites/tilemap/grassland/objects.png", "sprites/tilemap/grassland/objectatlas.json")
//grassy background
loadSprite("grassyBackground", "sprites/tilemap/grassland/background.png")
//penguin water attack sprites
loadSpriteAtlas("waterattack.png", "waterattackatlas.json")
//penguin
loadSpriteAtlas("sprites/penguin/penguin.png", "sprites/penguin/penguinatlas.json")
//wizard
loadSpriteAtlas("sprites/wizard/wizard.png", "sprites/wizard/wizardatlas.json")

//character info
//penguin
let penguin = {
  width: 45,
  decoWidth: 65,
  speed: 350,
  jumpHeight: 750,
  sprite: "penguin"
}
//wizard
let wizard = {
  width: 80,
  decoWidth: 120,
  speed: 300,
  jumpHeight: 800,
  sprite: "wizard"
}

//characters that players selected
let player1Char = wizard
let player2Char = penguin

const levelConfig = {
  width: 33,
  height: 33,
  pos: vec2(-2, 0),
  q: () => [
    "floor", 
    sprite("topLeftGrass", {
      width: 33
    }), 
    area(), 
    solid()
  ],
  w: () => [
    "floor", 
    sprite("topGrass", {
      width: 33
    }), 
    area(), 
    solid()
  ],
  e: () => [
    "floor", 
    sprite("topRightGrass", {
      width: 33
    }), 
    area(), 
    solid()
  ],
  a: () => [
    "floor", 
    sprite("midLeftGrass", {
      width: 33
    }), 
    area(), 
    solid()
  ],
  s: () => [
    "floor", 
    sprite("midGrass", {
      width: 33
    }), 
    area(), 
    solid()
  ],
  d: () => [
    "floor", 
    sprite("midRightGrass", {
      width: 33
    }), 
    area(), 
    solid()
  ],
  z: () => [
    "floor", 
    sprite("botLeftGrass", {
      width: 33
    }), 
    area(), 
    solid()
  ],
  x: () => [
    "floor", 
    sprite("botGrass", {
      width: 33
    }), 
    area(), 
    solid()
  ],
  c: () => [
    "floor", 
    sprite("botRightGrass", {
      width: 33
    }), 
    area(), 
    solid()
  ],
  r: () => [
    "floor", 
    sprite("leftLineGrass", {
      width: 33
    }), 
    area(), 
    solid()
  ],
  t: () => [
    "floor", 
    sprite("lineGrass", {
      width: 33
    }), 
    area(), 
    solid()
  ],
  y: () => [
    "floor", 
    sprite("rightLineGrass", {
      width: 33
    }), 
    area(), 
    solid()
  ],
  f: () => [ 
    sprite("tree", {
      width: 132
    }), 
    //area(), 
    //solid(),
    origin("center")
  ],
  "/": () => [
    "death",
    rect(33, 33),
    color(RED),
    opacity(1),
    area(),
    solid(),
    z(-1),
    //origin("center")
  ],
}

//maps
const levels = [
  [
    "                                  ",
    "                                  ",
    "                                  ",
    "                                  ",
    "                                  ",
    "                                  ",
    "             rttttty              ",
    "                                  ",
    "                                  ",
    "         f              f         ",
    "                                  ",
    "      rtttty         rtttty       ",
    "                                  ",
    "                                  ",
    "                                  ",
    "    qwwwwwwwwwwwwwwwwwwwwwwwe     ",
    "    zsssssssssssssssssssssssc     ",
    "     zxsssssssssssssssssssxc      ",
    "       zxxxxxxxxxxxxxxxxxc        ",
    "                                  ",
    "                                  ",
    "                                  ",
    "//////////////////////////////////",
  ],
]

scene("menu", () => {}) //close menu

scene("multiplayer", () => {
  
  //load map
  const level = addLevel(levels[0], levelConfig)
  
  //background
  add([
    sprite("grassyBackground", {
      width: width(),
      height: height()
    }),
    z(-1)
  ])
  
  //add player1
  let player1 = add([
    sprite(player1Char.sprite, {
      anim: "idle",
      width: player1Char.width
    }),
    pos(225, 500),
    area({scale:0.5}),
    solid(),
    origin("bot"),
    body(),
    "player",
    { 
      speed: player1Char.speed,
      jumpHeight: player1Char.jumpHeight,
      hp: 100,
      flipStatus: false,
      character: player1Char.sprite,
      canAttack: true
    }
  ])
  
  //add player2
  let player2 = add([
    sprite(player2Char.sprite, {
      flipX: true,
      anim: "idle",
      width: player2Char.width
    }),
    pos(width()-220, 500),
    area({scale:0.5}),
    solid(),
    origin("bot"),
    body(),
    "player",
    { 
      speed: player2Char.speed,
      jumpHeight: player2Char.jumpHeight,
      hp: 100,
      flipStatus: true,
      character: player2Char.sprite,
      canAttack: true
    }
  ])
  
  //player1 movement
  //right
  onKeyDown("d", () => {
    player1.flipX(false)
    player1.flipStatus = false
    player1.move(player1.speed, 0)
    if (player1.curAnim() == "idle") {
      player1.play("run")
    }
    onKeyRelease("d", () => {
      player1.play("idle")
    })
  })
  //left
  onKeyDown("a", () => {
    player1.flipX(true)
    player1.flipStatus = true
    player1.move(-player1.speed, 0)
    if (player1.curAnim() == "idle") {
      player1.play("run")
    }
    onKeyRelease("a", () => {
      player1.play("idle")
    })
  })
  //jump
  onKeyPress("w", () => {
    if (player1.isGrounded()) {
      player1.play("jump")
      player1.jump(player1.jumpHeight)
      wait(0.5, () => {player1.play("idle")})
    }
    
  })
  //go down
  onKeyPress("s", () => {
    if (player1.isGrounded() == false) {
      player1.weight = 3
    }
  })
  onKeyRelease("s", () => {
    player1.weight = 1
  })
  //attack
  onKeyPress("e", () => {
    attackOne(player1)
  })
  onKeyPress("q", () => {
    attackOne(player1)
  })
  onKeyPress("f", () => {
    attackOne(player1)
  })
  
  //player2 movement
  //right
  onKeyDown("right", () => {
    player2.flipX(false)
    player2.flipStatus = false
    player2.move(player2.speed, 0)
    if (player2.curAnim() == "idle") {
      player2.play("run")
    }
    onKeyRelease("right", () => {
      player2.play("idle")
    })
  })
  //left
  onKeyDown("left", () => {
    player2.flipX(true)
    player2.flipStatus = true
    player2.move(-player2.speed, 0)
    if (player2.curAnim() == "idle") {
      player2.play("run")
    }
    onKeyRelease("left", () => {
      player2.play("idle")
    })
  })
  //jump
  onKeyPress("up", () => {
    if (player2.isGrounded()) {
      player2.play("jump")
      player2.jump(player2.jumpHeight)
      wait(0.5, () => {player2.play("idle")})
    }
    
  })
  //go down
  onKeyPress("down", () => {
    if (player2.isGrounded() == false) {
      player2.weight = 3
    }
  })
  onKeyRelease("down", () => {
    player2.weight = 1
  })
  //attack
  onKeyPress("control", () => {
    attackOne(player2)
  })
  onKeyPress("meta", () => {
    attackOne(player2)
  })
  onKeyPress("alt", () => {
    attackOne(player2)
  })
  onKeyPress("shift", () => {
    attackOne(player2)
  })
  
  //function to update healthbars
  function updateHpBars() {
    player2HpBar.width = player2.hp
    player1HpBar.width = player1.hp
  }
  
  //attack functions
  function attackOne(player) {
    //penguin attack
    if (player.character == "penguin") {
      if (get("water").length == 0) {
        if (player.flipStatus == false) {
          let water = add([
            sprite("water", {
              width: 50,
              anim: "rise"
            }),
            pos(player.pos.x+15, player.pos.y),
            origin("botleft"),
            area(),
            "water"
          ])

          //animating destroying water
          wait(0.2, () => {
            water.play("idle")
          })

          wait(0.73, () => {
            water.play("fall")
          })

          wait(0.8, () => {
            destroy(water)
          })

        }
        else {
          let water = add([
            sprite("water", {
              width: 50,
              anim: "rise"
            }),
            pos(player.pos.x-15, player.pos.y),
            origin("botright"),
            area(),
            "water"
          ])

          //animating destroying water
          wait(0.2, () => {
            water.play("idle")
          })

          wait(0.73, () => {
            water.play("fall")
          })

          wait(0.8, () => {
            destroy(water)
          })

        }
      }
    }
    //wizard attack
    else if (player.character == "wizard") {
      if (player.canAttack == true) {
        
        player.play("casting", {
          onEnd: () => {wait(0, () => {player.play("idle")})}
        })
        
        let bullet = add([
          sprite("orb", {
            anim: "main"
          }),
          pos(player.pos.x, player.pos.y-20),
          origin("center"),
          area(),
          cleanup(),
          "bullet",
          {speed : 500}
        ])

        if (player.flipStatus == true) {
          bullet.speed = -bullet.speed
        }

        player.canAttack = false

        wait(0.4, () => {
          player.canAttack = true
        })
      }
    }
  }
  
  //penguin attack collision
  onCollide("water", "player", (water, player) => {
    player.jump(700)
    //check if player isnt penguin so that penguin can get launched but wont get hurt
    if (player.character != "penguin") {
      player.hp -= 5
      updateHpBars()
    }
  })
  
  //wizard attack movement
  onUpdate("bullet", (bullet) => {
    bullet.move(bullet.speed, 0)
  })
  
  //wizard attack collision
  onCollide("player", "bullet", (player, bullet) => {
    if (player.character != "wizard") {
      destroy(bullet)
      player.hp -= 2.5
      updateHpBars()
    }
  })
  
  //ui
  //player1's hp
  let player1HpBar = add([
    rect(100, 10),
    color(GREEN),
    pos(350, 700),
    fixed(),
    z(2)
  ])
  
  //hp bar background
  add([
    rect(100, 10),
    color(WHITE),
    pos(350, 700),
    fixed(),
  ])
  
  //player1 sprite decoration
  add([
    sprite(player1.character, {
      width: player1Char.decoWidth,
      anim: "idle"
    }),
    pos(400, 700-player1Char.decoWidth/2),
    origin("center"),
    z(2)
  ])
  
  //player2's hp
  let player2HpBar = add([
    rect(100, 10),
    color(GREEN),
    pos(width()-350, 700),
    origin("topright"),
    fixed(),
    z(2)
  ])
  
  //hp bar background
  add([
    rect(100, 10),
    color(WHITE),
    pos(width()-350, 700),
    origin("topright"),
    fixed(),
  ])
  
  //player2 sprite decoration
  add([
    sprite(player2.character, {
      width: player2Char.decoWidth,
      anim: "idle",
      flipX: true
    }),
    pos(width()-400, 700-player2Char.decoWidth/2),
    origin("center"),
    z(2)
  ])
  
}) //close multiplayer

go("multiplayer")
