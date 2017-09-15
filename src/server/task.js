function getState(task){
	task = task == undefined ? {} : task;

	var obj = {
		id: task.GetOptProperty('id'),
		name: task.GetOptProperty('name'),
		status: '6',
		statusTitle: 'Планируется'
	};

	var el = ArrayOptFirstElem(XQuery("sql: \n\
		select \n\
			cast(ls.\"id\" as varchar2(32)) \"id\",\n\
			ls.\"start_usage_date\",\n\
			ls.\"last_usage_date\",\n\
			ls.\"state_id\",\n\
			clss.\"name\" \"status_title\"\n\
		from \n\
			\"learnings\" ls\n\
		inner join\n\
			\"common.learning_states\" clss on clss.\"id\" = ls.\"state_id\" \n\
		where ls.\"active_learning_id\" = '" + task.GetOptProperty('active_learning_id') + "' \n\
		union \n\
		select \n\
			cast(als.\"id\" as varchar2(32)) \"id\",\n\
			als.\"start_usage_date\",\n\
			null \"last_usage_date\",\n\
			als.\"state_id\",\n\
			clss.\"name\" \"status_title\"\n\
		from \n\
			\"active_learnings\" als\n\
		inner join\n\
			\"common.learning_states\" clss on clss.\"id\" = als.\"state_id\"\n\
		where als.\"id\" = '" + task.GetOptProperty('active_learning_id') + "'"));

	if (el == undefined){
		return obj;
	}

	obj.href = (el.state_id != 0 && el.state_id != 1 && el.state_id != 5) ?
		'/view_doc.html?mode=learning_stat&doc_id=&object_id=' + el.id :
		'/view_doc.html?mode=learning_proc&doc_id=&object_id=' + el.id;
	obj.startUsageDate = DateNewTime(el.start_usage_date);
	obj.lastUsageDate = DateNewTime(el.last_usage_date);
	obj.status = String(el.state_id);
	obj.statusTitle = String(el.status_title);

	return obj;
}
