import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('pass123', 10),
        isAdmin: true
    },
    {
        name: 'Kiss János',
        email: 'janivadasz@example.com',
        password: bcrypt.hashSync('pass123', 10)
    },
    {
        name: 'Nagy Margit',
        email: 'margit@example.com',
        password: bcrypt.hashSync('pass123', 10)
    }
]

export default users