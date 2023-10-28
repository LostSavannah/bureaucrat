import { useEffect, useState } from "react";
import { choose } from "../../tools";

export default function Nothing() {
   const phrasesOfEmptiness = [
    "A void of emotion",
    "A vast expanse of solitude",
    "An echoing abyss of nothingness",
    "Loneliness consumes the soul",
    "The silence of a desolate heart",
    "A hollow ache within",
    "A vacant, barren landscape",
    "The empty echoes of a vacant room",
    "The desolation of a deserted wasteland",
    "A void of meaning and purpose",
    "The hollowness of unfulfilled dreams",
    "An empty vessel, devoid of hope",
    "A cold and empty heart",
    "The stark emptiness of a blank canvas",
    "The hushed stillness of a forgotten place",
    "A world devoid of color and life",
    "A bottomless pit of despair",
    "The absence of light in a dark soul",
    "A void that swallows all joy",
    "The emptiness of a shattered promise"
  ];
  
  const [phrase, setPhrase] = useState("");

  useEffect(() => {
    setPhrase(choose(phrasesOfEmptiness));
  }, []);

  return (
    <div className="d-flex flex-column align-items-center p-4 alert alert-primary">
        "{phrase}"
    </div>
  )
}
