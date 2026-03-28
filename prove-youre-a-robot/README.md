# Prove You're a Robot

A reverse CAPTCHA built for the Stupid Ideas Hackathon. The joke is simple: the site treats human behavior as suspicious and rewards machine-like precision.

## Run

From this folder:

```bash
python3 -m http.server 4173
```

Then open:

```text
http://localhost:4173
```

Use `localhost` instead of opening the file directly so the webcam trial can work. If camera access is denied or unavailable, the app automatically switches to an idle-silence fallback for that stage.

## Demo flow

1. Start the audit.
2. Drag a straight line from `ORIGIN` to `DESTINATION`.
3. Tap `SYNC` four times on the pulse.
4. Enable surveillance and pass the stillness scan, or let fallback idle mode infer your robot-ness.
5. Finish the binary personality audit.
6. Download the certificate and hold it up like government-issued nonsense.

## Why it works for SIH

- `Uselessness`: it is an anti-CAPTCHA that actively rejects normal human behavior.
- `Execution`: every stage is interactive and demoable in a browser.
- `Originality`: the joke lands fast and escalates nicely on stage.
- `Skill-Maxxing`: uses canvas drawing, browser timing analysis, webcam motion detection, and certificate generation.
