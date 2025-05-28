const SVG_NS = "http://www.w3.org/2000/svg"
const GLOBAL_SVG_ID = "cm-glitch-svg"
const GLOBAL_DEFS_ID = "cm-glitch-defs"

export const updateDOM = (elementId: string) => {
    const glitchId = "cm-glitch-" + elementId
    const filterId = glitchId + "-filter"
    const feTurbulenceId = glitchId + "-feT"
    const feDisplacementMapId = glitchId + "-feD"

    applyFilterInTargetElement(elementId, filterId)

    if (document.getElementById(filterId)) {
        const feTurbulence = document.getElementById(feTurbulenceId)!
        const feDisplacementMap = document.getElementById(feDisplacementMapId)!
        return { feTurbulence, feDisplacementMap }
    }

    let svg = document.getElementById(GLOBAL_SVG_ID) as SVGSVGElement | null
    if (!svg) {
        svg = createSVG(GLOBAL_SVG_ID)
        document.body.appendChild(svg)

        const defs = createDefs()
        defs.setAttribute("id", GLOBAL_DEFS_ID)
        svg.appendChild(defs)
    }

    const defs = document.getElementById(GLOBAL_DEFS_ID)!
    const filter = createFilter(filterId)
    const feTurbulence = createFeTurbulence(feTurbulenceId)
    const feDisplacementMap = createFeDisplacementMap(feDisplacementMapId)

    filter.appendChild(feTurbulence)
    filter.appendChild(feDisplacementMap)
    defs.appendChild(filter)

    return { feTurbulence, feDisplacementMap }
}

const createSVG = (svgId: string) => {
    const svg = document.createElementNS(SVG_NS, "svg")
    svg.setAttribute("id", svgId)
    svg.setAttribute("width", "0")
    svg.setAttribute("height", "0")
    svg.setAttribute(
        "style",
        "position: absolute; width: 0; height: 0; overflow: hidden; visibility: hidden; pointer-events: none;"
    )
    return svg
}

const createDefs = () => {
    return document.createElementNS(SVG_NS, "defs")
}

const createFilter = (filterId: string) => {
    const filter = document.createElementNS(SVG_NS, "filter")
    filter.setAttribute("id", filterId)
    return filter
}

const createFeTurbulence = (feTurbulenceId: string) => {
    const feTurbulence = document.createElementNS(SVG_NS, "feTurbulence")
    feTurbulence.setAttribute("id", feTurbulenceId)
    feTurbulence.setAttribute("type", "fractalNoise")
    feTurbulence.setAttribute("baseFrequency", "0.00 0.00")
    feTurbulence.setAttribute("numOctaves", "1")
    feTurbulence.setAttribute("result", "glitch")
    return feTurbulence
}

const createFeDisplacementMap = (feDisplacementMapId: string) => {
    const feDisplacementMap = document.createElementNS(SVG_NS, "feDisplacementMap")
    feDisplacementMap.setAttribute("id", feDisplacementMapId)
    feDisplacementMap.setAttribute("xChannelSelector", "R")
    feDisplacementMap.setAttribute("yChannelSelector", "G")
    feDisplacementMap.setAttribute("scale", "40")
    feDisplacementMap.setAttribute("in", "SourceGraphic")
    feDisplacementMap.setAttribute("in2", "glitch")
    return feDisplacementMap
}

export const applyFilterInTargetElement = (elementId: string, filterId: string) => {
    const element = document.getElementById(elementId)!
    const glitchFilter = `url("#${filterId}")`

    const currentFilter = getComputedStyle(element).filter
    const cleanedFilter = currentFilter
        .replace(new RegExp(`url\\("#${filterId}"\\)`, 'g'), '')
        .trim()

    const newFilter =
        cleanedFilter && cleanedFilter !== 'none'
            ? `${glitchFilter} ${cleanedFilter}`
            : glitchFilter

    element.style.filter = newFilter
}
