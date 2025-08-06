const apiKey = "797455647864627339326c756e4142";

async function getArrivalInfo() {
  const stationName = document.getElementById("stationInput").value.trim();
  const resultDiv = document.getElementById("result");

  if (!stationName) {
    resultDiv.innerHTML = "🚨 역 이름을 입력해주세요.";
    return;
  }

  const originalUrl = `http://swopenapi.seoul.go.kr/api/subway/${apiKey}/json/realtimeStationArrival/0/5/${encodeURIComponent(stationName)}`;

  try {
    const proxiedUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(originalUrl)}`;

    const res = await fetch(proxiedUrl);
    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }
    const data = await res.json();

    console.log("받은 데이터:", data); 

    const list = data.realtimeArrivalList;
    if (!list || list.length === 0) {
      resultDiv.innerHTML = "❌ 도착 정보를 찾을 수 없습니다. (검색어 확인 또는 API 응답 확인)"; 
      return;
    }

    const sorted = list.slice().sort((a, b) => {
      const aTime = parseInt(a.barvlDt, 10);
      const bTime = parseInt(b.barvlDt, 10);
      if (isNaN(aTime)) return 1;
      if (isNaN(bTime)) return -1;
      return aTime - bTime;
    });

    resultDiv.innerHTML = sorted.map(item => {
      return `
        <div class="card">
          <p><strong>${item.trainLineNm}</strong> (${item.updnLine})</p>
          <p>도착예정: ${item.arvlMsg2}</p>
          <p>현재역: ${item.arvlMsg3}</p>
          <p>도착시간(초): ${item.barvlDt === "" ? "정보 없음" : item.barvlDt}</p>
        </div>
      `;
    }).join("");
  } catch (err) {
    console.error("에러 발생:", err);
    resultDiv.innerHTML = `⚠️ 정보를 불러오는 중 오류 발생: ${err.message}`;
  }
}
