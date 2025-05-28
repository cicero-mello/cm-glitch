# cm-glitch
[![npm](https://img.shields.io/npm/v/cm-glitch)](https://www.npmjs.com/package/cm-glitch)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/cm-glitch)](https://bundlephobia.com/package/cm-glitch)

<img alt="demo" src="https://raw.githubusercontent.com/cicero-mello/cm-glitch/refs/heads/main/demo.gif" style="max-height: 240px;"/>

Create distortion animations based on SVG filters.
*Lightweight and easy to use.*

---
---

## **Function: `startGlitch`**
`startGlitch` creates a distortion animation in the target element and returns a promise that resolves when the animation is complete.

To specify the target element, use its ID.

### General Usage Example:
```typescript
import { startGlitch } from "cm-glitch"

startGlitch("elementId")
```

### More Customized Example (with React):
```typescript
import OsakaMiB from "../../assets/osaka-mib.png"
import { startGlitch } from "cm-glitch"
import './home.css'

export function Home() {

    const handleClick1 = () => {
        startGlitch("button-1")
    }

    const handleClick2 = async () => {
        await startGlitch("image", {
            animationTime: 800,
        })

        startGlitch("image", {
            animationTime: 200,
            direction: "reverse",
            loops: 3,
            maxDistortionY: 0,
            maxDistortionX: 900,
            distortionIntensity: 20
        })
    }

    return (
        <main>
            <button id="button-1" onClick={handleClick1}>
                ClIcK M3
            </button>
            <button onClick={handleClick2}>
                <img src={OsakaMiB} id="image" />
            </button>
        </main>
    )
}
```

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `animationTime` | number | 300 | Duration of the animation in milliseconds |
| `maxDistortionX` | number | 0 | Maximum horizontal distortion |
| `maxDistortionY` | number | 2500 | Maximum vertical distortion |
| `direction` | 'normal' \| 'reverse' \| 'alternate' | 'alternate' | Animation direction |
| `distortionIntensity` | number | 40 | Intensity of the distortion effect |
| `loops` | number | 1 | Number of times the animation should repeat |
| `noObservers` | boolean | false | Disable automatic cleanup observers |

---
---

## **Function: `removeGlitch`**
`removeGlitch` is a manual way to clean up the DOM, removing the created SVG filters as well as any styles added to the target element.

**In most cases, you won't need to use this**, since the cleanup is automatically handled using observers when target element is removed from the DOM.

However, if your app makes very frequent DOM updates (for example), and adding multiple observers causes performance overhead, you can pass the `noObservers: true` option to `startGlitch`, and then call `removeGlitch` manually when needed.

### Example:
```typescript
import { startGlitch, removeGlitch } from "cm-glitch"

const glitchTrigger = async () => {
    await startGlitch("elementId", { noObservers: true })

    // Cleanup Right After Animation Ends
    removeGlitch("elementId")
}
```

## Notes
 - The effect is created using SVG filters (*feTurbulence* and *feDisplacementMap*).
 - The animation is synchronized with the screen's refresh rate.
- You can apply this effect to images, text, inputs... almost any visible element.
