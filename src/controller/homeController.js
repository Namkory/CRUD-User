import pool from '../configs/connectDB';

let getHomePage = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM users');
    return res.render('index.ejs', { dataUsers: rows });
};

let getViewPage = (req, res) => {
    return res.send('view page');
};

let getDetailPage = async (req, res) => {
    let userId = req.params.id;
    let [user] = await pool.execute(`SELECT * FROM users WHERE id = ? `, [userId]);

    return res.send(JSON.stringify(user));
};

let createNewUser = async (req, res) => {
    const { email, firstName, lastName, address } = req.body;
    await pool.execute('INSERT INTO users(email, firstName, lastName, address) VALUES(?,?,?,?)', [
        email,
        firstName,
        lastName,
        address,
    ]);
    return res.redirect('/');
};

let deleteUser = async (req, res) => {
    let userId = req.body.userId;
    console.log(userId);

    await pool.execute('DELETE FROM users WHERE id = ?', [userId]);

    return res.redirect('/');
};

let editUser = async (req, res) => {
    let userId = req.params.id;
    let [user] = await pool.execute(`SELECT * FROM users WHERE id = ?`, [userId]);
    return res.render('update.ejs', { dataUsers: user[0] });
};

let updateUser = async (req, res) => {
    let { email, firstName, lastName, address, id } = req.body;

    await pool.execute('UPDATE users SET email = ?, firstName = ?, lastName = ?, address = ? where id = ?', [
        email,
        firstName,
        lastName,
        address,
        id,
    ]);
    return res.redirect('/');
};

module.exports = {
    getHomePage,
    getViewPage,
    getDetailPage,
    createNewUser,
    deleteUser,
    editUser,
    updateUser,
};
