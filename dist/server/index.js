<%
	var userID = curUserID;
	var CAREER_RESERVE_CODE = 'SM_AUTOMATIC_CARRER_RESERVE';

	function get_Adaptations(queryObjects){
		DropFormsCache('x-local://wt/web/x5__adaptation-dashboard/server/adapt.js');
		var _adapt = OpenCodeLib('x-local://wt/web/x5__adaptation-dashboard/server/adapt.js');
		DropFormsCache('x-local://wt/web/x5__adaptation-dashboard/server/adapt.js');
		var toJS = OpenCodeLib('x-local://wt/web/x5__adaptation-dashboard/server/toJS.js');

		var adaptId = queryObjects.HasProperty('adapt_id') ? queryObjects.adapt_id : null;
		if (adaptId != null){
			var adapt = ArrayOptFirstElem(
                XQuery("sql: \n\
					select \n\
					    cast(cr.\"id\" as varchar2(32)) \"id\", \n\
					    cr.\"status\", \n\
						cr.\"plan_readiness_date\", \n\
						cr.\"finish_date\", \n\
					    cls.\"name\" \"status_title\" \n\
					from \n\
					    \"career_reserves\" cr \n\
					inner join \n\
					    \"common.career_reserve155891339\" cls on cls.\"id\" = cr.\"status\" \n\
					where \n\
						cr.\"id\" = " + adaptId + " \n\
						and cr.\"code\" = '" + CAREER_RESERVE_CODE + "'"
				)
			);
			if (adapt != undefined) {
				return tools.object_to_text(_adapt.getState(toJS.xmlElemToJS(adapt), userID), 'json');
			}
			queryObjects.Request.SetRespStatus(404, 'Адаптация не найдена');
		}

		// var oadapts = [];
		// for (a in XQuery("sql:
		// 	select \n\
		// 		cast(cr.\"id\" as varchar2(32)) \"id\", \n\
		// 		cr.\"status\", \n\
		// 		cls.\"name\" \"status_title\" \n\
		// 	from \n\
		// 		\"career_reserves\" cr \n\
		// 	inner join \n\
		// 		\"common.career_reserve155891339\" cls on cls.\"id\" = cr.\"status\" \n\
		// 	where cr.\"person_id\" = " + userID
		// )){
		// 	oadapts.push(_adapt.getState(a, userID));
		// }
		//
		// return tools.object_to_text({
		// 	adapts: oadapts
		// }, 'json');
		var oadapt = ArrayOptFirstElem(
			XQuery("sql: \n\
				select \n\
					cast(cr.\"id\" as varchar2(32)) \"id\", \n\
					cr.\"status\", \n\
					cr.\"plan_readiness_date\", \n\
					cr.\"finish_date\", \n\
					cls.\"name\" \"status_title\" \n\
				from \n\
					\"career_reserves\" cr \n\
				inner join \n\
					\"common.career_reserve155891339\" cls on cls.\"id\" = cr.\"status\" \n\
				where \n\
					cr.\"person_id\" = " + userID + " \n\
					and cr.\"code\" = '" + CAREER_RESERVE_CODE + "'"
				)
		);
		if (oadapt != undefined){
			return tools.object_to_text(_adapt.getState(toJS.xmlElemToJS(oadapt), userID), 'json');
		}
		return tools.object_to_text({
			error: 'Не найдена адаптация'
		}, 'json');
	}
%>
