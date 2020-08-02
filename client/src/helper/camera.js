class Camera {
  constructor() {
    this.stream = null;
    this.videoBox = null;
    this.canvas = null;
    this.context = null;
    this.image = null;
    this.width = 320;
    this.height = 0;
    this.streaming = false;
    this.filter = 0;
    this.imageUrl = "";
    this.filterList = [
      { css: "none", title: "None" },
      { css: "grayscale(100%)", title: "Grayscale" },
      { css: "sepia(100%)", title: "Sepia" },
      { css: "invert(100%)", title: "Invert" },
      { css: "hue-rotate(90deg)", title: "Hue Rotate" },
      { css: "blur(10px)", title: "Blur" },
      { css: "contrast(150%)", title: "Contrast" },
    ];
    console.log("Fired");
  }

  file = () => {
    return this.imageUrl;
  };
  filterList = () => {
    return this.filterList;
  };

  setFilterOnVideo = () => {
    this.videoBox.style.filter = this.filterList[this.filter].css;
  };

  applyFilter = (index) => {
    this.filter = index;
    this.setFilterOnVideo();
  };

  getStream = async () => {
    this.stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        facingMode: "user",
      },
    });
    this.videoBox.srcObject = this.stream;
    this.videoBox.play();
  };

  setUp = async () => {
    try {
      this.videoBox = document.getElementById("video");
      this.canvas = document.getElementById("canvas");
      this.image = document.getElementById("capturedImage");
      this.getStream();

      this.videoBox.addEventListener(
        "canplay",
        (e) => {
          const {
            srcElement: { videoHeight, videoWidth },
          } = e;

          if (!this.streaming) {
            this.width = 420;
            this.height = videoHeight / (videoWidth / 420);
            this.videoBox.setAttribute("width", this.width);
            this.videoBox.setAttribute("height", this.height);
            this.canvas.setAttribute("width", this.width);
            this.canvas.setAttribute("height", this.height);

            this.streaming = true;
          }
        },
        false
      );
    } catch (err) {
      console.log(err.name + ": " + err.message);
    }
  };

  stop = async () => {
    const tracks = await this.stream.getTracks();
    tracks.forEach(function (track) {
      track.stop();
    });

    this.videoBox.srcObject = null;
    this.videoBox.load();
  };

  destroy = () => {
    try {
      this.videoBox.remove();
      this.canvas.remove();
      this.image.remove();
      this.streaming = false;
    } catch (error) {
      console.log(error);
    }
  };

  capture = () => {
    try {
      this.image.setAttribute("width", this.width);
      this.image.setAttribute("height", this.height);
      this.context = this.canvas.getContext("2d");
      this.context.drawImage(this.videoBox, 0, 0, this.width, this.height);
      this.imageUrl = this.canvas.toDataURL("image/png");
      this.image.setAttribute("src", this.imageUrl);
      this.image.style.filter = this.filterList[this.filter].css;
      return "done";
    } catch (error) {
      console.log(error);
    }
  };
}
export default Camera;
