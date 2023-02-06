export const random = (data:any) => {
    return {
        type:'Random',
        payload:data
    }
}

export const disconnect = (data:any) => {
    return {
        type:'Disconnect',
        payload:data
    }
}

