# School Portfolio

A responsive personal school portfolio built with HTML, CSS, and vanilla JavaScript. It presents an introduction, education and interests, graphics work, a hackathon video, an academic planner, and a contact form.

## Pages and features

- **Home (`Index.html`)** — introduction, portrait, and an audio player.
- **About (`About.html`)** — education, technical skills, interests, and career aspirations.
- **Projects (`Projects.html`)** — graphics gallery and embedded hackathon video.
- **Academic Planner (`Planner.html`)** — add tasks with courses and optional due dates, mark them complete, or delete them. Tasks are saved in the current browser using local storage.
- **Contact (`contact.html`)** — client-side checks for required fields, valid email format, and digits-only phone numbers. The form is not connected to a service that sends messages.

## Run locally

The site does not require a build step or external JavaScript packages. Serve the project folder over HTTP, for example with Python:

```bash
python -m http.server 8000
```

Then open <http://localhost:8000/Index.html>. You can also use the VS Code Live Server extension. Serving the site over HTTP is recommended for the YouTube embed; opening HTML files directly with a `file://` URL may prevent YouTube playback.

## Media files

- Place the home-page audio file in the project root as `intro.mp3`.
- Keep the portfolio graphics in the `Images/` folder. The project page refers to `Graphics1.png`, `Graphics2.png`, `Graphics3.jpg`, `1.png`, and `Graphics4.jpg`.
- The hackathon video is embedded from YouTube and requires an internet connection. Playback also depends on the video being available and embedding being allowed.
