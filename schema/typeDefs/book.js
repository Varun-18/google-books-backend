const bookTypes = `#graphql

type Book{
    id: ID!
    volumeInfo: volumeInfo! 
    saleInfo: SaleInfo
}

type SaleInfo{
    retailPrice:Price
    saleability: String
}

type volumeInfo{
    title: String!
    authors: [String!]
    publishedDate: String
    description: String
    pageCount: Int
    imageLinks:imageLinks
    averageRating: Float
}

type imageLinks{
    smallThumbnail: String
    thumbnail: String
}

type Price{
    amount: Float!
    currencyCode: String!
}

type Query {
    books(name: String!, index: Int!, filter: String): [Book!]!
    book(id: ID!): Book!
    bookById(ids:[ID] ): [Book]
}

`;

module.exports = [bookTypes];
