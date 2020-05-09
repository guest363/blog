if(navigator.share) {
    const shareButton = document.getElementById('share');
    const shareText = shareButton.getAttribute('data-shareText');
    const shareUrl = shareButton.getAttribute('href');
navigator.share({
    title: 'Блог Owl-shaker',
    text: shareText,
    url: shareUrl
}).then(() => {

})
}