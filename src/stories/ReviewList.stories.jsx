import ReviewList from "../components/ReviewList";


export default {

    title: 'Organisms/ReviewList',
    component: ReviewList,
}

const Template = (args) => <ReviewList {...args} />;

export const Default = Template.bind({});
Default.args = {
    reviews: [
        {
            user: 'John Doe',
            rating: 3,
            comment: 'Great food!',
        },
        {
            user: 'Jane Smith',
            rating: 5,
            comment: 'Amazing experience!',
        },
    ],
};
