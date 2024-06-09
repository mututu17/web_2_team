// 자동 필터 항목 만들기
import data from "../template/route.json" assert { type: "json" };

// FUNCTION DEFINE
const makeHtmlElement = function (tagName, ...attr) {
    const element = document.createElement(tagName);
    for (let prop of attr) {
        const [key, value] = Object.entries(prop)[0];
        if (key == "textContent" || key == "innerText") {
            element.textContent = value;
        } else {
            element.setAttribute(key, value);
        }
    }
    return element;
};

// INIT VARIABLE
const placeElements = document.querySelector("#장소");

let isExist = []; // 중복 여부 판정 위한 임시 배열

// INITIAL JS
const buttonList = data.map((d) => {
    const placeText = d.gugunNm.replace("부산광역시 ", "");
    if (!(isExist.includes(placeText))) {
        const htmlTag = makeHtmlElement(
            "option",
            { value: d.gugunNm },
            { textContent: placeText }
        );
        isExist.push(placeText);
        // 요소 추가
        placeElements.append(htmlTag);
    }
});
