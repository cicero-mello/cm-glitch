import { StartGlitchOptions } from "../types"

export const validateParams = (
    elementId: string,
    options: StartGlitchOptions
) => {
    if (typeof elementId !== "string") {
        throw new Error(`(cm-glitch) | 'elementId' must be a string.`)
    }
    if (!document.getElementById(elementId)) {
        throw new Error(`(cm-glitch) | Element with id '${elementId}' not found.`)
    }

    if (typeof options.animationTime !== "number") {
        throw new Error(`(cm-glitch) | 'animationTime' must be a number.`)
    }
    if (options.animationTime < 0) {
        throw new Error(`(cm-glitch) | 'animationTime' must be greater than or equal to 0.`)
    }

    if (typeof options.maxDistortionX !== "number") {
        throw new Error(`(cm-glitch) | 'maxDistortionX' must be a number.`)
    }
    if (options.maxDistortionX < 0) {
        throw new Error(`(cm-glitch) | 'maxDistortionX' must be greater than or equal to 0.`)
    }

    if (typeof options.maxDistortionY !== "number") {
        throw new Error(`(cm-glitch) | 'maxDistortionY' must be a number.`)
    }
    if (options.maxDistortionY < 0) {
        throw new Error(`(cm-glitch) | 'maxDistortionY' must be greater than or equal to 0.`)
    }

    if (typeof options.direction !== "string") {
        throw new Error(`(cm-glitch) | 'direction' must be a string.`)
    }
    if (!["alternate", "reverse", "normal"].includes(options.direction)) {
        throw new Error(`(cm-glitch) | 'direction' must be 'alternate', 'reverse', or 'normal'.`)
    }

    if (typeof options.loops !== "number") {
        throw new Error(`(cm-glitch) | 'loops' must be a number.`)
    }
    if (options.loops <= 0) {
        throw new Error(`(cm-glitch) | 'loops' must be greater than 0.`)
    }

    if (typeof options.noObservers !== "boolean") {
        throw new Error(`(cm-glitch) | 'noObservers' must be a boolean.`)
    }
}
