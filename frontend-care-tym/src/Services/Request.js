export const getRequest = async (api) => {
    
    const response = await fetch(
        api,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "auth-token": sessionStorage.getItem("auth-token")
            }//editar
        }
    )

    const data = await response.clone().json()
    return data
}

export const postRequest = async (api, data) => {
    const response = await fetch(api, {
        headers: {
            "Content-Type": "application/json",
            "auth-token": sessionStorage.getItem("auth-token"),
        },
        method: "POST",
        body: data
    })
    return response
}
export const deleteRequest = async(api,data) => {
    const response = await fetch(api,{
        headers : {"Content-Type": "application/json",
        "auth-token":sessionStorage.getItem("auth-token")},
        method : "DELETE",
        body : data
    })
    return response
}
export const updateRequest = async (api, data) => {
    const response = await fetch(api, {
        headers: {
            "Content-Type": "application/json",
            "auth-token": sessionStorage.getItem("auth-token"),
        },
        method: "PUT",
        body: data
    })
    return response
}