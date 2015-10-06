//Author: Adam Suskin
//License: MIT

var last_id = {val: undefined};
var current_id = {val: undefined};
var tmp_id = {val: undefined};

function set_id_callback(id_to_update, tab) {
	id_to_update.val = tab.id;
}

function set_id_to_current(id_to_update) {
	chrome.tabs.query({active: true, lastFocusedWindow: true},
	function(tabs) {
		var tab = tabs[0];
		set_id_callback(id_to_update, tab);
	});
}

function update_id() {
	last_id.val = current_id.val;
	set_id_to_current(current_id);
}

function revert_tab() {
	set_id_to_current(tmp_id);
	if(tmp_id.val == current_id.val)
		chrome.tabs.update(last_id, {selected: true});
}

chrome.tabs.onActiveChanged.addListener(function(){
	update_id();
});

chrome.tabs.onRemoved.addListener(function(){
	revert_tab();
});
