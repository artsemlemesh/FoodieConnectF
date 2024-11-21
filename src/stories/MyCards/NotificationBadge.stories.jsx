import React from 'react';
import NotificationBadge from '../../components/MyCards/NotificationBadge';

export default {
  title: 'Atoms/NotificationBadge',
  component: NotificationBadge,
};

const Template = (args) => <NotificationBadge {...args} />;

export const Default = Template.bind({});
Default.args = {
  count: 5,
};

export const ZeroCount = Template.bind({});
ZeroCount.args = {
  count: 0,
};

export const DoubleDigit = Template.bind({});
DoubleDigit.args = {
  count: 15,
};