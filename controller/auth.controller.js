const mysql = require('mysql')

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

exports.register  = (req, res) => {
    console.log(req.body)
    const { name, email, password } = req.body

    db.query('SELECT email FROM usuarios WHERE email=?', [email], (error, results) => {
        if (error) {
            console.log(error)
        }
        if (results.length > 0) {
            return res.render('register', { 
                message: 'EL EMAIL YA ESTA EN USO'
            })
        }
        else if (password.length < 5) {
            res.render('register', { 
                message: 'LA CONTRASEÑA TIENE QUE SER > 5'
            })
        }
        else {
            db.query('INSERT INTO usuarios SET ?', {email: email, password:password}, (error, results) => {
                if (error) {
                    console.log(error)
                }
                else {
                    console.log(results)
                    return res.render('register', {
                        message: 'USER SUCCESFULLY REGISTERED'
                    })
                }
            })}
    })
}