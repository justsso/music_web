import {
    message
} from 'antd';
const handleDate = (d) => {
    let hd = parseInt(d, 10);
    let date = new Date(hd);
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    let dt = date.getDate();


    return `${y}/${m}/${dt}`;
}
const getParameterByName = (name, url) => {
    if (!url)
        url = window.location.href;
    name = name.replace(/[[\]]/g, "\\$&");
    let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results)
        return null;
    if (!results[2])
        return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
};

const getCookie = (c_name) => {
    if (document.cookie.length > 0) {
        var c_start, c_end;
        c_start = document.cookie.indexOf(c_name + '=')
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1
            c_end = document.cookie.indexOf('; ', c_start)
            if (c_end == -1) c_end = document.cookie.length
            return unescape(document.cookie.substring(c_start, c_end))
        }
    }
    return ''
}

const setCookie = (cname, cvalue, exdays = 1) => {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;

}

module.exports = {
    handleDate,
    getParameterByName,
    getCookie,
    setCookie
}