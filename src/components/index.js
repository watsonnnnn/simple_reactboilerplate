/**
 * Created by Administrator on 2017/3/21.
 */
import React from 'react';
import template from '../config/template';

const Index = ({state, actions})=> {
    const {value} = state.index;
    return (
        <div>
            <p>
                this is index route.value is  {value}
            </p>
            <input type="button" value="button" onClick={()=>{actions.index(3)}}/>
        </div>
    )
}
export default template(Index);

