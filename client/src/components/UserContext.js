import { createContext } from "react";
//NOTE NOT USED. Initially built app around context provider and consumers ....until it disapears after every refresh
// Solution is do a databse call here. That felt redundant as I would still need to store content in local storage
export const UserContext = createContext(null);