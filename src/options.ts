function saveOptions() {
  const el = document.getElementById('urls');
  const urls = el instanceof HTMLTextAreaElement ? el.value.split('\n') : null;
  console.log({urls})
  browser.storage.local.set({blockedUrls: urls});
}

function restoreOptions() {
  browser.storage.local.get({blockedUrls: []}).then(function(result) {
    console.log({result})
    const el = document.getElementById('urls');
    if(el instanceof HTMLTextAreaElement) {
      el.value = result.blockedUrls.join('\n');
    }
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save')?.addEventListener('click', saveOptions);
console.log("options.tsaaa")
