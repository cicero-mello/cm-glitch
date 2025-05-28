import { SVG_NS } from "./index"

export const svg = (svgId: string) => {
    const svg = document.createElementNS(SVG_NS, "svg")
    svg.setAttribute("id", svgId)
    svg.setAttribute("width", "0")
    svg.setAttribute("height", "0")
    svg.setAttribute(
        "style",
        "position: absolute; " +
        "width: 0; " +
        "height: 0; " +
        "overflow: hidden; " +
        "visibility: hidden; " +
        "pointer-events: none;"
    )
    return svg
}

export const defs = () => {
    return document.createElementNS(SVG_NS, "defs")
}

export const filter = (filterId: string) => {
    const filter = document.createElementNS(SVG_NS, "filter")
    filter.setAttribute("id", filterId)
    return filter
}

export const feTurbulence = (feTurbulenceId: string) => {
    const feTurbulence = document.createElementNS(SVG_NS, "feTurbulence")
    feTurbulence.setAttribute("id", feTurbulenceId)
    feTurbulence.setAttribute("type", "fractalNoise")
    feTurbulence.setAttribute("baseFrequency", "0.00 0.00")
    feTurbulence.setAttribute("numOctaves", "1")
    feTurbulence.setAttribute("result", "glitch")
    return feTurbulence
}

export const feDisplacementMap = (feDisplacementMapId: string) => {
    const feDisplacementMap = document.createElementNS(SVG_NS, "feDisplacementMap")
    feDisplacementMap.setAttribute("id", feDisplacementMapId)
    feDisplacementMap.setAttribute("xChannelSelector", "R")
    feDisplacementMap.setAttribute("yChannelSelector", "G")
    feDisplacementMap.setAttribute("scale", "40")
    feDisplacementMap.setAttribute("in", "SourceGraphic")
    feDisplacementMap.setAttribute("in2", "glitch")
    return feDisplacementMap
}
