<script>
    import { onMount } from "svelte";
    let currentDate = new Date(); // Fecha actual
    let selectedDate = null; // Fecha seleccionada
    let dates = [];
    
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
      selectedDate = date;
      fetchAvailability(date); // Llamada al servidor para obtener las horas disponibles
    }
  
    // Simulación de llamada al servidor para obtener disponibilidad de horas
    async function fetchAvailability(date) {
      // Aquí simulas la llamada al servidor para obtener las horas para esta fecha
      console.log("Fecha seleccionada:", date);
    }
  
    // Al montar el componente, generamos las fechas
    onMount(() => {
      generateDates();
    });
  </script>
  

  <main>
    <div class="flex justify-between items-center p-4">
        <button class="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600" on:click={() => changeMonth(-1)}>Anterior</button>
        <span class="text-xl font-semibold">{currentDate.toLocaleDateString("es-ES", { year: "numeric", month: "long" })}</span>
        <button class="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600" on:click={() => changeMonth(1)}>Siguiente</button>
      </div>
      
      <div class="flex gap-4 overflow-x-scroll p-2">
        {#each dates as { dayName, dayNumber, date }}
          <div
            class="card flex flex-row   bg-gray-300 text-black border-2 border-gray-300 rounded-lg cursor-pointer transition-all duration-300 {selectedDate?.getDate() === date.getDate() && selectedDate.getMonth() === date.getMonth() ? 'bg-green-500 text-black' : ''}"
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
            {#each Array.from({ length: 24 }, (_, i) => i + 9) as hour}
              {#each [0, 30] as minutes}
                <button class="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                        on:click={() => selectHour(hour, minutes)}>
                  {String(hour).padStart(2, '0')}:{String(minutes).padStart(2, '0')}
                </button>
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
  