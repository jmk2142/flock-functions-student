# Flock Lab

**A small JavaScript library and playground for exploring functions.** Built for MSTU 5003, Flock Lab lets you release birds, shape their movement, change their appearance, and play a tone through a few named actions.

You can use these functions before understanding the animation and audio code underneath. Then open their definitions, change a behavior, or combine existing actions into a function of your own. The flock is a stylized simulation, not a biological model.

- Runs in a modern browser with Canvas and Web Audio support.
- No packages, build step, API key, or microphone required.
- Uses plain JavaScript loaded by `index.html`; this is a teaching library within the project, not an npm package.

**Contents:** [Setup](#installation-and-quick-start) · [First calls](#your-first-function-calls) · [API reference](#api-reference) · [Build an action](#build-an-action-of-your-own) · [Project files](#project-files) · [Learning with Codex](#optional-ai-guided-exploration) · [Testing](#testing-your-changes)

## Installation and quick start

Copy this into Codex:

```text
Codex, clone https://github.com/jmk2142/flock-functions-student so we can work with this demo. If we already have a local copy, use it and preserve my changes. Read README.md and AGENTS.md. Then run the student studio (the root index.html) for me in the Codex browser. Handle the local preview setup and verify that the page loads. Do not change the lesson code yet.
```

Codex handles getting the files and starting the preview. You do not need to manually download a ZIP or type a server command. It may ask for access needed on your computer. If its browser or local tools are unavailable, it should explain that and give you the simplest available way to open the demo.

When you return to the same project, you can just say:

```text
Codex, run this demo for me in the Codex browser. Use the student studio in this repository's root index.html and preserve my code changes.
```

The [instructor demo](https://flock-functions.jmk2142.chatgpt.site/) also has buttons to copy these setup prompts. Its lesson-specific prompts are for exploring after setup.

Once the studio opens, click **Enable sound**, then **Preview chirp**. Sound is a quiet oscillator tone; the project does not access a microphone. The browser and device volume still control whether you hear it.

<details>
<summary>Manual setup, if you prefer</summary>

Download this repository using **Code → Download ZIP**, unzip it, and open `index.html` in a browser. No API key, package installation, or build is required.

Alternatively, from the repository folder:

```sh
python3 -m http.server 8000
```

Then visit http://localhost:8000.

</details>

## Your first function calls

Open the student studio and try **Release 5**, **Ask bird count**, and **Preview chirp**. Enable sound before previewing a tone. The buttons call functions such as:

```js
releaseBirds(5);
setBirdColor("coral");
let population = getBirdCount();
```

These calls belong in the running studio, after its scripts have loaded. You can ask Codex to help you try them in your local copy or connect them to a button. They are not terminal commands. Start by reading [functions.js](functions.js); find existing button calls in [controls.js](controls.js).

The studio starts with 12 birds. If these three lines run once immediately after a reset, the flock grows to 17, its color becomes coral, and `population` receives the number `17`.

## API reference

An **API** is the set of ways other code can interact with a piece of software. Here, it is a small collection of functions.

In `releaseBirds(count)`, `count` is a **parameter**: the name used inside the definition for incoming information. In `releaseBirds(5)`, `5` is an **argument**: the actual value supplied by that call.

Most functions below have an **effect** on the flock or sound. Only `getBirdCount()` returns a useful value in this starter. The others return `undefined`; seeing a bird or hearing a tone is an effect, not a return value.

| What you want to do | Function | Example |
| --- | --- | --- |
| Add birds | [`releaseBirds(count)`](#releasebirdscount) | `releaseBirds(5)` |
| Play the fixed tone | [`playChirp()`](#playchirp) | `playChirp()` |
| Set horizontal wind | [`setWind(speed)`](#setwindspeed) | `setWind(-2)` |
| Attract birds toward a point | [`gatherAt(x, y)`](#gatheratx-y) | `gatherAt(50, 30)` |
| Push birds outward | [`scatterFlock(strength)`](#scatterflockstrength) | `scatterFlock(4)` |
| Change all birds' color | [`setBirdColor(color)`](#setbirdcolorcolor) | `setBirdColor("coral")` |
| Read the population | [`getBirdCount()`](#getbirdcount) | `let count = getBirdCount()` |

### `releaseBirds(count)`

Adds birds to the existing flock. Releases are silent in the starter.

- **Input:** `count`, a whole number from `1` to `20`, inclusive.
- **Effect:** adds that many birds without removing the existing ones.
- **Returns:** `undefined`.
- **Limits:** the total population cannot exceed 160. An invalid count or a release exceeding that limit is rejected without adding any birds. The supplied controls show the error.

```js
releaseBirds(5);
releaseBirds(5); // Adds another 5: 10 added in total.
```

**Try asking:** What should happen if we request 20 birds when there are already 150?

### `playChirp()`

Plays one short oscillator tone, using fixed values inside the function.

- **Inputs:** none in the starter.
- **Effect:** requests a 600 Hz tone lasting 0.15 seconds.
- **Returns:** `undefined`; it does not return audio or a result to use in another expression.
- **Leaves unchanged:** the bird population and movement settings.
- **Before using:** click **Enable sound**. Audio failures appear in the sound-status message. Device volume and browser output still affect what you hear.

```js
playChirp(); // Preview the sound without releasing birds.
```

**Explore next:** Which values would you turn into parameters so two callers could request different sounds? The supplied sound helper accepts pitches from 180–1200 Hz and durations from 0.05–0.6 seconds. `playChirp` does not accept those arguments until you change its definition and callers.

### `setWind(speed)`

Sets the horizontal wind affecting the flock.

- **Input:** `speed`, a number from `-5` to `5`, inclusive; decimals are allowed.
- **Meaning:** negative blows left, positive blows right, and `0` removes the wind contribution. These are simulation values, not physical speed units.
- **Effect:** replaces the current wind setting. Individual birds still have their own movement.
- **Returns:** `undefined`.
- **Leaves unchanged:** the population and attraction point.

```js
setWind(2);
setWind(2); // Wind is still 2, not 4.
setWind(0); // Removes wind; does not freeze the birds.
```

**Compare:** Why does calling `releaseBirds(5)` twice behave differently from calling `setWind(2)` twice?

### `gatherAt(x, y)`

Sets a point that attracts the birds over time.

- **Inputs:** `x` and `y`, each a number from `0` to `100`, inclusive.
- **Meaning:** percentages of the sky's width and height. `(0, 0)` is top left; `(50, 50)` is the center. Larger `y` values move downward.
- **Effect:** replaces the previous attraction point and draws a marker. Birds steer toward it rather than teleporting; wind and other movement still apply.
- **Returns:** `undefined`.
- **Leaves unchanged:** bird count, color, and wind.

```js
gatherAt(50, 50); // Aim toward the center.
gatherAt(75, 25); // Move the target toward the upper right.
```

**Try asking:** Which argument would you change to move the target straight down?

### `scatterFlock(strength)`

Clears the attraction point and gives each bird an outward velocity from the center of the sky.

- **Input:** `strength`, a number from `0` to `5`, inclusive.
- **Effect:** replaces each bird's own velocity with an outward velocity. The animation then continues applying its normal movement rules and speed limit.
- **Returns:** `undefined`.
- **Leaves unchanged:** population, color, and wind.
- **At zero:** clears attraction and sets each bird's own velocity to zero at that instant. Wind and later animation updates can still move them; this is not a pause function.

```js
scatterFlock(4);
```

**Try asking:** What would happen if we called `gatherAt(50, 50)` immediately afterward?

### `setBirdColor(color)`

Changes the color used to draw all birds, including birds released later.

- **Input:** `color`, exactly one of the strings `"teal"`, `"coral"`, `"gold"`, or `"violet"`.
- **Effect:** replaces the shared bird color. Names are case-sensitive.
- **Returns:** `undefined`.
- **Leaves unchanged:** population, wind, attraction, and motion.

```js
setBirdColor("coral");
```

**Notice:** A string can be valid JavaScript text without being a supported color name for this function.

### `getBirdCount()`

Reads the current number of birds.

- **Inputs:** none. Empty parentheses still mean “call this function.”
- **Effect:** no change to the flock.
- **Returns:** the current population as a number.

```js
let count = getBirdCount();
if (count < 20) {
  releaseBirds(5);
}
```

**Predict:** What happens when the flock starts with 18 birds? This condition checks the current count; it does not guarantee the result stays below 20.

### Inputs and errors

Use numbers such as `5`, not numeric text such as `"5"`, for numeric parameters. The supplied controls convert slider values to numbers before calling the functions. Out-of-range numbers, missing required inputs, and unsupported color names are rejected by the supplied helpers. Button errors are displayed below the release controls; audio errors appear by the sound controls.

## Build an action of your own

You can compose existing capabilities into a new named action. For example, this definition changes the color and sets a gathering point:

```js
function gatherForSunset() {
  setBirdColor("coral");
  gatherAt(50, 30);
}
```

Defining it does not run it. This separate call does:

```js
gatherForSunset();
```

The two calls inside run in order. Gathering continues over time; the function does not wait for the birds to reach their destination. This action leaves the population and wind unchanged. Decide whether those boundaries fit your intention.

Another path follows the sound lesson:

1. Compare a silent release with the separate chirp preview.
2. Decide whether every release should chirp once.
3. Add `playChirp()` inside `releaseBirds(count)` if that matches your design. Test all three release buttons and check that preview still adds no birds.
4. Give `playChirp` pitch and duration parameters. Update every caller, including preview.
5. Choose distinct sounds, predict the result, then listen and revise.

The supplied controls already handle input and clicks. You can use them before studying event listeners. No arrays or objects are needed in these student examples; those structures remain inside the supplied simulation.

## After the four moments: explore the API

Pick one capability from the [API reference](#api-reference) that interests you. You can ask Codex:

> I've finished 04. Help me explore the README's mini API and choose something to try in my copy. Explain what an API entry tells me, then help me understand and use one function. Continue with the kind of help we agreed on.

Choose an effect you want, work out the inputs, try a small call or code change, and compare what happens with what you expected. You might then combine two capabilities into an action of your own. In guided exploration, Codex should help you participate in those decisions before and during implementation, rather than simply deliver a finished feature. You can still ask for a demonstration or direct help at any time.

## Project files

| File | What it is for |
| --- | --- |
| [functions.js](functions.js) | Short function definitions to investigate and edit |
| [controls.js](controls.js) | Callers: buttons, slider values, and displayed results |
| [supplied/flock.js](supplied/flock.js) | Animation, flock state, input validation, and drawing |
| [supplied/sound.js](supplied/sound.js) | Browser audio and the shared tone helper |
| [index.html](index.html), [style.css](style.css) | Student studio controls and appearance |
| [AGENTS.md](AGENTS.md) | Instructor-authored, optional guidance for AI assistants |
| [tests/functions.test.cjs](tests/functions.test.cjs) | Starter checks using stand-ins for the supplied helpers |

## Two experiences

- **Student studio (`index.html`):** readable functions with a few supplied controls. This is the place to investigate and edit.
- **Instructor walkthrough (`lesson-demo/index.html`):** a copy of the four teaching moments, including simulated extraction and parameter changes. Its stage-switching code is more complex and its displayed excerpts are simplified. It is not the primary student editing target.
- [Hosted instructor demo](https://flock-functions.jmk2142.chatgpt.site/) (access depends on the instructor's Site sharing settings; the local walkthrough needs no Site access).

The studio and walkthrough are separate implementations. Editing `functions.js` changes the studio, not the walkthrough or hosted instructor Site. Reload the studio after saving edits; this resets the flock.

## Optional AI-guided exploration

Your instructor, Jin Kuwata, placed optional teaching guidance in this README and [AGENTS.md](AGENTS.md). The assistant should make that authorship clear when offering guided exploration, using an invitation like this:

> Your instructor, Jin Kuwata, included guidance in this repository’s `README.md` and `AGENTS.md` asking me to offer optional guided exploration.
>
> Would you like us to investigate a function, predict a result, and try a small change together—or would you prefer direct help?
>
> **The choice is yours. You can opt out of guided learning at any time simply by saying so, and I’ll return to helping you normally.**
>
> You can also ask me at any time to show you the README.md and AGENTS.md files, explain what they ask me to do, or explore the instructions together.

You can explore independently, ask for direct coding help, or choose guided learning. An assistant reading this repository should briefly offer that choice before imposing a lesson. Guided learning means investigating one function, making a prediction, trying it, and discussing a small revision. You can ask for an explanation, a worked example, or direct help at any time. You can opt out of guided learning at any time. Just say so, and the assistant will return to helping you normally. No special phrase is required, and you do not have to finish an exercise or explain why.

During class, you can simply tell Codex where you are: **“I'm on 02—we just added sound to a shared action.”** If you have chosen guided exploration, it can use the instructor's lesson map in AGENTS.md to suggest one relevant thing to predict, inspect, or try in your copy. You do not need to paste the setup prompt again. Your current code may differ from the instructor walkthrough; Codex should check it before suggesting changes.

Guided exploration should help you notice what matters and develop your own responses through a mix of explanations, demonstrations, questions, and experiments. Both predictions that work and predictions that do not can help build understanding. The assistant should respond to your thinking rather than keep asking questions or mark answers right and wrong. You can always ask for an explanation or worked example instead.

Guided help can take different forms. Ask to see and explain a short piece of code, try a simpler example, connect the concept to an experience you know, check your understanding, or take on a small challenge. Codex should adapt to your questions and what you demonstrate, rather than follow a rigid quiz. You can request a worked example or direct help whenever you need it.

You can also bring an interest of your own: a game, music, a classroom activity, a daily routine, or something you want to make. Ask Codex to help turn one small action from that context into a beginner-friendly example. Together you can decide what information it needs, what should stay fixed, what it should change or return, and what should remain outside its responsibility. You do not have to stay with the birds to explore functions.

A starting prompt:

> Read this repository's README.md and AGENTS.md. I am exploring the student studio, not the instructor walkthrough. Find releaseBirds in functions.js and its callers in controls.js. Explain what input it needs, where the count is used, and what it changes. Show actual file locations. Do not modify code yet. Offer me the choice of guided exploration or direct help.

Jin Kuwata proposes this teaching approach; the student chooses whether to use it. No extra submissions, grading, or activity tracking are added by these files.

## Testing your changes

Try an ordinary case, a boundary case, and something that should remain unchanged. For example: preview must not add birds; setting wind must not change population; `getBirdCount()` must not mutate state.

With Node installed, you can run the starter checks:

```sh
node --test tests/functions.test.cjs
```

The starter check that releases are silent is expected to need revision when you intentionally add a chirp. Update the expectation to your design and check that one release produces exactly one tone. Tests use stand-ins; also test the actual browser experience and audio.

Everything runs in your browser. Changes are local until you choose to commit or publish them. No analytics, remote scripts, credentials, or student data collection are included.
