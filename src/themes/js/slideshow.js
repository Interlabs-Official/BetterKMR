var i = 0;
var images = [];
var slideTime = 10000;

images[0] = /* webpackIgnore: true */ chrome.runtime.getURL('assets/images/backgrounds/slideshow/photo-1464822759023-fed622ff2c3b.jpg');
images[1] = /* webpackIgnore: true */ chrome.runtime.getURL('assets/images/backgrounds/slideshow/photo-1454496522488-7a8e488e8606.jpg');
images[2] = /* webpackIgnore: true */ chrome.runtime.getURL('assets/images/backgrounds/slideshow/photo-1501785888041-af3ef285b470.jpg');
images[3] = /* webpackIgnore: true */ chrome.runtime.getURL('assets/images/backgrounds/slideshow/photo-1498855926480-d98e83099315.jpg');
images[4] = /* webpackIgnore: true */ chrome.runtime.getURL('assets/images/backgrounds/slideshow/photo-1485470733090-0aae1788d5af.jpg');
images[5] = /* webpackIgnore: true */ chrome.runtime.getURL('assets/images/backgrounds/slideshow/photo-1455156218388-5e61b526818b.jpg');

function changePicture() {
    document.querySelector('.sk_page').style.backgroundImage = "url(" + images[i] + ")";
    document.querySelector('.sk_header').style.backgroundImage = "url(" + images[i] + ")";

    if (i < images.length - 1) {
        i++;
    } else {
        i = 0;
    }
    chrome.storage.local.set({"extjs-slideshow-curinc": i});
    setTimeout(changePicture, slideTime);
}
chrome.storage.local.get("extjs-slideshow-curinc", function(item) {
    if (item["extjs-slideshow-curinc"]) {
        i = item["extjs-slideshow-curinc"] - 1;
    } else {
        i = 0;
    }
});

window.onload = changePicture;