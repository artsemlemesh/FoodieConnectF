# from django.db import models
# from django.contrib.auth import get_user_model


# class ChatRoom(models.Model):
#     name = models.CharField(max_length=255)
#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return self.name

# class Message(models.Model):
#     user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
#     room = models.ForeignKey(ChatRoom, on_delete=models.CASCADE, related_name="messages")
#     content = models.TextField()
#     timestamp = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f"{self.user.username}: {self.content[:20]}"
    

# mutations.py
# import graphene
# from .types import RestaurantType
# from reviews.models import Restaurant
# from django.contrib.auth import get_user_model
# from graphql import GraphQLError  # Better error handling
# import graphene
# from .types import MessageType
# from chat.models import Message, ChatRoom



# class CreateRestaurant(graphene.Mutation):
#     class Arguments:
#         name = graphene.String(required=True)
#         description = graphene.String(required=True)
#         address = graphene.String(required=True)
#         owner_id = graphene.ID(required=True)  # Use ID for consistency

#     restaurant = graphene.Field(RestaurantType)

#     def mutate(self, info, name, description, address, owner_id):
#         # Validate owner existence
#         try:
#             user = get_user_model().objects.get(id=owner_id)
#         except get_user_model().DoesNotExist:
#             raise GraphQLError('The specified owner does not exist.')

#         # Create and save the restaurant
#         restaurant = Restaurant(
#             name=name,
#             description=description,
#             address=address,
#             owner=user
#         )
#         restaurant.save()

#         return CreateRestaurant(restaurant=restaurant)



# class CreateMessage(graphene.Mutation):
#     class Arguments:
#         room_id = graphene.ID(required=True)
#         content = graphene.String(required=True)

#     message = graphene.Field(MessageType)

#     def mutate(self, info, room_id, content):
#         user = info.context.user
#         if not user.is_authenticated:
#             raise GraphQLError('Authentication required.')

#         try:
#             room = ChatRoom.objects.get(id=room_id)
#         except ChatRoom.DoesNotExist:
#             raise GraphQLError('Chat room does not exist.')

#         message = Message.objects.create(user=user, room=room, content=content)
#         return CreateMessage(message=message)

# class Mutation(graphene.ObjectType):
#     create_restaurant = CreateRestaurant.Field()
#     create_message = CreateMessage.Field()


# queries.py
# import graphene
# from .types import OrderType, ChatRoomType, MessageType
# from cart.models import Order
# from chat.models import ChatRoom, Message

# class Query(graphene.ObjectType):
#     all_orders = graphene.List(OrderType)
#     chat_rooms = graphene.List(ChatRoomType)
#     messages = graphene.List(MessageType, room_id=graphene.ID(required=True))


#     def resolve_all_orders(root, info):
#         return Order.objects.all()
    

#     def resolve_chat_rooms(root, info):
#         return ChatRoom.objects.all()
    

#     def resolve_message(root, info, room_id):
#         return Message.objects.filter(room_id=room_id)
    

# schema.py
# import graphene
# from .queries import Query
# from .mutations import Mutation
# from .subscriptions import Subscription

# schema = graphene.Schema(query=Query, mutation=Mutation, subscription=Subscription)


# subscriptions.py
# from graphene_subscriptions.signals import post_save_subscription
# from chat.models import Message
# import graphene
# from graphene_subscriptions.events import CREATED
# from .types import MessageType


# # Automatically trigger subscription events on Message creation
# post_save_subscription.connect(sender=Message)


# class Subscription(graphene.ObjectType):
#     message_added = graphene.Field(MessageType)

#     def resolve_message_added(root, info):
#         return None  # Initial data isn't provided; subscriptions listen to events
    
# types.py
# import graphene
# from graphene_django.types import DjangoObjectType
# from reviews.models import Restaurant, Review
# from django.contrib.auth import get_user_model
# from cart.models import Order
# from chat.models import ChatRoom, Message

# class ReviewType(DjangoObjectType):
#     class Meta:
#         model = Review
#         fields = ('user', 'rating', 'comment', 'is_approved')

# class RestaurantType(DjangoObjectType):
#     reviews = graphene.List(ReviewType)

#     class Meta:
#         model = Restaurant
#         fields = ('id', 'name', 'description', 'address', 'owner', 'reviews')

#     def resolve_reviews(self, info):
#         return self.reviews.filter(is_approved=True)

# class UserType(DjangoObjectType):
#     class Meta:
#         model = get_user_model()
#         fields = ('id', 'username', 'email')

# class OrderType(DjangoObjectType):
#     user = graphene.Field(UserType)
#     restaurant = graphene.Field(RestaurantType)
#     created_at = graphene.String()

#     class Meta:
#         model = Order
#         fields = ('id', 'user', 'created_at', 'status', 'total_amount', 'eta', 'restaurant')

#     def resolve_user(self, info):
#         return self.user

#     def resolve_restaurant(self, info):
#         return self.restaurant

#     def resolve_created_at(self, info):
#         return self.created_at.strftime("%Y-%m-%d %H:%M:%S")


# # from chat app, for live chat update (subscriptions)
# class MessageType(DjangoObjectType):
#     class Meta:
#         models = Message
#         fields = ('id', 'user', 'room', 'content', 'timestamp')


# class ChatRoomType(DjangoObjectType):
#     class Meta:
#         model = ChatRoom
#         fields = ('id', 'name')


# in settings.py added
#     'graphene_subscriptions'

# and asgi.py
# """
# ASGI config for myproject project.

# It exposes the ASGI callable as a module-level variable named ``application``.

# For more information on this file, see
# https://docs.djangoproject.com/en/5.1/howto/deployment/asgi/
# """

# import os
# print('BEFORE')
# from django.core.asgi import get_asgi_application
# print("ASGI application imported.")

# from channels.routing import ProtocolTypeRouter, URLRouter
# print('ROUTERSSSSSS')
# from channels.auth import AuthMiddlewareStack
# from channels.sessions import SessionMiddlewareStack

# print("AuthMiddlewareStack imported.")
# from .routing import websocket_urlpatterns
# from django.urls import path
# from graphene_subscriptions.consumers import GraphqlSubscriptionConsumer



# os.environ.setdefault("DJANGO_SETTINGS_MODULE", "myproject.settings")

# application = ProtocolTypeRouter({
#     "http": get_asgi_application(),
#     "websocket": SessionMiddlewareStack(
#         URLRouter([
#             *websocket_urlpatterns,
#             # WebSocket route for GraphQL subscriptions
#             path("graphql-subscriptions/", GraphqlSubscriptionConsumer.as_asgi()),

#         ])
#     ),
# })

