const shareButton = document.getElementById('share');
const shareText = shareButton.getAttribute('data-shareText');
const shareUrl = shareButton.getAttribute('href');
shareButton.addEventListener('click', function () {
    if (navigator.share) {
        navigator.share({
            title: 'Блог Owl-shaker',
            text: shareText,
            url: shareUrl
        }).then(() => {

        })
    }
}