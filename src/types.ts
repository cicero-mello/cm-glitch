export interface StartGlitchOptions {
    /** Animation direction: 'normal' (forward), 'reverse' (backward), or 'alternate' (forward then backward).
     *  Default: `alternate`
     */
    direction?: GlitchDirection

    /** Number of times the animation should repeat.
     *  Default: `1`
    */
    loops?: number

    /** Duration of the animation in milliseconds.
     *  Default: `300`
    */
    animationTime?: number

    /** Maximum vertical distortion value.
     *  Default: `2500`
    */
    maxDistortionY?: number

    /** Maximum horizontal distortion value.
     *  Default: `0`
    */
    maxDistortionX?: number

    /** Intensity of the distortion effect.
     *  Default: `40`
    */
    distortionIntensity?: number

    /** Disable automatic cleanup observers.
     *  Default: `false`
    */
    noObservers?: boolean
}

export type GlitchDirection = (
    "normal" |
    "reverse" |
    "alternate"
)
