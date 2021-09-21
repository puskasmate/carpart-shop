import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('pass123', 10),
        isAdmin: true
    },
    {
        name: 'Példa János',
        email: 'janivadasz@example.com',
        password: bcrypt.hashSync('pass123', 10)
    },
    {
        name: 'Példa Margit',
        email: 'margit@example.com',
        password: bcrypt.hashSync('pass123', 10)
    }
]

export default users