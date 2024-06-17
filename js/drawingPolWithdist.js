let polyline = new naver.maps.Polyline({
    map: map,
    path: [],
    strokeColor: '#5347AA',
    strokeWeight: 5
});

let path = [];
let totalDistance = 0;
let isDrawing = false;

// 거리 계산 함수
function calculateDistance(path) {
    let distance = 0;
    for (let i = 0; i < path.length - 1; i++) {
        distance += path[i].distanceTo(path[i + 1]);
    }
    return distance;
}

// 지도 좌클릭 이벤트 추가 (폴리라인 경로 추가)
naver.maps.Event.addListener(map, 'click', function(e) {
    if (!isDrawing) return;

    path.push(e.latlng);
    polyline.setPath(path);

    if (path.length > 1) {
        totalDistance = calculateDistance(path);
        document.getElementById('distance').innerText = 'Total Distance: ' + (totalDistance / 1000).toFixed(2) + ' km';
    }
});

// 지도 우클릭 이벤트 추가 (폴리라인 그리기 멈춤)
naver.maps.Event.addListener(map, 'rightclick', function(e) {
    isDrawing = false;
});

// 시작 버튼 클릭 이벤트 추가
document.getElementById('startButton').addEventListener('click', function() {
    isDrawing = true;
    path = [];
    polyline.setPath(path);
    totalDistance = 0;
    document.getElementById('distance').innerText = '';
});

// 삭제 버튼 클릭 이벤트 추가
document.getElementById('deleteButton').addEventListener('click', function() {
    path = [];
    polyline.setPath(path);
    totalDistance = 0;
    document.getElementById('distance').innerText = '';
});
