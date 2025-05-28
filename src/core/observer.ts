import { GLOBAL_DEFS_ID, GLOBAL_SVG_ID } from "./index"

const observedElements = new Map<string, MutationObserver>()

export const observeTargetElementRemoval = (elementId: string) => {
    const element = document.getElementById(elementId)
    if (!element) return

    if (observedElements.has(elementId)) return

    const observer = new MutationObserver(() => {
        const currentElement = document.getElementById(elementId)
        if (!currentElement || !document.body.contains(currentElement)) {
            removeSVGFilterElementsFromTargetElement(elementId)
            observer.disconnect()
            observedElements.delete(elementId)
        }
    })

    observer.observe(document.body, { childList: true, subtree: true })
    observedElements.set(elementId, observer)
}

const removeSVGFilterElementsFromTargetElement = (targetElementId: string) => {
    const glitchId = "cm-glitch-" + targetElementId
    const filterId = glitchId + "-filter"
    const feTurbulenceId = glitchId + "-feT"
    const feDisplacementMapId = glitchId + "-feD"

    const filter = document.getElementById(filterId)
    const feTurbulence = document.getElementById(feTurbulenceId)
    const feDisplacementMap = document.getElementById(feDisplacementMapId)

    if (feTurbulence?.parentElement === filter) {
        filter?.removeChild(feTurbulence)
    }
    if (feDisplacementMap?.parentElement === filter) {
        filter?.removeChild(feDisplacementMap)
    }
    if (filter?.parentElement) {
        filter.parentElement.removeChild(filter)
    }

    const defs = document.getElementById(GLOBAL_DEFS_ID)
    if (defs && defs.children.length === 0) {
        const svg = document.getElementById(GLOBAL_SVG_ID)
        svg?.parentElement?.removeChild(svg)
    }
}
