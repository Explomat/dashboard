import Component from '../../lib/Component';
import Element from '../../lib/Element';
import tags from '../../lib/tags';
import './task.styl';

export class Task extends Component {

	render(){
		const { name, href, startUsageDate, lastUsageDate, status, statusTitle } = this.props;
		const statusClasses = `task__status-title task__status-title--${status}`;
		return tags.div({
			class: 'task'
		}, [
			tags.a({
				class: 'task__name',
				target: '__blank',
				href
			}, name),
			tags.div({
				class: 'task__body'
			}, [
				startUsageDate && tags.span({
					class: 'task__start-usage-date'
				}, startUsageDate),
				lastUsageDate && tags.span(null, ' - '),
				lastUsageDate && tags.span({
					class: 'task__last-usage-date'
				}, lastUsageDate),
				tags.span({
					class: statusClasses
				}, statusTitle)
			])
		]);
	}
}

Task.defaultProps = {
	name: '',
	statusTitle: ''
};

const TaskElement = Element.createFactory(Task);
export default TaskElement;
