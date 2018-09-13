export default class AuthenticationApi {

    constructor (database) {
        this.database = database
    }

    async addPrimaryAuthenticator (userId, authenticator) {
        let user = await this.database.findUser(userId)
        user.authentication.primary.push(authenticator)
        this.database.updateUser(userId, user)
    }

    async removePrimaryAuthenticator (userId, authenticator) {
        let user = await this.database.findUser(userId)
        user.authentication.primary.filter((value) => { return value !== authenticator})
        this.database.updateUser(userId, user)
    }

    async findUserByAuthenticator (authenticatorId, authenticatorType) {
        return await this.database.findUserByPrimaryAuthenticatorId(authenticatorType, authenticatorId)
    }

}