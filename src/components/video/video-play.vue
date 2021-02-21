<template>
  <div class="video" ref="fullScreen">
    <div class="video-source">
      <video :src="videoSrc" class="video-file" ref="video"></video>
    </div>
    <div class="video-control">
      <div class="control-box">
        <div class="control">
          <i class="iconfont font-large" :class="{'icon-play':pause,'icon-pause':!pause}"
             @click="videoPlay"></i>
          <i class="iconfont font-large" :class="{'icon-mute':voice,'icon-voice':!voice}"
             @click="videoVoice"
             @mouseenter="showSilder"
             @mouseleave="hideSlider"
          ></i>
          <div class="slider-voice" v-show="slider" ref="sliderVoice">
            <div class="voice-ball" ref="ball"
                 @mousedown="clickHandler"
                 @mouseup="cancleHandler"></div>
          </div>
          <div class="progress">
            <div class="mask" @click="progress($event)"></div>
            <div class="inner-mask" ref="innerMask"></div>
          </div>
          <i class="iconfont font-large"
             :class="{'icon-full-screen-exit':fullScreen,'icon-full-screen':!fullScreen}"
             @click="videoFullScreen"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let timer = null;
export default {
  name: "video-play",
  props:{
      videoSrc:{
        type:String
      }
  },
  data() {
    return {
      pause: false,
      voice: false,
      fullScreen: false,
      slider: false,
      enterVoice: false
    }
  },
  methods: {
    // 播放或暂停视频
    videoPlay() {
      this.pause = !this.pause;
      if (this.pause) {
        this.$refs.video.play();
      } else {
        this.$refs.video.pause();
      }
      this.$refs.video.addEventListener("timeupdate", (e) => {
        this.setProgress(e.target.currentTime, e.target.duration);
      })
    },
    progress(e) {
      this.$refs.innerMask.style.width = e.offsetX + 'px';
      // 宽度计算
      // 当前播放/全部进度*100%
      this.$refs.video.currentTime = e.offsetX / e.target.offsetWidth * this.$refs.video.duration;
      this.setProgress(this.$refs.video.currentTime, this.$refs.video.duration);
    },
    videoVoice() {
      this.voice = !this.voice;
      if (this.voice) {
        this.$refs.video.muted = true;
      } else {
        this.$refs.video.muted = false;
      }

    },
    setProgress(current, duration) {
      let maskWidth = Math.round(current / duration * 100) + "%";
      this.$refs.innerMask.style.width = maskWidth;
    },
    videoFullScreen() {
      this.fullScreen = true;
      if (this.fullScreen) {
        fullScreen(this.$refs.video)
      }

      // 全屏
      function fullScreen(ele) {
        if (ele.requestFullscreen) {
          ele.requestFullscreen();
        } else if (ele.mozRequestFullScreen) {
          ele.mozRequestFullScreen();
        } else if (ele.webkitRequestFullscreen) {
          ele.webkitRequestFullscreen();
        } else {
          ele.msRequestFullscreen();
        }
      }

      // 判断是否全屏
      this.$refs.video.addEventListener("fullscreenchange", (e) => {
        if (e.target.webkitDisplayingFullscreen) {
          this.fullScreen = false;
        }
      })
    },
    showSilder() {
      this.slider = true;
    },
    hideSlider() {
      if(timer) {
        return;
      }
      timer = setTimeout(() => {
        if (this.enterVoice) {
          this.slider = true;
        }else {
          this.slider = false;
        }
        clearTimeout(timer);
        timer = null;
      }, 3000)
    },
    clickHandler() {
      // 音量滑动
      this.$refs.sliderVoice.addEventListener("mousemove", this.mouseEvents);
      this.enterVoice = true;
    },
    cancleHandler() {
      this.$refs.sliderVoice.removeEventListener("mousemove", this.mouseEvents);
      this.enterVoice = false;
      this.slider = false;
    },
    mouseEvents(e) {
      let distance = this.$refs.sliderVoice.offsetWidth - (this.$refs.ball.offsetWidth / 2);
      console.log(distance)
      if (this.$refs.ball.offsetLeft > 95) {
        this.$refs.ball.style.left = distance + "px";
        this.setVoice(1);
        this.cancleHandler()
      } else if (this.$refs.ball.offsetLeft < 0) {
        this.$refs.ball.style.left = "0px";
        distance = 0;
        this.setVoice(0);
        this.cancleHandler()
      } else {
        this.$refs.ball.style.left = this.$refs.ball.offsetLeft + e.offsetX - (this.$refs.ball.offsetWidth / 2) + "px";
        this.setVoice(this.$refs.ball.offsetLeft / 100);
      }
    },
    setVoice(val) {
      this.$refs.video.volume = val;
    }
  }
}
</script>

<style lang="scss" scoped>
.video {
  width: 600px;
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;

  .video-source {
    flex-grow: 11;
    flex-shrink: 0;
    width: 600px;
    height: 400px;

    .video-file {
      width: 100%;
      height: 100%;
    }
  }

  .video-control {
    height: 30px;
    line-height: 30px;
    flex-shrink: 0;
    border: 1px solid #000;
    background-color: #fff;

    .control-box {
      position: relative;

      .control {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .slider-voice {
          position: absolute;
          top: -17px;
          width: 100px;
          height: 15px;
          padding: 2px 0;

          &::after {
            content: "";
            position: absolute;
            top: 50%;
            left: 55%;
            transform: translate(-50%, -50%);
            height: 1px;
            background-color: #ccc;
            width: 100%;
          }

          .voice-ball {
            position: absolute;
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background-color: #ccc;
            box-shadow: 0 1px 3px #ccc;
            z-index: 100;
            user-select: none;

            &:hover {
              background-color: #666;
            }
          }
        }

        .progress {
          height: 10px;
          width: 100%;
          border: 1px solid #ccc;
          position: relative;

          .mask {
            position: absolute;
            width: 100%;
            height: 100%;
          }

          .inner-mask {
            width: 0;
            height: 100%;
            background-color: #ccc;
          }
        }
      }
    }

  }
}

.font-large {
  font-size: 28px;
  cursor: pointer;

  &:nth-child(2) {
    margin-left: 10px;
    margin-right: 10px;
  }

  &:last-child {
    margin: 0 10px;
  }
}
</style>