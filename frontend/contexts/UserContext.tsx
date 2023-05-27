import {createContext, Dispatch, SetStateAction, useState} from 'react'

type UserContextType = {
    userID : number,
    setUserID: Dispatch<SetStateAction<number>>
};

const UserContext = createContext<UserContextType>({userID: 0, setUserID: () => {}});

export function UserProvider({ children }: { children: React.ReactNode }) {
    
    const [userID, setUserID] = useState(-1);
    
    return (
        <UserContext.Provider value={ {userID, setUserID} }>{children}</UserContext.Provider>
    )
}

export default UserContext;