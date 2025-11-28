// Function to fetch member count from Discord Widget API
async function fetchMemberCount() {
    // يجب استبدال هذا الرابط بالرابط الخاص بسيرفرك من إعدادات الـ Widget
    const widgetUrl = 'https://discord.com/api/guilds/YOUR_SERVER_ID/widget.json'; 
    try {
        const response = await fetch(widgetUrl);
        const data = await response.json();
        
        const countElement = document.getElementById('liveMemberCount');
        const memberCount = data.members.length; // عدد الأعضاء
        
        if (countElement) {
            // تحديث قيمة الـ data-target لعداد الإحصائيات
            countElement.setAttribute('data-target', memberCount); 
            // تحديث النص الأولي (سيقوم مؤثر العد بالبدء)
            countElement.textContent = memberCount.toLocaleString('en-US'); 
        }
    } catch (error) {
        console.error('Failed to fetch Discord member count:', error);
        // في حال فشل الربط، سيعتمد على القيمة اليدوية في HTML
    }
}
// تشغيل دالة جلب الأعضاء عند تحميل الصفحة
fetchMemberCount();


// جزء زر العودة للأعلى
const backToTopButton = document.getElementById('backToTop');

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
}

backToTopButton.addEventListener('click', () => {
    document.body.scrollTop = 0; // for Safari
    document.documentElement.scrollTop = 0; // for Chrome, Firefox, IE and Opera
});

// ... هنا يوضع كود مؤثر العد (Counting Effect) الذي قدمته سابقاً ...
// تأكد من تحديث قيمة الـ data-target في HTML برقم مناسب إذا لم تستخدم API
