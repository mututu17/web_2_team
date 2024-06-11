const getRouteInfo = async (index) => {
    const route = await fetch("./route.json").then((response) =>
        response.json()
    );
    return route[index];
};

var polylineArray = [];

// 자전거 도로 클릭시 변화하는 코드를 함수로 정의
function addPolylineEvents(polyline, bikeload) {
    const highlight = () => polyline.setOptions({ strokeWeight: 20 });
    const unhighlight = () => polyline.setOptions({ strokeWeight: 6 });

    naver.maps.Event.addListener(polyline, "mouseover", highlight);
    naver.maps.Event.addListener(polyline, "mouseout", unhighlight);
    naver.maps.Event.addListener(polyline, "mousedown", highlight);
    naver.maps.Event.addListener(polyline, "mouseup", unhighlight);
}

function addPolyline(map, polylinePath, index) {
    getRouteInfo(index).then((res) => {
        const {
            gugunNm,
            startSpot,
            endSpot,
            total,
            url,
            attraction,
            link,
            describe,
            scene
        } = res;

        // 테마에 따른 색상 값을 받는 변수
        /*공원, 강변, 바다, 도심*/
        let colorValue = "";
        if (scene === "공원") {
            colorValue = "forestgreen"      // forestgreen
        }
        else if (scene === "강변") {
            colorValue = "cyan"      // mediumturquoise	
        }
        else if (scene === "바다") {
            colorValue = "midnightblue"      // midnightblue
        }
        
        else if (scene === "도심") {
            colorValue = "cadetblue"      
        }

        // 폴리라인 추가
        var polyline = new naver.maps.Polyline({
            path: polylinePath,
            strokeColor: colorValue,
            strokeOpacity: 0.8,
            strokeWeight: 6,
            zIndex: 2,
            clickable: true,
            map: map,
        });
        // polyline 객체를 배열에 추가
        polylineArray.push(polyline);

        // 폴리라인 이벤트 추가
        addPolylineEvents(polyline, { index }); //polyline-data의 해당 인덱스 Json값 불러오기

        naver.maps.Event.addListener(polyline, "click", function () {
            document.querySelector("#image").src = url;
            document.querySelector("#attraction").innerHTML = attraction;
            document.querySelector("#link").href = link;
            document.querySelectorAll("span.gugunNm").forEach((element) => {
                element.innerHTML = gugunNm;
            });

            // 부산광역시 ...구/군 제거 로직
            let start = startSpot.replace("부산광역시 ", "").split(" ");
            if (start[0].includes("구") || start[0].includes("군")) {
                start.shift();
                start = start.join(" ");
            }

            let end = endSpot.replace("부산광역시 ", "").split(" ");
            if (end[0].includes("구") || end[0].includes("군")) {
                end.shift();
                end = end.join(" ");
            }

            document.querySelector("span.startSpot").innerHTML = start;
            document.querySelector("span.endSpot").innerHTML = end;
            document.querySelector("span.total").innerHTML = total;
            document.querySelector("p.describe").innerHTML = describe;
        });
    });
}

var desktopMap, mobileMap;
var bicycleLayer = new naver.maps.BicycleLayer(); // 자전거 레이어 표현 변수

function initMap() {
    var mapOptions = {
        center: new naver.maps.LatLng(35.18097447459887, 129.11777658205753),
    };

    // 데스크톱 및 모바일 버전 지도 변수 초기화
    desktopMap = new naver.maps.Map("map-desktop", mapOptions);
    mobileMap = new naver.maps.Map("map-mobile", mapOptions);

    // 자전거 레이어 및 폴리라인 추가
    const addMapLayers = (map) => {
        bicycleLayer.setMap(map);

        for (let i = 0; i < bikeRoad.length; i++) {
            const road = bikeRoad[i];
            addPolyline(map, road, i);
        }
    };

    naver.maps.Event.once(desktopMap, "init", () => addMapLayers(desktopMap));
    naver.maps.Event.once(mobileMap, "init", () => addMapLayers(mobileMap));
}

$(document).ready(initMap);

$(window).resize(() => {
    if ($(window).width() <= 768) {
        naver.maps.Event.trigger(mobileMap, "resize");
    } else {
        naver.maps.Event.trigger(desktopMap, "resize");
    }
});

// 그리기 기능 관련
naver.maps.onJSContentLoaded = () => {
    new naver.maps.drawing.DrawingManager({ map: desktopMap });
    new naver.maps.drawing.DrawingManager({ map: mobileMap });
};

// 필터 관련 코드 시작
$("#거리순").change(function () {
    var filters = [];

    $(".combo-box").each(function () {
        filters.push($(this).val());
    });
    mapFilter(filters);
});

$("#장소").change(function () {
    var filters = [];

    $(".combo-box").each(function () {
        filters.push($(this).val());
    });
    mapFilter(filters);
});

$("#풍경").change(function () {
    var filters = [];
    $(".combo-box").each(function () {
        filters.push($(this).val());
    });
    mapFilter(filters);
});

function mapFilter(filters) {
    for (let i = 0; i < bikeRoad.length; i++) {
        getRouteInfo(i).then((res) => {
            const { gugunNm, total, scene } = res;
            // 필터에서 받은 값
            const distRaw = filters[0];
            const placement = filters[1];
            const scenary = filters[2];

            // distance logic 시작
            const totalDist = Number(total);
            let distance = distRaw.split(" ");
            const startDist = Number(distance[0]);
            const endDist = Number(distance[2]);

            // data의 total 값이 포함되는가를 묻는 로직
            let isContain = false;
            if (distance[1] === "-") {
                isContain = Boolean(
                    totalDist >= startDist && totalDist <= endDist
                );
            } else if (distance[1] === "~") {
                isContain = Boolean(totalDist >= startDist);
            }

            // 필터링 로직
            if (
                (distRaw === "" || isContain) &&
                (placement === "" || placement === gugunNm) &&
                (scenary === "" || scenary === scene)
            ) {
                polylineArray[i].setVisible(true);
            } else {
                polylineArray[i].setVisible(false);
            }
        });
    }
}

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
$("#slide-open").on("click", function () {
    //버튼 클릭 시

    if ($("#burgur").hasClass("on")) {
        //메뉴가 X 상태일때

        $("#burgur").removeClass("on"); //메뉴 원복
        $("#filter").removeClass("on"); //슬라이드 메뉴 원복
    } else {
        $("#burgur").addClass("on"); //메뉴 3줄
        $("#filter").addClass("on"); //슬라이드 메뉴 감춤
    }
});
