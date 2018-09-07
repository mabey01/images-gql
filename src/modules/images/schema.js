module.exports = `
    type ImageDimensions {
        width: Int
        height: Int
    }
    
    type GPS {
        latitudeRef: String
        latitude: Float
        longitudeRef: String
        longitude: Float
        altitudeRef: String
        altitude: String

        position: String

        speedRef: String
        speed: Float

        bearingRef: String
        bearing: Float

        directionRef: String
        direction: Float

        positionError: String
    }

    type Exif {
        camera: String
        model: String
        lensInfo: String
        
        originalFileName: String
        megapixels: Float
        dimension: ImageDimensions
        orientation: String
        dateTimeOriginal: Float
        
        iso: Int
        shutterSpeed: String
        aperture: Float
        focalLength: Int
        focalLengthIn35: Int
        fov: Int
        
        meteringMode: String
        program: String
        
        ambientTemperature: String
        cameraTemperature: String
        
        gps: GPS
    }
    
    type ThumbnailImage {
        width: Int
        height: Int
        quality: Int
        filePath: String
    }

    type Image {
        id: ID
        sourceFileName: String
        originalDateTime: Float
        rating: Int
        exif: Exif
        thumbnails: [ThumbnailImage]
        images: [ThumbnailImage]
    }
`;