const apiKey = "797455647864627339326c756e4142"; // ← 여기에 실제 키 입력하세요

function getSubwayInfo(stationName = null) {
  const input = document.getElementById("stationNameInput");
  const name = stationName || input.value.trim();
  if (!name) {
    alert("역 이름을 입력하세요.");
    return;
  }

  fetch(`https://api.odcloud.kr/api/15067752/v1/uddi:8fd71f8f-fbe1-4c27-a849-171b16fbf0d8?page=1&perPage=1000&serviceKey=${apiKey}`)
    .then(res => res.json())
    .then(data => {
      const results = data.data.filter(item => item.지하철역명.includes(name));
      if (results.length === 0) {
        document.getElementById("result").innerText = `❌ "${name}"에 대한 도착 정보를 찾을 수 없습니다.`;
        return;
      }

      const formatted = results.map(item => {
        return `🚉 ${item.지하철역명}\n🕒 도착정보: ${item.도착정보 || '정보 없음'}\n`;
      }).join("\n");

      document.getElementById("result").innerText = formatted;
    })
    .catch(error => {
      document.getElementById("result").innerText = "⚠️ 정보를 불러오는 중 오류가 발생했습니다.";
      console.error(error);
    });
}

function searchStation(name) {
  document.getElementById("stationNameInput").value = name;
  getSubwayInfo(name);
}
