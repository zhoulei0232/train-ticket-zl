import React ,{useCallback , useMemo }from 'react';
import {bindActionCreators } from  'redux' ;
import {connect } from  'react-redux';
import './App.css';

import Header from '../common/Header.jsx';
import DepartDate from './DepartDate.jsx';
import HightSpeed  from './HighSpeed.jsx';
import Journey  from  './Journey.jsx';
import Submit from './Submit.jsx';

import CitySelector  from '../common/CitySelector.jsx' ;

import {
    exchangeFromTo,
    showCitySelector,
    hideCitySelector,
    fetchCityData
} from  './actions'

function App(props){
    const {
        from,
        to,
        isCitySelectorVisible,
        cityData,
        isLoadingCityData,
        dispatch
    } = props;
    const onBack = useCallback(()=>{
        window.history.back();
    },[])
 
    const cbs = useMemo(()=>{
        return  bindActionCreators({
            exchangeFromTo,
            showCitySelector
        },dispatch)
    },[])

    const citySelectorCbs = useMemo(()=>{
        return  bindActionCreators({
            onBack:hideCitySelector,
            fetchCityData
        },dispatch);
    },[])

    return(
        <div>
            <div className="header-wrapper">
                <Header  title="火车票"  onBack={onBack} />
            </div>
            <form  className="form">
                <Journey  
                    from={from}  
                    to={to} 
                    {...cbs} />
                <DepartDate/>
                <HightSpeed/>
                <Submit/>
            </form>
            <CitySelector
                show={isCitySelectorVisible}
                cityData = {cityData}
                isLoading = {isLoadingCityData}
                {...citySelectorCbs}
            />
        </div>
    )
}

export default connect(
    function mapStateToProps(state){
        return state
    },
    function mapDispatchToProps(dispatch){
        return {dispatch}
    }
)(App) ;