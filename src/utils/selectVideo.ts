// choose video 720px, 480px or 320px
// if not available return underfined
const selectVideo = (mp4: any) => {
  if (mp4['720p']) {
    return mp4['720p'];
  }

  if (mp4['480p']) {
    return mp4['480p'];
  }

  if (mp4['320p']) {
    return mp4['320p'];
  }

  return undefined;
};

export default selectVideo;
