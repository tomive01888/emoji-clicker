import { useState, useEffect, useRef } from "react";
import "./index.css";
import SettingsModal from "./comps/SettingsModal";

function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [currentEmoji, setCurrentEmoji] = useState("🐸");
  const [spawnInterval, setSpawnInterval] = useState(200); // ms
  const [maxEmojis, setMaxEmojis] = useState(10);
  const [currentEmojiSize, setCurrentEmojiSize] = useState(40); // px
  const [isModalOpen, setIsModalOpen] = useState(false);

  const gameAreaRef = useRef(null);
  const spawnTimerRef = useRef(null);

  useEffect(() => {
    const storedHighScore = localStorage.getItem("frogClickerHighScore");
    if (storedHighScore) {
      setHighScore(parseInt(storedHighScore, 10));
    }
  }, []);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("frogClickerHighScore", score.toString());
    }
  }, [score, highScore]);

  const spawnTarget = () => {
    if (!gameAreaRef.current) return;

    const currentEmojis = gameAreaRef.current.querySelectorAll(".target");

    if (currentEmojis.length >= maxEmojis) {
      const oldestEmoji = gameAreaRef.current.querySelector(".target");
      if (oldestEmoji) {
        oldestEmoji.remove();
      }
    }

    const target = document.createElement("div");
    target.classList.add("target");
    target.textContent = currentEmoji;
    target.style.fontSize = `${currentEmojiSize}px`;

    target.classList.add(
      "absolute",
      "cursor-pointer",
      "transition-transform",
      "duration-100",
      "ease-out",
      "select-none",
      "z-10"
    );
    target.style.textShadow = "0 0 4px white";

    const size = currentEmojiSize;

    const gameAreaRect = gameAreaRef.current.getBoundingClientRect();
    const gameAreaWidth = gameAreaRect.width;
    const gameAreaHeight = gameAreaRect.height;

    const x = Math.random() * (gameAreaWidth - size);
    const y = Math.random() * (gameAreaHeight - size);

    target.style.left = `${x}px`;
    target.style.top = `${y}px`;

    target.addEventListener("click", () => {
      setScore((prevScore) => prevScore + 1);
      target.remove();
    });

    target.addEventListener("mousedown", () => {
      target.style.transform = "scale(0.9)";
    });
    target.addEventListener("mouseup", () => {
      target.style.transform = "scale(1)";
    });
    target.addEventListener("mouseleave", () => {
      target.style.transform = "scale(1)";
    });

    gameAreaRef.current.appendChild(target);
  };

  // --- useEffect for Game Loop ---
  useEffect(() => {
    if (spawnTimerRef.current) {
      clearInterval(spawnTimerRef.current);
    }
    spawnTimerRef.current = setInterval(spawnTarget, spawnInterval);

    return () => {
      if (spawnTimerRef.current) {
        clearInterval(spawnTimerRef.current);
      }
    };
  }, [spawnInterval, currentEmoji, maxEmojis, currentEmojiSize]);

  // --- Render Section ---
  return (
    <div className="flex flex-col h-screen overflow-hidden font-sans">
      <header className="flex justify-between items-center p-4 bg-gray-100 border-b border-gray-300 z-10 flex-shrink-0">
        <div id="scoreboard" className="text-2xl font-bold">
          Score: {score}
        </div>
        {/* NEW: Display High Score */}
        <div className="text-xl font-bold text-blue-700">High Score: {highScore}</div>
        <button
          id="settings-button"
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-green-500 text-white rounded-md cursor-pointer text-base hover:bg-green-600"
        >
          Settings
        </button>
      </header>

      <main className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-1 pointer-events-none select-none text-white text-center p-2 flex-shrink-0">
        <h1 className="text-4xl font-bold mb-2">Click The Emoji!</h1>
        <p className="text-lg">Click as many as you can!</p>
      </main>

      <div
        id="game-area"
        ref={gameAreaRef}
        className="relative flex-grow cursor-crosshair overflow-hidden bg-black z-0"
      ></div>

      <SettingsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentEmoji={currentEmoji}
        onEmojiChange={setCurrentEmoji}
        spawnInterval={spawnInterval}
        onSpawnIntervalChange={setSpawnInterval}
        maxEmojis={maxEmojis}
        onMaxEmojisChange={setMaxEmojis}
        currentEmojiSize={currentEmojiSize}
        onEmojiSizeChange={setCurrentEmojiSize}
      />
    </div>
  );
}

export default App;
