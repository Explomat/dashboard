import Component from '../../../lib/Component';
import Element from '../../../lib/Element';
import tags from '../../../lib/tags';
import Block from '../../block';
import Task from '../../task';
import BlockHeader from '../../block-header';
import TaskHeader from '../../task-header';
import Error from '../../error';
import { addEventListener } from '../../../store/dashboardStore';
import {
	getState,
	selectBlock,
	selectTaskStatus
} from '../../../actions';
import './dashboard.styl';

function updateState(st) {
	this.setState({
		...this.state,
		...st
	});
}

export class Dashboard extends Component {
	constructor(props){
		super(props);

		this.handleSelectBlock = this.handleSelectBlock.bind(this);
		this.handleSelectTaskStatus = this.handleSelectTaskStatus.bind(this);
	}

	componentWillMount(){
		addEventListener(updateState.bind(this));
		getState();
	}

	handleSelectBlock(blockId){
		selectBlock(blockId);
	}

	handleSelectTaskStatus(taskStatus){
		selectTaskStatus(taskStatus);
	}

	render(){
		/*const {
			taskStatuses,
			activeTaskStatus,
			filteredTasks,
			isFetching
		} = this.state;

		if (isFetching){
			return tags.div({
				class: 'overlay-loading overlay-loading--show'
			});
		}

		return tags.div({
			class: 'dashboard__footer'
		}, [
			tags.div({
				class: 'dashboard__footer-task-statuses'
			}, Object.keys(taskStatuses).map(cs => TaskHeader({
				id: cs,
				name: taskStatuses[cs],
				isActive: activeTaskStatus === cs,
				onClick: this.handleSelectTaskStatus
			}))),
			tags.div({
				class: 'dashboard__footer-taks'
			}, filteredTasks.map(t => Task(t)))
		]);*/
		const {
			status,
			statusTitle,
			planReadinessDate,
			finishDate,
			blocks,
			activeBlock,
			filteredTasks,
			countTasksByStatus,
			taskStatuses,
			activeTaskStatus,
			isFetching,
			error
		} = this.state;

		if (isFetching){
			return tags.div({
				class: 'overlay-loading overlay-loading--show'
			});
		}

		if (error){
			return Error({
				text: error
			});
		}

		const wb = Math.round(100 / blocks.length);
		const statusClasses = `dashboard-container__status-value dashboard-container__status-value--${status}`;
		return tags.div({
			class: 'dashboard-container'
		}, [
			tags.div({
				class: 'dashboard-container__info'
			}, [
				tags.span({
					class: 'dashboard-container__status'
				}, [
					tags.span({
						class: 'dashboard-container__status-label'
					}, 'Статус:'),
					tags.span({
						class: statusClasses
					}, statusTitle)
				]),
				tags.span({
					class: 'dashboard-container__plan-readiness-date'
				}, [
					tags.span({
						class: 'dashboard-container__plan-readiness-date-label'
					}, 'Дата планируемого завершения:'),
					tags.span({
						class: 'dashboard-container__plan-readiness-date-value'
					}, planReadinessDate)
				]),
				finishDate && tags.span({
					class: 'dashboard-container__finish-date'
				}, [
					tags.span({
						class: 'dashboard-container__finish-date-label'
					}, 'Дата фактического завершения:'),
					tags.span({
						class: 'dashboard-container__finish-date-value'
					}, finishDate)
				])
			]),
			tags.div({
				class: 'dashboard'
			}, [
				tags.div({
					class: 'dashboard__header'
				}, tags.div({
					class: 'dashboard__block-titles'
				}, blocks.map(b => BlockHeader({
					id: b.id,
					name: b.name,
					width: wb,
					onClick: this.handleSelectBlock,
					isActive: (activeBlock || {}).id === b.id
				})))),
				tags.div({
					class: 'dashboard__body'
				}, activeBlock && Block(activeBlock)),
				tags.div({
					class: 'dashboard__footer'
				}, [
					tags.div({
						class: 'dashboard__footer-task-statuses'
					}, Object.keys(taskStatuses).map(cs => TaskHeader({
						id: cs,
						name: taskStatuses[cs],
						count: countTasksByStatus[cs],
						isActive: activeTaskStatus === cs,
						onClick: this.handleSelectTaskStatus
					}))),
					tags.div({
						class: 'dashboard__footer-taks'
					}, filteredTasks.map(t => Task(t)))
				])
			])
		]);
	}
}

const DashboardElement = Element.createFactory(Dashboard);
export default DashboardElement;
