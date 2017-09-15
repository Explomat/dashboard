import constants from '../constants';
import { dispatch } from '../store/dispatcher';

export function getState(){
	dispatch({ type: constants.DASHBOARD_GET_STATE });

	setTimeout(() => {
		dispatch({
			/*type: constants.DASHBOARD_GET_STATE_FAILURE,
			error: 'test'*/
			type: constants.DASHBOARD_GET_STATE_SUCCESS,
			state: {
				'id': '6464270415073387402',
				'status': 'active',
				'statusTitle': 'В работе',
				'planReadinessDate': '10 декабря 2017 г.',
				'finishDate': '',
				'blocks': [
					{
						'id': '6462948166347589565',
						'name': 'Блок 1. Вводный курс',
						'tasks': [
							{
								'id': 'by8gyc',
								'name': 'Адаптация. Модуль 1. Вводный инструктаж по охране труда',
								'status': '0',
								'statusTitle': 'Назначен',
								'href': '/view_doc.html?mode=learning_proc&amp;doc_id=&amp;object_id=6464270414524187340',
								'startUsageDate': '2017-09-11',
								'lastUsageDate': ''
							},
							{
								'id': 'u07x1l',
								'name': 'Адаптация. Модуль 1. Основы санитарии и гигиены',
								'status': '0',
								'statusTitle': 'Назначен',
								'href': '/view_doc.html?mode=learning_proc&amp;doc_id=&amp;object_id=6464456957117072316',
								'startUsageDate': '2017-09-11',
								'lastUsageDate': ''
							}
						]
					},
					{
						'id': '6462948166354214222',
						'name': 'Блок 2. Бизнес-процессы',
						'tasks': [
							{
								'id': 'agpit4',
								'name': 'Адаптация. Модуль 2. Плановые показатели работы магазина',
								'status': '6',
								'statusTitle': 'Планируется'
							},
							{
								'id': 'lugdxl',
								'name': 'Адаптация. Модуль 2. Приемка-передача товара с РЦ для СПП',
								'status': '6',
								'statusTitle': 'Планируется'
							},
							{
								'id': 'ulb49r',
								'name': 'Адаптация. Модуль 1. Принципы ХАССП',
								'status': '6',
								'statusTitle': 'Планируется'
							},
							{
								'id': 'hyboxj',
								'name': 'Адаптация. Модуль 1. Заполнение чек-листа',
								'status': '6',
								'statusTitle': 'Планируется'
							},
							{
								'id': '85q5wf',
								'name': 'Адаптация Управление финансовыми показателями',
								'status': '6',
								'statusTitle': 'Планируется'
							},
							{
								'id': '16kk05',
								'name': 'Обслуживание покупателей. Искренний сервис',
								'status': '6',
								'statusTitle': 'Планируется'
							},
							{
								'id': 'vrqh7b',
								'name': 'Программа лояльности Клуба «Перекресток»',
								'status': '6',
								'statusTitle': 'Планируется'
							},
							{
								'id': '2atgq0',
								'name': 'Адаптация. Модуль 1. Страховые случаи',
								'status': '6',
								'statusTitle': 'Планируется'
							}
						]
					},
					{
						'id': '6462948165575787077',
						'name': 'Блок 3. Товар',
						'tasks': [
							{
								'id': 'id81qh',
								'name': 'Перекресток_Сыры',
								'status': '6',
								'statusTitle': 'Планируется'
							},
							{
								'id': 'vm9x67',
								'name': 'Перекресток_Крепкий_Алкоголь',
								'status': '6',
								'statusTitle': 'Планируется'
							},
							{
								'id': 'ut9dbu',
								'name': 'Перекресток_Вина',
								'status': '6',
								'statusTitle': 'Планируется'
							},
							{
								'id': 'a3da1l',
								'name': 'Перекресток_Фрукты',
								'status': '6',
								'statusTitle': 'Планируется'
							},
							{
								'id': 'u4mmwi',
								'name': 'Перекресток_Овощи',
								'status': '6',
								'statusTitle': 'Планируется'
							},
							{
								'id': 'zx671c',
								'name': 'Адаптация. Модуль 2. Мясо. Базовый курс',
								'status': '6',
								'statusTitle': 'Планируется'
							},
							{
								'id': 'eienuk',
								'name': 'Перекресток_Рыба и морепродукты',
								'status': '6',
								'statusTitle': 'Планируется'
							}
						]
					},
					{
						'id': '6462948166361111771',
						'name': 'Блок 4. Торговые программы',
						'tasks': [
							{
								'id': 'ky9am4',
								'name': 'Адаптация. Модуль 1. NQ Department (общий)',
								'status': '6',
								'statusTitle': 'Планируется'
							},
							{
								'id': 't9m0dv',
								'name': 'Адаптация. Модуль 1. Работа в программе NQ. Order',
								'status': '6',
								'statusTitle': 'Планируется'
							},
							{
								'id': 'fq5ta3',
								'name': 'Адаптация. Модуль 1. Работа в программе MarkDown',
								'status': '6',
								'statusTitle': 'Планируется'
							},
							{
								'id': 'bqav6j',
								'name': 'Адаптация. Модуль 1. NQ Departament (зал)',
								'status': '6',
								'statusTitle': 'Планируется'
							},
							{
								'id': 'engpwl',
								'name': 'Адаптация. Модуль 1. NQ Departament (склад)',
								'status': '6',
								'statusTitle': 'Планируется'
							},
							{
								'id': '7q4yo6',
								'name': 'Вебтабель. Внешний персонал. Доработка.',
								'status': '6',
								'statusTitle': 'Планируется'
							},
							{
								'id': 'lmtqef',
								'name': 'Адаптация. Модуль 1. NQ Departament (касса)',
								'status': '6',
								'statusTitle': 'Планируется'
							},
							{
								'id': 'qw7zhm',
								'name': 'Адаптация. Модуль 1. Кассовая программа Remote 2',
								'status': '6',
								'statusTitle': 'Планируется'
							},
							{
								'id': 'wsscsk',
								'name': 'Адаптация. Модуль 1. Курс по изучению программы PX',
								'status': '6',
								'statusTitle': 'Планируется'
							},
							{
								'id': 'yy415f',
								'name': 'Адаптация. Модуль 1. Веб-табель',
								'status': '6',
								'statusTitle': 'Планируется'
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
