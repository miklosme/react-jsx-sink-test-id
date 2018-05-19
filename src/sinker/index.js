import React from 'react';

const TESTID = 'data-test';

const addTestID = (element, testID) => React.cloneElement(element, {[TESTID]: testID});

module.exports = function sinker(element, testID) {
    return element;
    // if (typeof element.type === 'string') {
    //     return addTestID(element, testID);
    // }
    // let found = false;
    // return React.Children.map(element.children, child => {
    //     if (found) {
    //         return child;
    //     }
    //     if (typeof child.type === 'string') {
    //         found = true;
    //         return addTestID(element, testID);
    //     }
    //     return sinker(child, testID)
    // });
};