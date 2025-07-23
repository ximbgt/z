// أنماط الزخرفة المعدلة مع أكواد Unicode الصحيحة (لا تغيير هنا)
const textDecorations = {
    bold: {
        name: "Bold",
        uppercase: Array.from("𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭"),
        lowercase: Array.from("𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇"),
        numbers: Array.from("𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵𝟬")
    },
    sans: {
        name: "Sans-Serif",
        uppercase: Array.from("𝖠𝖡𝖢𝖣𝖤𝖥𝖦𝖧𝖨𝖩𝖪𝖫𝖬𝖭𝖮𝖯𝖰𝖱𝖲𝖳𝖴𝖵𝖶𝖷𝖸𝖭"),
        lowercase: Array.from("𝖺𝖻𝖼𝖽𝖾𝖿𝗀𝗁𝗂𝗃𝗄𝗅𝗆𝗇𝗈𝗉𝗊𝗋𝗌𝗍𝗎𝗏𝗐𝗑𝗒𝗓"),
        numbers: Array.from("𝟣𝟤𝟥𝟦𝟧𝟨𝟩𝟪𝟫𝟢")
    },
    mono: {
        name: "Monospace",
        uppercase: Array.from("𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉"),
        lowercase: Array.from("𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝘂𝘃𝚠𝚡𝚢𝘇"),
        numbers: Array.from("𝟷𝟸𝟹𝟺𝟻𝟼𝟽𝟾𝟿𝟶")
    },
    double: {
        name: "Double-Struck",
        uppercase: Array.from("𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ"),
        lowercase: Array.from("𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫"),
        numbers: Array.from("𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡𝟘")
    },
    circled: {
        name: "Circled",
        uppercase: Array.from("ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ"),
        lowercase: Array.from("ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ"),
        numbers: Array.from("①②③④⑤⑥⑦⑧⑨⓪")
    }
};

// إنشاء خرائط الحروف (لا تغيير هنا)
const createCharMaps = () => {
    const maps = {};
    for (const [key, style] of Object.entries(textDecorations)) {
        const map = {};
        
        // الحروف الكبيرة (A-Z)
        if (style.uppercase) {
            const baseA = 'A'.charCodeAt(0);
            style.uppercase.forEach((char, i) => {
                map[String.fromCharCode(baseA + i)] = char;
            });
        }
        
        // الحروف الصغيرة (a-z)
        if (style.lowercase) {
            const basea = 'a'.charCodeAt(0);
            style.lowercase.forEach((char, i) => {
                map[String.fromCharCode(basea + i)] = char;
            });
        }
        
        // الأرقام (0-9)
        if (style.numbers) {
            const base0 = '0'.charCodeAt(0);
            style.numbers.forEach((char, i) => {
                map[String.fromCharCode(base0 + i)] = char;
            });
        }
        
        maps[key] = map;
    }
    return maps;
};

const charMaps = createCharMaps();

const inputTextElement = document.getElementById('inputText');
const outputTextElement = document.getElementById('outputText');
const copyBtn = document.getElementById('copyBtn');
const styleButtons = document.querySelectorAll('.style-btn'); // تحديد كل أزرار الأنماط

let activeStyle = 'bold'; // النمط الافتراضي

// إضافة مستمعي الأحداث لأزرار الأنماط
styleButtons.forEach(button => {
    button.addEventListener('click', () => {
        // إزالة الكلاس 'active' من الزر النشط حالياً
        const currentActive = document.querySelector('.style-btn.active');
        if (currentActive) {
            currentActive.classList.remove('active');
        }
        
        // إضافة الكلاس 'active' للزر الذي تم النقر عليه
        button.classList.add('active');
        
        activeStyle = button.dataset.style; // تحديث النمط النشط
        applyDecoration(); // تطبيق الزخرفة فورًا عند تغيير النمط
    });
});

// تطبيق الزخرفة عند كتابة النص
inputTextElement.addEventListener('input', applyDecoration);

// وظيفة تطبيق الزخرفة
function applyDecoration() {
    const inputText = inputTextElement.value;
    let output = '';
    for (const char of inputText) {
        output += charMaps[activeStyle][char] || char;
    }
    
    outputTextElement.textContent = output;
    outputTextElement.className = 'output-area ' + activeStyle + '-style'; // تحديث الكلاس
}

// تفعيل النمط الافتراضي عند تحميل الصفحة لأول مرة
document.addEventListener('DOMContentLoaded', () => {
    // تحديد الزر الافتراضي كـ "نشط" عند التحميل
    const defaultButton = document.querySelector(`.style-btn[data-style="${activeStyle}"]`);
    if (defaultButton) {
        defaultButton.classList.add('active');
    }
    applyDecoration(); // تطبيق الزخرفة الافتراضية إذا كان هناك نص
});


// وظيفة زر النسخ
copyBtn.addEventListener('click', () => {
    const outputText = outputTextElement.textContent;
    if (outputText) {
        navigator.clipboard.writeText(outputText)
            .then(() => {
                copyBtn.textContent = 'تم النسخ!';
                setTimeout(() => {
                    copyBtn.textContent = 'نسخ';
                }, 2000);
            })
            .catch(err => {
                console.error('فشل في النسخ: ', err);
                // يمكن إضافة رسالة خطأ للمستخدم هنا
            });
    }
});

