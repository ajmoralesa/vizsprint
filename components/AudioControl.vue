<template>
  <div class="flex items-center">
    <button
      @click="toggleAudio"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      {{ isPlaying ? "Pause" : "Play" }}
    </button>
    <audio ref="audioRef">
      <source src="./public/sound/sprint.wav" type="audio/wav" />
    </audio>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isPlaying: false,
      audioSrc: "ss", // Replace with the path to your audio file
    };
  },
  methods: {
    toggleAudio() {
      const audio = this.$refs.audioRef;
      if (this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      this.isPlaying = !this.isPlaying;
    },
  },
};
</script>

<style scoped>
/* Add any custom styles here */
</style>
