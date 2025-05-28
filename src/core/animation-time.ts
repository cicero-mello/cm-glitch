import { GlitchDirection } from "../types"

export const getAnimationTimes = (
    animationTime: number,
    direction: GlitchDirection
) => {
    let increaseTime: number
    let decreaseTime: number

    if (direction === "alternate") {
        increaseTime = Math.floor(animationTime / 2)
        decreaseTime = Math.floor(animationTime / 2)
    }
    else if (direction === "normal") {
        increaseTime = animationTime
        decreaseTime = 0
    }
    else {
        increaseTime = 0
        decreaseTime = animationTime
    }

    return {
        increaseTime,
        decreaseTime
    }
}
