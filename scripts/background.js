chrome.runtime.onMessage.addListener((id, sender, sendResponse) => {
  const url = new URL(
    `https://cdn-api-prd.sounds.com/api/search?sound_id=${id}`
  );

  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return sendResponse(data);
    });

  return true;
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    chrome.tabs.sendMessage(tabId, {
      url: changeInfo.url,
    });
  }
});
