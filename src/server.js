const express = require('express');
const fs = require('fs');
const { ApolloServer, gql } = require('apollo-server');

const ImageSchema = require('./modules/images/schema.js');
const AlbumSchema = require('./modules/albums/schema.js');

const getImageByID = require('./modules/images/queries/get-by-id.js');

const {
    schema: getImagesSchema,
    resolver: getImagesResolver
} = require('./modules/images/queries/get-all.js');

const addImageMutationSchema = require('./modules/images/mutations/add-images/schema.js');
const addImagesMutationResolver = require('./modules/images/mutations/add-images/resolver.js');

const {
    schema: removeImageSchema,
    resolver: removeImageResolver
} = require('./modules/images/mutations/remove-image/remove-image.js');

const {
    schema: removeImagesSchema,
    resolver: removeImagesResolver
} = require('./modules/images/mutations/remove-images/remove-images.js');

const {
    schema: createAlbumSchema,
    resolver: createAlbumResolver
} = require('./modules/albums/mutations/create.js');

const {
    schema: getAlbumsSchema,
    resolver: getAlbumsResolver
} = require('./modules/albums/query/get-all.js');

const {
    schema: getAlbumByIDSchema,
    resolver: getAlbumByIDResolver
} = require('./modules/albums/query/get-by-id.js');

const {
    schema: changeAlbumCoverSchema,
    resolver: changeAlbumCoverResolver
} = require('./modules/albums/mutations/change-cover.js');

const {
    schema: addImagesToAlbumSchema,
    resolver: addImagesToAlbumResolver
} = require('./modules/albums/mutations/add-images.js');

const changeRatingMutationSchema = require('./modules/images/mutations/change-rating/schema.js');
const changeRatingMutationresolver = require('./modules/images/mutations/change-rating/resolver.js');

const changeGPSMutationSchema = require('./modules/images/mutations/change-gps/schema.js');
const changeGPSMutationresolver = require('./modules/images/mutations/change-gps/resolver.js');

const typeDefs = gql`
    ${ImageSchema}
    ${AlbumSchema}
    type Query {
        image(id: ID!): Image
        ${getImagesSchema}
        
        ${getAlbumsSchema}
        ${getAlbumByIDSchema}
    }
    
    type Mutation {
        ${addImageMutationSchema}
        ${changeRatingMutationSchema}
        ${changeGPSMutationSchema}
        ${removeImageSchema}
        ${removeImagesSchema}
        
        ${createAlbumSchema}
        ${addImagesToAlbumSchema}
        ${changeAlbumCoverSchema}
    }
`;

const resolvers = {
    Query: {
        images: getImagesResolver,
        image: getImageByID,

        albums: getAlbumsResolver,
        album: getAlbumByIDResolver
    },
    Mutation: {
        addImages: addImagesMutationResolver,
        changeRating: changeRatingMutationresolver,
        changeGPS: changeGPSMutationresolver,
        removeImage: removeImageResolver,
        removeImages: removeImagesResolver,

        createAlbum: createAlbumResolver,
        addImagesToAlbum: addImagesToAlbumResolver,
        changeAlbumCover: changeAlbumCoverResolver
    }
};

const server = new ApolloServer({ typeDefs, resolvers });
// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
    console.log(`🚀  GQL Server ready at ${url}`);
});

const fileServer = express();

fileServer.all('*', (req, res) => {
    const {originalUrl} = req;
    const fileStream = fs.createReadStream('./' + originalUrl);
    fileStream.pipe(res);
});

const port = 3000;
fileServer.listen(port, () => (`🚀  File Server ready at ${url}`));