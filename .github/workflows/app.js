// ضع هنا الرابط الذي نسخته من Google Apps Script
const SCRIPT_URL = 'ضع_رابط_سكربت_جوجل_هنا';

document.addEventListener('DOMContentLoaded', () => {
    fetchData();
});

async function fetchData() {
    const tableBody = document.getElementById('students-table-body');
    
    try {
        const response = await fetch(SCRIPT_URL);
        const data = await response.json();
        
        tableBody.innerHTML = ''; // مسح رسالة التحميل
        
        // عكس المصفوفة لعرض أحدث التسجيلات أولاً (اختياري)
        data.reverse().forEach((student, index) => {
            // قم بتغيير 'الاسم' و 'رقم الهاتف' لتطابق أسماء الأعمدة في جدول جوجل لديك
            const tr = document.createElement('tr');
            tr.className = "hover:bg-gray-100";
            tr.innerHTML = `
                <td class="p-2 border-b">${student['الاسم الثلاثي'] || student['Name'] || '-'}</td>
                <td class="p-2 border-b" dir="ltr">${student['رقم الهاتف'] || student['Phone'] || '-'}</td>
                <td class="p-2 border-b">${student['اسم الدورة'] || student['Course'] || '-'}</td>
                <td class="p-2 border-b">
                    <button onclick="printReceipt('${student['الاسم الثلاثي']}', '${student['اسم الدورة']}')" 
                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm">
                        إصدار إيصال
                    </button>
                </td>
            `;
            tableBody.appendChild(tr);
        });
        
    } catch (error) {
        console.error('Error fetching data:', error);
        tableBody.innerHTML = '<tr><td colspan="4" class="text-center p-4 text-red-500">حدث خطأ أثناء جلب البيانات. تأكد من الرابط.</td></tr>';
    }
}

function printReceipt(name, course) {
    // تعبئة بيانات الإيصال المخفي
    document.getElementById('r-name').innerText = name !== 'undefined' ? name : '';
    document.getElementById('r-course').innerText = course !== 'undefined' ? course : '';
    
    // إظهار قسم الإيصال مؤقتاً للطباعة
    const receiptSection = document.getElementById('receipt-section');
    receiptSection.classList.remove('hidden');
    
    // فتح نافذة الطباعة
    window.print();
    
    // إخفاء الإيصال بعد الطباعة
    receiptSection.classList.add('hidden');
}
