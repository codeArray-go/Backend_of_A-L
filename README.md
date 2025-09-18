# AllLinks Backend

This is the backend of **AllLinks**, a LinkTree-style project built with Node.js, Express, MongoDB, and Redis. It provides user authentication, OTP verification via email, and profile management.

**To use this project**, first clone the repository and install dependencies with:  
  git clone <your_repo_url>  
  cd AllLinks-backend  
  npm install  

**After that, create a `.env` file** in the root directory and add the following configuration:  
PORT=<your_port>  
MONGO_URI=<your_mongodb_connection_string>  
REDIS_URL=<your_redis_connection_string>  
JWT_SECRET=<your_jwt_secret>  
JWT_SECRET_SECOND=<your_second_jwt_secret>  
NODE_ENV=production  
EMAIL_USER=<your_email_for_sending_otp>  
EMAIL_PASS=<your_email_app_password>  

**Important:** Always use an App Password for `EMAIL_PASS` instead of your normal email password. Keep the `.env` file private and do not commit it.  

**Once environment variables are configured**, you can run the server. In both development and production mode use:  
  npm start  

The server will be available at:  
  http://localhost:<your_port> (for development).  

**Available API endpoints are:**  
1. **Register User** → `POST /api/auth/register`  
2. **Login User** → `POST /api/auth/login`  
3. **Send OTP** → `POST /api/verify/send-otp`  
4. **Verify OTP** → `POST /api/verify/confirm`  
5. **Get User Profile** → `GET /api/auth/profile`  

Requires **Authorization header:** `Bearer <your_jwt_token>`  

**The tech stack used in this backend includes:**  
- Node.js and Express.js for server framework  
- MongoDB for database  
- Redis for caching and sessions  
- JWT for authentication  
- Nodemailer for sending OTP emails  

**Notes:** Update dependency versions if needed since the project was created using the latest versions at the time. Keep your environment variables secure. This backend can be extended further as per project requirements.  
