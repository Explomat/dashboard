import { subscribe, emit } from '../utils/eventEmmiter';
import { register } from './dispatcher';
import constants from '../constants';

let state = {
	id: null,
	status: null,
	statusTitle: '',
	planReadinessDate: '',
	finishDate: '',
	blocks: [],
	activeBlock: null,
	tasks: [],
	filteredTasks: [],
	taskStatuses: {},
	activeTaskStatus: null,
	isFetching: false,
	error: null
};

export function addEventListener(cb){
	subscribe('update', cb);
}

register(function dashboardStore(action){
	switch (action.type){
		case constants.DASHBOARD_GET_STATE: {
			state = {
				...state,
				isFetching: true
			};
			emit('update', state);
			break;
		}
		case constants.DASHBOARD_GET_STATE_SUCCESS: {
			const countTasksByStatus = {};
			const tasks = [];
			const taskStatuses = {};
			action.state.blocks.reduce((f, s) => {
				const t = f.sort((a, b) => {
					if (a.statusTitle > b.statusTitle) {
						return 1;
					}
					if (a.statusTitle < b.statusTitle) {
						return -1;
					}
					return 0;
				});
				return t.concat(s.tasks || []);
			}, []).forEach(c => {
				if (!countTasksByStatus[c.status]) {
					countTasksByStatus[c.status] = 0;
				}
				countTasksByStatus[c.status]++;

				tasks.push(c);
				taskStatuses[c.status] = c.statusTitle;
			});
			const activeTaskStatus = Object.keys(taskStatuses)[0];
			const filteredTasks = tasks.filter(t => t.status === activeTaskStatus);
			state = {
				...state,
				...action.state,
				tasks,
				filteredTasks,
				countTasksByStatus,
				taskStatuses,
				activeTaskStatus,
				activeBlock: action.state.blocks[0],
				isFetching: false
			};
			emit('update', state);
			break;
		}
		case constants.DASHBOARD_GET_STATE_FAILURE: {
			state = {
				...state,
				error: action.error,
				isFetching: false
			};
			emit('update', state);
			break;
		}
		case constants.DASHBOARD_SELECT_BLOCK: {
			state = {
				...state,
				activeBlock: state.blocks.filter(b => b.id.toString() === action.blockId.toString())[0]
			};
			emit('update', state);
			break;
		}
		case constants.DASHBOARD_SELECT_TASK_STATUS: {
			state = {
				...state,
				activeTaskStatus: action.taskStatus,
				filteredTasks: state.tasks.filter(t => t.status === action.taskStatus)
			};
			emit('update', state);
			break;
		}
		default:
			return;
	}
});
