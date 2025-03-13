<script>
    import "../app.css"
    import { barbershopid } from "$lib/stores/barbershopid";
    import { get } from "svelte/store";
    let data = []
    const background = "/video/bugala.mp4"
    import NavBar from "$lib/components/navBar.svelte";

async function  getInfo(){
    try {
        const id = get(barbershopid);
        const response = await fetch(`http://localhost:3000/barbershops/${id}`)
        data = await response.json()
        
        return data
    } catch (error) {
        
    }
}
getInfo();
</script>
<main>
    <div class="fixed top-0 left-0 w-full  bg-black text-white p-4 z-10">
        <NavBar />
    </div>
    <div class="relative">
        <!-- Imagen de fondo -->
        <video autoplay loop class="w-screen h-screen object-cover fixed top-0 left-0 z-[-1] brightness-50" src={background} alt="jeje"><track kind="captions"></video>
        
        <div class="absolute top-[30vh] left-[190px] transform -translate-x-1/2 -translate-y-1/2 text-3xl text-white p-2   rounded-lg">
        <h2 class="text-[50px] font-bold w-auto text-center mt-12 text-white">{data.name}</h2> 
       
        </div>
        <div class="absolute top-[50vh] left-[190px] transform -translate-x-1/2 -translate-y-1/2 text-xl text-white p-2   rounded-lg">
             <button class="text-white font-bold bg-black p-2 rounded-xl">Pedir cita</button>
        </div>
       
    </div>   
</main>