import React from 'react';
import ReactDOM from 'react-dom';

const Title = ({ children }) => <h1>{children}</h1>

class App extends React.Component {
    render() {
        return (
            <div>
                <button data-test="cta">Press me!</button>
            </div>
        )
    }
}

describe('Sink TestID', function () {
    before(() => {
        cy.document().then(document => {
            document.write(`<div id="root"></div>`)

            ReactDOM.render(<App />, document.getElementById('root'));
        })
    });
    it('should find everything', function () {
        cy.get('[data-test="cta"]');
        // cy.get('[data-test="title"]');
    });
});