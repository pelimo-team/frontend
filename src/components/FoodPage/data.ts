import { Food } from './Type';

export const foodItem: Food = {
  id: 1,
  name: 'Classic Margherita Pizza',
  description: 'A traditional Italian pizza with fresh mozzarella, tomatoes, basil leaves, and extra virgin olive oil on a thin, crispy crust baked to perfection in a wood-fired oven.',
  price: 14.99,
  rating: 4.7,
  imageUrl: 'https://images.pexels.com/photos/2271194/pexels-photo-2271194.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  reviews: [
    {
      id: '1',
      userId: 'user1',
      userName: 'Emma Wilson',
      userAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      rating: 5,
      comment: 'Absolutely delicious! The crust was perfectly crispy and the fresh basil made all the difference. Will definitely order again.',
      date: '2023-10-15',
      likes: 24,
      dislikes: 1,
      replies: [
        {
          id: 'reply1',
          userId: 'owner',
          userName: 'Restaurant Owner',
          userAvatar: 'https://randomuser.me/api/portraits/men/41.jpg',
          comment: 'Thank you for your kind review, Emma! We\'re glad you enjoyed it.',
          date: '2023-10-16'
        }
      ]
    },
    {
      id: '2',
      userId: 'user2',
      userName: 'Michael Chen',
      userAvatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      rating: 4,
      comment: 'Great pizza overall! The only reason I\'m not giving 5 stars is because I would have liked a bit more cheese. The flavor was excellent though.',
      date: '2023-09-28',
      likes: 13,
      dislikes: 2,
      replies: []
    },
    {
      id: '3',
      userId: 'user3',
      userName: 'Sophia Rodriguez',
      userAvatar: 'https://randomuser.me/api/portraits/women/29.jpg',
      rating: 5,
      comment: 'This is hands down the best Margherita pizza in town! The ingredients taste so fresh and the balance of flavors is perfect.',
      date: '2023-09-10',
      likes: 32,
      dislikes: 0,
      replies: [
        {
          id: 'reply2',
          userId: 'user4',
          userName: 'James Thompson',
          userAvatar: 'https://randomuser.me/api/portraits/men/55.jpg',
          comment: 'I completely agree! Have you tried their Pepperoni? It\'s amazing too!',
          date: '2023-09-11'
        }
      ]
    },
  ]
};