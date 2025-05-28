import { observeTargetElementRemoval, removeSVGFilterElementsFromTargetElement } from "./core/observer"
import { removeFilterStyleFromTargetElement } from "./core/style"
import { getAnimationTimes } from "./core/animation-time"
import { validateParams } from "./core/validators"
import { StartGlitchOptions } from "./types"
import { updateDOM } from "./core/index"

export const startGlitch = (elementId: string, {
    animationTime = 300,
    maxDistortionX = 0,
    maxDistortionY = 2500,
    direction = "alternate",
    distortionIntensity = 40,
    loops = 1,
    noObservers = false
}: StartGlitchOptions = {}): Promise<void> => {

    if (animationTime == 0) return new Promise((resolve) => {
        resolve()
    })

    validateParams(elementId, {
        animationTime,
        maxDistortionX,
        maxDistortionY,
        direction,
        distortionIntensity,
        loops,
        noObservers
    })

    const { feTurbulence, feDisplacementMap } = updateDOM(elementId)
    if (!noObservers) observeTargetElementRemoval(elementId)

    const {
        increaseTime,
        decreaseTime
    } = getAnimationTimes(animationTime, direction)

    let timeIncreaseStarts: number | null = null
    let timeDecreaseStarts: number | null = null

    let animationFrameId: number
    let currentLoop: number = 0

    const increaseBaseFrequency = (timestamp: number) => {
        if (!timeIncreaseStarts) {
            timeIncreaseStarts = timestamp
        }

        const timeSinceStart = timestamp - timeIncreaseStarts
        const progress = Math.min(timeSinceStart / increaseTime, 1)

        const currentBaseFrequencyY = maxDistortionY * progress
        const currentBaseFrequencyX = maxDistortionX * progress

        feTurbulence.setAttribute(
            'baseFrequency',
            `${currentBaseFrequencyX / 1000} ${currentBaseFrequencyY / 1000}`
        )

        if (progress < 1) {
            animationFrameId = requestAnimationFrame(increaseBaseFrequency)
            return
        }

        if (direction === "normal") {
            currentLoop += 1
            if (currentLoop >= loops) {
                currentLoop = 0
                return
            }

            timeIncreaseStarts = null
            animationFrameId = requestAnimationFrame(increaseBaseFrequency)
        }

        if (direction === "alternate") {
            timeDecreaseStarts = null
            animationFrameId = requestAnimationFrame(decreaseBaseFrequency)
        }
    }

    const decreaseBaseFrequency = (timestamp: number) => {
        if (!timeDecreaseStarts) {
            timeDecreaseStarts = timestamp
        }

        const timeSinceStart = timestamp - timeDecreaseStarts
        const progress = Math.min(timeSinceStart / decreaseTime, 1)

        const currentBaseFrequencyY = maxDistortionY * (1 - progress)
        const currentBaseFrequencyX = maxDistortionX * (1 - progress)


        const usedBasedFrequencyX = (currentBaseFrequencyX / 1000).toFixed(4)
        const usedBasedFrequencyY = (currentBaseFrequencyY / 1000).toFixed(4)

        feTurbulence.setAttribute(
            'baseFrequency',
            `${usedBasedFrequencyX} ${usedBasedFrequencyY}`
        )

        if (progress < 1) {
            animationFrameId = requestAnimationFrame(decreaseBaseFrequency)
            return
        }

        if (direction === "reverse") {
            currentLoop += 1
            if (currentLoop >= loops) {
                currentLoop = 0
                return
            }

            timeDecreaseStarts = null
            animationFrameId = requestAnimationFrame(decreaseBaseFrequency)
        }

        if (direction === "alternate") {
            currentLoop += 1
            if (currentLoop >= loops) {
                currentLoop = 0
                return
            }
            timeIncreaseStarts = null
            animationFrameId = requestAnimationFrame(increaseBaseFrequency)
        }
    }

    const start = () => {
        cancelAnimationFrame(animationFrameId)
        timeDecreaseStarts = null
        timeIncreaseStarts = null

        feDisplacementMap.setAttribute("scale", distortionIntensity + "")

        if (direction === "reverse") {
            animationFrameId = requestAnimationFrame(decreaseBaseFrequency)
            return
        }

        animationFrameId = requestAnimationFrame(increaseBaseFrequency)
    }

    start()

    return new Promise((resolve) => {
        setTimeout(() => resolve(), animationTime)
    })
}

export const removeGlitch = (
    elementId: string
) => {
    removeFilterStyleFromTargetElement(elementId)
    removeSVGFilterElementsFromTargetElement(elementId)
}
