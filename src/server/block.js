function getState(block){
	DropFormsCache('x-local://wt/web/x5__adaptation-dashboard/server/task.js');
	var _task = OpenCodeLib('x-local://wt/web/x5__adaptation-dashboard/server/task.js');
	DropFormsCache('x-local://wt/web/x5__adaptation-dashboard/server/toJS.js');
	var _toJS = OpenCodeLib('x-local://wt/web/x5__adaptation-dashboard/server/toJS.js');

	block = block == undefined ? {} : block;
	block.tasks = block.GetOptProperty('tasks') == undefined ? [] : block.tasks;
	var otasks = [];

	for (t in block.tasks){
		otasks.push(_task.getState(_toJS.xmlElemToJS(t)));
	}

	return {
		id: String(block.GetOptProperty('id')),
		name: String(block.GetOptProperty('name')),
		tasks: otasks
	}
}
