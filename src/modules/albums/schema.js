module.exports = `
    type Album {
        id: ID!
        name: String
        createdTimestamp: Float
        cover: Image
        images: [Image]
    }
`;