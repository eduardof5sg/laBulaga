<script>
    import { onMount } from "svelte";
    export let barberId;
    let currentDate = new Date(); // Fecha actual
    let selectedDate = null; // Fecha seleccionada
    let dates = [];
    let bookedHours = [];
    let data = [];
    
    // Crear las fechas del mes
    function generateDates() {
      let startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1); // Primer día del mes
      let endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0); // Último día del mes
  
      const daysInMonth = endDate.getDate();
  
      dates = [];
  
      for (let i = 1; i <= daysInMonth; i++) {
        let day = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
        dates.push({
          date: day,
          dayName: day.toLocaleDateString("es-ES", { weekday: "long" }),
          dayNumber: i
        });
      }
    }
  
    // Cambiar mes
    function changeMonth(direction) {
      currentDate.setMonth(currentDate.getMonth() + direction);
      generateDates();
    }
  
    // Seleccionar una fecha
    function selectDate(date) {
    selectedDate = new Date(date); // Cambiar la fecha seleccionada
    bookedHours = []; // Limpiar las horas reservadas antes de hacer la consulta
    fetchAvailability(selectedDate); // Hacer la llamada a la API con la nueva fecha
}
  
    // Simulación de llamada al servidor para obtener disponibilidad de horas
    async function fetchAvailability(date) {
    try {
        bookedHours = []; // Limpiar las horas reservadas

        // Formatear la fecha a 'YYYY-MM-DD' para usarla en el filtro
        const formattedDate = date.toISOString().split("T")[0];

        // Llamada a la API sin el filtro de fecha
        const response = await fetch(`https://barbermap-server.onrender.com/appoitmens/${barberId}`);
        
        if (!response.ok) throw new Error("Error obteniendo citas");

        const data = await response.json(); // Obtener todas las citas
        
        // Filtramos las citas por fecha
        bookedHours = data
            .filter(appointment => appointment.date === formattedDate) // Filtramos por la fecha seleccionada
            .map(appointment => appointment.hour); // Extraemos solo las horas

        console.log("Horas reservadas para el " + formattedDate + ":", bookedHours); // Para depuración

    } catch (error) {
        console.error("Error cargando disponibilidad:", error);
    }
}
  
    // Al montar el componente, generamos las fechas
    onMount(() => {
      generateDates();
    });
  </script>
  

  <main>
    <div class="flex justify-between items-center p-4 gap-6">
        <button class="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600" on:click={() => changeMonth(-1)}>Anterior</button>
        <span class="text-xl font-semibold">{currentDate.toLocaleDateString("es-ES", { year: "numeric", month: "short" })}</span>
        <button class="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600" on:click={() => changeMonth(1)}>Siguiente</button>
    </div>

    <div class="flex gap-4 overflow-x-scroll p-2">
        {#each dates as { dayName, dayNumber, date }}
            <div
                class="card flex flex-row bg-gray-300 text-black border-2 border-gray-300 rounded-lg cursor-pointer transition-all duration-300 {selectedDate?.getDate() === date.getDate() && selectedDate.getMonth() === date.getMonth() ? 'bg-green-500 text-black' : ''}"
                on:click={() => selectDate(date)}
            >
                <div class="w-[90px] text-center">
                    <strong class="text-xl">{dayName.substring(0, 3)}</strong><br />
                    <span class="text-lg font-bold">{dayNumber}</span>
                </div>
            </div>
        {/each}
    </div>

    {#if selectedDate}
        <div class="mt-6 p-4">
            <h3 class="text-xl font-semibold">Horas disponibles para {selectedDate.toLocaleDateString("es-ES")}</h3>
            <div class="grid grid-cols-4 gap-4 mt-4">
                {#each Array.from({ length: 13 }, (_, i) => i + 9) as hour}
                    {#each [0, 30] as minutes}
                        {#if !bookedHours.includes(`${String(hour).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`)}
                            <button class="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                                    on:click={() => selectHour(hour, minutes)}>
                                {String(hour).padStart(2, '0')}:{String(minutes).padStart(2, '0')}
                            </button>
                        {/if}
                    {/each}
                {/each}
            </div>
        </div>
    {/if}
</main>

<style>
    .card:hover {
        background-color: #f0f0f0;
    }
</style>
  