export const applyFilterStyleInTargetElement = (
    elementId: string
) => {
    const glitchId = "cm-glitch-" + elementId
    const filterId = glitchId + "-filter"

    const element = document.getElementById(elementId)!
    const glitchFilter = `url("#${filterId}")`

    const currentFilter = getComputedStyle(element).filter
    const filterWithoutGlitch = currentFilter
        .replace(new RegExp(`url\\("#${filterId}"\\)`, 'g'), '')
        .trim()

    const newFilter = (
        (filterWithoutGlitch && filterWithoutGlitch !== 'none') ?
            `${glitchFilter} ${filterWithoutGlitch}` :
            glitchFilter
    )

    element.style.filter = newFilter
}

export const removeFilterStyleFromTargetElement = (
    elementId: string
) => {
    const glitchId = "cm-glitch-" + elementId
    const filterId = glitchId + "-filter"

    const element = document.getElementById(elementId)
    if (!element) return

    const currentFilter = element.style.filter || getComputedStyle(element).filter || ''
    const updatedFilter = currentFilter
        .replace(new RegExp(`\\s*url\\("#${filterId}"\\)\\s*`, 'g'), ' ')
        .trim()

    if (!updatedFilter || updatedFilter === 'none') {
        element.style.removeProperty('filter')
    } else {
        element.style.filter = updatedFilter
    }
}
