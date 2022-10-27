const BACK = document.getElementById('od-back-arrow')
BACK.addEventListener('click', () => {
    const url = window.location.href
    if (url.includes('/history/order/')) {
        window.location.href = '/history'
    } else if (url.includes('/detail')) {
        window.location.href = document.referrer
    } else {
        window.location.href = '/movies'
    }
})
