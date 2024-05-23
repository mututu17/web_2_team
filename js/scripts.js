document.addEventListener('DOMContentLoaded', () => {
    const comboBoxes = document.querySelectorAll('.combo-box');

    comboBoxes.forEach(comboBox => {
        comboBox.addEventListener('change', () => {
            const value = comboBox.options[comboBox.selectedIndex].text;
            const spanId = comboBox.id + '-span';
            const spanElement = document.getElementById(spanId);
            spanElement.innerText = value;
        });
    });
});

function toggleNav() {
    var sidebar = document.getElementById("sidebar");
    var button = document.querySelector(".toggle");
    if (sidebar.style.width === "200px") {
        button.innerText = "열기";
        sidebar.style.width = "20px";
    } else {
        button.innerText = "닫기";
        sidebar.style.width = "200px";
    }
}
document.querySelectorAll('.combo-box').forEach(function(select) {
    select.addEventListener('change', function() {
        var selectedOption = select.options[select.selectedIndex].text;
        var link = document.getElementById('link');
        var linkT = document.getElementById('linkT');
        var image = document.getElementById('image');

        switch(select.id) {
            case '목적지':
                switch(selectedOption) {
                    case '광안리':
                        link.href = 'https://www.visitbusan.net/kr/index.do?menuCd=DOM_000000201001001000&uc_seq=377&lang_cd=ko';
                        linkT.href = 'https://www.visitbusan.net/kr/index.do?menuCd=DOM_000000201001001000&uc_seq=377&lang_cd=ko';
                        image.src = '../images/광안리.png';
                        break;
                    case '해운대':
                        link.href = 'https://www.visitbusan.net/kr/index.do?menuCd=DOM_000000201001001000&uc_seq=373&lang_cd=ko';
                        linkT.href = 'https://www.visitbusan.net/kr/index.do?menuCd=DOM_000000201001001000&uc_seq=373&lang_cd=ko';
                        image.src = '../images/해운대.png';
                        break;
                    case '송정':
                        link.href = 'https://www.visitbusan.net/kr/index.do?menuCd=DOM_000000201001001000&uc_seq=280&lang_cd=ko';
                        linkT.href = 'https://www.visitbusan.net/kr/index.do?menuCd=DOM_000000201001001000&uc_seq=280&lang_cd=ko';
                        image.src = '../images/송정.png';
                        break;
                    case '부경대':
                        link.href = 'https://iphak.pknu.ac.kr/pknu/index.htm';
                        linkT.href = 'https://iphak.pknu.ac.kr/pknu/index.htm';
                        image.src = '../images/부경대.png';
                        break;
                    default:
                        link.href = '#';
                        linkT.href = '#';
                        image.src = '#';
                        break;
                }
                break;
        }
    });
});