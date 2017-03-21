/**
 * Created by Administrator on 2017/3/21.
 */
export default (state={value:1},action)=>{
    switch (action.type){
        case 'index':
            return {...state,...{value:action.value}}
        default:
            return state;
    }
}