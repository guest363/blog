const shareButton = document.getElementById('share');
const shareText = shareButton.getAttribute('data-shareText');
const shareUrl = shareButton.getAttribute('href');
shareButton.addEventListener('click', async () => {
    if (navigator.share) {
        try {
            await navigator.share({
                title: 'Блог Owl-shaker',
                text: shareText,
                url: shareUrl
            })
        } catch (e) {
            console.error(e)
        }
    }
}