import { useMutation, useQuery } from '@apollo/client';
import { GET_REVIEWS } from '../../graphql/queries';
import { APPROVE_REVIEW } from '../../graphql/mutations';

const PendingReviews = () => {
  const { data, loading, error, refetch } = useQuery(GET_REVIEWS);
  const [approveReview] = useMutation(APPROVE_REVIEW);

  const handleApprove = async (id) => {
    try {
      const { data } = await approveReview({
        variables: { review_id: id },
      });

      if (data.approveReview.success) {
        await refetch();
      }
    } catch (error) {
      console.error('Error approving review:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error loading reviews.</p>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Pending Reviews</h1>
      {data?.pendingReviews.length === 0 ? (
        <p>No pending reviews.</p>
      ) : (
        <ul className="space-y-4">
          {data.pendingReviews.map((review) => (
            <li
              key={review.id}
              className="bg-white p-4 rounded shadow flex justify-between"
            >
              <div>
                <p className="font-bold">{review.user.username}</p>
                <p>{review.comment}</p>
                <p>Rating: {review.rating}</p>
              </div>
              <button
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                onClick={() => handleApprove(review.id)}
              >
                Approve
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PendingReviews;
