import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
    public async index(ctx: HttpContextContract) {

        const users = await User.all()

        return users
    }

    public async createUser(ctx: HttpContextContract) {

        const user = new User()
        user.username = ctx.request.input('username')
        user.fname = ctx.request.input('fname')
        user.lname = ctx.request.input('lname')
        user.email = ctx.request.input('email')
        user.password = ctx.request.input('password')
        await user.save()
        console.log(user.$isPersisted)
    }

    public async delete(ctx: HttpContextContract) {

        const id = ctx.request.input('id')
        const user = await User.findOrFail(id)
        await user.delete()

    }

    public async update(ctx: HttpContextContract) {

        const id = ctx.request.input('id')
        const user = await User.findOrFail(id)
        user.username = ctx.request.input('username')
        user.fname = ctx.request.input('fname')
        user.lname = ctx.request.input('lname')
        user.email = ctx.request.input('email')
        user.password = ctx.request.input('password')

        await user.save()

    }

    public async read(ctx: HttpContextContract) {

        const id = ctx.request.param('id')
        const user = await User.findOrFail(id)

        return {
            'status': '200',
            'user': user
        }

    }

}
