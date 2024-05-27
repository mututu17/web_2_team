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

// ==================================================================================모바일 슬라이드 애니매이션 JQUERY===================================================================================================
// 버튼 애니메이션 jQuery
// $(function(){
//     $("#slide-open").click(function(){

//         if($("#burgur").hasClass('on')){
//         //메뉴버튼이 "on" 클래스를 포함할 경우 "on"클래스를 제거
//           $("#burgur").removeClass('on');
//         } else{
//         //메뉴버튼이 "on" 클래스를 포함하지 않을 경우 "on"클래스를 추가
//           $("#burgur").addClass('on');
        
//         }
//     });
// });

// 슬라이드 애니메이션 
$("#slide-open").on("click", function(){  //버튼 클릭 시

    if($("#burgur").hasClass('on')){ //메뉴가 X 상태일때

      $("#burgur").removeClass('on'); //메뉴 원복
      $("#filter").removeClass('on');  //슬라이드 메뉴 원복
    
    } else{

      $("#burgur").addClass('on');    //메뉴 3줄
      $("#filter").addClass('on');     //슬라이드 메뉴 감춤
    
    }
});

//필터 사이드바 드롭다운
// scripts.js
$(document).ready(function() {
    $('.filter-dropdown-btn').on('click', function() {
        $(this).toggleClass('active');
        $(this).next('.filter-dropdown-container').slideToggle();
    });
});