const signup = (req,res)=>{
    res.send("Signup page")
}

const login=(req,res)=>{
    res.send("Login page")
}

const logout = (req,res)=>{
    res.send("Logout page")
}

export {signup, login, logout}