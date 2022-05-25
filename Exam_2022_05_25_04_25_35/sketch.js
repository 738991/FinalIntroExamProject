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
loadSpriteAtlas("sprites/wizard/waterbullet.png", "sprites/wizard/wateratlas.json")
loadSpriteAtlas("sprites/wizard/firebullet.png", "sprites/wizard/fireatlas.json")
//hammer
loadSpriteAtlas("sprites/hammer/hammer.png", "sprites/hammer/hammeratlas.json")
loadSpriteAtlas("sprites/hammer/throwinghammer.png", "sprites/hammer/throwinghammeratlas.json")
//map image sprites
loadSprite("map1", "mapImages/map1.png")
loadSprite("map2", "mapImages/map2.png")
//controls images
loadSprite("player1Move", "controlImages/player1Move.png")
loadSprite("player2Move", "controlImages/player2Move.png")
loadSprite("player1Attack", "controlImages/player1Attack.png")
loadSprite("player2Attack", "controlImages/player2Attack.png")

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
  sprite: "penguin",
  attackOne: function attack1(player) {
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
  },
  attackTwo: function attack2(player) {
      if (player.canAttack == true) {
        
        let bullet = add([
          sprite("waterBullet", {
            width: 32,
            anim: "main",
            flipX: true
          }),
          pos(player.pos.x, player.pos.y-20),
          origin("center"),
          area(),
          cleanup(),
          "bullet",
          {
            speed : 400,
            castingPlayer: player.character,
            damage: 2.5
          }
        ])

        if (player.flipStatus == true) {
          bullet.speed = -bullet.speed
        }
        else {
          bullet.flipX()
        }

        player.canAttack = false

        wait(0.8, () => {
          player.canAttack = true
        })
        
      }
  },
  attackThree: function attack3(player) {
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
}
//wizard
let wizard = {
  width: 80,
  selectMenuWidth: 175,
  decoWidth: 120,
  speed: 300,
  jumpHeight: 800,
  sprite: "wizard",
  attackOne: function attack1(player) {
      if (player.canAttack == true) {
        
        player.play("casting", {
          onEnd: () => {wait(0, () => {player.play("idle")})}
        })
        
        let bullet = add([
          sprite("orb", {
            anim: "main",
            width: 64
          }),
          pos(player.pos.x, player.pos.y-20),
          origin("center"),
          area(),
          cleanup(),
          "bullet",
          {
            speed : 500,
            castingPlayer: player.character,
            damage: 2.5
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
  },
  attackTwo: function attack2(player) {
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
  },
  attackThree: function attack3(player) {
      if (player.canAttack == true) {
        
        player.play("casting", {
          onEnd: () => {wait(0, () => {player.play("idle")})}
        })
        
        if (player.flipStatus == false) {
          let fireball = add([
            sprite("fireBullet", {
              anim: "main",
              width: 32
            }),
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
            sprite("fireBullet", {
              anim: "main",
              width: 32,
              flipX: true
            }),
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
//the char with the hammer attack idk what to name it
let hammer = {
  width: 70,
  selectMenuWidth: 165,
  decoWidth: 95,
  speed: 400,
  jumpHeight: 750,
  sprite: "hammer",
  attackOne: function attack1(player) {
    
    player.canAttack = false
    
    let bullet = add([
      rect(50, 100),
      color(BLUE),
      pos(player.pos.x+30, player.pos.y-30),
      origin("center"),
      area(),
      cleanup(),
      opacity(0),
      "bullet",
      {
        speed : 0,
        castingPlayer: player.character,
        damage: 6
      }
    ])
    
    //attack anim
    player.play("casting", {
      onEnd: () => {wait(0, () => {
        player.play("idle")
        //end attack
        //destroy(bullet)
      })}
    })
    
    wait(0.3, () => {
      destroy(bullet)
    })
    
    wait(0.8, () => {
      player.canAttack = true
    })
    
  },
  attackTwo: function attack2(player) {
    
    player.canAttack = false
    
    //bring other player closer attack
    let bullet = add([
      sprite("throwingHammer", {
        anim: "main",
        width: 32
      }),
      pos(player.pos.x, player.pos.y-30),
      origin("center"),
      area(),
      cleanup(),
      "grabBullet",
      {
        speed : 400,
        castingPlayer: player.character,
        damage: 1
      }
    ])
    
    if (player.flipStatus == true) {
      bullet.speed = -400
    }
    
    wait(0.8, () => {
      destroy(bullet)
    })
    
    wait(0.8, () => {
      player.canAttack = true
    })
    
  },
  attackThree: function attack3(player) {
    player.canAttack = false
    
    //push other player away attack
    let bullet = add([
      sprite("throwingHammer", {
        anim: "main",
        width: 32
      }),
      pos(player.pos.x, player.pos.y-30),
      origin("center"),
      area(),
      cleanup(),
      "pushBullet",
      {
        speed : 400,
        castingPlayer: player.character,
        damage: 2.5
      }
    ])
    
    if (player.flipStatus == true) {
      bullet.speed = -400
    }
    
    wait(0.8, () => {
      destroy(bullet)
    })
    
    wait(0.8, () => {
      player.canAttack = true
    })
  }
}

//characters that players selected
let player1Char = hammer
let player2Char = wizard
//selected game mode
let mode = "multiplayer"

//map that players selected
let map = 0

//player that won last round
let winner = {
  player: "player1",
  character: "hammer"
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
    text("multi\nplayer", {
      font: "sinko",
      size: 50
    }),
    origin("center"),
    color(GREEN),
    pos(center().x, center().y+75),
    area(),
    "multiplayer"
  ])
  
  //play (multiplayer) functionality
  onClick("multiplayer", () => {
    go("characterSelect")
    mode = "multiplayer"
  })
  
  //play (singleplayer) button
  add([
    rect(100, 100),
    text("single\nplayer", {
      font: "sinko",
      size: 50
    }),
    origin("center"),
    color(GREEN),
    pos(center().x, center().y-75),
    area(),
    "singleplayer"
  ])
  
  //play (singleplayer) functionality
  onClick("singleplayer", () => {
    go("characterSelect")
    mode = "singleplayer"
  })
  
  //fullscreen button
  add([
    rect(100, 100),
    text("fullscreen", {
      size: 40,
      font: "sinko"
    }),
    origin("center"),
    pos(center().x, center().y+295),
    color(MAGENTA),
    area(),
    "fullscreen"
  ])
  
  onClick("fullscreen", () => {
    fullscreen(!isFullscreen())
  })
  
  //deceration
  //hammer sprite
  add([
    sprite("hammer", {
      width: 250,
      anim: "idle"
    }),
    pos(95, 315)
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
  
  //controls
  //player1
  //movement text
  add([
    rect(100, 100),
    text("Player 1\nMovement:", {
      font: "sinko",
      size: 40
    }),
    color(101, 201, 255),
    pos(225, 205),
    origin("center")
  ])
  
  //movement image
  add([
    sprite("player1Move", {
      width: 200
    }),
    origin("center"),
    pos(225, 310)
  ])
  
  //attack text
  add([
    rect(100, 100),
    text("Attacks:", {
      font: "sinko",
      size: 40
    }),
    color(101, 201, 255),
    pos(225, 400),
    origin("center")
  ])
  
  //attack image
  add([
    sprite("player1Attack", {
      width: 200
    }),
    origin("center"),
    pos(225, 455)
  ])
  
  //player2
  //movement text
  add([
    rect(100, 100),
    text("Player 2\nMovement:", {
      font: "sinko",
      size: 40
    }),
    color(101, 201, 255),
    pos(width()-225, 205),
    origin("center")
  ])
  
  //movement image
  add([
    sprite("player2Move", {
      width: 200
    }),
    origin("center"),
    pos(width()-225, 310)
  ])
  
  //attack text
  add([
    rect(100, 100),
    text("Attacks:", {
      font: "sinko",
      size: 40
    }),
    color(101, 201, 255),
    pos(width()-225, 400),
    origin("center")
  ])
  
  //attack image
  add([
    sprite("player2Attack", {
      width: 200
    }),
    origin("center"),
    pos(width()-225, 455)
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
  
  //hammer
  add([
    sprite("hammer", {
      width: 165,
      anim: "idle"
    }),
    pos(center().x-200, center().y-48),
    origin("center"),
    area(),
    z(3),
    "char",
    {
      character: hammer,
      selectable: true
    },
  ])
  
  //background for hammer
  add([
    rect(150, 150),
    pos(center().x-200, center().y),
    origin("center"),
    color(240, 237, 121),
    z(2)
  ])
  
  add([
    rect(165, 165),
    color(BLACK),
    pos(center().x-200, center().y),
    origin("center"),
    z(1)
  ])
  
  //penguin
  add([
    sprite("penguin", {
      width: 150,
      anim: "idle"
    }),
    pos(center().x, center().y),
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
    pos(center().x, center().y),
    origin("center"),
    z(2)
  ])
  
  add([
    rect(165, 165),
    color(BLACK),
    pos(center().x, center().y),
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
    pos(center().x+200, center().y-15),
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
    pos(center().x+200, center().y),
    origin("center"),
    color(150, 150, 255),
    z(2)
  ])
  
  add([
    rect(165, 165),
    pos(center().x+200, center().y),
    color(BLACK),
    origin("center")
  ])
  
  //player selected characters
  //player2 sprite
  add([
    sprite("orb", {
      width: 150,
      anim: "main"
    }),
    pos(center().x+100, center().y+220),
    origin("center"),
    z(2),
    "placeholder2"
  ])
  
  //sprite background
  add([
    rect(150, 150),
    color(MAGENTA),
    pos(center().x+100, center().y+220),
    z(1),
    origin("center")
  ])
  
  //border
  add([
    rect(165, 165),
    color(BLACK),
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
    rect(165, 25),
    pos(center().x+100, center().y+305),
    origin("center"),
    color(BLACK)
  ])
  
  //player1 sprite
  add([
    sprite("orb", {
      width: 150,
      anim: "main"
    }),
    pos(center().x-100, center().y+220),
    origin("center"),
    z(2),
    "placeholder1"
  ])
  
  //sprite background
  add([
    rect(150, 150),
    pos(center().x-100, center().y+220),
    origin("center"),
    z(1),
    color(104, 191, 238)
  ])
  
  //border
  add([
    rect(165, 165),
    pos(center().x-100, center().y+220),
    origin("center"),
    color(BLACK)
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
    rect(165, 25),
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
        if (mode == "singleplayer") {
          chooseCharText.text = "Choose The\nBots Character!"
        }
        //change player1 sprite
        destroy(get("placeholder1")[0])
        let player1SelectChar = add([
          "charSprite",
          sprite(player1Char.sprite, {
            width: player1Char.selectMenuWidth,
            anim: "idle"
          }),
          pos(center().x-180, center().y+295),
          origin("botleft"),
          z(2)
        ])
        
        if (player1Char == wizard) {
          player1SelectChar.moveTo(center().x-185, center().y+295)
        }
        else if (player1Char == penguin) {
          player1SelectChar.moveTo(center().x-165, center().y+295)
        }

      }
      else {

        if (char.selectable == true) {
          charsSelected = true
          player2Char = char.character
          destroy(get("placeholder2")[0])
          let player2SelectChar = add([
            "charSprite",
            sprite(player2Char.sprite, {
              width: player2Char.selectMenuWidth,
              anim: "idle"
            }),
            pos(center().x+180, center().y+295),
            origin("botright"),
            z(2),
          ])

          if (player2Char == wizard) {
            player2SelectChar.moveTo(center().x+185, center().y+295)
          }
          else if (player2Char == penguin) {
            player2SelectChar.moveTo(center().x+165, center().y+295)
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
  
  //letting players deselect characters
  add([
    rect(100, 100),
    text("deselect\ncharacters", {
      size: 30,
      font: "sinko"
    }),
    color(RED),
    area(),
    pos(50, 615),
    "deselect"
  ])
  
  onClick("deselect", () => {
    //allow players to select chars
    charsSelected = false
    currentPlayer = "player1"
    
    const CHARS = get("char")
    for (let i=0; i<CHARS.length; i++) {
      CHARS[i].selectable = true
    }
    
    //delete old char sprites
    const SPRITES = get("charSprite")
    for (let i=0; i<SPRITES.length; i++) {
      destroy(SPRITES[i])
    }
    
    //add back orb placeholders
    add([
      sprite("orb", {
        width: 150,
        anim: "main"
      }),
      pos(center().x-100, center().y+220),
      origin("center"),
      z(2),
      "placeholder1"
    ])
    
    add([
      sprite("orb", {
        width: 150,
        anim: "main"
      }),
      pos(center().x+100, center().y+220),
      origin("center"),
      z(2),
      "placeholder2"
    ])
    
    //change text
    chooseCharText.text = "Player One:\nChoose Your Character!"
    
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
    sprite("map1", {
      width: 165,
      height: 165
    }),
    pos(center().x-100, center().y),
    origin("center"),
    z(2),
    area(),
    "map1"
  ])
  
  //background for map1
  add([
    rect(175, 175),
    pos(center().x-100, center().y),
    origin("center"),
    area(),
    color(125,207,252),
    "border",
    "1"
  ])
  
  //map2
  add([
    sprite("map2", {
      width: 165,
      height: 165
    }),
    pos(center().x+100, center().y),
    origin("center"),
    z(2),
    area(),
    "map2"
  ])
  
  //background for map2
  add([
    rect(175, 175),
    pos(center().x+100, center().y),
    origin("center"),
    area(),
    color(MAGENTA),
    "border",
    "2"
  ])
  
  //choose map1
  onClick("map1", (map1) => {
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
    
    //changing borders
    const borders = get("border")
    for (let i = 0; i < borders.length; i++) {
      borders[i].color = WHITE
    }
    
    get("1")[0].color = MAGENTA
    
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
    
    //changing borders
    const borders = get("border")
    for (let i = 0; i < borders.length; i++) {
      borders[i].color = WHITE
    }
    
    get("2")[0].color = MAGENTA
    
  })
  
  onClick("play", () => {
    go(mode)
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
      canAttack: true,
      canMove: true
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
      canAttack: true,
      canMove: true
    }
  ])
  
  //player1 movement
  //right
  onKeyDown("d", () => {
    if (player1.canMove == true) {
      player1.flipX(false)
      player1.flipStatus = false
      player1.move(player1.speed, 0)
      if (player1.curAnim() == "idle") {
        player1.play("run")
      }
      onKeyRelease("d", () => {
        player1.play("idle")
      })
    }
    
  })
  //left
  onKeyDown("a", () => {
    if (player1.canMove == true) {
      player1.flipX(true)
      player1.flipStatus = true
      player1.move(-player1.speed, 0)
      if (player1.curAnim() == "idle") {
        player1.play("run")
      }
      onKeyRelease("a", () => {
        player1.play("idle")
      })
    }
    
  })
  //jump
  onKeyPress("w", () => {
    if (player1.canMove == true) {
      if (player1.isGrounded()) {
        player1.play("jump")
        player1.jump(player1.jumpHeight)
        wait(0.5, () => {player1.play("idle")})
      }
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
    if (player1.canMove && player1.canAttack == true) {
      player1Char.attackOne(player1)
    }
  })
  onKeyPress("g", () => {
    if (player1.canMove && player1.canAttack == true) {
      player1Char.attackTwo(player1)
    }
  })
  onKeyPress("h", () => {
    if (player1.canMove && player1.canAttack == true) {
      player1Char.attackThree(player1)
    }
  })
  
  //player2 movement
  //right
  onKeyDown("right", () => {
    if (player2.canMove == true) {
      player2.flipX(false)
      player2.flipStatus = false
      player2.move(player2.speed, 0)
      if (player2.curAnim() == "idle") {
        player2.play("run")
      }
      onKeyRelease("right", () => {
        player2.play("idle")
      })
    }
    
  })
  //left
  onKeyDown("left", () => {
    if (player2.canMove == true) {
      player2.flipX(true)
      player2.flipStatus = true
      player2.move(-player2.speed, 0)
      if (player2.curAnim() == "idle") {
        player2.play("run")
      }
      onKeyRelease("left", () => {
        player2.play("idle")
      })
    }
    
  })
  //jump
  onKeyPress("up", () => {
    if (player2.canMove == true) {
      if (player2.isGrounded()) {
        player2.play("jump")
        player2.jump(player2.jumpHeight)
        wait(0.5, () => {player2.play("idle")})
      }
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
    if (player2.canMove && player2.canAttack == true) {
      player2Char.attackOne(player2)
    }
  })
  onKeyPress(".", () => {
    if (player2.canMove && player2.canAttack == true) {
      player2Char.attackTwo(player2)
    }
  })
  onKeyPress("/", () => {
    if (player2.canMove && player2.canAttack == true) {
      player2Char.attackThree(player2)
    }
  })
  
  //death plane functionality
  onCollide("player", "death", (player, death) => {
    player.hp -= 10
    player.moveTo(width()/2, 100)
    updateHpBars()
  })
  
  //function to update healthbars
  function updateHpBars() {
    player2HpBar.width = player2.hp
    player1HpBar.width = player1.hp
    
    if (player1.hp <= 0) {
      //freeze players
      player1.canMove = false
      player2.canMove = false
      
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
      //freeze players
      player1.canMove = false
      player2.canMove = false
      
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
      player.hp -= bullet.damage
      updateHpBars()
    }
  })
  
  //grab bullet movement
  onUpdate("grabBullet", (bullet) => {
    bullet.move(bullet.speed, 0)
  })
  
  //grab bullet collision
  onCollide("player", "grabBullet", (player, bullet) => {
    if (player.character != bullet.castingPlayer) {
      destroy(bullet)
      player.hp -= bullet.damage
      updateHpBars()
      player.move(bullet.speed*-20, 0)
    }
  })
  
  //push bullet movement
  onUpdate("pushBullet", (bullet) => {
    bullet.move(bullet.speed, 0)
  })
  
  //push bullet collision
  onCollide("player", "pushBullet", (player, bullet) => {
    if (player.character != bullet.castingPlayer) {
      destroy(bullet)
      player.hp -= bullet.damage
      updateHpBars()
      player.move(bullet.speed*15, 0)
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
  let player1SpriteDeco = add([
    sprite(player1.character, {
      width: player1Char.decoWidth,
      anim: "idle"
    }),
    pos(400, 700-player1Char.decoWidth/2),
    origin("center"),
    z(2)
  ])
  
  if (player1Char == hammer) {
    player1SpriteDeco.moveTo(400, 675-player1Char.decoWidth/2)
  }
  
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
  let player2SpriteDeco = add([
    sprite(player2.character, {
      width: player2Char.decoWidth,
      anim: "idle",
      flipX: true
    }),
    pos(width()-400, 700-player2Char.decoWidth/2),
    origin("center"),
    z(2)
  ])
  
  if (player2Char == hammer) {
    player2SpriteDeco.moveTo(width()-400, 675-player2Char.decoWidth/2)
  }
  
  //3, 2, 1, start countdown
  //freezing and unfreezing players
  player1.canMove = false
  player2.canMove = false
  wait(3, () => {
    player1.canMove = true
    player2.canMove = true
  })
  
  //countdown
  let countdownText = add([
    text("3", {
      font: "sinko",
      size: 200
    }),
    origin("center"),
    pos(center()),
    color(101, 201, 255)
  ])
  
  wait(1, () => {
    countdownText.text = 2
  })
  
  wait(2, () => {
    countdownText.text = 1
  })
  
  wait(3, () => {
    countdownText.text = "Start!"
  })
  
  wait(4, () => {
    destroy(countdownText)
  })
  
}) //close multiplayer

scene("singleplayer", () => {
  
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
      canAttack: true,
      canMove: true
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
    "bot",
    { 
      speed: player2Char.speed,
      jumpHeight: player2Char.jumpHeight,
      hp: 100,
      flipStatus: true,
      character: player2Char.sprite,
      canAttack: true,
      canMove: true
    }
  ])
  
  //player1 movement
  //right
  onKeyDown("d", () => {
    if (player1.canMove == true) {
      player1.flipX(false)
      player1.flipStatus = false
      player1.move(player1.speed, 0)
      if (player1.curAnim() == "idle") {
        player1.play("run")
      }
      onKeyRelease("d", () => {
        player1.play("idle")
      })
    }
    
  })
  //left
  onKeyDown("a", () => {
    if (player1.canMove == true) {
      player1.flipX(true)
      player1.flipStatus = true
      player1.move(-player1.speed, 0)
      if (player1.curAnim() == "idle") {
        player1.play("run")
      }
      onKeyRelease("a", () => {
        player1.play("idle")
      })
    }
    
  })
  //jump
  onKeyPress("w", () => {
    if (player1.canMove == true) {
      if (player1.isGrounded()) {
        player1.play("jump")
        player1.jump(player1.jumpHeight)
        wait(0.5, () => {player1.play("idle")})
      }
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
    if (player1.canMove && player1.canAttack == true) {
      player1Char.attackOne(player1)
    }
  })
  onKeyPress("g", () => {
    if (player1.canMove && player1.canAttack == true) {
      player1Char.attackTwo(player1)
    }
  })
  onKeyPress("h", () => {
    if (player1.canMove && player1.canAttack == true) {
      player1Char.attackThree(player1)
    }
  })
  
  //death plane functionality
  onCollide("player", "death", (player, death) => {
    player.hp -= 10
    player.moveTo(width()/2, 100)
    updateHpBars()
  })
  
  //function to update healthbars
  function updateHpBars() {
    player2HpBar.width = player2.hp
    player1HpBar.width = player1.hp
    
    if (player1.hp <= 0) {
      //freeze players
      player1.canMove = false
      player2.canMove = false
      
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
      //freeze players
      player1.canMove = false
      player2.canMove = false
      
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
      player.hp -= bullet.damage
      updateHpBars()
    }
  })
  
  //grab bullet movement
  onUpdate("grabBullet", (bullet) => {
    bullet.move(bullet.speed, 0)
  })
  
  //grab bullet collision
  onCollide("player", "grabBullet", (player, bullet) => {
    if (player.character != bullet.castingPlayer) {
      destroy(bullet)
      player.hp -= bullet.damage
      updateHpBars()
      player.move(bullet.speed*-20, 0)
    }
  })
  
  //push bullet movement
  onUpdate("pushBullet", (bullet) => {
    bullet.move(bullet.speed, 0)
  })
  
  //push bullet collision
  onCollide("player", "pushBullet", (player, bullet) => {
    if (player.character != bullet.castingPlayer) {
      destroy(bullet)
      player.hp -= bullet.damage
      updateHpBars()
      player.move(bullet.speed*15, 0)
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
  let player1SpriteDeco = add([
    sprite(player1.character, {
      width: player1Char.decoWidth,
      anim: "idle"
    }),
    pos(400, 700-player1Char.decoWidth/2),
    origin("center"),
    z(2)
  ])
  
  if (player1Char == hammer) {
    player1SpriteDeco.moveTo(400, 675-player1Char.decoWidth/2)
  }
  
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
  let player2SpriteDeco = add([
    sprite(player2.character, {
      width: player2Char.decoWidth,
      anim: "idle",
      flipX: true
    }),
    pos(width()-400, 700-player2Char.decoWidth/2),
    origin("center"),
    z(2)
  ])
  
  if (player2Char == hammer) {
    player2SpriteDeco.moveTo(width()-400, 675-player2Char.decoWidth/2)
  }
  
  //3, 2, 1, start countdown
  //freezing and unfreezing players
  player1.canMove = false
  player2.canMove = false
  wait(3, () => {
    player1.canMove = true
    player2.canMove = true
    player2.play("run")
  })
  
  //countdown
  let countdownText = add([
    text("3", {
      font: "sinko",
      size: 200
    }),
    origin("center"),
    pos(center()),
    color(101, 201, 255)
  ])
  
  wait(1, () => {
    countdownText.text = 2
  })
  
  wait(2, () => {
    countdownText.text = 1
  })
  
  wait(3, () => {
    countdownText.text = "Start!"
  })
  
  wait(4, () => {
    destroy(countdownText)
  })
  
  //player2 ai
  onUpdate("bot", (bot) => {
    //movement
    //if player is more to the left than bot
    if (player1.pos.x < bot.pos.x-10) {
      
      bot.flipX(true)
      bot.flipStatus = true
      
      console.log("bot working")
      
      if (bot.canMove == true) {
        bot.move(-bot.speed/1.3, 0)
      }
    }
    //if player is more to the right
    else if (player1.pos.x > bot.pos.x+10) {
      
      bot.flipX(false)
      bot.flipStatus = false
      
      console.log("bot working")
      
      if (bot.canMove == true) {
        bot.move(bot.speed/1.3, 0)
      }
    }
    
    //jumping
    if (player1.pos.y < bot.pos.y) {
      if (bot.isGrounded()) {
        bot.play("jump")
        bot.jump(player1.jumpHeight/1.1)
        wait(0.5, () => {bot.play("run")})
      }
    }
    
    //random chance to attack
    if (bot.canMove) {
      if (randi(1, 100) == 1) {
        const attack = randi(1, 3)
        
        if (attack == 1) {
          player2Char.attackOne(player2)
        }
        else if (attack == 2) {
          player2Char.attackTwo(player2)
        }
        else {
          player2Char.attackThree(player2)
        }
        
      }
    }
    
    
  })
  
}) //close singleplayer

scene("end", () => {
  
  //background
  const level = addLevel(levels[2], levelConfig)
  
  //winning player text
  let winnerText = add([
    rect(100, 100),
    text(winner.player + " wins!", {
      size: 75,
      font: "sinko"
    }),
    origin("center"),
    pos(center().x, 100),
    color(GREEN)
  ])
  
  if (mode == "singleplayer") {
    if (winner.player == "player2") {
      winnerText.text = "bot wins!"
    }
  }
  
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
  let winnerSprite = add([
    sprite(winner.character, {
      width: 300,
      anim: "idle"
    }),
    origin("center"),
    pos(center()),
    z(3)
  ])
  
  if (winner.character == "hammer") {
    winnerSprite.moveTo(center().x, center().y-75)
  }
  
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