const express = require('express')
const collection = require('./mongo')
const cors  = require('cors')
const app = express()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(cookieParser())


app.get('/',cors(),(req,res)=>{

})

app.post('/login', async (req, res) => {
    const { email, password } = req.body;


    try {
        const user = await collection.findOne({ email: email });
        if (user && (await bcrypt.compare(password, user.password))) {

            // Sign a JWT token for the user
            const token = jwt.sign(
                { id: user._id },
                'shhhh',
                { expiresIn: '2h' }
            );
            res.cookie("token", token, user.email);
            // Omit password from the user object in the response
            user.password = undefined;

            // Assign the token to the user object
            user.token = token;

            // Set cookie options
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true
            };
            res.status(200).cookie( 'token', token, options ).json({ 
                success: true,
                token,
                user
             });
            // Return success response with token and user information
            // res.cookie("token", token, options).json({
            //     success: true,
            //     token,
            //     user
            // });

        } else {
            // Return error response for invalid credentials
            res.status(401).json('invalid_credentials');
        }
    } catch (e) {
        console.error('Error:', e);
        // Return error response for server errors
        res.status(500).json({ message: 'server_error' });
    }
});






app.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the email already exists in the database
        const check = await collection.findOne({ email: email });
        if (check) {
            return res.status(409).json('exists'); // Return 409 Conflict status code for duplicate email
        }
        else {
            res.json('notexists')

        }

        // Hash the password securely
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user with the hashed password
        const user = await collection.create({
            email: email,
            password: hashedPassword
        });

        // Sign a JWT token for the user
        const token = jwt.sign(
            { id: user._id, email: user.email },
            'shhhh',
            { expiresIn: '2h' }
        );

        // Omit password from the user object in the response
        user.password = undefined;

        // Return the user object along with the token
        res.status(201).json({ user, token });
    } catch (error) {
        console.error('Error:', error);
        res.json('notexists')
    }
});



app.listen(5000,()=>{ 
    console.log('port connected')
})