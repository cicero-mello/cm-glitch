export interface StartGlitchOptions {
    direction?: GlitchDirection
    loops?: number
    animationTime?: number

    maxDistortionY?: number
    maxDistortionX?: number
    distortionIntensity?: number

    noObservers?: boolean
}

export type GlitchDirection = (
    "normal" |
    "reverse" |
    "alternate"
)
