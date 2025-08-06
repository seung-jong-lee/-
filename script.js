const apiKey = "797455647864627339326c756e4142";

async function getArrivalInfo() {
  const stationName = document.getElementById("stationInput").value.trim();
  const resultDiv = document.getElementById("result");

  if (!stationName) {
    resultDiv.innerHTML = "🚨 역 이름을 입력해주세요.";
    return;
  }

  const url = `https://swopenapi.seoul.go.kr/api/subway/797455647864627339326c756e4142/json/realtimeStationArrival/0/5/강남`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!data || !data.realtimeArrivalList || data.realtimeArrivalList.length === 0) {
      resultDiv.innerHTML = "❌ 도착 정보를 찾을 수 없습니다.";
      return;
    }

    resultDiv.innerHTML = data.realtimeArrivalList.map(item => `
      <p><strong>${item.trainLineNm}</strong> - ${item.arvlMsg2}</p>
    `).join("");
  } catch (err) {
    console.error(err);
    resultDiv.innerHTML = "⚠️ 정보를 불러오는 중 오류 발생.";
  }
}
