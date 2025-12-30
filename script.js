function jawaban(jawab) {
    if (jawab === 'iya') {
        alert('YAY! ❤️ Aku sangat bahagia! Aku akan menghubungi kamu!');
        document.body.innerHTML = `
            <div class="container">
                <h1>KAMU MENERIMA! 🎉</h1>
                <div class="heart" style="font-size: 5rem;">❤️</div>
                <p>Sekarang kamu resmi jadi pacar aku!</p>
                <p>Terima kasih sudah membuat hidup aku lebih berarti!</p>
            </div>
        `;
    }
}

function hindariTombol(btn) {
    const x = Math.random() * (window.innerWidth - btn.offsetWidth);
    const y = Math.random() * (window.innerHeight - btn.offsetHeight);
    btn.style.position = 'absolute';
    btn.style.left = `${x}px`;
    btn.style.top = `${y}px`;
}