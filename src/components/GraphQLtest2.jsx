import { useQuery } from "@apollo/client"
import {  GET_DATA } from "../graphql/queries"



const OrdersGQL2 = () => {
   
    


    const {data, loading, error} = useQuery(GET_DATA)

    if(loading) return <p>Loading</p>
    if(error) return <p>Error: {error.message}</p>

    console.log('created_t', data)
    return (
        <ul>
            

            <h1>Created At</h1>
            {data.allOrders.map((order) => (
                <li key={order.id}>
                    {order.createdAt}
                </li>
            ))}
        </ul>
    )
}

export default OrdersGQL2