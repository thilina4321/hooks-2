import React, { createContext, useState } from 'react'

export const AuthContext = createContext({
    isLogin:false, login:()=>{}
})

const AuthContextProvider = (props) => {
    const [isAuth, setIsAuth] = useState(false)
    const login = ()=>{
        setIsAuth(true)
    }

    return (
        <AuthContext.Provider value={{isLogin:isAuth, login:login}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
