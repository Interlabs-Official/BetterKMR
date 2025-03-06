function createDynamicVideo(sourceUrl, videoId = 'myVideo') {
    const video = document.createElement('video');
    video.id = videoId;
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
  
    const source = document.createElement('source');
    source.src = sourceUrl;
    source.type = 'video/mp4';
  
    video.appendChild(source);
  
    document.getElementsByClassName('sk_page')[0].appendChild(video);
    document.getElementsByClassName('sk_header')[0].appendChild(video);
  
    return video;
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", (event) => {
      createDynamicVideo(chrome.runtime.getURL('assets/images/backgrounds/vivid-rain.mp4'));  
    });
  } else {
    createDynamicVideo(chrome.runtime.getURL('assets/images/backgrounds/vivid-rain.mp4'));
  }