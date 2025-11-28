// Function to start counting animation
function startCounter(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = document.querySelectorAll('.stat-number');

            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                let count = 0;
                const speed = 200; // Adjust speed (lower is faster)
                const increment = target / speed;

                const updateCount = () => {
                    if (count < target) {
                        count += increment;
                        counter.innerText = Math.ceil(count);
                        setTimeout(updateCount, 1);
                    } else {
                        counter.innerText = target.toLocaleString('en-US'); // للتنسيق إذا كانت الأرقام كبيرة
                    }
                };

                updateCount();
                observer.unobserve(entry.target); // Stop observing once counting starts
            });
        }
    });
}

// Intersection Observer Setup
const statsSection = document.getElementById('stats');
const observerOptions = {
    root: null,
    threshold: 0.5 // Start counting when 50% of the section is visible
};

const observer = new IntersectionObserver(startCounter, observerOptions);

// Start observing the stats section
const statsElement = document.querySelector('.stats-section');
if (statsElement) {
    observer.observe(statsElement);
}

// يمكنك إضافة المزيد من سكربتات التفاعل هنا مستقبلاً (مثل تبديل المظهر أو سلايدر)
