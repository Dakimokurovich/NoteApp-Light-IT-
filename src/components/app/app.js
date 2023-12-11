import React, {Component} from 'react';
import './app.css';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import PostStatusFilter from '../post-status-filter';
import PostList from '../post-list';
import PostAddForm from '../post-add-form';


export default class App extends Component{

    state = {
        data: [
            {id: 1, label: 'Example text', important: true, edit: false, color:'white'},
            {id: 2, label: 'Example text 2', important: false, edit: false, color:'aqua'},
            {id: 3, label: 'Example text 3', important: false, edit: false, color:'green'}
        ],
        term: '',
        filter: 'all'
    }

    componentDidMount() {
        const savedState = localStorage.getItem('postsState');
        if (savedState) {
          this.setState(JSON.parse(savedState));
        }
    }

    componentDidUpdate() {
        localStorage.setItem('postsState', JSON.stringify(this.state));
    }

    maxId = 4

    deteteItem = (id) => {
        this.setState(({data}) => {
            const index = data.findIndex((elem) => elem.id === id);
            const newArray = [
                ...data.slice(0, index),
                ...data.slice(index + 1)
            ];

            return {
                data: newArray
            }
        });
    }

    onAdd = (text) => {

        const newItem = {
            id: this.maxId++,
            label: text,
            important: false
        };

        this.setState(({data}) => {
            const newArray = [
                ...data,
                newItem
            ];

            return {
                data: newArray
            }
        });
    }

    setColor = (id, colorValue) => {

        this.setState(({data}) => {
            const index = data.findIndex((elem) => elem.id === id);

            const newItem = {...data[index], color: data[index].color = colorValue};
            
            const newArray = [
                ...data.slice(0, index),
                newItem,
                ...data.slice(index + 1)
            ];


            return {
                data: newArray
            };
        });
        console.log(id, colorValue, this.state.data);
    }

    onChangeLabel = (id, text) => {
        
        this.setState(({data}) => {
            const index = data.findIndex((elem) => elem.id === id);

            const newItem = {...data[index], label: data[index].label = text};
            
            const newArray = [
                ...data.slice(0, index),
                newItem,
                ...data.slice(index + 1)
            ];


            return {
                data: newArray
            };
        });
    }

    onToggleImportant = (id) => {
        this.setState(({data}) => {
            const index = data.findIndex((elem) => elem.id === id);

            const newItem = {...data[index], important: !data[index].important};
            const newArray = [
                ...data.slice(0, index),
                newItem,
                ...data.slice(index + 1)
            ];


            return {
                data: newArray
            };
        });
    }

    onEdit  = (id) => {
        this.setState(({data}) => {
            const index = data.findIndex((elem) => elem.id === id);

            const newItem = {...data[index], edit: !data[index].edit};
            const newArray = [
                ...data.slice(0, index),
                newItem,
                ...data.slice(index + 1)
            ];


            return {
                data: newArray
            };
        });
    }

    searchPost = (items, term) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter((item) => {
            return item.label.indexOf(term) > -1
        })
    }

    onUpdateSearch = (term) => {
        this.setState({term});
    }

    filterPost = (items, filter) => {
        if (filter === 'important') {
            return items.filter((item) => item.important);
        } else {
            return items;
        }
    }

    onFilterSelect = (filter) => {
        this.setState({filter});
    }

    render() {

        const {data, term, filter} = this.state;

        const important = data.filter((item) => item.important).length;
        const allPost = data.length;

        const visiblePosts = this.filterPost(this.searchPost(data, term), filter);

        return (
            <div className="app">
                <AppHeader important={important} allPost={allPost}/>
                <div className="search-panel d-flex">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <PostStatusFilter filter={filter}
                                      onFilterSelect={this.onFilterSelect}/>
                </div>
                <PostList posts={visiblePosts} onDelete={this.deteteItem}
                          onToggleImportant={this.onToggleImportant}
                          onEdit={this.onEdit}
                          onChangeLabel={this.onChangeLabel}
                          setColor={this.setColor}/>

                <PostAddForm onAdd={this.onAdd}/>
            </div>
        );
    }
    
};

