namespace SpriteKind {
    export const Instruction = SpriteKind.create()
}
function update_scores (divisor: number) {
    time_spent += Math.round(end_time - start_time)
    score_this_session = Math.round(1000 - Math.min((end_time - start_time) / divisor, 1000))
    score += score_this_session
}
function destroy_instructions () {
    for (let sprite of sprites.allOfKind(SpriteKind.Instruction)) {
        sprite.destroy()
    }
}
function fade_out (time: number, block: boolean) {
    color.startFade(color.Black, color.originalPalette, time)
    if (block) {
        color.pauseUntilFadeDone()
    }
}
function fade_in (time: number, block: boolean) {
    color.startFade(color.originalPalette, color.Black, time)
    if (block) {
        color.pauseUntilFadeDone()
    }
}
function show_score () {
    game.showLongText("Task completed!\\n" + " \\nTime: " + spriteutils.roundWithPrecision(time_spent / 1000, 2) + "s\\nScore: " + score_this_session + "\\nTotal: " + score + "\\n \\nPress A to continue", DialogLayout.Center)
}
function butter_pan () {
    scene.setBackgroundImage(assets.image`counter_top`)
    make_instruction("Butter the pan", scene.screenWidth() / 2, 5)
    make_instruction("Use arrow keys to move", scene.screenWidth() / 2, 13)
    make_instruction("the butter", scene.screenWidth() / 2, 21)
    sprite_pan = sprites.create(assets.image`pan_top_down`, SpriteKind.Player)
    sprite_pan.setPosition(scene.screenWidth() / 2, scene.screenHeight() / 2)
    sprite_butter = sprites.create(assets.image`butter_top_down`, SpriteKind.Player)
    controller.moveSprite(sprite_butter, 50, 50)
    sprite_butter.setPosition(scene.screenWidth() / 2, scene.screenHeight() / 2)
    fade_out(2000, true)
    start_time = game.runtime()
    pause(500)
    while (!(sprite_pan.image.equals(assets.image`pan_top_down_buttered`))) {
        if (sprite_pan.overlapsWith(sprite_butter)) {
            spriteutils.drawTransparentImage(assets.image`buttered_pan_part`, sprite_pan.image, sprite_butter.left - sprite_pan.left, sprite_butter.top - sprite_pan.top)
            sprite_pan.image.drawRect(0, 0, 24, 24, 12)
            sprite_pan.image.drawRect(1, 1, 22, 22, 12)
        }
        pause(100)
    }
    controller.moveSprite(sprite_butter, 0, 0)
    pause(500)
    scene.setBackgroundImage(assets.image`counter_top`)
    end_time = game.runtime()
    update_scores(100)
    pause(500)
    show_score()
    pause(500)
    fade_in(2000, true)
    destroy_instructions()
    sprite_pan.destroy()
}
function make_instruction (instructions: string, x: number, top: number) {
    sprite_instructions = textsprite.create(instructions, 0, 15)
    sprite_instructions.x = x
    sprite_instructions.top = top
    sprite_instructions.setKind(SpriteKind.Instruction)
}
function sift_flour () {
    scene.setBackgroundImage(assets.image`counter_top`)
    make_instruction("Sift the flour", scene.screenWidth() / 2, 5)
    make_instruction("Use left/right to sift", scene.screenWidth() / 2, 13)
    make_instruction("the flour", scene.screenWidth() / 2, 21)
    sprite_sifter = sprites.create(assets.image`sifter`, SpriteKind.Player)
    sprite_sifter.y = 40
    sprite_sifter.x = scene.screenWidth() / 2 - 5
    sprite_bowl = sprites.create(img`
        ..........................
        ffffffffffffffffffffffffff
        f777777777777777777777777f
        f777777777777777777777777f
        f777777777777777777777777f
        f777777777777777777777777f
        f777777777777777777777777f
        .f7777777777777777777777f.
        .f7777777777777777777777f.
        ..f77777777777777777777f..
        ..f77777777777777777777f..
        ...f777777777777777777f...
        ....f7777777777777777f....
        .....ff777777777777ff.....
        .......ff77777777ff.......
        .........ffffffff.........
        `, SpriteKind.Player)
    sprite_bowl.x = scene.screenWidth() / 2
    sprite_bowl.bottom = 88
    sifted_percent = 0
    left = true
    fade_out(2000, true)
    start_time = game.runtime()
    pause(500)
    while (!(sifted_percent >= 100)) {
        if (controller.right.isPressed() && left) {
            left = false
            sifted_percent += 5
            for (let index = 0; index < 3; index++) {
                sprite_sifter.startEffect(effects.spray, 100)
            }
        } else if (controller.left.isPressed() && !(left)) {
            left = true
            sifted_percent += 5
            for (let index = 0; index < 3; index++) {
                sprite_sifter.startEffect(effects.spray, 100)
            }
        }
        if (left) {
            sprite_sifter.x = scene.screenWidth() / 2 - 5
        } else {
            sprite_sifter.x = scene.screenWidth() / 2 + 5
        }
        pause(100)
    }
    pause(500)
    scene.setBackgroundImage(assets.image`counter_top`)
    end_time = game.runtime()
    update_scores(10)
    pause(500)
    show_score()
    pause(500)
    fade_in(2000, true)
    destroy_instructions()
    sprite_sifter.destroy()
    sprite_bowl.destroy()
}
function center_rack () {
    scene.setBackgroundImage(assets.image`oven_open_lit`)
    make_instruction("Center the rack", scene.screenWidth() / 2, 5)
    make_instruction("Use up/down to raise/lower", scene.screenWidth() / 2, 13)
    make_instruction("the rack", scene.screenWidth() / 2, 21)
    sprite_temp = textsprite.create("400F", 4, 15)
    sprite_temp.x = scene.screenWidth() / 2
    sprite_temp.top = 36
    sprite_rack = sprites.create(assets.image`rack`, SpriteKind.Player)
    sprite_rack.left = 34
    fade_out(2000, true)
    start_time = game.runtime()
    pause(500)
    while (sprite_rack.y <= 80 && 75 >= sprite_rack.y) {
        if (controller.up.isPressed() && sprite_rack.y > 48) {
            sprite_rack.y += -1
        }
        if (controller.down.isPressed() && sprite_rack.y < 108) {
            sprite_rack.y += 1
        }
        pause(100)
    }
    pause(1000)
    sprite_rack.destroy()
    scene.setBackgroundImage(assets.image`oven_lit`)
    end_time = game.runtime()
    update_scores(10)
    pause(500)
    show_score()
    pause(500)
    fade_in(2000, true)
    destroy_instructions()
    sprite_temp.destroy()
}
function preheat_oven () {
    scene.setBackgroundImage(assets.image`oven_unlit`)
    make_instruction("Preheat the oven to 400F", scene.screenWidth() / 2, 5)
    make_instruction("Use up/down to raise/lower", scene.screenWidth() / 2, 13)
    make_instruction("temperature", scene.screenWidth() / 2, 21)
    temperature = 250
    sprite_temp = textsprite.create("Init", 4, 15)
    sprite_temp.x = scene.screenWidth() / 2
    sprite_temp.top = 36
    fade_out(2000, true)
    start_time = game.runtime()
    pause(500)
    while (temperature != 400) {
        sprite_temp.setText("" + temperature + "F")
        if (controller.up.isPressed()) {
            if (temperature < 500) {
                temperature += 10
            }
        }
        if (controller.down.isPressed()) {
            if (temperature > 200) {
                temperature += -10
            }
        }
        pause(100)
    }
    sprite_temp.setText("" + temperature + "F")
    pause(500)
    scene.setBackgroundImage(assets.image`oven_lit`)
    end_time = game.runtime()
    update_scores(10)
    pause(500)
    show_score()
    pause(500)
    fade_in(2000, true)
    destroy_instructions()
    sprite_temp.destroy()
}
let temperature = 0
let sprite_rack: Sprite = null
let sprite_temp: TextSprite = null
let left = false
let sifted_percent = 0
let sprite_bowl: Sprite = null
let sprite_sifter: Sprite = null
let sprite_instructions: TextSprite = null
let sprite_butter: Sprite = null
let sprite_pan: Sprite = null
let score_this_session = 0
let start_time = 0
let end_time = 0
let score = 0
let time_spent = 0
time_spent = 0
score = 0
preheat_oven()
center_rack()
sift_flour()
butter_pan()
