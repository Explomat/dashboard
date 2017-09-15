import constants from '../constants';
import { dispatch } from '../store/dispatcher';
import { get } from '../utils/ajax';
import { url } from '../config';

export function getState(){
	dispatch({ type: constants.DASHBOARD_GET_STATE });

	const path = url.createPath({
		server_name: 'adaptation',
		action_name: 'Adaptations'
	});

	get(path)
	.then(resp => JSON.parse(resp))
	.then(data => {
		if (data.error){
			dispatch({
				type: constants.DASHBOARD_GET_STATE_FAILURE,
				error: data.error
			});
		} else {
			dispatch({
				type: constants.DASHBOARD_GET_STATE_SUCCESS,
				state: data
			});
		}
	})
	.catch(e => {
		dispatch({
			type: constants.DASHBOARD_GET_STATE_FAILURE,
			error: e.message
		});
	});
}

export function selectBlock(blockId){
	dispatch({
		type: constants.DASHBOARD_SELECT_BLOCK,
		blockId
	});
}

export function selectTaskStatus(taskStatus){
	dispatch({
		type: constants.DASHBOARD_SELECT_TASK_STATUS,
		taskStatus
	});
}
