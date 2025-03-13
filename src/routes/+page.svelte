<script>
  import "../app.css";
  import { onMount } from "svelte";
  import { barbershopid } from "$lib/stores/barbershopid";
  import { get } from "svelte/store";
  let data = [];
  const background = "/video/bugala.mp4";
  import NavBar from "$lib/components/navBar.svelte";

  async function getInfo() {
    try {
      const id = get(barbershopid);
      const response = await fetch(
        `https://barbermap-server.onrender.com/barbershops/${id}`
      );
      data = await response.json();

      return data;
    } catch (error) {}
  }
  onMount(getInfo);
</script>

<main>
  <div class="fixed top-0 left-0 w-full bg-black text-white p-4 z-10">
    <NavBar />
  </div>
  <div class="relative">
    <!-- Imagen de fondo -->
    <video
      autoplay
      loop
      class="w-screen h-screen object-cover fixed top-0 left-0 z-[-1] brightness-50"
      src={background}
      alt="jeje"><track kind="captions" /></video
    >

    <div class="absolute top-[40vh] left-[190px] transform -translate-x-1/2 -translate-y-1/2 text-3xl text-white p-2 rounded-lg"    >
    <h2 class="title w-auto mt-12">{data.name}</h2>
      <p class="mt-6 text-2xl">
        "En BarberDominic, cada detalle habla por ti"  Un espacio donde el
        estilo se vive, la confianza se siente y la esencia dominicana se
        refleja en cada corte.
      </p>
      <button class="text-white font-bold bg-black p-3 rounded-xl mt-12 text-xl ml-22">Reserva tu cita</button>
    </div>
  </div>
</main>
<style>
/* Estilos generales para el título */
.title {
  font-size: 55px; /* Tamaño de fuente */
  font-weight: bold;
  font-family: 'Lucida Handwriting', cursive;
  margin-top: 3rem;
  text-align: justify;
  display: inline-block;
  background: linear-gradient(45deg, #ffffff, #5c5b5b, #fffefe);
  background-size: 200% 200%;
  background-position: 100% 0;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: colorOscillation 5s ease-in-out infinite; /* Animación de oscilación */
}

/* Animación de oscilación de colores */
@keyframes colorOscillation {
  0% {
    background-position: 100% 0;
  }
  50% {
    background-position: 0 100%;
  }
  100% {
    background-position: 100% 0;
  }
}


</style>