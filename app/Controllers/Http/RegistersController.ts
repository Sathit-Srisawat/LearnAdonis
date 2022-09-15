import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class RegistersController {

    public async register({ request }: HttpContextContract) {

        const user = new User()
        console.log('check data from requst : ', request)

        const createNewUser = schema.create({
            email: schema.string([
                rules.email()
            ]),
            password: schema.string([
                rules.confirmed(),
                rules.minLength(4)
            ])
        })



        try {
            await request.validate({
                schema: createNewUser
            })

            user.email = request.input('email')
            user.password = request.input('password')
            await user.save()

            return 'done'
        } catch (error) {
            return error
        }

    }
}
