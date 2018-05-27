import React from 'react';
import { shallow } from 'enzyme';
import { Answer } from '../../../src/features/home';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Answer />);
  expect(renderedComponent.find('.home-answer').length).toBe(1);
});
