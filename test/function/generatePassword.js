/* eslint-disable no-undef */
// eslint-disable-next-line no-undef

module.exports ={
    generatePassword: () =>{
        const randomstring = Math.random().toString(36).slice(-8);
        return randomstring;
    }
}
