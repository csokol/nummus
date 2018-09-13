// Link.react.test.js
import React from 'react';
import Form from '../../main/js/Form';
import {shallow} from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

test('publishes state when form is submitted', () => {
  var capture = undefined;
  const component = shallow(
      <Form handleSubmit={data => capture = data}/>,
  );

  let nameInput = component.find('input[name="name"]');
  nameInput.simulate('change', {target: {name: "name", value: 'Joao'}});
  let jobInput = component.find('input[name="job"]');
  nameInput.simulate('change', {target: {name: "job", value: 'Engenheiro'}});

  expect(component.state()).toEqual({
    name: 'Joao',
    job: 'Engenheiro'
  });
});
