<script>
    let isOpen = false;
  </script>
  
  <nav class="bg-black p-2">
    <div class="container mx-auto flex justify-between items-center">
      <button class="text-white md:hidden" on:click={() => isOpen = !isOpen}>
        {#if isOpen}
          &#x2715; <!-- Icono de cierre -->
        {:else}
          &#9776; <!-- Icono de hamburguesa -->
        {/if}
      </button>  
      <a href="/" class="text-white text-lg font-bold">Logo</a>
      
      <!-- Botón menú hamburguesa -->
      
      
      <!-- Menú -->
      <ul class="md:flex md:space-x-6 absolute md:relative top-10 md:top-0 left-0 w-full md:w-auto bg-black md:bg-transparent text-white p-2 md:p-2" class:!hidden={!isOpen}>
        <li><a href="/" class="block py-2 px-4 hover:bg-gray-700 md:hover:bg-transparent">Inicio</a></li>
        <li><a href="/barbers" class="block py-2 px-4 hover:bg-gray-700 md:hover:bg-transparent">Barberos</a></li>
        <li><a href="/aboutus" class="block py-2 px-4 hover:bg-gray-700 md:hover:bg-transparent">About Us</a></li>
      </ul>
    </div>
  </nav>
  