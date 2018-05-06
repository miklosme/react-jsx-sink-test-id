const babel = require('babel-core');
const plugin = require('../src/index');

function transform(code) {
  return babel.transform(code,  {
    plugins: ['syntax-jsx', plugin],
  }).code;
}

describe('react-jsx-sink-test-id', () => {
  it('should wrap jsx to the sinker', () => {
    const source = `
      <Foo data-test="bar" />
    `;

    expect(transform(source)).toMatchSnapshot();
  });
  it('should not wrap jsx without testid', () => {
    const source = `
      <Foo color="yellow" />
    `;

    expect(transform(source)).toMatchSnapshot();
  });
  it('should work with attribute expressions', () => {
    const source = `
      import React from 'react';
      
      class App extends React.Component {
        render() {
          const a = <Foo color="red" data-test="hello" />
          const b = <Foo data-test="hi"><h1>text</h1></Foo>
          const c = <Foo color="red" data-test={10} />
          const d = <Foo color="red" data-test={<hr />} />
          const e = <Foo color="red" data-test={'hello' + 10} />
          const f = <Foo color="red" data-test={\`asd${20}\`} />
          return <Foo color="red" data-test={true ? 'true' : 'false'} />
        }
      }
    `;
    expect(transform(source)).toMatchSnapshot();
  });
  it('should wrap properly when nested', () => {
    const source = `
      import React from 'react';

      const x = <Foo color="red">
        <Bar data-test="hello" /> 
      </Foo>;
      
      <Bar data-test="hello" />;
      
      const y = <Bar data-test="hello" />;
      
      const z = <Baz render={<Foo data-test="foo" />} />;
      
      const e = <Foo>{x => <Foo value={x} data-test="foo" />}</Foo>
    `;
    expect(transform(source)).toMatchSnapshot();
  });
});