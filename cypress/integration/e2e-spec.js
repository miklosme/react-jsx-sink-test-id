import React from 'react';
import ReactDOM from 'react-dom';

const Title = ({ children }) => <h1>{children}</h1>;

const Box = ({ children, grey }) => (
    <div style={{ border: '1px solid black', padding: 5, background: grey ? 'grey' : 'transparent' }}>{children}</div>
);

const GreyBox = ({ children }) => <Box grey>{children}</Box>;

class App extends React.Component {
    render() {
        return (
            <div>
                <Title data-test="title">Hello!</Title>
                <button data-test="cta">Press me!</button>
                <Box>
                    <Box>
                        <Box data-test="middle-box">
                            <Box>
                                <Box data-test="last-box">Lorem ipsum</Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <GreyBox data-test="grey-box">Lorem ipsum</GreyBox>
            </div>
        );
    }
}

describe('Sink TestID', () => {
    before(() => {
        cy.document().then(document => {
            document.write(`<div id="root"></div>`);

            ReactDOM.render(<App />, document.getElementById('root'));
        });
    });

    const testIds = ['cta', 'title', 'middle-box', 'last-box', 'grey-box'];

    testIds.forEach(testId => {
        it(`should select "${testId}"`, () => {
            cy.get(`[data-test="${testId}"]`);
        });
    });
});
