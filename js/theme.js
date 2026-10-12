(function () {
    var root = document.documentElement;
    var KEY = 'portfolio-theme';
    function read() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
    function write(v) { try { localStorage.setItem(KEY, v); } catch (e) { /* ignore */ } }
    function apply(t) {
        if (t === 'light') root.setAttribute('data-theme', 'light'); else root.removeAttribute('data-theme');
        var b = document.getElementById('theme-toggle');
        if (b) {
            b.setAttribute('aria-label', t === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
            b.innerHTML = t === 'light' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
        }
    }
    var current = read() === 'light' ? 'light' : 'dark';
    apply(current);
    document.addEventListener('DOMContentLoaded', function () {
        var nav = document.querySelector('.navbar');
        if (!nav) return;
        var b = document.createElement('button');
        b.id = 'theme-toggle';
        b.type = 'button';
        b.className = 'theme-toggle';
        var mobile = nav.querySelector('.mobile-menu');
        nav.insertBefore(b, mobile || null);
        apply(current);
        b.addEventListener('click', function () {
            current = current === 'light' ? 'dark' : 'light';
            write(current);
            apply(current);
        });
    });
})();
