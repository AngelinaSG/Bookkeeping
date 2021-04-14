<template>
  <section>
    <h1 class="center-align">
      {{ "Calm_Title" | localize }}
    </h1>
    <h2 class="center-align">
      {{ "Calm_Hint" | localize }}
    </h2>
    <section>
      <div class="nowplaying center-align pink-text text-lighten-3"></div>
      <div class="keys">
        <button data-key="65" class="key" data-note="C">
          <span class="hints">A</span>
        </button>
        <button data-key="87" class="key sharp" data-note="C#">
          <span class="hints">W</span>
        </button>
        <button data-key="83" class="key" data-note="D">
          <span class="hints">S</span>
        </button>
        <button data-key="69" class="key sharp" data-note="D#">
          <span class="hints">E</span>
        </button>
        <button data-key="68" class="key" data-note="E">
          <span class="hints">D</span>
        </button>
        <button data-key="70" class="key" data-note="F">
          <span class="hints">F</span>
        </button>
        <button data-key="84" class="key sharp" data-note="F#">
          <span class="hints">T</span>
        </button>
        <button data-key="71" class="key" data-note="G">
          <span class="hints">G</span>
        </button>
        <button data-key="89" class="key sharp" data-note="G#">
          <span class="hints">Y</span>
        </button>
        <button data-key="72" class="key" data-note="A">
          <span class="hints">H</span>
        </button>
        <button data-key="85" class="key sharp" data-note="A#">
          <span class="hints">U</span>
        </button>
        <button data-key="74" class="key" data-note="B">
          <span class="hints">J</span>
        </button>
        <button data-key="75" class="key" data-note="C">
          <span class="hints">K</span>
        </button>
        <button data-key="79" class="key sharp" data-note="C#">
          <span class="hints">O</span>
        </button>
        <button data-key="76" class="key" data-note="D">
          <span class="hints">L</span>
        </button>
        <button data-key="80" class="key sharp" data-note="D#">
          <span class="hints">P</span>
        </button>
        <button data-key="186" class="key" data-note="E">
          <span class="hints">;</span>
        </button>
      </div>
      <audio data-key="65" src="@/assets/audio/040.wav"></audio>
      <audio data-key="87" src="@/assets/audio/041.wav"></audio>
      <audio data-key="83" src="@/assets/audio/042.wav"></audio>
      <audio data-key="69" src="@/assets/audio/043.wav"></audio>
      <audio data-key="68" src="@/assets/audio/044.wav"></audio>
      <audio data-key="70" src="@/assets/audio/045.wav"></audio>
      <audio data-key="84" src="@/assets/audio/046.wav"></audio>
      <audio data-key="71" src="@/assets/audio/047.wav"></audio>
      <audio data-key="89" src="@/assets/audio/048.wav"></audio>
      <audio data-key="72" src="@/assets/audio/049.wav"></audio>
      <audio data-key="85" src="@/assets/audio/050.wav"></audio>
      <audio data-key="74" src="@/assets/audio/051.wav"></audio>
      <audio data-key="75" src="@/assets/audio/052.wav"></audio>
      <audio data-key="79" src="@/assets/audio/053.wav"></audio>
      <audio data-key="76" src="@/assets/audio/054.wav"></audio>
      <audio data-key="80" src="@/assets/audio/055.wav"></audio>
      <audio data-key="186" src="@/assets/audio/056.wav"></audio>
    </section>
  </section>
</template>

<script>
export default {
  data: () => ({
    keys: [{}],
  }),
  mounted() {
    let allowed = true;
    const keys = document.querySelectorAll(".key");

    function playNote(e) {
      if (e.repeat != undefined) {
        allowed = !e.repeat;
      }

      if (!allowed) return;
      allowed = false;
      const note = document.querySelector(".nowplaying");
      const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
      const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
      if (!key) return;
      const keyNote = key.getAttribute("data-note");
      key.classList.add("playing");
      note.innerHTML = keyNote;
      audio.currentTime = 0;
      audio.play();

      keys.forEach((key) =>
        key.addEventListener("transitionend", removeTransition)
      );
    }

    function playClickNote(e) {
      const key = e.target;
      const note = document.querySelector(".nowplaying");
      const keyCode = key.dataset.key;
      const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
      if (!keyCode) return;
      const keyNote = key.getAttribute("data-note");
      key.classList.add("playing");
      note.innerHTML = keyNote;
      audio.currentTime = 0;
      audio.play();

      keys.forEach((key) =>
        key.addEventListener("transitionend", removeTransition)
      );
    }

    function removeTransition(e) {
      if (e.propertyName !== "transform") return;
      this.classList.remove("playing");
    }

    window.addEventListener("keydown", playNote);
    keys.forEach((key) => key.addEventListener("click", playClickNote));

    window.addEventListener("keyup", (e) => {
      allowed = true;
    });

    window.addEventListener("focus", (e) => {
      allowed = true;
    });
  },
  methods: {},
};
</script>


<style scoped>
html {
  -webkit-font-smoothing: antialiased;
  text-align: center;
}
h1 {
  font-size: 50px;
  font-weight: 400;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  margin: 0;
  margin-bottom: 30px;
}
h2 {
  font-size: 24px;
  font-style: italic;
  font-weight: 400;
  margin: 0 0 30px;
}
.nowplaying {
  font-size: 120px;
  line-height: 1;
  color: #eee;
  text-shadow: 0 0 5rem #880e4f;
  transition: all 0.07s ease;
  min-height: 120px;
}
.keys {
  display: block;
  width: 100%;
  height: 350px;
  max-width: 880px;
  position: relative;
  margin: 40px auto 0;
} /* общие настройки внешнего вида клавиш */
.key {
  position: relative;
  border: 4px solid black;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem #443d3f;
  transition: all 0.07s ease;
  display: block;
  box-sizing: border-box;
  z-index: 2;
} /* внешний вид белых клавиш */
.key:not(.sharp) {
  float: left;
  width: 10%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
} /* внешний вид и положение чёрных клавиш */
.key.sharp {
  position: absolute;
  width: 6%;
  height: 60%;
  background: #000;
  color: #eee;
  top: 0;
  z-index: 3;
} /* настройки смещения текста подсказок, чтобы они оказались на каждой клавише*/
.key[data-key="87"] {
  left: 7%;
}
.key[data-key="69"] {
  left: 17%;
}
.key[data-key="84"] {
  left: 37%;
}
.key[data-key="89"] {
  left: 47%;
}
.key[data-key="85"] {
  left: 57%;
}
.key[data-key="79"] {
  left: 77%;
}
.key[data-key="80"] {
  left: 87%;
} /* подсвечиваем нажатую клавишу */
.playing {
  transform: scale(0.95);
  border-color: #f8bbd0;
  box-shadow: 0 0 1rem #f8bbd0;
} /* настройка внешнего вида подсказок на клавишах */
.hints {
  display: block;
  width: 100%;
  opacity: 1;
  position: absolute;
  bottom: 7px;
  transition: opacity 0.3s ease-out;
  font-size: 20px;
  text-align: center;
}

button {
  padding: 0px;
  cursor: pointer;
}

@media screen and (max-width: 400px) {
  h1 {
    font-size: 30px;
  }
  .keys {
    height: 200px;
    margin-bottom: 20px;
  }
  .hints {
    font-size: 10px;
  }
  .key {
    border: 2px solid black;
    box-shadow: 0 0 0.5rem #443d3f;
  }
}
</style>