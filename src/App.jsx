import React, { useState, useEffect } from "react";
import { Container } from "./components/Container/Container";
import { Input } from "./components/Input/Input";
import { Select } from "./components/Select/Select";
import { Card } from "./components/Card/Card";
import img from "./assets/default.webp";

import "./App.css";

function App() {
  const [inputItem, setInputItem] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [data, setData] = useState([]);
  const [localArr, setLocalArr] = useState([]);

  useEffect(() => {
    if (
      localStorage.getItem("favoriteActors") !== null &&
      localStorage.getItem("favoriteActors") !== ""
    ) {
     () => setLocalArr(JSON.parse(localStorage.getItem("favoriteActors"))); // () =>  callback т.е. запустить 1 раз в момент события
    } 
  }, [localArr]);

  function isEmpty(el) {
    return el === "" ? "not set" : el;
  }

  function setToLocalStorage(el) {
    let favorite = localArr.find((elem) => elem.actor === el.actor);

    if (favorite) {
      localArr.splice(favorite, 1);
    } else {
      localArr.push({
        name: el.name,
        species: el.species,
        gender: el.gender,
        house: el.house,
        dateOfBirth: el.dateOfBirth,
        yearOfBirth: el.yearOfBirth,
        ancestry: el.ancestry,
        eyeColour: el.eyeColour,
        hairColour: el.hairColour,
        wand: {
          wood: el.wand.wood,
          core: el.wand.core,
          length: el.wand.length,
        },
        patronus: el.patronus,
        hogwartsStudent: el.hogwartsStudent,
        hogwartsStaff: el.hogwartsStaff,
        actor: el.actor,
        alive: el.alive,
        image: el.image,
      });
    }
    localStorage.setItem("favoriteActors", JSON.stringify(localArr));
    console.log(localArr);
  }

  useEffect(() => {
    async function fetchCharacters() {
      const characters = await fetch(
        `https://harry-potter-api-3a23c827ee69.herokuapp.com/api/characters`
      );
      const data = await characters.json();
      setData(data);
    }

    fetchCharacters();
  }, []);

  useEffect(() => {
    const filteredData = data.filter(
      (el) =>
        (el.name.toLowerCase().includes(inputItem.toLowerCase()) ||
          el.actor.toLowerCase().includes(inputItem.toLowerCase())) &&
        el.house.toLowerCase().includes(selectedItem.toLowerCase())
    );

    setFilterData(filteredData);
  }, [inputItem, selectedItem, data]);

  const houses = new Set(data.map((el) => el.house));
  houses.delete("");

  return (
    <>
      <section className="articles">
        <Container type="headerContainer">
          <h1>Harry Potter</h1>
          <h2>View all characters from the Harry Potter universe</h2>
        </Container>
        <Container type="searchContainer">
          <form>
            <div className="name">
              <Input
                value={inputItem}
                onChange={(e) => setInputItem(e.target.value)}
              />
            </div>
            <div className="select">
              <Select
                value={selectedItem}
                onChange={(e) => setSelectedItem(e.target.value)}
                options={houses}
              />
            </div>
          </form>

          <div className="card-wrapper">
            {filterData.map((el, index) => (
              <Card
                key={index}
                image={el.image ? el.image : img}
                name={el.name}
                actor={el.actor}
                gender={el.gender}
                house={isEmpty(el.house)}
                wandCore={isEmpty(el.wand.core)}
                alive={el.alive ? "yes" : "no"}
                onTest={() => {
                  setToLocalStorage(el);
                  console.log(el)
                }}
                isFavorite = {localArr.includes(el.name) ? true : false}
              />
            ))}
          </div>
        </Container>
        <Container type="footerContainer">
          <p>2024 © Made with love by me</p>
        </Container>
      </section>
    </>
  );
}

export default App;
