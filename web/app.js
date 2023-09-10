document.getElementById("checkIpButton").addEventListener("click", async () => {
  try {
    const response = await fetch("http://localhost:3000/ip");
    const data = await response.text();
    document.getElementById("result").innerText = data;
  } catch (error) {
    console.error("Error fetching IP and port:", error);
    document.getElementById("result").innerText = "Error fetching data";
  }
});
