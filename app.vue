<template>
  <div class="w-full flex justify-center">
    <div class="bg-[#F4EFE4] flex flex-col h-100">
      <img src="/img/SPRINT_illu-03.png" class="head" alt="Sprint header" />

      <Title class="flex justify-center"></Title>
      <h3 class="flex justify-center pt-2 text-black">
        Acceleration phase during a 40m sprint
      </h3>

      <!-- <div>
        <p>Length selected is {{ lenSelected }}</p>
        <p>Subaudios: {{ subsetAudioMuscles }}</p>
        <button @click="playSubsetSounds">Play subser</button>
      </div> -->

      <div class="flex justify-center pt-6">
        <div class="px-8">
          <h3 class="text-lg font-bold uppercase">Right Leg</h3>
          <div class="flex-grow">
            <!-- Right side muscles -->
            <template v-for="muscle in muscles">
              <template v-if="muscle.side === 'Right'">
                <AudioPlayer
                  :audio-file="audioMuscles[`${muscle.muscle}_right`]?.sound"
                  :muscle="audioMuscles[`${muscle.muscle}_right`]?.name"
                  :side="muscle.side"
                  :selected-players="selectedPlayers"
                  @selectionChanged="handleSelectionChanged"
                  @playbackToggled="handlePlaybackToggled"
                ></AudioPlayer>
              </template>
            </template>
          </div>

          <br />

          <h3 class="text-lg font-bold uppercase">Left Leg</h3>
          <div class="flex-grow">
            <!-- Left side muscles -->
            <template v-for="muscle in muscles">
              <template v-if="muscle.side === 'Left'">
                <AudioPlayer
                  :audio-file="audioMuscles[`${muscle.muscle}_right`]?.sound"
                  :muscle="audioMuscles[`${muscle.muscle}_right`]?.name"
                  :side="muscle.side"
                  :selected-players="selectedPlayers"
                  @selectionChanged="handleSelectionChanged"
                  @playbackToggled="handlePlaybackToggled"
                ></AudioPlayer>
              </template>
            </template>
          </div>
          <br />
        </div>
      </div>

      <br />
      <br />

      <div
        v-if="selectedPlayers.length >= 2"
        class="fixed bottom-0 left-0 right-0"
      >
        <GlobalPlayer
          :subsetAudioMuscles="subsetAudioMuscles"
          :selected-players="selectedPlayers"
          @selectionChanged="handleSelectionChanged"
        ></GlobalPlayer>
      </div>

      <div v-if="selectedPlayers.length >= 2" class="h-20"></div>

      <div
        class="bg-black h-full w-full text-white flex flex-row items-center md:w-96"
      >
        <div class="pl-10 pr-30 ml-5 py-10 w-48 md:w-96 pt-5 text-sm">
          A visualisation by Antoine Couturier, Antonio Morales and
          datacitron/Julie Brunet
        </div>

        <img class="h-14" src="/img/fulgur_logo.png" alt="Fulgur Logo" />
        <img class="h-14 pl-4" src="/img/insep_logo.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup>
import Title from "./components/Title.vue";
import { reactive } from "vue";
import AudioPlayer from "./components/AudioPlayer.vue";
import GlobalPlayer from "./components/GlobalPlayer.vue";
import l_bflh from "~/assets/l_bflh.mp3";
import l_bfsh from "~/assets/l_bfsh.mp3";
import l_gmax from "~/assets/l_gmax.mp3";
import l_gmed from "~/assets/l_gmed.mp3";
import l_rf from "~/assets/l_rf.mp3";
import l_sm from "~/assets/l_sm.mp3";
import l_st from "~/assets/l_st.mp3";
import l_vl from "~/assets/l_vl.mp3";
import r_bflh from "~/assets/r_bflh.mp3";
import r_bfsh from "~/assets/r_bfsh.mp3";
import r_gmax from "~/assets/r_gmax.mp3";
import r_gmed from "~/assets/r_gmed.mp3";
import r_rf from "~/assets/r_rf.mp3";
import r_sm from "~/assets/r_sm.mp3";
import r_st from "~/assets/r_st.mp3";
import r_vl from "~/assets/r_vl.mp3";
import sprint from "~/assets/r_vl.mp3";

const audioMuscles = reactive({});

