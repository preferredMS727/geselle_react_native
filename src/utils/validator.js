/**
 * Description: Validators
 * Date: 4/10/2019
 */

export const checkEmail = (value) => {
    var regx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if(value.length === 0) {
        return "E-post krävs.";
    } else if(!regx.test(value)) {
        return "Felaktig e-post.";
    } else {
        return "";
    }
}

export const checkLength = (name, value, length) => {
    
    if(value.length === 0) {
        return name.charAt(0).toUpperCase() + name.slice(1) + " krävs.";
    } else if(length && value.length < length) {
        return name.charAt(0).toUpperCase() + name.slice(1) + " måste vara minst " + length + " tecken.";
    } else {
        return "";
    }
}

export const compare = (name, value1, value2) => {
    if(value1 === value2) {
        return "";
    } else {
        return name.charAt(0).toUpperCase() + name.slice(1) + " matchar inte.";
    }
}