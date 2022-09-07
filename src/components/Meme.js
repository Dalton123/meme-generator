import React, { useState, useEffect } from "react";

export default function Meme() {
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg"
  });
  const [allMemeImages, setAllMemeImages] = useState([]);

  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemeImages.length);
    const url = allMemeImages[randomNumber].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url
    }));
  }

  function handleChange(event) {
    const { value, name } = event.target;
    setMeme((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  useEffect(() => {
    async function getMemes() {
      const res = await fetch("https://api.imgflip.com/get_memes");
      const data = await res.json();
      setAllMemeImages(data.data.memes);
    }
    getMemes();
  }, []);

  useEffect(() => {
    document.querySelector(".meme--image").addEventListener('load', (event) => {
      console.log(`Random image ==> ${meme.randomImage} ${event.path[0].clientWidth}`);
      document.documentElement.style.setProperty('--image-width', `${event.path[0].clientWidth}px`);
    })
  }, [meme.randomImage]);

  return (
    <>
      <div className="form">
        <input
          name="topText"
          placeholder="top text"
          type="text"
          onChange={handleChange}
          value={meme.topText}
        />
        <input
          name="bottomText"
          placeholder="bottom text"
          type="text"
          onChange={handleChange}
          value={meme.bottomText}
        />
        <button onClick={getMemeImage}>Generate new image</button>
      </div>
      <div className="meme">
        <img className="meme--image" src={meme.randomImage} />
        <div className="text-box">
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
        </div>
      </div>
    </>
  );
}
