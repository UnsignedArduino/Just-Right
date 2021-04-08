namespace SpriteKind {
    export const Instruction = SpriteKind.create()
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
function make_instruction (instructions: string, x: number, top: number) {
    sprite_instructions = textsprite.create(instructions, 0, 15)
    sprite_instructions.x = x
    sprite_instructions.top = top
    sprite_instructions.setKind(SpriteKind.Instruction)
}
function center_rack () {
    // 48 --> 108
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
    time_spent += Math.round(end_time - start_time)
    score_this_session = Math.round(1000 - Math.min((end_time - start_time) / 10, 1000))
    score += score_this_session
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
    time_spent += Math.round(end_time - start_time)
    score_this_session = Math.round(1000 - Math.min((end_time - start_time) / 10, 1000))
    score += score_this_session
    pause(500)
    show_score()
    pause(500)
    fade_in(2000, true)
    destroy_instructions()
    sprite_temp.destroy()
}
let temperature = 0
let end_time = 0
let start_time = 0
let sprite_rack: Sprite = null
let sprite_temp: TextSprite = null
let sprite_instructions: TextSprite = null
let score_this_session = 0
let score = 0
let time_spent = 0
time_spent = 0
score = 0
preheat_oven()
center_rack()
