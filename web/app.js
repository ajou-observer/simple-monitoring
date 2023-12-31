document.getElementById("checkIpButton").addEventListener("click", async () => {
  try {
    const response = await fetch("http://43.201.32.183:30040/ip");
    const data = await response.text();
    document.getElementById("result").innerText = data;
  } catch (error) {
    console.error("Error fetching IP and port:", error);
    document.getElementById("result").innerText = "Error fetching data";
  }
});

document.getElementById("getLogsButton").addEventListener("click", async () => {
  try {
    const response = await fetch("http://43.201.32.183:30040/logs");
    const data = await response.json();
    const logsElement = document.getElementById("logs");

    let logsHTML = "<ul>";
    data.forEach((log) => {
      logsHTML += `<li>ID: ${log.id}, IP: ${
        log.queriedIP
      }, Timestamp: ${new Date(log.timestamp).toLocaleString()}</li>`;
    });
    logsHTML += "</ul>";

    logsElement.innerHTML = logsHTML;
  } catch (error) {
    console.error("Error fetching logs:", error);
    document.getElementById("logs").innerText = "Error fetching logs";
  }
});
