import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { getAllCategories } from "./services/categories";
import { getAllCities } from "./services/City";

export const Context = createContext();

export const DataProvider = ({children})=>{
    const [user, setUser] = useState(null);
    const [categories, setCategories] = useState([]);
    const [cities, setCities] = useState([]);

    const getCategories =  async () => {
        await getAllCategories().then((categoriesDb) => {    
            localStorage.setItem("CURRENT_CATEGORIES", JSON.stringify(categoriesDb));
            setCategories(categoriesDb);
        }).catch((e) => {
            localStorage.setItem("CURRENT_CATEGORIES", JSON.stringify([]));
            setCategories([]);
        })
    }

    const getCities =  async () => {
        await getAllCities().then((CitiesDb) => {    
            localStorage.setItem("CURRENT_CITIES", JSON.stringify(CitiesDb));
            setCities(CitiesDb);
        }).catch((e) => {
            localStorage.setItem("CURRENT_CITIES", JSON.stringify([]));
            setCities([]);
        })
    }
    
    useEffect (()=>{
        const userStorage = JSON.parse(sessionStorage.getItem("CURRENT_USER"));
        const categoriesStorage = JSON.parse(localStorage.getItem("CURRENT_CATEGORIES"));
        const citiesStorage = JSON.parse(localStorage.getItem("CURRENT_CITIES"));
        setUser(userStorage);
        categoriesStorage && categoriesStorage.length ? setCategories(categoriesStorage) : getCategories();
        citiesStorage && citiesStorage.length ? setCities(citiesStorage) : getCities();
    },[]);

    return(
        <Context.Provider value ={{user, setUser, categories, setCategories, cities, setCities}}>{children}</Context.Provider>
    )

}

