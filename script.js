document.addEventListener("DOMContentLoaded", () => {
  const stations = [
    "시청", "을지로입구", "을지로3가", "을지로4가", "동대문역사문화공원",
    "신당", "상왕십리", "왕십리", "한양대", "뚝섬", "성수", "건대입구",
    "구의", "강변", "잠실나루", "잠실", "잠실새내", "종합운동장",
    "삼성", "선릉", "역삼", "강남", "교대", "서초", "방배", "사당",
    "낙성대", "서울대입구", "봉천", "신림", "신대방", "구로디지털단지",
    "대림", "신도림", "문래", "영등포구청", "당산", "합정", "홍대입구",
    "신촌", "이대", "아현", "충정로"
  ];

  const buttonsContainer = document.getElementById("station-buttons");

  stations.forEach(name => {
    const button = document.createElement("button");
    button.textContent = name;
    button.classList.add("station-button");
    button.addEventListener("click", () => fetchArrivalInfo(name));
    buttonsContainer.appendChild(button);
  });

  async function fetchArrivalInfo(stationName) {
    const apiKey = "document.addEventListener("DOMContentLoaded", () => {
  const stations = [
    "시청", "을지로입구", "을지로3가", "을지로4가", "동대문역사문화공원",
    "신당", "상왕십리", "왕십리", "한양대", "뚝섬", "성수", "건대입구",
    "구의", "강변", "잠실나루", "잠실", "잠실새내", "종합운동장",
    "삼성", "선릉", "역삼", "강남", "교대", "서초", "방배", "사당",
    "낙성대", "서울대입구", "봉천", "신림", "신대방", "구로디지털단지",
    "대림", "신도림", "문래", "영등포구청", "당산", "합정", "홍대입구",
    "신촌", "이대", "아현", "충정로"
  ];

  const buttonsContainer = document.getElementById("station-buttons");

  stations.forEach(name => {
    const button = document.createElement("button");
    button.textContent = name;
    button.classList.add("station-button");
    button.addEventListener("click", () => fetchArrivalInfo(name));
    buttonsContainer.appendChild(button);
  });

  async function fetchArrivalInfo(stationName) {
    const apiKey = "여기에_본인_API_KEY_입력";
    const url = `https://api.odcloud.kr/api/15030089/v1/uddi:6331494e-1f04-44ba-a2a6-56a256bfa0ce_201909051038?page=1&perPage=10&serviceKey=${apiKey}`;
    
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `<p>${stationName} 도착 정보를 불러오는 중...</p>`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      const filtered = data.data.filter(item => item.지하철역 === stationName);
      
      if (filtered.length === 0) {
        resultDiv.innerHTML = `<p>도착 정보가 없습니다.</p>`;
        return;
      }

      resultDiv.innerHTML = `
        <h2>${stationName} 도착 정보</h2>
        <ul>
          ${filtered.map(item => `<li>${item.도착정보 || '정보 없음'}</li>`).join('')}
        </ul>
      `;
    } catch (error) {
      resultDiv.innerHTML = `<p>정보를 불러오는 중 오류가 발생했습니다.</p>`;
      console.error(error);
    }
  }
});
";
    const url = `https://api.odcloud.kr/api/15030089/v1/uddi:6331494e-1f04-44ba-a2a6-56a256bfa0ce_201909051038?page=1&perPage=10&serviceKey=${apiKey}`;
    
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `<p>${stationName} 도착 정보를 불러오는 중...</p>`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      const filtered = data.data.filter(item => item.지하철역 === stationName);
      
      if (filtered.length === 0) {
        resultDiv.innerHTML = `<p>도착 정보가 없습니다.</p>`;
        return;
      }

      resultDiv.innerHTML = `
        <h2>${stationName} 도착 정보</h2>
        <ul>
          ${filtered.map(item => `<li>${item.도착정보 || '정보 없음'}</li>`).join('')}
        </ul>
      `;
    } catch (error) {
      resultDiv.innerHTML = `<p>정보를 불러오는 중 오류가 발생했습니다.</p>`;
      console.error(error);
    }
  }
});
