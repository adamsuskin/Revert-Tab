//Author: Adam Suskin
//License: MIT

var last_id;
var current_id;
var tmp_id;

function set_id_to_current(id_to_update) {
	chrome.tabs.query({active: true,
							 lastFocusedWindow: true},
							 function(tabs) {
			id_to_update = tabs[0].id;
	});
}

function update_id() {
	last_id = current_id;
	set_id_to_current(current_id);
}

function revert_tab() {
	set_id_to_current(tmp_id);
	if(tmp_id == current_id)
		chrome.tabs.update(last_id, {selected: true});
}

chrome.tabs.onActiveChanged.addListener(function(){
	update_id();
});

chrome.tabs.onRemoved.addListener(function(){
	revert_tab();
});
