# Flock Lab: student studio

A small, dependency-free JavaScript project for MSTU 5003. Explore how functions let you use, investigate, change, and share behavior. The flock is a stylized visual simulation, not a biological model.

## Start with Codex

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

## Two experiences

- **Student studio (`index.html`):** readable functions with a few supplied controls. This is the place to investigate and edit.
- **Instructor walkthrough (`lesson-demo/index.html`):** a copy of the four teaching moments, including simulated extraction and parameter changes. Its stage-switching code is more complex and its displayed excerpts are simplified. It is not the primary student editing target.
- [Hosted instructor demo](https://flock-functions.jmk2142.chatgpt.site/) (access depends on the instructor's Site sharing settings; the local walkthrough needs no Site access).

The studio and walkthrough are separate implementations. Editing `functions.js` changes the studio, not the walkthrough or hosted instructor Site. Reload the studio after saving edits; this resets the flock.

## Start with one question

What do you want the flock to do? Pick one function, locate its definition and callers, predict a result, and try it.

| Function | Inputs | Effect or return |
| --- | --- | --- |
| `releaseBirds(count)` | Whole number, 1–20 | Adds birds; rejects releases exceeding the 160-bird total limit |
| `playChirp()` | None initially | Plays the fixed tone; does not add birds |
| `setWind(speed)` | Number, −5 to 5 | Sets horizontal wind; negative means left |
| `gatherAt(x, y)` | Two numbers, 0–100 | Sets attraction coordinates as percentages; top left is (0, 0) |
| `scatterFlock(strength)` | Number, 0–5 | Clears attraction and gives birds an outward velocity |
| `setBirdColor(color)` | `"teal"`, `"coral"`, `"gold"`, or `"violet"` | Changes all birds' color |
| `getBirdCount()` | None | Returns the population number without changing it |

There are no arrays or objects to manipulate in the student-facing function definitions. The supplied simulation uses those structures internally. You can investigate them later if useful.

## Find your way around

- `functions.js`: start here; short definitions you can change.
- `controls.js`: find callers and follow values from UI inputs to arguments.
- `supplied/flock.js`: animation, state, validation, and drawing.
- `supplied/sound.js`: browser audio setup and the shared tone helper.
- `index.html` and `style.css`: controls and presentation.
- `AGENTS.md`: transparent, optional guidance for AI assistants working here.
- `tests/functions.test.cjs`: checks the initial function boundaries using supplied-helper stand-ins.

## A first extension

1. Try releasing birds. It is silent in the starter.
2. Try previewing the chirp. The population stays unchanged.
3. Decide whether every release should chirp once, or whether your design needs something else.
4. Add a call to `playChirp()` inside `releaseBirds(count)` if that matches your intention. Predict before testing all three buttons.
5. Make pitch and duration inputs to `playChirp` so different releases can sound different. Update its callers, including preview. Valid pitch is 180–1200 Hz and duration is 0.05–0.6 seconds.
6. Combine existing capabilities into an action you can name and explain. Decide what it should leave unchanged.

The supplied controls already read input values and listen for clicks. You can use them before studying event wiring. Calling an action twice, replacing a setting, and returning information are different behaviors; try examples that distinguish them.

## Optional AI-guided exploration

You can explore independently, ask for direct coding help, or choose guided learning. An assistant reading this repository should briefly offer that choice before imposing a lesson. Guided learning means investigating one function, making a prediction, trying it, and discussing a small revision. You can ask for an explanation, a worked example, or direct help at any time. You can opt out of guided learning at any time. Just say so, and the assistant will return to helping you normally. No special phrase is required, and you do not have to finish an exercise or explain why.

A starting prompt:

> Read this repository's README.md and AGENTS.md. I am exploring the student studio, not the instructor walkthrough. Find releaseBirds in functions.js and its callers in controls.js. Explain what input it needs, where the count is used, and what it changes. Show actual file locations. Do not modify code yet. Offer me the choice of guided exploration or direct help.

The repository author proposes this teaching approach; the student chooses whether to use it. No extra submissions, grading, or activity tracking are added by these files.

## Check a change

Try an ordinary case, a boundary case, and something that should remain unchanged. For example: preview must not add birds; setting wind must not change population; `getBirdCount()` must not mutate state.

With Node installed, you can run the starter checks:

```sh
node --test tests/functions.test.cjs
```

The starter check that releases are silent is expected to need revision when you intentionally add a chirp. Update the expectation to your design and check that one release produces exactly one tone. Tests use stand-ins; also test the actual browser experience and audio.

Everything runs in your browser. Changes are local until you choose to commit or publish them. No analytics, remote scripts, credentials, or student data collection are included.
