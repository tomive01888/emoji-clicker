import React from "react"; // React is needed for JSX

function SettingsModal({
  isOpen,
  onClose,
  currentEmoji,
  onEmojiChange,
  spawnInterval,
  onSpawnIntervalChange,
  maxEmojis,
  onMaxEmojisChange,
  currentEmojiSize,
  onEmojiSizeChange,
}) {
  // Close modal if clicking outside content
  const handleModalClick = (event) => {
    // Check if the click occurred directly on the modal overlay (not its content)
    if (event.target.id === "settings-modal-overlay") {
      onClose();
    }
  };

  if (!isOpen) {
    return null; // Don't render anything if the modal is not open
  }

  return (
    <div
      id="settings-modal-overlay" // Use a distinct ID for the overlay
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-40"
      onClick={handleModalClick}
    >
      <div className="bg-white p-6 rounded-lg border border-gray-400 w-11/12 max-w-lg relative">
        <span
          className="absolute top-2 right-4 text-gray-500 text-3xl font-bold cursor-pointer hover:text-black"
          onClick={onClose}
        >
          &times;
        </span>
        <h2 className="text-2xl font-bold mb-4">Settings</h2>

        <label htmlFor="emoji-select" className="block mb-2 font-bold">
          Choose Emoji:
        </label>
        <select
          id="emoji-select"
          value={currentEmoji}
          onChange={(e) => onEmojiChange(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded-md"
        >
          <option value="🐸">🐸 Frog</option>
          <option value="👹">👹 Ogre</option>
          <option value="🦄">🦄 Unicorn</option>
          <option value="💩">💩 Poop Emoji</option>
          <option value="😺">😺 Cat</option>
          <option value="🩲">🩲 Briefs</option>
          <option value="🍙">🍙 Onigiri</option>
        </select>

        <br />
        <label htmlFor="spawn-speed" className="block mb-2 font-bold">
          Spawn Speed (ms):
        </label>
        <div className="flex items-center mb-4">
          <input
            type="range"
            id="spawn-speed"
            min="50"
            max="1000"
            value={spawnInterval}
            onChange={(e) => onSpawnIntervalChange(parseInt(e.target.value))}
            className="w-full accent-green-500"
          />
          <span id="spawn-speed-value" className="ml-4 min-w-[30px]">
            {spawnInterval}
          </span>
        </div>

        <br />
        <label htmlFor="max-emojis" className="block mb-2 font-bold">
          Max Emojis on Screen:
        </label>
        <div className="flex items-center mb-4">
          <input
            type="range"
            id="max-emojis"
            min="1"
            max="30"
            value={maxEmojis}
            onChange={(e) => onMaxEmojisChange(parseInt(e.target.value))}
            className="w-full accent-green-500"
          />
          <span id="max-emojis-value" className="ml-4 min-w-[30px]">
            {maxEmojis}
          </span>
        </div>

        <br />
        <label htmlFor="emoji-size" className="block mb-2 font-bold">
          Emoji Size (px):
        </label>
        <div className="flex items-center mb-4">
          <input
            type="range"
            id="emoji-size"
            min="20"
            max="40"
            value={currentEmojiSize}
            onChange={(e) => onEmojiSizeChange(parseInt(e.target.value))}
            className="w-full accent-green-500"
          />
          <span id="emoji-size-value" className="ml-4 min-w-[30px]">
            {currentEmojiSize}
          </span>
        </div>
      </div>
    </div>
  );
}

export default SettingsModal;
