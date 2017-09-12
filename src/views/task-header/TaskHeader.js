import Component from '../../lib/Component';
import Element from '../../lib/Element';
import tags from '../../lib/tags';
import './task-header.styl';

class TaskHeader extends Component {
	constructor(props){
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(){
		if (this.props.onClick){
			this.props.onClick(this.props.id);
		}
	}

	render(){
		const { name, isActive } = this.props;
		const classes = `task-header ${isActive ? 'task-header--active' : ''}`;
		return (
			tags.span({
				class: classes,
				onClick: this.handleClick
			}, name)
		);
	}
}

const TaskHeaderElement = Element.createFactory(TaskHeader);
export default TaskHeaderElement;
