/**
 * Created by Administrator on 2017/3/14.
 */
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions';

const mapStateToProps = (state, ownprops)=>({
    state
})
const mapDispatchToProps = (dispatch)=>({
    actions: bindActionCreators(actions, dispatch)
})
export default (component)=>connect(mapStateToProps, mapDispatchToProps)(component);