/**
 * helper method I made to help parse image json without having to try catch everywhere
 * @param {*} profile_picture 
 * @returns 
 */
export function ParseJSON(profile_picture) {
    if (profile_picture) {
        try {
            return JSON.parse(profile_picture);
        } catch (e) {
            console.log('error parsing image');
        }
    }
    return {}
}