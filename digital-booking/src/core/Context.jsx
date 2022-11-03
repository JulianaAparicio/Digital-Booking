import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { getAllCategories } from "./services/categories";

export const Context = createContext();

export const DataProvider = ({children})=>{
    const [user, setUser] = useState(null);
    const [categories, setCategories] = useState([]);

    const getCategories =  async () => {
        await getAllCategories().then((categoriesDb) => {    
            localStorage.setItem("CURRENT_CATEGORIES", JSON.stringify(categoriesDb));
            setCategories(categoriesDb);
        }).catch((e) => {
            localStorage.setItem("CURRENT_CATEGORIES", JSON.stringify([]));
            setCategories([]);
        })
    }
    
    useEffect (()=>{
        const userStorage = JSON.parse(sessionStorage.getItem("CURRENT_USER"));
        const categoriesStorage = JSON.parse(localStorage.getItem("CURRENT_CATEGORIES"));
        setUser(userStorage);
        if (categoriesStorage && categoriesStorage.length) {
            setCategories(categoriesStorage)
        } else {
            getCategories();
        }
    },[]);

    return(
        <Context.Provider value ={{user, setUser, categories, setCategories}}>{children}</Context.Provider>
    )

}

