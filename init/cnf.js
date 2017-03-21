'use strict';

var cnf = {
    _cnf: {
        version: 2,
    },
    fn: {
        mearge: function(newCNF) {
            return cnf.fn._mergeOBJ(cnf._cnf, newCNF);
        },
        _mergeOBJ: function(obj1, obj2){
            let obj3 = {};
            for (let attrname in obj1) { obj3[attrname] = obj1[attrname]}
            for (let attrname in obj2) { obj3[attrname] = obj2[attrname]}
            return obj3;
        },
    },
    init: function(cnfORkey, val) {
        if (typeof cnfORkey == 'object') {
            return cnf.fn.mearge(cnfORkey);
        } else if (typeof cnfORkey == 'string') {
            // console.log('ddd')
            if (val === undefined) {
                // console.log('ddd1')
                cnf._cnf[val]; 
                return cnf._cnf;
            } else {
                // console.log('ddd2', cnfORkey, val)
                cnf._cnf[cnfORkey] = val;
                return cnf._cnf;
            }
        }
        return cnf._cnf;
    },
}

module.exports = cnf;