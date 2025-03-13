<script>
    import "../../app.css"
    import NavBar from "$lib/components/navBar.svelte";
    import { onMount } from "svelte";
    import { barbershopid } from "$lib/stores/barbershopid";
    import { get } from "svelte/store";

    let barbers = [];

    async function getBarbers() {
        try {
            const id = get(barbershopid);
            const response = await fetch(`https://barbermap-server.onrender.com/barbers/${id}`);
            if (!response.ok) throw new Error("Error al obtener barberos");
            const data = await response.json();
            console.log(data)
            barbers = [...data]; // Forzar reactividad
        } catch (error) {
            console.error("Error cargando barberos:", error);
        }
    }

    onMount(getBarbers);
</script>

<main>
    <NavBar />
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {#each barbers as barber}
        <div class="flex flex-col items-center text-xl shadow-md rounded-xl p-4">
            <img src="{barber.image}" alt="{barber.name}" class="w-36 h-36 md:w-32 md:h-32 object-cover rounded-full mx-auto">
            <div class="bg-white  rounded-lg p-4 w-1/2 text-center">
                <h2 class="text-xl font-bold">{barber.name}</h2>
                <p class="text-gray-600">{barber.experience} años de experiencia</p>
                <div class="flex flex-col gap-2 mt-2">
                    <button class="p-2 bg-black text-white rounded-xl">Pedir Cita</button>
                    <button class="p-2 bg-gray-300 text-black rounded-xl">Ver cortes</button>
                </div>
            </div>
        </div>
             
        {/each}
    </div>
</main>
