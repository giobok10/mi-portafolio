document.addEventListener('DOMContentLoaded', () => {
    const text = document.getElementById('typing-text');
    const roles = ["Junior Fullstack", "Ingeniero de Software Junior", "con mentalidad QA"];
    let i = 0, j = 0, current = "", isDeleting = false;

    function loop() {
        current = roles[i];
        text.textContent = isDeleting ? current.substring(0, j--) : current.substring(0, j++);

        if (!isDeleting && j === current.length) {
            setTimeout(() => isDeleting = true, 2000);
        } else if (isDeleting && j === 0) {
            isDeleting = false;
            i = (i + 1) % roles.length;
        }
        setTimeout(loop, isDeleting ? 40 : 80);
    }
    loop();

    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const links = document.querySelectorAll('.mobile-link');

    btn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
        const icon = btn.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.add('hidden');
            const icon = btn.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        });
    });

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    document.getElementById('contactForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const btnSubmit = e.target.querySelector('button');
        const originalText = btnSubmit.innerHTML;
        btnSubmit.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

        setTimeout(() => {
            alert('¡Mensaje enviado con éxito! (Simulación Frontend)');
            btnSubmit.innerHTML = originalText;
            e.target.reset();
        }, 1000);
    });
});