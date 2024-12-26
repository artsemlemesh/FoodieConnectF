import { useQuery } from "@apollo/client"
import { GET_ORDERS } from "../graphql/queries"



const OrdersGQL = () => {
    const {data, loading, error} = useQuery(GET_ORDERS)
    console.log('GRAPTHData', data)
    if(loading) return <p>Loading</p>
    if(error) return <p>Error: {error.message}</p>



    
    return (
        <ul>
            {data.allOrders.map((order) => (
                <li key={order.id}>
                        {order.user.id}-{order.user.username} : ${order.totalAmount} - {order.status}
                </li>
            ))}

        
        </ul>
    )
}

export default OrdersGQL