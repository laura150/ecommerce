 import bcrypt from 'bcryptjs'
 
 const data = {
     users: [
         
        {
        name: 'John',
        email: 'admin@example.com',
        isAdmin: true, 
        password: bcrypt.hashSync('123456')
        },
        {
        name: 'Jane',
        email: 'user@example.com',
        isAdmin: false, 
        password: bcrypt.hashSync('123456')
        }
    ],
    products: [
        {
            name: 'Free shirt',
            slug: 'free-shirt',
            category: 'shirts',
            image: '/images/shirt1.jpg',
            price: 70,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 10,
            countInStock: 20,
            description: 'A popular shirt'
        },
        {
            name: 'Fit shirt',
            slug: 'fit-shirt',
            category: ' shirts',
            image: '/images/shirt2.jpg',
            price: 80,
            brand: 'Adidas',
            rating: 4.5,
            numReviews: 10,
            countInStock: 20,
            description: 'A popular shirt'
        },
        {
            name: 'Slim shirt',
            slug: 'slim-shirt',
            category: ' shirts',
            image: '/images/shirt3.jpg',
            price: 100,
            brand: 'Raymond',
            rating: 4.5,
            numReviews: 10,
            countInStock: 20,
            description: 'A popular shirt'
        },
        {
            name: 'Golf pants',
            slug: 'golf-pants',
            category: 'pants',
            image: '/images/pants1.jpg',
            price: 50,
            brand: 'Oliver',
            rating: 4.5,
            numReviews: 10,
            countInStock: 20,
            description: 'Smart looking pants'
        },
        {
            name: 'Fit pants',
            slug: 'fit-pants',
            category: 'pants',
            image: '/images/pants2.jpg',
            price: 85,
            brand: 'Zara',
            rating: 4.2,
            numReviews: 10,
            countInStock: 20,
            description: 'Smart looking pants'
        },
        {
            name: 'Classic pants',
            slug: 'classic-pants',
            category: 'pants',
            image: '/images/pants3.jpg',
            price: 120,
            brand: 'Casely',
            rating: 4.3,
            numReviews: 10,
            countInStock: 0,
            description: 'Smart looking pants'
        }
       
],
}

export default data