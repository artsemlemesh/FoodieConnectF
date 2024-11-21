import React from 'react';
import TableComponent from '../../components/MyCards/TableComponent';

export default {
  title: 'Organisms/Table',
  component: TableComponent,
};

const columns = ['Name', 'Cuisine', 'Rating', 'Location'];
const rows = [
  ['Sushi Place', 'Japanese', '4.8', 'New York'],
  ['Burger Joint', 'American', '4.5', 'Los Angeles'],
  ['Pasta House', 'Italian', '4.7', 'Chicago'],
];

const Template = (args) => <TableComponent {...args} />;

export const Default = Template.bind({});
Default.args = {
  rows,
  columns,
};

