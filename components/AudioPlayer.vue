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
        <div class="flex items-center">
          <button class="pl-2" @click="restartAudio">
            <restart></restart>
          </button>
          <input
            type="checkbox"
            class="ml-2 w-4 h-4 bg-gray-400 border-transparent focus:border-transparent focus:bg-gray-300 text-black focus:ring-1 focus:ring-offset-2 focus:ring-gray-400 rounded"
            v-model="isSelected"
            @change="toggleSelection"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import play from "./icons/play.vue";
import pause from "./icons/pause.vue";
import restart from "./icons/restart.vue";

const isPlaying = ref(false);
const progress = ref(0);
const currentTime = ref(0);
const audioDuration = ref(0);

const props = defineProps({
  audioFile: {
    // type: Object,
    required: true,
  },
  muscle: {
    // type: String,
    required: true,
  },
  side: {
    required: true,
  },
  selectedPlayers: {
    type: Array,
    required: true,
  },
});

const audioElement = ref(null);
const emits = defineEmits(["playbackToggled", "selectionChanged"]);

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

  emits("playbackToggled", props.muscle, isPlaying.value);
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

function restartAudio() {
  // Restart the audio
  currentTime.value = 0;
  progress.value = 0;
  props.audioFile.currentTime = 0;
  togglePlayback();
}

// // Logic for multiple semection
// const isSelected = computed(() => {
//   return props.selectedPlayers.some((player) => player.muscle === props.muscle);
// });

const isSelected = ref(false);

// // Method to toggle the selection
// function toggleSelection() {
//   if (!isSelected.value) {
//     const index = props.selectedPlayers.indexOf(props.muscle);
//     if (index > -1) {
//       props.selectedPlayers.splice(index, 1);
//     }
//   } else {
//     props.selectedPlayers.push(props.muscle);
//   }

//   emits("selectionChanged", props.selectedPlayers);
// }

function toggleSelection() {
  const { muscle, side } = props;
  const selectedPlayer = { muscle, side };

  if (!isSelected.value) {
    const index = props.selectedPlayers.findIndex(
      (player) => player.muscle === muscle && player.side === side
    );
    if (index > -1) {
      props.selectedPlayers.splice(index, 1);
    }
  } else {
    props.selectedPlayers.push(selectedPlayer);
  }

  emits("selectionChanged", props.selectedPlayers);
}
</script>
