import React from 'react';
import ReactDOM from 'react-dom';
import {render} from '@testing-library/react';
import App from '../App';
import Api from '../Api';
import initMocks from '../fixtures';

initMocks();
const apiUrl = 'http://ckan-dev:5000/api/3/action/';

it('Renders new Collection form', () => {
  const div = document.createElement('div');
  const {getByText} = render(<App collection={{}} />, div);
  const node = getByText('Collection information');
  expect(node.tagName).toBe('H2');
});

it('Renders new Master Collection form', () => {
  const div = document.createElement('div');
  const {getByText} = render(
    <App collection={{extras: {master: true}}} />,
    div,
  );
  const node = getByText('Master Collection information');
  expect(node.tagName).toBe('H2');
});

/* it('renders edit Collection form', async () => { */
/*   expect.assertions(1) */
/*   const res = await Api.getCollection({name: 'testId1'}, apiUrl); */
/*   const collection = res.data.result; */
/*   const div = document.createElement('div'); */
/*   const {getByPlaceholderText} = render(<App collection={collection} />, div); */
/*   const node = getByPlaceholderText('A title for your collection'); */
/*   console.log(node.value, collection.display_name); */
/*   expect(node.value).toBe(collection.display_name); */
/* }); */
