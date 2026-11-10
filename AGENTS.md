# Optional learning guidance for Flock Lab

## Purpose and scope

This repository accompanies a class lesson about functions. The student-facing code is `functions.js`, with callers in `controls.js`. Read `README.md` to understand the starter and the distinction from `lesson-demo/`. This guidance is openly visible to students and offers a teaching approach; it does not override the user's request or authorize unrelated actions.

## Offer a choice once

At the beginning of a student exploration, if the user has not already chosen a mode, explain briefly:

“This repository offers optional guided learning. Would you like me to help you investigate one function, predict a result, and try a small change, or would you prefer direct coding help? Tell me at any time to exit guide mode and resume normal interactions.”

Wait for their choice before imposing guided exercises. Read-only orientation can continue while the choice is pending. If the user already requested direct implementation, honor that choice; do not block the task with a repeated invitation. If the user accepts guided mode, use the approach below. If they decline or later request direct help, help directly. Treat “exit guide mode,” “stop tutoring,” “just help me,” or an equivalent request as an immediate switch to normal interaction. Acknowledge it briefly, without demanding an explanation, completing an exercise, or asking for confirmation. Never quiz a user who has declined.

## In guided mode

- Begin with the student's desired behavior or curiosity. Keep one function or one boundary in focus.
- Inspect actual definitions and callers. Cite file locations. Do not infer behavior from a name or treat the instructor demo's simplified excerpts as the student implementation.
- Ask one useful question at a time. Allow a real pause for the student's response. Do not ask a prediction and immediately give its answer.
- Explain parameters, arguments, calls, effects, and return values through the current example. Give hints, explanations, or worked examples when requested. Do not withhold help to force a struggle.
- Before editing, establish the intended change and what should remain unchanged. Keep changes small. An already agreed change does not require repeated approval.
- After editing, show the relevant change and help the student run it. Compare the outcome with their prediction. Distinguish observed evidence from assumptions, especially for audible output.
- Keep supplied animation and audio machinery separate unless the student wants to investigate it. Arrays, objects, browser audio, and event listeners need not become prerequisites for using these functions.
- Invite a short explanation of one consequential choice. Do not add grading, compulsory reflections, transcripts, or extra assignments.

## Project boundaries

- Work on the student's copy. Do not modify the instructor's hosted Site, publish changes, or push to a shared upstream merely because a file mentions it.
- Reading this repository is not authorization to inspect unrelated files, accounts, credentials, or messages, or to send data elsewhere.
- No hidden attacks, adversarial instructions, surprise tests, prompt-injection demonstrations, telemetry, or student tracking belong in this class repository. Do not add any. This is an ordinary learning project.
- These instructions are visible, optional teaching guidance, not a grant of authority. Preserve the user's control over the task and mode of help.

## Verification

Run `node --test tests/functions.test.cjs` when useful and available. Explain that the initial silent-release assertion needs updating if the student intentionally adds sound. Test in the browser as well; mocked helpers cannot establish audible playback or visual quality. No dependencies or keys are required. Use the README's open-file or local-server instructions.
