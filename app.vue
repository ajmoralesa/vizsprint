<template>
  <div class="w-full flex justify-center">
    <div class="bg-[#F4EFE4] flex flex-col h-100">
      <img src="img/SPRINT_illu-03.png" class="head" alt="Sprint header" />

      <Title class="flex justify-center"></Title>
      <h3 class="flex justify-center pt-2 text-black">
        Acceleration phase during a 40m sprint
      </h3>

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
                ></AudioPlayer>
              </template>
            </template>
          </div>

          <br />

          <p>
            <span class="text-lg font-bold uppercase">Sprint</span>
            <span class="text-lg font-bold"> (both legs, all muscles)</span>
          </p>
          <div class="flex-grow">
            <AudioPlayer
              :audio-file="audioMuscles[`${all}_both`]?.sound"
              muscle="All muscles"
            ></AudioPlayer>
          </div>
        </div>
      </div>

      <br />
      <br />

      <GlobalPlayer></GlobalPlayer>

      <div class="bg-black h-24 text-white flex">
        <div class="pl-10 pr-40 pt-5 text-sm">
          A visualisation by Antoine Couturier, Antonio Morales and
          datacitron/Julie Brunet
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Title from "./components/Title.vue";
import { reactive } from "vue";
import AudioPlayer from "./components/AudioPlayer.vue";
import GlobalPlayer from "./components/GlobalPlayer.vue";
import l_bflh from "./assets/l_bflh.mp3";
import l_bfsh from "./assets/l_bfsh.mp3";
import l_gmax from "./assets/l_gmax.mp3";
import l_gmed from "./assets/l_gmed.mp3";
import l_rf from "./assets/l_rf.mp3";
import l_sm from "./assets/l_sm.mp3";
import l_st from "./assets/l_st.mp3";
import l_vl from "./assets/l_vl.mp3";
import r_bflh from "./assets/r_bflh.mp3";
import r_bfsh from "./assets/r_bfsh.mp3";
import r_gmax from "./assets/r_gmax.mp3";
import r_gmed from "./assets/r_gmed.mp3";
import r_rf from "./assets/r_rf.mp3";
import r_sm from "./assets/r_sm.mp3";
import r_st from "./assets/r_st.mp3";
import r_vl from "./assets/r_vl.mp3";
import sprint from "./assets/r_vl.mp3";

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
});

// Selected players
const selectedPlayers = reactive([]);

function handleCheckboxToggled(isSelected) {
  console.log("Checkbox toggled:", isSelected);
}

function handleSelectionChanged(selectedPlayers) {
  selectedPlayers = selectedPlayers;
  console.log(selectedPlayers);
}

watch(selectedPlayers, (newPlayers, oldPlayers) => {
  // Pause the sounds of players that are no longer selected
  oldPlayers.forEach((player) => {
    if (!newPlayers.some((newPlayer) => newPlayer.muscle === player.muscle)) {
      player.audio.pause();
    }
  });

  // Play the sounds of newly selected players
  newPlayers.forEach((player) => {
    if (!oldPlayers.some((oldPlayer) => oldPlayer.muscle === player.muscle)) {
      player.audio.play();
    }
  });
});

function handlePlaybackToggled(muscle, isPlaying) {
  const index = selectedPlayers.value.findIndex(
    (player) => player.muscle === muscle
  );

  if (index > -1) {
    selectedPlayers.value[index].isPlaying = isPlaying;
  }
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
