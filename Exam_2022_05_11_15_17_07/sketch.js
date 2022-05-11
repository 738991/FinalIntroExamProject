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
  //in game width
  width: 45,
  //width in select menu
  selectMenuWidth: 130,
  //width for hp bar area in game
  decoWidth: 65,
  speed: 350,
  jumpHeight: 750,
  sprite: "penguin"
}
//wizard
let wizard = {
  width: 80,
  selectMenuWidth: 175,
  decoWidth: 120,
  speed: 300,
  jumpHeight: 800,
  sprite: "wizard"
}

//characters that players selected
let player1Char = wizard
let player2Char = penguin

//map that players selected
let map = 1

//player that won last round
let winner = {
  player: "player1",
  character: "wizard"
}

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
  g: () => [ 
    sprite("tree2", {
      width: 132
    }), 
    //area(), 
    //solid(),
    origin("center")
  ],
  h: () => [ 
    sprite("tree3", {
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
    "         f              h         ",
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
  [
    "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
    "ssxxxxxxxxxxxxxxxxxxxxsssssssxxxs",
    "sc                    zsssssd   a",
    "d                      zssssc   a",
    "swwe                    zxxc    a",
    "sxxxtttty                       a",
    "d           qe                  a",
    "d           zc   qwwwwwwwwwwwwwws",
    "d                zxxxxxxxxxxxssss",
    "swwe                         zxss",
    "sssse                          zs",
    "ssssswwwwwwe            rty     a",
    "sxxxxxxxxxxc                    a",
    "d                               a",
    "d             qe                a",
    "d             zse               a",
    "d   rttty      zse      qwe     a",
    "d               zc     qssse    a",
    "d                     qssssse   a",
    "se                  qwssssssswe a",
    "sswwwwwwwwwwwwwwwwwwsssssssssssws",
    "sxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxs",
  ],
  [
    "                                ",
    " qwwwwwwwwwwwwwwwwwwwwwwwwwwwwwe",
    " asssssssssssssssssssssssssssssd",
    " asssssssssssssssssssssssssssssd",
    " asssssssssssssssssssssssssssssd",
    " asssssssssssssssssssssssssssssd",
    " asssssssssssssssssssssssssssssd",
    " asssssssssssssssssssssssssssssd",
    " asssssssssssssssssssssssssssssd",
    " asssssssssssssssssssssssssssssd",
    " asssssssssssssssssssssssssssssd",
    " asssssssssssssssssssssssssssssd",
    " asssssssssssssssssssssssssssssd",
    " asssssssssssssssssssssssssssssd",
    " asssssssssssssssssssssssssssssd",
    " asssssssssssssssssssssssssssssd",
    " asssssssssssssssssssssssssssssd",
    " asssssssssssssssssssssssssssssd",
    " asssssssssssssssssssssssssssssd",
    " asssssssssssssssssssssssssssssd",
    " zxxxxxxxxxxxxxxxxxxxxxxxxxxxxxc",
  ],
]

scene("menu", () => {
  
  //background
  const level = addLevel(levels[2], levelConfig)
  
  //title
  add([
    rect(100, 100),
    text("Pixel Fighters", {
      font: "sinko",
      size: 85
    }),
    origin("center"),
    color(MAGENTA),
    pos(center().x, 115)
  ])
  
  //play (multiplayer) button
  add([
    rect(100, 100),
    text("Play", {
      font: "sinko",
      size: 75
    }),
    origin("center"),
    color(GREEN),
    pos(center().x, 225),
    area(),
    "multiplayer"
  ])
  
  //play (multiplayer) functionality
  onClick("multiplayer", () => {
    go("characterSelect")
  })
  
  //deceration
  //penguin sprite
  add([
    sprite("penguin", {
      width: 200,
      anim: "idle"
    }),
    pos(125, 490)
  ])
  
  //wizard sprite
  add([
    sprite("wizard", {
      width: 300,
      anim: "idle",
      flipX: true
    }),
    pos(width()-75, 390),
    origin("topright")
  ])
  
}) //close menu

scene("characterSelect", () => {
  
  //background
  const level = addLevel(levels[2], levelConfig)
  
  //variable to see which player is selecting their char
  let currentPlayer = "player1"
  
  //var to see if both players selected chars
  let charsSelected = false
  
  //"choose your character" text
  let chooseCharText = add([
    rect(100, 100),
    text("Player One:\nChoose Your Character!", {
      size: 50,
      font: "sinko"
    }),
    color(0, 200, 255),
    origin("center"),
    pos(center().x, 125)
  ])
  
  //penguin
  add([
    sprite("penguin", {
      width: 150,
      anim: "idle"
    }),
    pos(center().x-100, center().y),
    origin("center"),
    area(),
    z(3),
    "char",
    {
      character: penguin,
      selectable: true
    },
  ])
  
  //background for penguin
  add([
    rect(150, 150),
    pos(center().x-100, center().y),
    origin("center"),
    z(2)
  ])
  
  add([
    rect(165, 165),
    color(BLACK),
    pos(center().x-100, center().y),
    origin("center"),
    z(1)
  ])
  
  //wizard
  add([
    sprite("wizard", {
      width: 180,
      flipX: true,
      anim: "idle"
    }),
    pos(center().x+100, center().y-15),
    origin("center"),
    area(),
    "char",
    {
      character: wizard,
      selectable: true
    },
    z(3)
  ])
  
  //background for wizard
  add([
    rect(150, 150),
    pos(center().x+100, center().y),
    origin("center"),
    color(150, 150, 255),
    z(2)
  ])
  
  add([
    rect(165, 165),
    pos(center().x+100, center().y),
    color(BLACK),
    origin("center")
  ])
  
  //player selected characters
  //player2 sprite
  let player2SelectedChar = add([
    sprite("orb", {
      width: 150,
      anim: "main"
    }),
    pos(center().x+100, center().y+220),
    origin("center"),
    z(2)
  ])
  
  //sprite background
  add([
    rect(150, 150),
    pos(center().x+100, center().y+220),
    origin("center")
  ])
  
  //"player two" text
  add([
    text("player two", {
      size: 19
    }),
    pos(center().x+100, center().y+305),
    origin("center"),
    color(WHITE),
    z(2)
  ])
  
  add([
    rect(150, 25),
    pos(center().x+100, center().y+305),
    origin("center"),
    color(BLACK)
  ])
  
  //player1 sprite
  let player1SelectedChar = add([
    sprite("orb", {
      width: 150,
      anim: "main"
    }),
    pos(center().x-100, center().y+220),
    origin("center"),
    z(2)
  ])
  
  //sprite background
  add([
    rect(150, 150),
    pos(center().x-100, center().y+220),
    origin("center")
  ])
  
  //"player two" text
  add([
    text("player one", {
      size: 19
    }),
    pos(center().x-100, center().y+305),
    origin("center"),
    color(WHITE),
    z(2)
  ])
  
  add([
    rect(150, 25),
    pos(center().x-100, center().y+305),
    origin("center"),
    color(BLACK)
  ])
  
  //if char is selected
  onClick("char", (char) => {
    if(charsSelected == false) {
      if (currentPlayer == "player1") {
        char.selectable = false
        player1Char = char.character
        currentPlayer = "player2"
        chooseCharText.text = "Player Two:\nChoose Your Character!"
        //change player1 sprite
        destroy(player1SelectedChar)
        let player1SelectChar = add([
          sprite(player1Char.sprite, {
            width: player1Char.selectMenuWidth,
            anim: "idle"
          }),
          pos(center().x-100, center().y+230),
          origin("center"),
          z(2)
        ])

        if (player1Char.sprite == "wizard") {
          player1SelectChar.moveTo(center().x-100, center().y+205)
        }

      }
      else {

        if (char.selectable == true) {
          charsSelected = true
          player2Char = char.character
          destroy(player2SelectedChar)
          let player2SelectChar = add([
            sprite(player2Char.sprite, {
              width: player2Char.selectMenuWidth,
              anim: "idle"
            }),
            pos(center().x+100, center().y+230),
            origin("center"),
            z(2)
          ])

          if (player2Char.sprite == "wizard") {
            player2SelectChar.moveTo(center().x+100, center().y+205)
          }

          //start button
          add([
            rect(100, 100),
            text("select\nmap", {
              size: 50,
              font: "sinko"
            }),
            color(GREEN),
            pos(795, 575),
            area(),
            "map"
          ])

          chooseCharText.text = "Ready to select map."

        }
        else {
          chooseCharText.text = "That character\nis already taken."

          wait(1.5, () => {
            chooseCharText.text = "Player Two:\nChoose Your Character!"
          })
        }

      }
    }
    
    
    onClick("map", () => {
      go("mapSelect")
    })
    
  })
  
}) //close character select screen

scene("mapSelect", () => {
  
  //background
  const level = addLevel(levels[2], levelConfig)
  
  //"choose map" text
  let mapText = add([
    rect(100, 100),
    text("Choose Your Map!", {
      font: "sinko",
      size: 65
    }),
    color(181, 129, 241),
    origin("center"),
    pos(center().x, 110)
  ])
  
  //map images (placeholders)
  //map 1
  add([
    rect(165, 165),
    color(BLACK),
    pos(center().x-100, center().y),
    origin("center"),
    z(1),
    area(),
    "map1"
  ])
  
  //map2
  add([
    rect(165, 165),
    color(WHITE),
    pos(center().x+100, center().y),
    origin("center"),
    z(1),
    area(),
    "map2"
  ])
  
  //choose map1
  onClick("map1", () => {
    map = 0
    
    add([
      rect(100, 100),
      text("start\ngame", {
        size: 50,
        font: "sinko"
      }),
      color(GREEN),
      pos(835, 575),
      area(),
      "play"
    ])
  })
  
  //choose map2
  onClick("map2", () => {
    map = 1
    
    add([
      rect(100, 100),
      text("start\ngame", {
        size: 50,
        font: "sinko"
      }),
      color(GREEN),
      pos(835, 575),
      area(),
      "play"
    ])
  })
  
  onClick("play", () => {
    go("multiplayer")
  })
  
}) //close map select screen

scene("multiplayer", () => {
  
  //load map
  const level = addLevel(levels[map], levelConfig)
  
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
  onKeyPress("f", () => {
    attackOne(player1)
  })
  onKeyPress("g", () => {
    attackTwo(player1)
  })
  onKeyPress("h", () => {
    attackThree(player1)
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
  onKeyPress(",", () => {
    attackOne(player2)
  })
  onKeyPress(".", () => {
    attackTwo(player2)
  })
  onKeyPress("/", () => {
    attackThree(player2)
  })
  
  //function to update healthbars
  function updateHpBars() {
    player2HpBar.width = player2.hp
    player1HpBar.width = player1.hp
    
    if (player1.hp <= 0) {
      //"game!" text
      add([
        text("game!", {
          font: "sinko",
          size: 100
        }),
        origin("center"),
        pos(center()),
        color(MAGENTA),
        z(2)
      ])
      
      //background banner
      add([
        rect(width(), 100),
        origin("center"),
        pos(center()),
        color(MAGENTA)
      ])
      
      winner.player = "player2"
      winner.character = player2.character
      
      wait(3, () => {
        go("end")
      })
      
    }
    else if (player2.hp <= 0) {
      //"game!" text
      add([
        text("game!", {
          font: "sinko",
          size: 100
        }),
        origin("center"),
        pos(center()),
        color(MAGENTA),
        z(2)
      ])
      
      //background banner
      add([
        rect(width(), 100),
        origin("center"),
        pos(center()),
        color(MAGENTA)
      ])
      
      winner.player = "player1"
      winner.character = player1.character
      
      wait(3, () => {
        go("end")
      })
    }
    
  }
  
  //attack functions
  function attackOne(player) {
    //penguin attack
    if (player.character == "penguin") {
      if (get("beam").length == 0) {
        if (player.flipStatus == false) {
          let water = add([
            sprite("water", {
              width: 50,
              anim: "rise"
            }),
            pos(player.pos.x+15, player.pos.y),
            origin("botleft"),
            area(),
            {
              castingPlayer: player.character,
              beamType: "water"
            },
            "beam",
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
            {
              castingPlayer: player.character,
              beamType: "water"
            },
            "beam"
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
          {
            speed : 500,
            castingPlayer: player.character
          }
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
  
  //attack 2
  function attackTwo(player) {
    if (player.character == "penguin") {
      if (player.canAttack == true) {
        
        let bullet = add([
          rect(20, 20),
          color(BLUE),
          pos(player.pos.x, player.pos.y-20),
          origin("center"),
          area(),
          cleanup(),
          "bullet",
          {
            speed : 400,
            castingPlayer: player.character
          }
        ])

        if (player.flipStatus == true) {
          bullet.speed = -bullet.speed
        }

        player.canAttack = false

        wait(0.8, () => {
          player.canAttack = true
        })
        
      }
    }
    else if (player.character == "wizard") {
      if (get("beam").length == 0) {
        
        player.play("casting", {
          onEnd: () => {wait(0, () => {player.play("idle")})}
        })
        
        if (player.flipStatus == false) {
          let beam = add([
            rect(75, height()),
            opacity(0.5),
            pos(player.pos.x+20, player.pos.y),
            origin("botleft"),
            area(),
            {castingPlayer: player.character},
            "beam"
          ])
          
          wait(0.8, () => {
            destroy(beam)
          })
          
        }
        else {
          let beam = add([
            rect(75, height()),
            opacity(0.5),
            pos(player.pos.x-20, player.pos.y),
            origin("botright"),
            area(),
            {castingPlayer: player.character},
           "beam"
          ])
          
          wait(0.8, () => {
            destroy(beam)
          })
          
        }
      }
    }
  }
  
  function attackThree(player) {
    if (player.character == "penguin") {
      if (player.canAttack == true) {
        if (player.flipStatus == true) {
          player.move(-10000, 0)
          player.canAttack = false
          wait(2, () => {
            player.canAttack = true
          })
        }
        else {
          player.move(10000, 0)
          player.canAttack = false
          wait(2, () => {
            player.canAttack = true
          })
        }
      }
    }
    else if (player.character == "wizard") {
      if (player.canAttack == true) {
        
        player.play("casting", {
          onEnd: () => {wait(0, () => {player.play("idle")})}
        })
        
        if (player.flipStatus == false) {
          let fireball = add([
            rect(25, 25),
            color(RED),
            pos(player.pos.x+30, player.pos.y-20),
            origin("center"),
            area(),
            "fireball",
            {speed: 300}
          ])
          
          wait(0.6, () => {
            addKaboom(fireball.pos)
            destroy(fireball)
          })
          
        }
        else {
          let fireball = add([
            rect(25, 25),
            color(RED),
            pos(player.pos.x-30, player.pos.y-20),
            origin("center"),
            area(),
            "fireball",
            {speed: -300}
          ])
          
          wait(0.4, () => {
            addKaboom(fireball.pos)
            destroy(fireball)
          })
          
        }
        
        player.canAttack = false
        
        wait(0.8, () => {
          player.canAttack = true
        })
        
      }
    }
  }
  
  //beam/water attack collision
  onCollide("beam", "player", (beam, player) => {
    if (beam.beamType == "water") {
      player.jump(700)
    }
    //check if player isnt the caasting player so that they can get launched but wont get hurt
    if (player.character != beam.castingPlayer) {
      player.hp -= 5
      updateHpBars()
    }
  })
  
  //bullet movement
  onUpdate("bullet", (bullet) => {
    bullet.move(bullet.speed, 0)
  })
  
  //bullet collision
  onCollide("player", "bullet", (player, bullet) => {
    if (player.character != bullet.castingPlayer) {
      destroy(bullet)
      player.hp -= 2.5
      updateHpBars()
    }
  })
  
  //fireball movement
  onUpdate("fireball", (fireball) => {
    fireball.move(fireball.speed, 0)
  })
  
  //fireball collison
  onCollide("fireball", "player", (fireball, player) => {
    player.hp -= 7.5
    updateHpBars()
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

scene("end", () => {
  
  //background
  const level = addLevel(levels[2], levelConfig)
  
  //winning player text
  add([
    rect(100, 100),
    text(winner.player + " wins!", {
      size: 75,
      font: "sinko"
    }),
    origin("center"),
    pos(center().x, 100),
    color(GREEN)
  ])
  
  //winner sprite
  //background
  add([
    rect(300, 300),
    origin("center"),
    pos(center()),
    color(MAGENTA),
    z(2)
  ])
  //border
  add([
    rect(315, 315),
    origin("center"),
    pos(center()),
    color(BLACK)
  ])
  
  //winner sprite
  add([
    sprite(winner.character, {
      width: 300,
      anim: "idle"
    }),
    origin("center"),
    pos(center()),
    z(3)
  ])
  
  //menu button
  add([
    rect(100, 100),
    text("menu", {
      size: 60,
      font: "sinko"
    }),
    color(100, 209, 252),
    pos(50, 615),
    area(),
    "menu"
  ])
  
  //rematch button
  add([
    rect(100, 100),
    text("rematch", {
      size: 60,
      font: "sinko"
    }),
    color(RED),
    pos(width()-50, 615),
    origin("topright"),
    area(),
    "rematch"
  ])
  
  //button functionality
  onClick("menu", () => {
    go("menu")
  })
  
  onClick("rematch", () => {
    go("mapSelect")
  })
  
}) //close end

go("menu")
