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
function make_instruction (instructions: string, x: number, top: number) {
    sprite_instructions = textsprite.create(instructions, 0, 15)
    sprite_instructions.x = x
    sprite_instructions.top = top
    sprite_instructions.setKind(SpriteKind.Instruction)
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
    timer.after(500, function () {
        scene.setBackgroundImage(assets.image`oven_lit`)
    })
    end_time = game.runtime()
    time_spent = end_time - start_time
    fade_in(2000, true)
    destroy_instructions()
}
let end_time = 0
let start_time = 0
let sprite_temp: TextSprite = null
let temperature = 0
let sprite_instructions: TextSprite = null
let time_spent = 0
if (false) {
    color.setPalette(
    color.Black
    )
}
time_spent = 0
preheat_oven()
