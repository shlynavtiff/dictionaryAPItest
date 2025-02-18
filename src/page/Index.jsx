import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlay } from '@fortawesome/free-solid-svg-icons';

const Index = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [word, setWord] = useState('hi');

  const fetchData = async (word) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      if (!response.ok) {
        throw new Error("Word not found lamaoooooo :3");
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(word);
  }, []); // Fetch data on component mount

  const handleSubmit = (e) => {
    e.preventDefault();
    if (word.trim()) {
      fetchData(word);
    }
  };

  const handleAudioPlay = (audioUrl) => {
    const audio = new Audio(audioUrl);
    audio.play().catch((error) => {
      console.error("Error playing audio:", error);
    });
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-borat text-white">
      <div className="flex-grow">
        <div className="mt-10 flex justify-center">
          <div className="max-w-screen-lg w-full p-4">
            <div className="flex justify-between flex-row">
              <div className="mb-5 flex justify-start items-center">verba.</div>
              <div className="flex mb-5 flex-row text-xs justify-end items-center">108.4.12.6.1</div>
            </div>

            <div className="flex flex-col items-center">
              <form onSubmit={handleSubmit} className="relative w-full px-5 items-center">
                <input
                  onChange={(e) => setWord(e.target.value)}
                  value={word}
                  type="text"
                  name="wordInput"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
                />
                <span className="absolute left-8 top-[22px] transform -translate-y-1/2 text-gray-400">
                  <FontAwesomeIcon icon={faSearch} />
                </span>
              </form>
            </div>

            {/* Conditional Rendering */}
            {isLoading && <p className="text-center mt-2">Loading rahhhhhhhhhhhhhh</p>}
            {error && <p className="text-red-500 text-center mt-2">Error: {error}</p>}
            {data && data.length > 0 && (
              <>
                <div className="flex flex-row justify-between mt-5">
                  <div>
                    <h2 className="text-5xl">{data[0].word}</h2>
                    {data[0].phonetics && data[0].phonetics.length > 0 && (
                      <p className="text-purple-400">{data[0].phonetics[0].text}</p>
                    )}
                  </div>
                  <div>
                    {data[0].phonetics && data[0].phonetics.length > 0 && (
                      <button
                        className="bg-purple-400 w-12 h-12 rounded-full"
                        onClick={() => handleAudioPlay(data[0].phonetics[0].audio)}
                      >
                        <FontAwesomeIcon icon={faPlay} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Meanings and Definitions */}
                {data[0].meanings.map((meaning, index) => (
                  <div key={index} className="mt-10">
                    <h2 className="text-2xl">{meaning.partOfSpeech}</h2>
                    <p className="text-gray-500">Meaning</p>
                    <ul className="list-disc list-outside pl-5">
                      {meaning.definitions.map((definition, i) => (
                        <li key={i} className="mb-2">
                          {definition.definition}
                          {definition.example && (
                            <p className="italic">Example: {definition.example}</p>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </>
            )}

            {data && data.length > 0 && (
              <div className="flex flex-row gap-2 mt-20 text-xs">
                <p>Source</p>
                <a
                  href={data[0].sourceUrls}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  {data[0].sourceUrls}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className='bg-borat text-white flex items-center text-center justify-center p-2 text-xs'>
        developed by <a href="https://www.shlynav.me/" className='underline ml-1' target='_blank'>shlynav.tiff</a>
      </div>
    </div>
  );
};

export default Index;