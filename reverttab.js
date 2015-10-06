//Author: Adam Suskin
//License: MIT

var last_id;
var this_id;
var tmp_id;

function set_id_to_current(tab) {
	this_id = tab.id;
}

function check_equal(tab) {
	return chr
}

function update_id() {
	last_id = this_id;
	chrome.tabs.query({active: true,
							 lastFocusedWindow: true},
							 function(tabs) {
			this_id = tabs[0].id;
	});
}

function revert_tab() {
	chrome.tabs.query({active: true,
							 lastFocusedWindow: true},
							 function(tabs) {
			tmp_id = tabs[0].id;
	});
	if(tmp_id == this_id)
		chrome.tabs.update(last_id, {selected: true});
}

chrome.tabs.onActiveChanged.addListener(function(){
	update_id();
});

chrome.tabs.onRemoved.addListener(function(){
	revert_tab();
});
