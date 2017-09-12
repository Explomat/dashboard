import Component from '../../lib/Component';
import Element from '../../lib/Element';
import tags from '../../lib/tags';
import Task from '../task';
import './block.styl';

export class Block extends Component {
	render(){
		const { tasks } = this.props;
		return tags.div({
			class: 'block'
		}, [
			tags.div({
				class: 'block__tasks'
			}, tasks.map(t => Task(t)))
		]);
	}
}

Block.defaultProps = {
	name: '',
	tasks: []
};

const BlockElement = Element.createFactory(Block);
export default BlockElement;
