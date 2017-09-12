import createRemoteActions from './utils/createRemoteActions';

const remoteConstants = createRemoteActions([
	'DASHBOARD_GET_STATE'
]);

const constants = {
	'DASHBOARD_SELECT_BLOCK': 'DASHBOARD_SELECT_BLOCK',
	'DASHBOARD_SELECT_TASK_STATUS': 'DASHBOARD_SELECT_TASK_STATUS'
};

export default Object.assign(remoteConstants, constants);
