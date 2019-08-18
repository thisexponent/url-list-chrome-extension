// when SAVE button is clicked, save url to storage
function save(){
  chrome.tabs.query({'active': true}, function (tabs) {
    var url = tabs[0].url;
    var title = tabs[0].title;
    var now = Date.now();
    var obj = {};
    obj[now] = url;
    chrome.storage.local.set(obj, function() {
      document.getElementById('txt').textContent = title + " 주소가 저장되었습니다! 😍";
    });
  });
}

// when DOWNLOAD button is clicked, download json file
function downloadFile(){
  chrome.storage.local.get(null, function(items) {
    var result = JSON.stringify(items);
    var url_result = 'data:application/json;base64,' + btoa(result);
    chrome.downloads.download({
      url: url_result,
      filename: 'hunt-urls.json'
    });
    // clear storage
    chrome.storage.local.clear()
  });
}


document.getElementById('save').onclick = save;
document.getElementById('download').onclick = downloadFile;

