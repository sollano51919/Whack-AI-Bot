# Whack-an-AI-Bot 🤖

```
  ___
 /o o\
 \ - /
 /___\
```

A fun and fast-paced Whack-a-Mole style game where you test your reflexes by whacking mischievous AI bots. Compete for the highest score and climb the persistent leaderboard!

## Features

- **Fast-Paced Gameplay**: Bots pop up randomly. Whack them quickly!
- **Multiple Bot Types**:
    - **Good Bots (Cyan)**: Whack 'em for points.
    - **Rare Bots (Golden)**: Worth extra points!
    - **Bad Bots (Red)**: Avoid them, or you'll lose points.
- **Scoring & Timer**: Race against the 30-second clock to get the highest score possible.
- **Persistent Leaderboard**: Your top scores are saved in your browser. Can you beat your personal best?
- **Sound Effects**: Immersive sounds for whacking bots, game start, game over, and more.

## Tech Stack

- **Framework**: React & TypeScript
- **Styling**: Tailwind CSS (via CDN)
- **Tooling**: Vite for local development and bundling

## Getting Started

To run this project locally, you'll need [Node.js](https://nodejs.org/) and a package manager like [npm](https://www.npmjs.com/get-npm).

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/whack-an-ai-bot.git
    cd whack-an-ai-bot
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Open your browser** and navigate to the local URL provided by Vite (usually `http://localhost:5173`).

## How to Play

1.  Enter your name (up to 12 characters) on the start screen.
2.  Click "Start Game".
3.  You have 30 seconds to whack as many bots as you can.
    -   **Cyan Bots**: +1 point
    -   **Golden Bots**: +5 points
    -   **Red Bots**: -1 point
4.  Your final score will be displayed, and the top 5 scores are saved to the leaderboard.

Have fun!
