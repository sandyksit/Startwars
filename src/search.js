import React, { Component } from 'react';
import axios from 'axios';
import Pagination from './pagination.js';
import _ from 'lodash';
import './search.css';
import moment from 'moment'

export default class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pageOfItems:[],
            products:[],
            normalUser: 0,
            count: 1
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.onChangePage = this.onChangePage.bind(this);
        this.handleChange = _.debounce(this.handleChange, 250);
    }

    handleChange(){
        if(this.state.normalUser < 15) {
        const value = this.searchInput.value
        const url = 'https://swapi.co/api/planets/?search='+value+''
        axios.get(url)
            .then((response) => {
                let results = response.data.results
                this.setState({'pageOfItems': results, 'products': results})
            })
        }
        if(this.props.userId!== 'Luke Skywalker'){
            this.startTimer()
            this.state.normalUser++
        }
    }
    
    onChangePage(pageOfItems) {
        this.setState({ pageOfItems: pageOfItems});
    }
    
    startTimer() {
        clearInterval(this.timer)
        this.timer = setInterval(this.tick.bind(this), 1000)
    }

    tick() {
        this.setState({count: (this.state.count + 1)})
    }

    render() {
        const { props, state } = this
       
        return (
                <div>
                    Search : <input type="text" className="searchTerm" ref={(searchInput) => this.searchInput = searchInput} onChange={this.handleChange} placeholder="Type here 1"/>
                    {this.state.normalUser > 15 && (<div>Sorry normal user cannot access url more than 15 search in minutes {this.state.count}</div>)}
                    <div className="resultContainer">
                      
                        {(state.pageOfItems || []).map((item,i)=> 
                            <div key={i} className="card">
                            <div className="product-info">
                                <div><span className="left-header-info"><h3>Name: {item.name} </h3></span> 
                                <span><h3 className="right-header-info">Population : {item.population}</h3></span></div>
                                {item.rotation_period && (<div><b>Rotaion Period : </b> {item.rotation_period}</div>)}
                                {item.surface_water && (<div><b>Water Surface :  </b>{item.surface_water}</div>)}
                                {item.terrain && (<div><b>Terrain :  </b>{item.terrain}</div>)}
                                {item.terrain && (<div><b>Gravity :  </b>{item.gravity}</div>)}
                                {item.orbital_period && (<div><b>Orbital Period :  </b>{item.orbital_period}</div>)}
                                {item.diameter && (<div><b>Diameter :  </b>{item.diameter}</div>)}
                                {item.climate && (<div><b>Climate :  </b>{item.climate}</div>)}
                                {item.rotation_period && (<div><b>Rotation Period :  </b>{item.rotation_period}</div>)}
                                {item.created && (<div><b>Created :  </b>{moment(item.created).format('llll')}</div>)}
                                {item.edited && (<div><b>Edited :  </b> {moment(item.edited).format('llll')}</div>)}
                            </div>
                            <div className="product-links">
                                {!_.isEmpty(item.residents) && (<div className="description"> <b>Residents :  </b>
                                {(item.residents || []).map((url, index)=>
                                    <div key={index}>
                                        <a href={url} target="_blank">{url}</a>
                                    </div>
                                )}</div>)}
                                {!_.isEmpty(item.films) && (<div> <b>Films : </b>
                                 {(item.films || []).map((url, index)=>
                                  <div key={index}>
                                        <a href={url} target="_blank">{url}</a>
                                    </div>
                                )}</div>)}
                            </div>
                        </div>
                        )}
                        <Pagination items={state.products} onChangePage={this.onChangePage} />
                    </div>
                 </div>
        )
    }

    componentWillUnmount(){
        clearInterval(this.timer)
    }
}

