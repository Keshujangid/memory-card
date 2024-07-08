import {v4 as uuidv4} from 'uuid'

export default async function FetchData() {
  const randomNumber = Math.floor(Math.random() * 1001);

    try {
      let response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${randomNumber}&limit=12`);
      let data = await response.json();
  
      let imagePromises = data.results.map(async (res) => {
        let imgResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${res.name}`);
        let imgData = await imgResponse.json();
        return {
            name : res.name ,
            url :imgData.sprites.other.dream_world.front_default,
            id : uuidv4(),

        }
        ;
      });
  
      const Data = await Promise.all(imagePromises);
  
      return Data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  