export const getProfilePicture = (file: any) => {
    if(file && file.type === "object") return file
    if(file && file.type === "string") return file.uri

    return require('../assets/images/favicon.png')
}