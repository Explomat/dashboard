import Component from '../../lib/Component';
import Element from '../../lib/Element';
import tags from '../../lib/tags';
import './task.styl';

export class Task extends Component {

	render(){
		const { name, href, startUsageDate, lastUsageDate, status, statusTitle } = this.props;
		let statusClasses = `task__status-title task__status-title--${status} `;
		statusClasses += `${(startUsageDate || lastUsageDate) ? '' : 'task__status-title--without-date'}`;
		return tags.div({
			class: 'task'
		}, [
			href ? tags.a({
				class: 'task__name',
				target: '__blank',
				href: href.replace(/&amp;/g, '&')
			}, name) :
			tags.span({
				class: 'task__name'
			}, name),
			tags.div({
				class: 'task__body'
			}, [
				startUsageDate && tags.span({
					class: 'task__start-usage-date'
				}, new Date(startUsageDate).toLocaleString('ru', {
					year: 'numeric',
					month: 'numeric',
					day: 'numeric'
				})),
				lastUsageDate && tags.span(null, ' - '),
				lastUsageDate && tags.span({
					class: 'task__last-usage-date'
				}, new Date(lastUsageDate).toLocaleString('ru', {
					year: 'numeric',
					month: 'numeric',
					day: 'numeric'
				})),
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
