const apiKey = "797455647864627339326c756e4142";

// 입력창을 통한 도착정보
async function getArrivalInfo() {
  const stationName = document.getElementById("stationInput").value.trim();
  await fetchArrivalInfo(stationName);
}

// 버튼 클릭으로 조회
async function getArrivalInfoByClick(stationName) {
  document.getElementById("stationInput").value = stationName;
  await fetchArrivalInfo(stationName);
}

// 실제 API 호출 함수
async function fetchArrivalInfo(stationName) {
  const resultDiv = document.getElementById("result");

  if (!stationName) {
    resultDiv.innerHTML = "🚨 역 이름을 입력해주세요.";
    return;
  }

  const originalUrl = `http://swopenapi.seoul.go.kr/api/subway/${797455647864627339326c756e4142}/json/realtimeStationArrival/0/5/${encodeURIComponent(stationName)}`;
  const proxiedUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(originalUrl)}`;

  try {
    const res = await fetch(proxiedUrl);
    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }

    const data = await res.json();
    const list = data.realtimeArrivalList;

    if (!list || list.length === 0) {
      resultDiv.innerHTML = "❌ 도착 정보를 찾을 수 없습니다.";
      return;
    }

    const sorted = list.sort((a, b) => parseInt(a.barvlDt) - parseInt(b.barvlDt));
    resultDiv.innerHTML = sorted.map(item => `
      <div class="card">
        <p><strong>${item.trainLineNm}</strong> (${item.updnLine})</p>
        <p>도착예정: ${item.arvlMsg2}</p>
        <p>현재역: ${item.arvlMsg3}</p>
        <p>도착시간(초): ${item.barvlDt || "정보 없음"}</p>
      </div>
    `).join("");
  } catch (err) {
    console.error("에러 발생:", err);
    resultDiv.innerHTML = `⚠️ 정보를 불러오는 중 오류 발생: ${err.message}`;
  }
}