const muscles = [
  {
    sound: l_bflh,
    side: "Left",
    muscle: "bflh",
    name: "Biceps Femoris Long Head",
  },
  {
    sound: l_bfsh,
    side: "Left",
    muscle: "bfsh",
    name: "Biceps Femoris Short Head",
  },
  {
    sound: l_gmax,
    side: "Left",
    muscle: "gmax",
    name: "Gluteus Maximus",
  },
  {
    sound: l_gmed,
    side: "Left",
    muscle: "gmed",
    name: "Gluteus Medius",
  },
  {
    sound: l_rf,
    side: "Left",
    muscle: "rf",
    name: "Rectus Femoris",
  },
  {
    sound: l_sm,
    side: "Left",
    muscle: "sm",
    name: "Semimembranosus",
  },
  {
    sound: l_st,
    side: "Left",
    muscle: "st",
    name: "Semitendinosus",
  },
  {
    sound: l_vl,
    side: "Left",
    muscle: "vl",
    name: "Vastus Lateralis",
  },
  {
    sound: r_bflh,
    side: "Right",
    muscle: "bflh",
    name: "Biceps Femoris Long Head",
  },
  {
    sound: r_bfsh,
    side: "Right",
    muscle: "bfsh",
    name: "Biceps Femoris Short Head",
  },
  {
    sound: r_gmax,
    side: "Right",
    muscle: "gmax",
    name: "Gluteus Maximus",
  },
  {
    sound: r_gmed,
    side: "Right",
    muscle: "gmed",
    name: "Gluteus Medius",
  },
  {
    sound: r_rf,
    side: "Right",
    muscle: "rf",
    name: "Rectus Femoris",
  },
  {
    sound: r_sm,
    side: "Right",
    muscle: "sm",
    name: "Semimembranosus",
  },
  {
    sound: r_st,
    side: "Right",
    muscle: "st",
    name: "Semitendinosus",
  },
  {
    sound: r_vl,
    side: "Right",
    muscle: "vl",
    name: "Vastus Lateralis",
  },
  {
    sound: sprint,
    side: "Both",
    muscle: "All",
    name: "All muscles",
  },
];

onMounted(() => {
  muscles.forEach(({ sound, ...rest }) => {
    audioMuscles[`${rest.muscle}_${rest.side.toLowerCase()}`] = {
      sound: new Audio(sound),
      ...rest,
    };
  });

  console.log("audiomuscles");
  console.log(audioMuscles);
});

const selectedPlayers = reactive([]);
const subsetAudioMuscles = ref({});

function handleSelectionChanged(selectedPlayers) {
  selectedPlayers = selectedPlayers;
  console.log(selectedPlayers.length);
  console.log(selectedPlayers);
}

const lenSelected = ref(0);
watch(selectedPlayers, () => {
  lenSelected.value = Object.keys(selectedPlayers).length;

  const selectedPlayerNames = Object.values(selectedPlayers).map(
    ({ muscle, side }) => {
      return `${muscle}_${side}`;
    }
  );

  console.log("selectedPlayerNames");
  console.log(selectedPlayers);
  console.log(selectedPlayerNames);

  // Create a subset of audioMuscles based on selectedPlayerNames
  subsetAudioMuscles.value = Object.keys(audioMuscles).reduce((acc, key) => {
    const muscle = audioMuscles[key];
    const muscleIdentifier = `${muscle.name}_${muscle.side}`;

    if (selectedPlayerNames.includes(muscleIdentifier)) {
      acc[key] = muscle;
    }
    return acc;
  }, {});
});

function playSubsetSounds() {
  console.log("playing all!");
  Object.values(subsetAudioMuscles.value).forEach((muscle) => {
    muscle?.sound.play();
  });
}

function handlePlaybackToggled(muscle, isPlaying) {
  const index = selectedPlayers.value.findIndex(
    (player) => player.muscle === muscle
  );

  if (index > -1) {
    selectedPlayers.value[index].isPlaying = isPlaying;
  }
}

function unSelectAll() {
  selectedPlayers.splice(0, selectedPlayers.length);
}

const audioPlayer = ref(null);

function unselectAllCheckboxes() {
  const checkboxes = audioPlayer.value.$refs.checkbox;

  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });
}
</script>

<style scoped>
.subtitle {
  /* Acceleration phase during a 40m sprint */

  position: absolute;
  width: 340px;
  height: 36px;
  left: 25px;
  /* top: 218px; */

  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  text-align: center;

  /* black */
  color: #000000;
}
</style>
