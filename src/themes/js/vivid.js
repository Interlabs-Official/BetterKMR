function createDynamicVideo(sourceUrl, videoId = 'myVideo') {
    // 1. Create the video element
    const video = document.createElement('video');
    video.id = videoId;
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
  
    // 2. Create the source element
    const source = document.createElement('source');
    source.src = sourceUrl;
    source.type = 'video/mp4'; // Adjust type if needed
  
    // 3. Append the source to the video
    video.appendChild(source);
  
    // 4.  Append the video to the document (e.g., to the body)
    document.getElementsByClassName('sk_page')[0].appendChild(video); // Or another element
    document.getElementsByClassName('sk_header')[0].appendChild(video); // Or another element
  
    return video; // Return the created video element (optional)
  }
  
createDynamicVideo(chrome.runtime.getURL('assets/images/backgrounds/vivid-rain.mp4'));  