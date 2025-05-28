export const applyFilterStyleInTargetElement = (
    elementId: string, filterId: string
) => {
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
