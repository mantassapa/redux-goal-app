import axios from "axios"
//login
export const registerUser = (data,setUserData,setErrorMessage,setShowLogin, setShowMain)=>{
    axios.post("http://localhost:2001/api/users/reg", data)
    .catch((error)=>{
        switch(error.request.status){
            case 403:
                setErrorMessage("Username already exists")
            case 402:
                setErrorMessage("Email address already exists")
            case 405:
                setErrorMessage("Could not register")
        }
        
    })
    .then((res)=>{
        if(res){
        setUserData(res.data)
        localStorage.setItem("User", JSON.stringify(res.data))
        console.log('Registered');
        setShowLogin(0)
        setShowMain(1)
        }
    })
}
export const loginUser = (data,setUserData,setErrorMessage,setShowLogin,setShowMain)=>{
    axios.post("http://localhost:2001/api/users/log", data)
    .catch((error)=>{
        switch(error.request.status){
            case 406:
                setErrorMessage("Wrong email or password")
            case 204:
                setErrorMessage("Wrong email or password")
            case 0:
                setErrorMessage("No such user")
        }
    })
    .then((res)=>{
        if(res){
        setUserData(res.data)
        localStorage.setItem("User", JSON.stringify(res.data))
        console.log("loged in")
        setShowLogin(0)
        setShowMain(1)
        }
    })
}
//login end
//update
export const updateUser = (id, data)=>{
    axios.put(`http://localhost:2001/api/users/update/${id}`, { goals: data })
    .catch((error)=>{
        console.log(error);
        switch(error.request.status){
            case 404:
                console.log("Could not find")

        }
    })
    .then((res)=>{
        if(res){
        localStorage.setItem("User", JSON.stringify(res.data))
        }
    })
}

// get all

export const getAllUsers = (setUsers)=>{
    axios.get(`http://localhost:2001/api/users/admin/all`)
    .catch((error)=>{
        console.log(error);
        switch(error.request.status){
            case 404:
                console.log("Could not find")

        }
    })
    .then((res)=>{
        if(res){
            setUsers(res.data)
        }
    })
}
// delete 
export const DeleteUser = (id)=>{
    axios.delete(`http://localhost:2001/api/users/admin/del/${id}`)
    .catch((error)=>{
        console.log(error);
        switch(error.request.status){
            case 404:
                console.log("Could not find")

        }
    })
    .then((res)=>{
        if(res){
        alert("great succes", res)
        }
    })
}
