# Quiz Atlas

A Next.js 16, React 19, TypeScript and Tailwind CSS project for CS4032 Assignment 3 (Topic 23). This first milestone implements the torchlit homepage and panoramic navigation. The Archive and Observatory are destination shells for future quiz and score features.

## Run locally

Use Node.js 22 LTS or later.

```sh
npm install
npm run dev
```

Open http://localhost:3000. Run `npm run lint` and `npm run build` to check the project.

## Files

- `app/page.tsx` contains the homepage title and navigation.
- `components/AtlasLayout.tsx` keeps the scenery mounted across routes and controls the torch entrance.
- `app/globals.css` defines responsive layout, camera motion and reduced-motion behavior.
- `public/scenery/` contains the panorama, foreground and ignition SVGs.
- `app/quizzes/page.tsx` and `app/scores/page.tsx` provide the two navigation destinations.

The passage illustration incorporates traced storyboard artwork from Kurzgesagt’s [We Finally Know More About Humanity’s First Civilization](https://www.youtube.com/watch?v=_y9JuojAIg0). ChatGPT assisted with the prototype, SVG scenery and implementation.
