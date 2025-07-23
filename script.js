// أنماط الزخرفة الكاملة
const textStyles = {
    "bold": {
        name: "Bold",
        uppercase: "𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭",
        lowercase: "𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇",
        numbers: "𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵𝟬"
    },
    "sans-serif": {
        name: "Sans-Serif",
        uppercase: "𝖠𝖡𝖢𝖣𝖤𝖥𝖦𝖧𝖨𝖩𝖪𝖫𝖬𝖭𝖮𝖯𝖰𝖱𝖲𝖳𝖴𝖵𝖶𝖷𝖸𝖹",
        lowercase: "𝖺𝖻𝖼𝖽𝖾𝖿𝗀𝗁𝗂𝗃𝗄𝗅𝗆𝗇𝗈𝗉𝗊𝗋𝗌𝗍𝗎𝗏𝗐𝗑𝗒𝗓",
        numbers: "𝟣𝟤𝟥𝟦𝟧𝟨𝟩𝟪𝟫𝟢"
    },
    "monospace": {
        name: "Monospace",
        uppercase: "𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉",
        lowercase: "𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣",
        numbers: "𝟷𝟸𝟹𝟺𝟻𝟼𝟽𝟾𝟿𝟶"
    },
    "double-struck": {
        name: "Double-Struck",
        uppercase: "𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ",
        lowercase: "𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫",
        numbers: "𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡𝟘"
    },
    "circled": {
        name: "Circled",
        uppercase: "ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ",
        lowercase: "ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ",
        numbers: "①②③④⑤⑥⑦⑧⑨⓪"
    }
};

// إنشاء خريطة الحروف
function createCharMap(style) {
    const map = {};
    const styleData = textStyles[style];
    
    // الحروف الكبيرة
    if (styleData.uppercase) {
        const baseA = 'A'.charCodeAt(0);
        for (let i = 0; i < 26; i++) {
            map[String.fromCharCode(baseA + i)] = styleData.uppercase[i];
        }
    }
    
    // الحروف الصغيرة
    if (styleData.lowercase) {
        const basea = 'a'.charCodeAt(0);
        for (let i = 0; i < 26; i++) {
            map[String.fromCharCode(basea + i)] = styleData.lowercase[i];
        }
    }
    
    // الأرقام
    if (styleData.numbers) {
        const base0 = '0'.charCodeAt(0);
        for (let i = 0; i < 10; i++) {
            map[String.fromCharCode(base0 + i)] = styleData.numbers[i];
        }
    }
    
    return map;
}

// زخرفة النص
function decorateText() {
    const input = document.getElementById("inputText").value;
    const style = document.getElementById("styleSelect").value;
    const charMap = createCharMap(style);
    
    let output = "";
    for (let char of input) {
        output += charMap[char] || char;
    }
    
    document.getElementById("outputText").textContent = output;
}

// نسخ النص
function copyToClipboard() {
    const outputText = document.getElementById("outputText");
    const range = document.createRange();
    range.selectNode(outputText);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
    
    const copyBtn = document.getElementById("copyBtn");
    copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
    copyBtn.style.background = "var(--success)";
    
    setTimeout(() => {
        copyBtn.innerHTML = '<i class="far fa-copy"></i> Copy';
        copyBtn.style.background = "";
    }, 2000);
}

// عداد الأحرف
document.getElementById("inputText").addEventListener("input", function() {
    document.getElementById("count").textContent = this.value.length;
});