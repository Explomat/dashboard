import constants from '../constants';
import { dispatch } from '../store/dispatcher';

export function getState(){
	dispatch({ type: constants.DASHBOARD_GET_STATE });

	setTimeout(() => {
		dispatch({
			type: constants.DASHBOARD_GET_STATE_SUCCESS,
			state: {
				status: 'plan', //plan, active, passed, failed, cancel
				statusTitle: 'Планируется',
				planReadinessDate: '31.08.2017',
				blocks: [
					{
						id: '0',
						name: 'Block 1',
						tasks: [
							{
								id: '1',
								name: 'Доход сотрудника магазина. Положение об оплате труда и премировании.',
								href: '/test1',
								startUsageDate: '31.08.2017',
								lastUsageDate: '31.08.2017',
								status: 'plan',
								statusTitle: 'Планируется'
							},
							{
								id: '11',
								name: 'Course 1',
								href: '/test1',
								startUsageDate: '31.08.2017',
								lastUsageDate: '',
								status: 'active',
								statusTitle: 'В работе'
							},
							{
								id: '111',
								name: 'Course 2',
								href: '/test1',
								startUsageDate: '31.08.2017',
								lastUsageDate: '31.08.2017',
								status: 'passed',
								statusTitle: 'Выполнен успешно'
							},
							{
								id: '1111',
								name: 'Course 3',
								href: '/test1',
								startUsageDate: '31.08.2017',
								lastUsageDate: '',
								status: 'failed',
								statusTitle: 'Выполнен неуспешно'
							},
							{
								id: '222',
								name: 'Course 4',
								href: '/test1',
								startUsageDate: '31.08.2017',
								lastUsageDate: '31.08.2017',
								status: 'cancel',
								statusTitle: 'Отменен'
							},
							{
								id: '22222',
								name: 'Course 5',
								href: '/test1',
								startUsageDate: '31.08.2017',
								lastUsageDate: '31.08.2017',
								status: 'plan',
								statusTitle: 'Планируется'
							}
						]
					},
					{
						id: '1',
						name: 'Block 2',
						tasks: [
							{
								id: '2',
								name: 'Course 6',
								href: '/test1',
								startUsageDate: '31.08.2017',
								lastUsageDate: '31.08.2017',
								status: 'passed',
								statusTitle: 'Выполнен успешно'
							}
						]
					},
					{
						id: '2',
						name: 'Block 3',
						tasks: [
							{
								id: '3',
								name: 'Course 7',
								href: '/test1',
								startUsageDate: '31.08.2017',
								lastUsageDate: '31.08.2017',
								status: 'cancel',
								statusTitle: 'Отменен'
							}
						]
					},
					{
						id: '6',
						name: 'Block 4',
						tasks: [
							{
								id: '33333',
								name: 'Course 8',
								href: '/test1',
								startUsageDate: '31.08.2017',
								lastUsageDate: '31.08.2017',
								status: 'cancel',
								statusTitle: 'Отменен'
							}
						]
					}
				]
			}
		});
	}, 300);
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
