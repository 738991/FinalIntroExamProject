kaboom({
  background: [10, 150, 200],
  width: 1080,
  height: 720,
  font: "sink",
  stretch: true,
  letterbox: true,
})
//sprites from dragon world
loadSpriteAtlas("https://kaboomjs.com/sprites/dungeon.png", "atlas.json")
//mermaid water attack sprites
loadSpriteAtlas("waterattack.png", "waterattackatlas.json")


const levelConfig = {
  width: 33,
  height: 33,
  pos: vec2(-2, 0),
  w: () => [
    "wall", 
    sprite("wall", {
      width: 33
    }), 
    area(), 
    solid()
  ],
  f: () => [
    "floor", 
    sprite("floor", {
      width: 33
    }), 
    area(), 
    solid()
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
  m: () => [
    "enemy",
    sprite("monster", {
      anim: "walk",
    }),
    area(),
    origin("center"),
    z(-1),
    { speed: 75, type: "monster" },
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
    "             fffffff              ",
    "                                  ",
    "                                  ",
    "                                  ",
    "                                  ",
    "      ffffff         ffffff       ",
    "                                  ",
    "                                  ",
    "                                  ",
    "    wfffffffffffffffffffffffw     ",
    "    wwwwwwwwwwwwwwwwwwwwwwwww     ",
    "     wwwwwwwwwwwwwwwwwwwwwww      ",
    "       wwwwwwwwwwwwwwwwwww        ",
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
    sprite("mermaid", {
      width: 65,
      anim: "idle"
    }),
    pos(370, 585),
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
    sprite("wizard", {
      width: 65,
      anim: "idle",
      flipX: true
    }),
    pos(width()-370, 585),
    origin("topright")
  ])
  
  //add player1
  let player1 = add([
    sprite("mermaid", {
      anim: "idle",
      width: 45
    }),
    pos(225, 500),
    area({scale:0.5}),
    solid(),
    origin("bot"),
    body(),
    "player",
    { 
      speed: 350,
      jumpHeight: 750,
      hp: 100,
      flipStatus: false,
      character: "mermaid",
      canAttack: true
    }
  ])
  
  //add player2
  let player2 = add([
    sprite("wizard", {
      flipX: true,
      anim: "idle",
      width: 45
    }),
    pos(width()-220, 500),
    area({scale:0.5}),
    solid(),
    origin("bot"),
    body(),
    "player",
    { 
      speed: 300,
      jumpHeight: 800,
      hp: 100,
      flipStatus: true,
      character: "wizard",
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
  //attack
  onKeyPress("e", () => {
    mermaidAttack(player1)
  })
  onKeyPress("q", () => {
    mermaidAttack(player1)
  })
  onKeyPress("f", () => {
    mermaidAttack(player1)
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
  //attack
  onKeyPress("control", () => {
    wizardAttack(player2)
  })
  onKeyPress("meta", () => {
    wizardAttack(player2)
  })
  onKeyPress("alt", () => {
    wizardAttack(player2)
  })
  onKeyPress("shift", () => {
    wizardAttack(player2)
  })
  
  //function to update healthbars
  function updateHpBars() {
    player2HpBar.width = player2.hp
    player1HpBar.width = player1.hp
  }
  
  //attack functions
  //mermaid's attack
  function mermaidAttack(player) {
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
  
  //mermaid attack collision
  onCollide("water", "player", (water, player) => {
    player.jump(700)
    //check if player isnt mermaid so that mermaid can get launched but wont get hurt
    if (player.character != "mermaid") {
      player.hp -= 5
      updateHpBars()
    }
  })
  
  //wizard attack
  function wizardAttack(player) {
    if (player.canAttack == true) {
      let bullet = add([
        rect(10, 10),
        pos(player.pos.x, player.pos.y-20),
        origin("center"),
        color(MAGENTA),
        area(),
        cleanup(),
        "bullet",
        {speed : 750}
      ])
      
      if (player.flipStatus == true) {
        bullet.speed = -750
      }

      player.canAttack = false

      wait(0.2, () => {
        player.canAttack = true
      })
    }
  }
  
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
  
}); //close multiplayer

go("multiplayer")
