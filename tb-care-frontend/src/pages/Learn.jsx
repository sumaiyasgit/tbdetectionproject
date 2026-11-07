import React, { useState } from "react";

// IMPORT YOUR IMAGES
// Replace these with correct paths from your project
import EnglishImg from "../assets/english.jpeg";
import HindiImg from "../assets/hindi.jpeg";


// QUESTIONS + ANSWERS
const topics = [
  {
    title: "What is TB?",
    body: "TB stands for tuberculosis, an infectious bacterial disease caused by Mycobacterium tuberculosis that most often affects the lungs. It spreads through the air when a person with active lung TB coughs, sneezes, or speaks, and others inhale the germs. Symptoms can include a persistent cough, chest pain, fever, and weight loss, but not everyone infected with the bacteria becomes sick; many have a latent infection without symptoms."
  },
  {
    title: "Signs in children",
    body: "Signs of TB in children include a persistent cough, fever, night sweats, fatigue, and unexplained weight loss or failure to thrive. The symptoms can be similar to other illnesses but last longer, and some children may also experience loss of appetite, chest pain, or swollen lymph glands.  "
  },
  {
    title: "Prevention",
    body: "Preventing tuberculosis involves a combination of vaccination (BCG), infection control measures, early detection, and treatment. Practicing good hygiene, ensuring good ventilation, and isolating those with active TB are crucial for reducing transmission."
  },
  {
    title: "When to see a doctor",
    body: "You should see a doctor if you have symptoms like a persistent cough (more than two to three weeks), chest pain, unexplained weight loss, fever, or night sweats. It is especially important to seek medical attention if you have these symptoms, or if you are at higher risk for TB due to factors like a weakened immune system (e.g., from HIV), or having close contact with someone with active TB. For severe symptoms like coughing up blood or severe chest pain, seek immediate emergency care. "
  }
];

export default function Learn() {
  const [openIndex, setOpenIndex] = useState(null);
  const [story, setStory] = useState(null);

  const toggleCard = (index) => {
    if (openIndex === index) setOpenIndex(null);
    else setOpenIndex(index);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Learn about Pediatric TB</h1>

      {/* Cards Section */}
      <div className="space-y-3">
        {topics.map((t, i) => (
          <div
            key={i}
            className="border rounded-lg shadow-md bg-white"
          >
            <button
              onClick={() => toggleCard(i)}
              className="w-full text-left p-4 font-semibold flex justify-between"
            >
              {t.title}
              <span>{openIndex === i ? "-" : "+"}</span>
            </button>

            {openIndex === i && (
              <div className="p-4 text-gray-700 text-sm border-t">
                {t.body}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* STORY BUTTONS */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-3">TB Stories</h2>

        <div className="flex gap-4">
          <button
            onClick={() => setStory("english")}
            className="bg-blue-500 text-white px-4 py-2 rounded shadow"
          >
            Story in English
          </button>

          <button
            onClick={() => setStory("hindi")}
            className="bg-green-500 text-white px-4 py-2 rounded shadow"
          >
            Story in Hindi
          </button>
        </div>

        {/* STORY DISPLAY */}
        {story && (
          <div className="mt-5 p-4 bg-white rounded shadow">
            <h3 className="font-semibold mb-3">
              {story === "english" ? "English Story" : "Hindi Story"}
            </h3>

            {story === "english" && (
              <>
                <img
                  src={EnglishImg}
                  alt="TB Story English"
                  className="rounded mb-3"
                />
                <p className="text-sm text-gray-700">
                  This story explains TB detection flow, how AI detection works,
                  and how children can understand symptoms and healthy habits.
                </p>
              </>
            )}

            {story === "hindi" && (
              <>
                <img
                  src={HindiImg}
                  alt="TB Story Hindi"
                  className="rounded mb-3"
                />
                <p className="text-sm text-gray-700">
                  यह पोस्टर टीबी के लक्षण, बचाव के तरीके, बच्चों में संकेत और
                  कब डॉक्टर से मिलना चाहिए — इन सबको सरल भाषा में समझाता है।
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
