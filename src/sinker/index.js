import React from 'react';

const TESTID = 'test-data';

function mutate(children, testID) {
    let found = false;
    return React.Children.map(children, child => {
        if (!found) {
            if (typeof children.type === 'string') {
                found = true;
                return React.cloneElement(child, {[TESTID]: testID});
            }
            return mutate(child.props.children, testID);
        }
        return child;
    })
}

module.exports = function sinker(jsx, testID) {
    return React.cloneElement(jsx, undefined, ...(mutate(jsx.children, testID) || []));
};