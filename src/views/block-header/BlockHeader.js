import Component from '../../lib/Component';
import Element from '../../lib/Element';
import tags from '../../lib/tags';
import './block-header.styl';

class BlockHeader extends Component {
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
		const { width, name, isActive } = this.props;
		const classes = `block-header ${isActive ? 'block-header--active' : ''}`;
		return (
			tags.span({
				class: classes,
				style: `width: ${width}%;`,
				onClick: this.handleClick
			}, name)
		);
	}
}

const BlockHeaderElement = Element.createFactory(BlockHeader);
export default BlockHeaderElement;
