function getState(adapt, userID){

	function getSubIdByCode(code) {
		var sub = ArrayOptFirstElem(
			XQuery("sql:select \n\
					cast(s.\"id\" as varchar2(32)) \"id\" \n\
				from \n\
					\"subdivisions\" s \n\
				where \n\
					s.\"code\" = '" + code + "'")
		);
		return sub != undefined ? sub.id : null;
	}

	function findCollaboratorSub(cId, _subs){
		for (s in _subs){
			subId = getSubIdByCode(s.code);
			excludedSubs = s.GetOptProperty('excluded');
			if (subId != null){
				sqlStr = '';
				if (excludedSubs != undefined){
					for (es in excludedSubs){
						sqlStr += " and instr(\"path\", '" + getSubIdByCode(es.code) + "') = 0 ";
					}
				}
				if (ArrayOptFirstElem(
						XQuery("sql: with subs(sub_id) as \n\
							( \n\
								select \"id\"\n\
								from \n\
									(SELECT \n\
										SYS_CONNECT_BY_PATH ( s.\"id\", '->' ) \"path\", \n\
										s.\"id\" \n\
									FROM \n\
										\"subdivisions\" s \n\
									CONNECT BY PRIOR \n\
										s.\"id\" = s.\"parent_object_id\" \n\
									START WITH \n\
										s.\"id\"= '" + subId + "') \n\
									where \n\
										1 = 1 \n\ " + sqlStr + " \n\
							) \n\
							select \n\
								c.\"id\"\n\
							from \n\
								\"collaborators\" c \n\
							inner join \n\
								subs on subs.sub_id = c.\"position_parent_id\" \n\
							where c.\"id\" = '" + cId + "'")
					) != undefined
				) {
					return s;
				} else if (excludedSubs != undefined) {
					return findCollaboratorSub(cId, excludedSubs);
				}
			}
		}
	}

	function groupTasks(_tasks, _roles){
		var _groups = [];
		var sortedRoles = ArraySort(_roles, 'This.code', '+');
		for (r in sortedRoles){
			_courses = XQuery("sql: \n\
				select \n\
					cast(cs.\"id\" as varchar2(32)) \"course_id\" \n\
				from \n\
					\"courses\" cs \n\
				inner join \n\
					\"course\" c on c.\"id\" = cs.\"id\" \n\
				inner join \n\
					xmltable( \n\
						'/course/role_id' \n\
						passing c.\"data\" \n\
						columns \"role_id\" varchar(32) path 'text()' \n\
					) q on (1=1) \n\
				where q.\"role_id\" = " + r.id
			);
			gtasks = ArrayIntersect(_tasks, _courses, "Int(This.object_id)", "Int(This.course_id)");
			_groups.push({
				id: r.id,
				name: r.name,
				tasks: gtasks
			});
		}
		return _groups;
	}

	DropFormsCache('x-local://wt/web/x5__adaptation-dashboard/server/block.js');
	var _block = OpenCodeLib('x-local://wt/web/x5__adaptation-dashboard/server/block.js');

	var SUBS = [
		{
			code: '51890125',
			tdpCode: 'SM_ADAPTATION',
			roleId: 6462655338452114041,
			excluded: [
				{
					code: '52031108',
					tdpCode: 'SM_ADAPTATION_ZAKAZFOOD',
					roleId: 6462655453772009511
				}
			]
		}
	];

	adapt = adapt == undefined ? {} : adapt;
	var pDate = adapt.GetOptProperty('plan_readiness_date') != null ? StrLongDate(Date(adapt.plan_readiness_date)) : '';
	var fDate = adapt.GetOptProperty('finish_date') != null ? StrLongDate(Date(adapt.finish_date)) : '';
	var obj = {
		id: adapt.GetOptProperty('id'),
		status: adapt.GetOptProperty('status'),
		statusTitle: adapt.GetOptProperty('status_title'),
		planReadinessDate: pDate,
		finishDate: fDate,
		blocks: []
	};
	var sub = findCollaboratorSub(userID, SUBS);
	var crDoc = OpenDoc(UrlFromDocID(Int(adapt.id)));

	var pos = ArrayOptFirstElem(
		XQuery("for $el in roles where $el/parent_role_id = " + sub.roleId + " and $el/name = '" + crDoc.TopElem.person_id.sd.position_name + "' return $el")
	);
	if (pos == undefined){
		return obj;
	}

	var blocks = groupTasks(
		crDoc.TopElem.tasks,
		XQuery("for $el in roles where $el/parent_role_id = " + pos.id + " return $el")
	);

	if (blocks.length == 0){
		return obj;
	}

	var oblocks = [];
	for (b in blocks){
		oblocks.push(_block.getState(b));
	}
	obj.blocks = oblocks;
	return obj;
}
