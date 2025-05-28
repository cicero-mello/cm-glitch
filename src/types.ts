export interface StartGlitchOptions {
    direction?: GlitchDirection
    loops?: number
    animationTime?: number
    increaseTime?: number
    decreaseTime?: number

    maxDistortionY?: number
    maxDistortionX?: number
    distortionIntensity?: number

}

export type ChannelSelector = (
    "R" | "G" | "B" | "A"
)

export type GlitchDirection = (
    "normal" |
    "reverse" |
    "alternate"
)
