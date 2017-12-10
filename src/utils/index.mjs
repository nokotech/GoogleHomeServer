import GoogleHome from './GoogleHome'
import log from './log'
export {
    GoogleHome,
    log
}

// 
export const crateResponse = ( res, response = {} ) => {
    res.header('Content-Type', 'application/json; charset=utf-8')
    res.send(response);  
};
