import * as create from "./create-elements"
import { applyFilterStyleInTargetElement } from "./style"

export const SVG_NS = "http://www.w3.org/2000/svg"
export const GLOBAL_SVG_ID = "cm-glitch-svg"
export const GLOBAL_DEFS_ID = "cm-glitch-defs"

export const updateDOM = (elementId: string) => {
    const glitchId = "cm-glitch-" + elementId
    const filterId = glitchId + "-filter"
    const feTurbulenceId = glitchId + "-feT"
    const feDisplacementMapId = glitchId + "-feD"

    applyFilterStyleInTargetElement(elementId)

    if (document.getElementById(filterId)) {
        const feTurbulence = document.getElementById(feTurbulenceId)!
        const feDisplacementMap = document.getElementById(feDisplacementMapId)!
        return { feTurbulence, feDisplacementMap }
    }

    let svg = document.getElementById(GLOBAL_SVG_ID) as SVGSVGElement | null
    if (!svg) {
        svg = create.svg(GLOBAL_SVG_ID)
        document.body.appendChild(svg)

        const defs = create.defs()
        defs.setAttribute("id", GLOBAL_DEFS_ID)
        svg.appendChild(defs)
    }

    const defs = document.getElementById(GLOBAL_DEFS_ID)!
    const filter = create.filter(filterId)
    const feTurbulence = create.feTurbulence(feTurbulenceId)
    const feDisplacementMap = create.feDisplacementMap(feDisplacementMapId)

    filter.appendChild(feTurbulence)
    filter.appendChild(feDisplacementMap)
    defs.appendChild(filter)

    return { feTurbulence, feDisplacementMap }
}
