//Author: Adam Suskin
//License: MIT

last_url = 0;
this_url = 0;


function set_id_to_current(tab) {
	this_url = tab.id;
}

function update_id() {
	last_url = this_url;
	chrome.tabs.getSelected(set_id_to_current);
}

chrome.tabs.onActiveChanged.addListener(function(){
	update_id();
});

chrome.tabs.onRemoved.addListener(function(){
	chrome.tabs.update(last_url, {selected: true});
});