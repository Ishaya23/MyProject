import { createContext,useState } from "react";

const AppContext = createContext();

function AppProvider ({children}) {
    const [userName,setUsername] = useState({fName:null,lName:null});
    const [uid,setUid] = useState(undefined);

    return (
        <AppContext.Provider value={{userName, setUsername,setUid}}>
            {children}
        </AppContext.Provider>
    )
}

export { AppContext,AppProvider }