import home from './home'
import log from './log'
export {
    home,
    log
}

// 
export const crateResponse = ( res, response = {} ) => {
    res.header('Content-Type', 'application/json; charset=utf-8')
    res.send(response);  
};
