// ====== 1. مؤثر العد للإحصائيات ======
const startCounter = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            document.querySelectorAll('.stat-number').forEach(counter => {
                const target = +counter.getAttribute('data-target');
                let count = 0;
                const increment = target / 200; // سرعة العد (200 خطوة)

                const updateCount = () => {
                    if (count < target) {
                        count += increment;
                        counter.innerText = Math.ceil(count).toLocaleString('en-US');
                        setTimeout(updateCount, 5);
                    } else {
                        counter.innerText = target.toLocaleString('en-US');
                    }
                };
                if (parseInt(counter.innerText) === 0) { // تأكد من عدم العد مرتين
                    updateCount();
                }
            });
            observer.unobserve(entry.target);
        }
    });
};

const statsObserver = new IntersectionObserver(startCounter, { root: null, threshold: 0.5 });
const statsElement = document.getElementById('stats');
if (statsElement) statsObserver.observe(statsElement);


// ====== 2. مؤثر إظهار العناصر عند التمرير (Fade-in) ======
const fadeInObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { root: null, threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => {
    fadeInObserver.observe(el);
});


// ====== 3. زر العودة للأعلى (Back to Top) ======
const backToTopButton = document.getElementById('backToTop');
window.onscroll = () => {
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
};

backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


// ====== 4. ربط عدد الأعضاء الفعلي (ملاحظة: هذا يتطلب Backend) ======
// لتحقيق هذا بأمان واحترافية، يجب استخدام خادم (Node.js/Python) لتفادي أخطاء CORS
// أو الاعتماد على Discord Widget API إذا كان السيرفر يسمح بذلك.

async function fetchLiveMemberCount() {
    // استخدم ID سيرفرك (JJ2gSG94FG هو رمز الدعوة، وليس الـ ID)
    // تحتاج إلى استخراج الـ ID من URL أو إعدادات السيرفر
    // لنفترض أن ID السيرفر هو 123456789012345678
    const SERVER_ID = '1128331818274029648'; // هذا هو ID سيرفرك 'أفق'
    const WIDGET_URL = `https://discord.com/api/guilds/${SERVER_ID}/widget.json`; 

    try {
        const response = await fetch(WIDGET_URL);
        const data = await response.json();
        
        const memberCount = data.members.length;
        const countElement = document.getElementById('liveMemberCount');

        if (countElement) {
             // تحديث العداد بالرقم الحقيقي قبل أن يبدأ تأثير العد
            countElement.setAttribute('data-target', memberCount);
            // إعادة تشغيل تأثير العد ليأخذ الرقم الجديد
            statsObserver.observe(statsElement); 
        }
    } catch (error) {
        // في حال فشل الربط (بسبب إعدادات السيرفر أو مشاكل الشبكة)
        console.error('فشل في جلب عدد الأعضاء. الاعتماد على القيمة اليدوية.');
    }
}

// يمكنك إيقاف هذه الدالة إذا كانت تسبب أخطاء CORS أو لم تقم بتفعيل الـ Widget
// fetchLiveMemberCount(); 
