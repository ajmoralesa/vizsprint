<template>
  <div class="flex items-center space-x-4">
    <button @click="togglePlayback">
      <play v-if="!isPlaying"></play>
      <pause v-else></pause>
    </button>

    <div>
      <p class="italic">{{ props.muscle }}</p>
      <div class="flex">
        <p>{{ formatTime(currentTime) }}</p>
        <div class="flex items-center space-x-2">
          <div class="relative bg-gray-300 h-1 mx-3 w-52 lg:w-96">
            <div
              class="absolute left-0 bg-black h-full"
              :style="{ width: progress + '%' }"
            ></div>
          </div>
        </div>
        <p>{{ formatTime(audioDuration) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import play from "./icons/play.vue";
import pause from "./icons/pause.vue";

const isPlaying = ref(false);
const progress = ref(0);
const currentTime = ref(0);
const audioDuration = ref(0);

// const props = defineProps(["audioFile", "muscle"]);

const props = defineProps({
  audioFile: {
    type: Object,
    required: true,
  },
  muscle: {
    type: String,
    required: true,
  },
});

function togglePlayback() {
  isPlaying.value = !isPlaying.value;
  // Add logic to play/pause the audio file based on isPlaying value and the provided audioFile prop
  if (isPlaying.value) {
    // Play the audio file
    console.log("Playing:", props.audioFile);
    props.audioFile.play();
    updateProgress();
  } else {
    // Pause the audio file
    console.log("Pausing:", props.audioFile);
    props.audioFile.pause();
  }
}

function updateProgress() {
  audioDuration.value = props.audioFile.duration;

  // Call updateProgress recursively using requestAnimationFrame
  if (isPlaying.value && currentTime.value < audioDuration.value) {
    currentTime.value = props.audioFile.currentTime;
    progress.value = (currentTime.value / audioDuration.value) * 100;

    requestAnimationFrame(updateProgress);
  }
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;
  return formattedTime;
}
</script>
