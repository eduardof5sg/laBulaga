import { barbershopid } from "$lib/stores/barbershopid";

export const getInfo = async() =>{
    try {
        // const response = await fetch(`https://findyourmeal-vxqf.onrender.com/bar/${barid}`)
        const response = await fetch(`http://localhost:3000/barbershops/${barbershopid}`)
        return response.data
    } catch (error) {
        
    }
}