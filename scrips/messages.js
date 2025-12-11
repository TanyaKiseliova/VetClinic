export function showPanel(message, isSuccess = false) {
  const panel = document.getElementById("alertPanel");
  const msg = document.getElementById("alertMessage");
  const icon = document.getElementById("alertIcon");

  msg.textContent = message;

  if (isSuccess) {
    icon.classList.remove("hidden");
  } else {
    icon.classList.add("hidden");
  }

  panel.classList.remove("hidden");
}

document.getElementById("alertOkBtn").addEventListener("click", () => {
  document.getElementById("alertPanel").classList.add("hidden");
});
