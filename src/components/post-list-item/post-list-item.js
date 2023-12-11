import React, {Component} from 'react';
import './post-list-item.css';

export default class PostListItem extends Component {

    state = {
        text: this.props.label,
        color: this.props.color
    }

    onValueChange = (e) => {
        this.setState({
            text: e.target.value
        })
    }
    onColorChange = (e) => {
        this.setState({
            color: e.target.value
        })
        this.props.setColor(this.props.id, e.target.value);
    };

    saveEditLabel = () => {
        this.props.onChangeLabel(this.props.id, this.state.text);
        this.props.onEdit();
    }

    render() {

        const {
            label,
            onDelete, 
            onToggleImportant, 
            important,
            onEdit,
            edit,
            color
        } = this.props;


        let classNames = '';

        if (important) {
            classNames += ' important';
        }

        if(edit) {
            classNames += ' true';
        }



        return (

            <div className={`app-list-item d-flex justify-content-between ${classNames}`} style={{background: color}}>
                <span className={`app-list-item-label ${edit ? 'edit' : ''}`}>
                    {label}
                </span>
                <input className={`editInput ${classNames}`} value={this.state.text} onChange={this.onValueChange} onBlur={this.saveEditLabel}/>
                <div className="d-flex justify-content-center align-items-center">
                    <button type="button" className="btn-star btn-sm"
                            onClick={onToggleImportant}>

                        <i className="fa fa-star"></i>
                    </button>
                    <button type="button" className="btn-sm"
                            onClick={onEdit}>

                    <i className="fa fa-pencil"></i>
                    </button>
                    <button type="button" className="btn-trash btn-sm"
                            onClick={onDelete}>

                        <i className="fa fa-trash-o"></i>
                    </button>
                    <select onChange={this.onColorChange} value={color}>
                        <option value={'white'}>white</option>
                        <option value={'aqua'}>aqua</option>
                        <option value={'green'}>green</option>
                    </select>
                </div>
            </div>

        );
    }
}
