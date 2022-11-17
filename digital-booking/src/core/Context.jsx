import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { getAllCategories } from "./services/categories";
import { getAllCities } from "./services/City";
import { decodeToken } from "./services/Token";
import { setLocalStorage, getLocalStorage } from "./services/Storage";

export const Context = createContext();

export const DataProvider = ({children})=>{
    const [user, setUser] = useState(null);
    const [categories, setCategories] = useState([]);
    const [cities, setCities] = useState([]);

    const getCategories =  async () => {
        await getAllCategories().then((categoriesDb) => {
            setLocalStorage("CURRENT_CATEGORIES", categoriesDb); 
            setCategories(categoriesDb);
        }).catch((e) => {
            setLocalStorage("CURRENT_CATEGORIES", []); 
            setCategories([]);
        })
    }

    const getCities =  async () => {
        await getAllCities().then((citiesDb) => {
            setLocalStorage("CURRENT_CITIES", citiesDb) 
            setCities(citiesDb);
        }).catch((e) => {
            setLocalStorage("CURRENT_CITIES", []) 
            setCities([]);
        })
    }
    
    useEffect (()=>{
        const userStorage = getLocalStorage("CURRENT_USER");
        const categoriesStorage = getLocalStorage("CURRENT_CATEGORIES");
        const citiesStorage = getLocalStorage("CURRENT_CITIES");
        userStorage ? setUser(decodeToken()) : setUser(null);
        categoriesStorage && categoriesStorage.length ? setCategories(categoriesStorage) : getCategories();
        citiesStorage && citiesStorage.length ? setCities(citiesStorage) : getCities();
    },[]);

    return(
        <Context.Provider value ={{user, setUser, categories, setCategories, cities, setCities}}>{children}</Context.Provider>
    )

}

