import { useEffect, useMemo, useState } from "react";
import { choose } from "../../tools";

export default function Nothing() {
   const phrasesOfEmptiness = useMemo(() => [
    "🌌 A void of silence 🌌",
    "🌑 Emptiness echoed in the silence 🌑",
    "🕳️ The hollow emptiness of solitude 🕳️",
    "🌫️ A vast expanse of nothingness 🌫️",
    "🐚 An empty shell of a soul 🐚",
    "🌀 The abyss of emptiness 🌀",
    "🌾 Echoes of loneliness 🌾",
    "🌀 A vacuum of meaning 🌀",
    "💔 Desolate wasteland of the heart 💔",
    "🔇 A hollow echo in the void 🔇",
    "❌ The absence of purpose ❌",
    "👁️ A vacant stare into oblivion 👁️",
    "🚢 An empty vessel 🚢",
    "🌌 Loneliness echoed in the emptiness 🌌",
    "💭 The void of lost dreams 💭",
    "📢 The echo of emptiness reverberates 📢",
    "😔 The vacuum of despair 😔",
    "🏜️ The barren landscape of the soul 🏜️",
    "🗣️ The echo of nothingness 🗣️",
    "🌌 The desolation of empty spaces 🌌"
  ], []);
  
  const [phrase, setPhrase] = useState("");

  useEffect(() => {
    setPhrase(choose(phrasesOfEmptiness));
  }, [phrasesOfEmptiness]);

  return (
    <div className="d-flex flex-column align-items-center p-4 alert alert-dark">
        "{phrase}"
    </div>
  )
}
