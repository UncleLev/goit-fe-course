import Model from '../model.js';

let model = new Model;

describe('isValid', () => {
    //false
    it('Should fail validation', () => {
        expect(model.isValidUrl('sdfsdf')).toBe(false);
    });
    it('Should fail validation', () => {
        expect(model.isValidUrl(12242)).toBe(false);
    });
    it('Should fail validation', () => {
        expect(model.isValidUrl(null)).toBe(false);
    });
    it('Should fail validation', () => {
        expect(model.isValidUrl(undefined)).toBe(false);
    });
    it('Should fail validation', () => {
        expect(model.isValidUrl('https://babeljsio/')).toBe(false);
    });
    it('Should fail validation', () => {
        expect(model.isValidUrl('https:/babeljsio/')).toBe(false);
    });
    it('Should fail validation', () => {
        expect(model.isValidUrl('https//babeljsio/')).toBe(false);
    });
    // true
    it('Should pass validation', () => {
        expect(model.isValidUrl('babeljs.io/')).toBe(true);
    });
    it('Should pass validation', () => {
        expect(model.isValidUrl('babeljs.io')).toBe(true);
    });
    it('Should pass validation', () => {
        expect(model.isValidUrl('https://babeljs.io/')).toBe(true);
    });
});

describe('Is Unique', () => {
    //true
    it('Should fail', () => {
        expect(model.IsUniqueByKeyInArrOfObjs('s')).toBe(false);
    });
    it('Should fail', () => {
        expect(model.IsUniqueByKeyInArrOfObjs('d', null)).toBe(false);
    });
    it('Should fail', () => {
        expect(model.IsUniqueByKeyInArrOfObjs('s/', undefined, null)).toBe(false);
    });
    it('Should be already addet', () => {
        expect(model.IsUniqueByKeyInArrOfObjs("id", [{
            id: 11
        }, {
            id: 1
        }, {
            id: 12
        }], 1)).toBe(false);
    });
    it('Should fail', () => {
        expect(model.IsUniqueByKeyInArrOfObjs("iD", [{
            id: 11
        }, {
            id: 1
        }, {
            id: 12
        }], 1)).toBe(false);
    });

    it('Should fail', () => {
        expect(model.IsUniqueByKeyInArrOfObjs("iD", [{
            id: 11
        }, {
            id: 1
        }, {
            id: 12
        }], null)).toBe(false);
    });
    it('Should fail', () => {
        expect(model.IsUniqueByKeyInArrOfObjs("iD", [{
            id: 11
        }, {
            id: 1
        }, {
            id: 12
        }], NaN)).toBe(false);
    });
    //true
    it('Should pass', () => {
        expect(model.IsUniqueByKeyInArrOfObjs("id", [{
            id: 11
        }, {
            id: 1
        }, {
            id: 12
        }], 3)).toBe(true);
    });
    it('Should pass', () => {
        expect(model.IsUniqueByKeyInArrOfObjs("id", [{
            id: 11
        }, {
            id: 1
        }, {
            id: 12
        }], 112)).toBe(true);
    });
    it('Should pass', () => {
        expect(model.IsUniqueByKeyInArrOfObjs("id", [{
            id: 11
        }, {
            id: 1
        }, {
            id: 12
        }], 101)).toBe(true);
    });

});


describe('Is remove items from array of obj by id', () => {

    it('Should delete {id:1}', () => {
        model.bookmark = [{
            id: 11
        }, {
            id: 1
        }, {
            id: 12
        }]
        expect(model.removeItem(1)).toStrictEqual([{
                id: 11
            },
            {
                id: 12
            }
        ]);
    });
    it('Should return with out deleting', () => {
        model.bookmark = [{
            id: 11
        }, {
            id: 1
        }, {
            id: 12
        }]
        expect(model.removeItem('as')).toStrictEqual([{
            id: 11
        }, {
            id: 1
        }, {
            id: 12
        }]);
    });
});
