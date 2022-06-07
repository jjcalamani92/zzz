import * as bcrypt from 'bcrypt';
import { db } from '.';
import User from './user.schema';
import { uuidv4 } from '../utils/uuid';



export const checkUserEmailPassword = async( email: string, password: string ) => {

    await db.connect();
    const user = await User.findOne({ email });
    await db.disconnect();

    if ( !user ) {
        return null;
    }

    if ( !bcrypt.compare( password, user.password! ) ) {
        return null;
    }

    const { role, username, _id } = user;

    return {
        _id,
        email: email.toLocaleLowerCase(),
        role,
        username,
    }
}


// // Esta función crea o verifica el usuario de OAuth
export const oAUthToDbUser = async( oAuthEmail: string, oAuthUserName: string ) => {

    await db.connect();
    const user = await User.findOne({ email: oAuthEmail });

    if ( user ) {
        await db.disconnect();
        const { _id, username, email, role } = user;
        return { _id, username, email, role };
    }

    const newUser = new User({ email: oAuthEmail.toLowerCase(), username: oAuthUserName.toLowerCase(), password: '@', role: 'USER_ROL' });
    await newUser.save();
    await db.disconnect();

    const { _id, username, email, role } = newUser;
    return { _id, username, email, role };

}
